// Shared maths for the hero ring.
//
// The ring is NOT a CSS 3D scene. We project each card ourselves into 2D and
// set left/top/scale/opacity/blur/z-index directly. Two reasons:
//
//  1. Depth sorting. We need cards to pass *behind* the character plate and in
//     front of it, reliably, in every browser. `transform-style: preserve-3d`
//     leaves that sorting to the engine and the results differ between Chrome,
//     Safari and Firefox once a sibling image is in the same 3D context.
//     Projecting by hand gives us an explicit z-index per card against a fixed
//     z-index for the character, which is deterministic everywhere.
//
//  2. The scatter/settle transition needs per-card control of radius, blur and
//     opacity on the same timeline. That is far easier on a value we own than
//     on a composed CSS 3D transform.

export const TAU = Math.PI * 2

export const clamp = (v, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v))

// Normalised progress of `v` through the window [a, b].
export const range = (v, a, b) => clamp((v - a) / (b - a))

export const lerp = (a, b, t) => a + (b - a) * t

export const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)
export const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)
export const easeInCubic = (t) => t * t * t
// Gentler ease-in than cubic. Cubic keeps a value near zero for most of its
// range, which made the scatter read as "fade in place" rather than "fly out".
export const easeInSoft = (t) => Math.pow(t, 1.5)

// Scroll phases across the pinned hero. Overlapping windows on purpose: the
// brands begin settling while the last services are still dissolving, which is
// what makes the handover read as one move rather than two.
export const PHASE = {
  servicesHold: [0.0, 0.26],
  scatter: [0.26, 0.52],
  settle: [0.44, 0.74],
  brandHold: [0.74, 1.0],
}

// Cards stay clickable only while the ring is essentially still. Past this the
// scatter has begun and a click would land on a moving target.
export const INTERACTIVE_UNTIL = 0.16

// Peak billboard turn at the ring's left and right extremes. The projection
// bunches cards where |sin(angle)| approaches 1, and foreshortening them there
// is what stops the ring piling up on its own sides. Tuned by eye: past ~0.8rad
// the edge labels stop being readable, below ~0.6 the sides crowd again.
export const MAX_TURN = 0.72

/**
 * Project one ring slot to screen space.
 *
 * @param angle      radians around the ring; 0 is nearest the camera
 * @param radiusMul  1 is the resting ring; >1 pushes the card outward
 * @param box        { w, h } of the scene in px
 */
export function project(angle, radiusMul, box) {
  const rx = box.w * 0.445 * radiusMul
  const ry = box.h * 0.180 * radiusMul

  const sin = Math.sin(angle)
  const depth = Math.cos(angle) // +1 nearest camera, -1 furthest

  const cx = box.w * 0.5
  const cy = box.h * 0.585

  // Front cards sit lower in frame, back cards ride higher — the ellipse you
  // get from looking slightly down onto a horizontal ring.
  const x = cx + rx * sin
  const y = cy + ry * depth

  const d01 = (depth + 1) / 2 // 0 at the back, 1 at the front

  return {
    x,
    y,
    depth,
    d01,
    scale: lerp(0.54, 1.0, d01),
    opacity: lerp(0.42, 1, d01),
    blur: lerp(2.6, 0, d01),
    // Character plate sits at CHARACTER_Z; anything with depth < 0 lands under it.
    z: Math.round(500 + depth * 420),
    // Cards billboard toward the viewer rather than sitting truly tangent to
    // the ring. A real tangent plate turns past 90deg on the far side and
    // renders its label mirrored; this keeps every label readable while still
    // giving each card the turned-plate feel, strongest at the ring's edges.
    turn: Math.sin(angle) * MAX_TURN,
  }
}

export const CHARACTER_Z = 500

// Evenly spaced slot angle for card `i` of `n`, offset by the ring's spin.
export const slotAngle = (i, n, spin) => (i / n) * TAU + spin
