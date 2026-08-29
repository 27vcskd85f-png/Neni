# Blüten Sturm — homepage hero & scroll sequence

Scroll-linked hero for bluetensturm.com: a ring of 18 service cards around the
character, which dissolves through a gold-particle transition into a ring of
client brand logos.

```
npm install
npm run dev      # http://localhost:5173
npm run build
```

Two query overrides help while developing:

| URL | Effect |
| --- | --- |
| `?motion=full` | Force the full ring sequence, whatever the device reports |
| `?motion=reduced` | Force the static fallback |

---

## What changed from the original brief, and why

The brief proposed scroll-scrubbing the two Higgsfield clips as background
layers with clickable HTML hitboxes positioned over each card in the video.
Once the clips were examined frame by frame, that approach turned out not to be
available with these particular assets. Three findings drove the rebuild:

**1. The clips are HEVC/H.265.** Chrome and Firefox will not decode HEVC in a
`<video>` element. Both clips had to be transcoded no matter which architecture
won. They are now shipped as VP9/WebM with H.264/MP4 fallback, at 1280×720 with
a keyframe every 6 frames so seeking stays cheap — 23 MB → 2.9 MB and
27 MB → 3.3 MB.

**2. `ring-video-1` is a camera dolly-in, not a ring rotation.** Over its 10
seconds the camera pushes from a wide shot to a close-up where single cards fill
a third of the frame. Card positions move nonlinearly and most cards leave the
frame entirely. A fixed HTML hitbox over a scrubbed frame of that clip is
correct for roughly one instant and wrong everywhere else.

**3. Every card label in both clips is AI-garbled.** "Contherbamiont
Production", "Cerporahtaising Developmentz", "Digitiser Marketioos". Those
frames cannot carry the real service names, so the labels had to be real DOM
text regardless — which means real cards, not overlays traced onto a video.

So the ring is **rebuilt as real DOM**, and the clips are used for what they are
genuinely good at: light, colour, atmosphere and particle motion.

### The architecture that replaced it

```
┌─ ring-video-1 ····· ambient loop, blurred 26px          (behind everything)
├─ ring-video-2 ····· scroll-scrubbed, blurred 20px
├─ vignette
│
├─ .hero-stage ────── one stacking context
│    ├ service cards   z-index  80 … 500   (behind the figure)
│    ├ character plate z-index 500
│    ├ service cards   z-index 500 … 920   (in front of the figure)
│    └ brand cards     same range
│
├─ particle canvas ·· gold particles, z 950
└─ copy layers ······ z 960
```

**The character is a real cutout.** Frame 132 of `ring-video-2` is the one
moment where the figure is wide enough to read as a full torso and no cards
overlap the body. That frame was segmented to alpha, and the lower 26% is faded
out because the source frame cuts the torso off at the video's bottom edge.
The result is `character-plate.webp` (117 KB), which lets cards genuinely pass
*behind* the figure.

**The ring is projected by hand, not with CSS 3D.** `src/lib/ring.js` computes
each card's screen position, scale, opacity, blur and z-index from its angle.
This was a deliberate choice over `transform-style: preserve-3d`:

- Depth sorting is explicit. `preserve-3d` hands sorting to the engine, and
  Chrome, Safari and Firefox disagree once a sibling image sits in the same 3D
  context. An integer z-index against a fixed `CHARACTER_Z` behaves identically
  everywhere.
- The scatter and settle transitions need per-card control of radius, opacity
  and blur on one timeline, which is far easier on values we own.

Cards **billboard** toward the viewer rather than sitting truly tangent to the
ring — a true tangent plate turns past 90° on the far side and renders its label
mirrored. The turn peaks at 0.5 rad at the ring's left and right extremes, which
keeps the plate feel and every label readable.

**Positioning runs in `requestAnimationFrame`, writing straight to the DOM.**
React renders the 36 cards once; the per-frame work never touches component
state. Scroll progress lives in a ref for the animation loops and as a motion
value only for the few things that genuinely re-style.

---

## Scroll sequence

Progress is measured across a 360vh runway with the scene pinned via `sticky`.

