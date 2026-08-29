import * as THREE from 'three';

/**
 * Panel arrangements, in character-local space (character stands at the
 * origin, ~1.8 units tall, facing +Z).
 *
 * Each layout is a pure function (index, total, opts) → { position, rotation,
 * scale }. A chapter picks one by name, so adding a new visual arrangement
 * means adding a function here and naming it in the manifest — no scroll or
 * camera changes.
 *
 * `opts.free` is +1 or −1: the horizontal direction with no DOM copy over it,
 * derived from the chapter's `side`. Layouts use it to keep panels out from
 * behind the headline instead of hard-coding a direction per chapter.
 */

const DEG = Math.PI / 180;

const layouts = {
  /** No panels — the character carries the frame alone. */
  idle: () => ({ position: [0, 0, 0], rotation: [0, 0, 0], scale: 0 }),

  /** Panels arc up and over the right shoulder, tilted toward the camera. */
  arc: (i, n, { free = 1 } = {}) => {
    const spread = 118 * DEG;
    const a = n === 1 ? 0 : (i / (n - 1) - 0.5) * spread;
    const radius = 1.62;
    return {
      position: [
        free * (0.55 + Math.sin(a) * radius * 0.72),
        1.52 + Math.cos(a) * radius * 0.42,
        -0.15 + Math.cos(a) * 0.35,
      ],
      rotation: [0, free * (-16 * DEG - a * 0.3), -free * a * 0.14],
      scale: 1,
    };
  },

  /** A film strip running past the character's left, staggered in depth. */
  filmstrip: (i, n, { free = -1 } = {}) => {
    const t = n === 1 ? 0.5 : i / (n - 1);
    return {
      position: [free * (1.95 - t * 1.35), 1.78 - t * 0.66, 0.35 - t * 0.9],
      rotation: [3 * DEG, free * -24 * DEG, free * (3 * DEG - t * 5 * DEG)],
      scale: 1,
    };
  },

  /**
   * A ring orbiting the head. These panels are billboarded (see BILLBOARD
   * below), so the ones on the far side stay readable instead of showing
   * their mirrored backs.
   */
  ring: (i, n, { free = 1 } = {}) => {
    // A crown, not a closed ring: the arc opens toward the copy so no card
    // ever orbits behind the headline. Cards sweep in depth around the head,
    // which is what sells the "ring" read from the camera anyway.
    const spread = 170 * DEG;
    const u = n === 1 ? 0.5 : i / (n - 1);
    const a = (u - 0.5) * spread;
    const radius = 1.45;
    return {
      // Height rises monotonically along the arc rather than mirroring it:
      // a symmetric crown puts the near and far card at the same screen
      // position, and the nearer one simply covers the other.
      position: [
        free * (0.95 + Math.cos(a) * radius),
        1.32 + u * 1.38,
        Math.sin(a) * radius * 0.6,
      ],
      rotation: [0, 0, 0],
      scale: 0.78,
    };
  },

  /** Panels resolving out of a wireframe cube in front of the raised hand. */
  build: (i, n, { free = 1 } = {}) => {
    const t = n === 1 ? 0 : i / (n - 1);
    // Stacked clear of the browser window that WireBuild resolves into, so
    // the two never sit on top of each other.
    return {
      position: [free * (1.98 + t * 0.14), 1.3 - t * 0.86, 0.15 + t * 0.2],
      rotation: [-3 * DEG, free * -17 * DEG, 0],
      scale: 0.86,
    };
  },

  /** Wide, low, scattered — the room-scale activation shot. */
  scatter: (i, n, { free = 1 } = {}) => {
    const t = n === 1 ? 0.5 : i / (n - 1);
    // Wide shot: the panels drift out into the clear half at different depths
    // rather than straddling the character.
    return {
      position: [free * (1.55 + t * 1.35), 1.95 - t * 1.0, -0.2 - t * 0.85],
      rotation: [0, free * -21 * DEG, free * 2 * DEG],
      scale: 1.5,
    };
  },

  /** Two columns framing the mentor pair. */
  mentor: (i, n, { free = -1 } = {}) => {
    const t = n === 1 ? 0 : i / (n - 1);
    return {
      position: [free * (1.62 + t * 0.16), 2.18 - t * 1.4, 0.15 + t * 0.28],
      rotation: [0, free * -20 * DEG, 0],
      scale: 0.92,
    };
  },

  /** Everything collapses toward the brand mark. */
  converge: () => ({ position: [0, 1.35, 0.2], rotation: [0, 0, 0], scale: 0 }),
};

/**
 * Layouts whose panels always turn to face the camera. Anything that puts a
 * panel behind the character needs this, or the viewer reads its back face.
 */
export const BILLBOARD = new Set(['ring']);

/** Maps a chapter's copy side to the horizontal direction that stays clear. */
export function freeSide(side) {
  return side === 'right' ? -1 : 1;
}

export function panelTransform(layout, i, n, opts = {}) {
  const fn = layouts[layout] ?? layouts.idle;
  return fn(i, n, opts);
}

export function hasPanels(layout) {
  return layout !== 'idle' && layout !== 'converge';
}

/**
 * Where panels fly in from before they settle — the drift-in start point.
 * Pushed outward from the character and back in depth so entries read as
 * "assembling out of the storm" rather than sliding on a rail.
 */
export function entryOffset(transform) {
  const p = transform.position;
  const dir = new THREE.Vector3(p[0], 0, p[2]);
  if (dir.lengthSq() < 1e-4) dir.set(0, 0, 1);
  dir.normalize().multiplyScalar(1.15);
  return [dir.x, 0.35, dir.z - 0.5];
}

export default layouts;