| Progress | Phase |
| --- | --- |
| 0.00 – 0.26 | Services ring at rest. Cards clickable, ring leans toward the cursor. |
| 0.26 – 0.52 | Scatter: cards accelerate outward, lift, blur and fade. Gold particles ramp up. |
| 0.44 – 0.74 | Settle: brand logos arrive from outside the ring, staggered one by one. |
| 0.74 – 1.00 | Brand ring at rest, heading and subtext at full opacity. |

The scatter and settle windows overlap on purpose — the brands begin arriving
while the last services are still dissolving, so the handover reads as one move
rather than two.

Cards stop being clickable at progress `0.16` (`INTERACTIVE_UNTIL`), before the
scatter starts, so a click never lands on a moving target.

**Cursor tracking.** A flat plate cannot turn its head, so the figure leans
toward the pointer instead — ±4.2° yaw, ±2.6° pitch, plus a slow breathing
drift. The ring leans with it, damped so a fast pointer move never snaps it.

---

## Filling in your own content

### Brand logos — `src/data/brands.js`

The one file you need to edit. Drop logo files into `public/media/brands/` and
add an entry per brand:

```js
export const BRANDS = [
  { name: 'Zott',   logo: '/media/brands/zott.svg' },
  { name: 'Woerle', logo: '/media/brands/woerle.svg' },
]
```

The ring lays out whatever is in the array, at any length. While it is empty,
18 neutral placeholder plates render so the sequence stays testable. Logos are
hover-only — desaturated at rest, full colour and a slight lift on hover. This
ring is proof, not a menu, so nothing here opens.

### Logo — `public/media/hero/logo.svg`

Currently a placeholder wordmark. Replace the file with your own (SVG or
transparent PNG); `Logo.jsx` only cares about the path and the height. It is
mounted outside the scroll container, so it is fixed top-left, never moves, and
never fades — including on the reduced-motion path.

### Services — `src/data/services.js`

All 18 services with descriptions, deliverables and the three published prices
(Website & Digital Experience `From €500`, Social Media Management
`€800–1,300/month`, Corporate Training `€2,000–5,000/month`). The four featured
services carry `featured: true`, which gives them a larger ring card and the
wide detail panel with a supporting visual.

The copy is written to be plausible and specific, but it is **our draft, not
your approved marketing copy** — read it before it goes near production.

---

## Reduced motion and small screens

`useMotionProfile` drops to the static path for `prefers-reduced-motion:
reduce`, viewports under 900px, four or fewer cores, `saveData`, 2G, or
`deviceMemory ≤ 4`. It **starts** in the reduced state and only upgrades after
measuring the client, so a phone never begins downloading video it will not use.

The fallback renders a static character plate over a CSS grid of the same
service cards, then a logo grid — no video, no scrub, no ring, no particle
canvas. Cards still open the same `ServiceOverlay`, so nothing is lost but the
motion.

---

## Files

| Path | |
| --- | --- |
| `src/components/HeroScene.jsx` | Scroll runway, backdrop videos, character, composition |
| `src/components/ServiceRing.jsx` | The 18 service cards and their rAF loop |
| `src/components/BrandRing.jsx` | The brand logo ring, staggered settle |
| `src/components/ServiceOverlay.jsx` | Detail panel — focus trap, Escape, focus restore |
| `src/components/ParticleField.jsx` | Gold particle canvas |
| `src/components/ReducedMotionHero.jsx` | Static fallback |
| `src/components/Logo.jsx` | Permanent fixed mark |
| `src/lib/ring.js` | Projection, easing, phase windows |

## Media

| File | Size | |
| --- | --- | --- |
| `ring-video-1.webm` / `.mp4` | 4.1 / 2.9 MB | Ambient loop, never scrubbed |
| `ring-video-2.webm` / `.mp4` | 3.4 / 3.3 MB | Scrubbed across 4.1s–9.6s |
| `character-plate.webp` | 117 KB | Alpha cutout, frame 132 of clip 2 |
| `ring-reference-1/2.jpg` | ~190 KB | Original compositions, kept for reference |

`ring-video-2` is scrubbed only across its wide back half (4.1s–9.6s). The clip
opens on a face close-up and pulls back into the ring; the first four seconds
are a much tighter framing than the hero sits at, so using them would fight the
character plate rather than support it.
