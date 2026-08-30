/**
 * Artwork scenes for bluetensturm.com.
 *
 * Each scene draws to a 2D canvas at whatever size the renderer asks for, so
 * one definition produces both a 2560px hero plate and a 1200px social card.
 * Everything is deterministic: a seeded PRNG means re-running the pipeline
 * reproduces the same art byte-for-byte instead of reshuffling the site's
 * imagery on every build.
 *
 * The palette is the brand's: near-black ground, crimson-to-orange bloom,
 * peach highlight.
 */
export const IN_BROWSER = typeof window !== 'undefined';

export const IN = {
  ground: '#060305',
  groundAlt: '#0B0409',
  crimson: '#E1103A',
  ember: '#FF5A1F',
  amber: '#FF9A3D',
  peach: '#FF9A6B',
  chalk: '#F4EFEE',
};

/** Mulberry32 — small, fast, and stable across runs. */
export function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const TAU = Math.PI * 2;

/** Fills the frame with the brand's dark ground plus two light pools. */
function ground(ctx, w, h, opts = {}) {
  const { warmAt = [0.62, 0.44], coolAt = [0.28, 0.66], strength = 1 } = opts;
  ctx.fillStyle = IN.ground;
  ctx.fillRect(0, 0, w, h);

  const g1 = ctx.createRadialGradient(
    w * warmAt[0], h * warmAt[1], 0,
    w * warmAt[0], h * warmAt[1], Math.max(w, h) * 0.72,
  );
  g1.addColorStop(0, `rgba(225,16,58,${0.42 * strength})`);
  g1.addColorStop(0.42, `rgba(120,6,26,${0.2 * strength})`);
  g1.addColorStop(1, 'rgba(6,3,5,0)');
  ctx.fillStyle = g1;
  ctx.fillRect(0, 0, w, h);

  const g2 = ctx.createRadialGradient(
    w * coolAt[0], h * coolAt[1], 0,
    w * coolAt[0], h * coolAt[1], Math.max(w, h) * 0.58,
  );
  g2.addColorStop(0, `rgba(255,90,31,${0.26 * strength})`);
  g2.addColorStop(1, 'rgba(6,3,5,0)');
  ctx.fillStyle = g2;
  ctx.fillRect(0, 0, w, h);
}

/** One petal: a teardrop, drawn from its own origin so callers can transform. */
function petal(ctx, size) {
  ctx.beginPath();
  ctx.moveTo(0, -size);
  ctx.bezierCurveTo(size * 0.52, -size * 0.42, size * 0.46, size * 0.5, 0, size);
  ctx.bezierCurveTo(-size * 0.46, size * 0.5, -size * 0.52, -size * 0.42, 0, -size);
  ctx.closePath();
}

/** Petals caught in a wind current, sized and lit by depth. */
function petalStorm(ctx, w, h, r, opts = {}) {
  const {
    count = 150, cx = 0.5, cy = 0.5, spread = 0.62, minSize = 0.008, maxSize = 0.05,
  } = opts;
  const unit = Math.min(w, h);

  const petals = [];
  for (let i = 0; i < count; i += 1) {
    const depth = r();
    const a = r() * TAU;
    const rad = Math.pow(r(), 0.62) * spread;
    petals.push({
      depth,
      x: w * cx + Math.cos(a) * rad * w * (0.5 + depth * 0.6),
      y: h * cy + Math.sin(a) * rad * h * (0.62 + depth * 0.5) - depth * h * 0.08,
      size: unit * (minSize + (maxSize - minSize) * depth),
      rot: r() * TAU,
      warm: r(),
      blur: (1 - depth) * unit * 0.012,
    });
  }
  // Far petals first, so near ones overlap them.
  petals.sort((p, q) => p.depth - q.depth);

  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  for (const p of petals) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    if (p.blur > 0.4) ctx.filter = `blur(${p.blur.toFixed(2)}px)`;
    const grd = ctx.createLinearGradient(0, -p.size, 0, p.size);
    const warm = p.warm > 0.55;
    grd.addColorStop(0, warm ? 'rgba(255,154,61,0.95)' : 'rgba(255,90,31,0.9)');
    grd.addColorStop(1, warm ? 'rgba(225,16,58,0.15)' : 'rgba(225,16,58,0.1)');
    ctx.fillStyle = grd;
    ctx.globalAlpha = 0.24 + p.depth * 0.66;
    petal(ctx, p.size);
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();
}

/** Fine sparks — the "storm" half of the brand. */
function sparks(ctx, w, h, r, count = 900, alpha = 0.5) {
  const unit = Math.min(w, h);
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < count; i += 1) {
    const x = r() * w;
    const y = r() * h;
    const s = unit * (0.0006 + r() * 0.0022);
    ctx.globalAlpha = alpha * (0.2 + r() * 0.8);
    ctx.fillStyle = r() > 0.5 ? IN.peach : IN.ember;
    ctx.beginPath();
    ctx.arc(x, y, s, 0, TAU);
    ctx.fill();
  }
  ctx.restore();
}

/** Long, soft light streaks that give the frame direction. */
function streaks(ctx, w, h, r, count = 7) {
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < count; i += 1) {
    const y = h * (0.12 + r() * 0.76);
    const len = w * (0.3 + r() * 0.5);
    const x = r() * (w - len);
    const thick = h * (0.002 + r() * 0.01);
    const g = ctx.createLinearGradient(x, y, x + len, y);
    g.addColorStop(0, 'rgba(255,90,31,0)');
    g.addColorStop(0.5, `rgba(255,154,61,${0.1 + r() * 0.14})`);
    g.addColorStop(1, 'rgba(225,16,58,0)');
    ctx.fillStyle = g;
    ctx.filter = `blur(${(thick * 1.6).toFixed(1)}px)`;
    ctx.fillRect(x, y, len, thick);
  }
  ctx.restore();
}

/** Grain, so large gradients do not band on real displays. */
function grain(ctx, w, h, r, amount = 12) {
  const img = ctx.getImageData(0, 0, w, h);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    const n = (r() - 0.5) * amount;
    d[i] += n; d[i + 1] += n; d[i + 2] += n;
  }
  ctx.putImageData(img, 0, 0);
}

export const scenes = {
  /**
   * Hero backdrop: a wide storm of petals with the eye of the bloom
   * off-centre, left clear enough for the headline.
   */
  'hero-backdrop': (ctx, w, h) => {
    const r = rng(20260829);
    ground(ctx, w, h, { warmAt: [0.66, 0.42], coolAt: [0.3, 0.68] });
    streaks(ctx, w, h, r, 9);
    petalStorm(ctx, w, h, r, { count: 210, cx: 0.63, cy: 0.46, spread: 0.72, maxSize: 0.058 });
    sparks(ctx, w, h, r, 1400, 0.55);
    // Darken the left third so headline type stays legible over it.
    const scrim = ctx.createLinearGradient(0, 0, w * 0.72, 0);
    scrim.addColorStop(0, 'rgba(6,3,5,0.92)');
    scrim.addColorStop(1, 'rgba(6,3,5,0)');
    ctx.fillStyle = scrim;
    ctx.fillRect(0, 0, w, h);
    grain(ctx, w, h, r, 10);
  },

  /**
   * The figure the hero's service ring orbits: a bloom silhouette rising out
   * of the storm. Abstract on purpose — it stands for the brand, and never
   * pretends to be a photograph of a person.
   */
  'character-plate': (ctx, w, h) => {
    const r = rng(77712);
    ctx.clearRect(0, 0, w, h);
    const cx = w * 0.5;
    const cy = h * 0.46;
    const unit = Math.min(w, h);

    // Halo. Reaches past the frame edge so it fades out rather than ending
    // on a visible circular seam over the transparent background.
    const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, unit * 0.5);
    halo.addColorStop(0, 'rgba(255,170,90,0.34)');
    halo.addColorStop(0.3, 'rgba(225,16,58,0.16)');
    halo.addColorStop(0.62, 'rgba(120,6,26,0.05)');
    halo.addColorStop(1, 'rgba(6,3,5,0)');
    ctx.fillStyle = halo;
    ctx.fillRect(0, 0, w, h);

    // The bloom: petals radiating from one centre, three layers deep. Each
    // layer is rotated off the one beneath so the whorls read separately.
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    const layers = [
      { blades: 13, scale: 0.68, dist: 0.2, alpha: 0.3, twist: 0 },
      { blades: 11, scale: 0.5, dist: 0.145, alpha: 0.4, twist: 0.14 },
      { blades: 8, scale: 0.34, dist: 0.086, alpha: 0.52, twist: 0.3 },
    ];
    for (const L of layers) {
      for (let i = 0; i < L.blades; i += 1) {
        const a = (i / L.blades) * TAU + L.twist;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(a);
        ctx.translate(0, -unit * L.dist);
        const size = unit * 0.25 * L.scale;
        const g = ctx.createLinearGradient(0, -size, 0, size);
        g.addColorStop(0, `rgba(255,206,150,${L.alpha + 0.3})`);
        g.addColorStop(0.45, `rgba(255,120,45,${L.alpha})`);
        g.addColorStop(1, 'rgba(225,16,58,0.03)');
        ctx.fillStyle = g;
        petal(ctx, size);
        ctx.fill();
        ctx.restore();
      }
    }
    ctx.restore();

    // Hot core where the whorls meet.
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, unit * 0.07);
    core.addColorStop(0, 'rgba(255,240,214,0.95)');
    core.addColorStop(0.35, 'rgba(255,154,61,0.6)');
    core.addColorStop(1, 'rgba(225,16,58,0)');
    ctx.fillStyle = core;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();

    // Sparks lifting off the top of the bloom — the storm half of the name.
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 900; i += 1) {
      const t = r();
      const y = cy - unit * 0.14 - t * unit * 0.34;
      const spreadX = unit * 0.03 * (1 + t * 5.2);
      const x = cx + (r() - 0.5) * spreadX;
      ctx.globalAlpha = (1 - t) * 0.55;
      ctx.fillStyle = r() > 0.45 ? IN.amber : IN.crimson;
      ctx.beginPath();
      ctx.arc(x, y, unit * (0.0008 + r() * 0.0026), 0, TAU);
      ctx.fill();
    }
    ctx.restore();

    // Loose petals breaking away.
    petalStorm(ctx, w, h, r, { count: 40, cx: 0.5, cy: 0.42, spread: 0.34, maxSize: 0.026 });
  },

  /** Social / OG card: the mark, big, over the storm. */
  'og-card': (ctx, w, h) => {
    const r = rng(31415);
    ground(ctx, w, h, { warmAt: [0.72, 0.4], coolAt: [0.24, 0.7] });
    streaks(ctx, w, h, r, 6);
    petalStorm(ctx, w, h, r, { count: 120, cx: 0.72, cy: 0.5, spread: 0.5, maxSize: 0.06 });
    sparks(ctx, w, h, r, 700, 0.5);
    const scrim = ctx.createLinearGradient(0, 0, w * 0.8, 0);
    scrim.addColorStop(0, 'rgba(6,3,5,0.95)');
    scrim.addColorStop(1, 'rgba(6,3,5,0)');
    ctx.fillStyle = scrim;
    ctx.fillRect(0, 0, w, h);
    grain(ctx, w, h, r, 8);
  },
};

/** Case-study frames: one abstract composition per discipline. */
const CASES = {
  'case-rebrand': { seed: 811, hue: 'crimson', motif: 'grid' },
  'case-campaign': { seed: 822, hue: 'ember', motif: 'waves' },
  'case-training': { seed: 833, hue: 'amber', motif: 'orbit' },
  'case-event': { seed: 844, hue: 'crimson', motif: 'beams' },
};

for (const [name, cfg] of Object.entries(CASES)) {
  scenes[name] = (ctx, w, h) => {
    const r = rng(cfg.seed);
    ground(ctx, w, h, {
      warmAt: [0.5 + (r() - 0.5) * 0.3, 0.45],
      coolAt: [0.3, 0.7],
      strength: 0.9,
    });

    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    const unit = Math.min(w, h);

    if (cfg.motif === 'grid') {
      // Repositioning: a structure being redrawn.
      const step = w / 14;
      ctx.lineWidth = Math.max(1, unit * 0.0016);
      for (let i = 0; i <= 14; i += 1) {
        const a = 0.05 + r() * 0.18;
        ctx.strokeStyle = `rgba(255,154,61,${a})`;
        ctx.beginPath();
        ctx.moveTo(i * step, h * (r() * 0.2));
        ctx.lineTo(i * step + (r() - 0.5) * step * 2, h * (0.8 + r() * 0.2));
        ctx.stroke();
      }
      for (let i = 0; i < 9; i += 1) {
        ctx.strokeStyle = `rgba(225,16,58,${0.08 + r() * 0.2})`;
        const y = h * (i / 8);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y + (r() - 0.5) * h * 0.06);
        ctx.stroke();
      }
    } else if (cfg.motif === 'waves') {
      // Campaign reach: overlapping fronts crossing markets.
      for (let i = 0; i < 26; i += 1) {
        const amp = h * (0.04 + r() * 0.16);
        const y0 = h * r();
        ctx.strokeStyle = `rgba(255,90,31,${0.06 + r() * 0.2})`;
        ctx.lineWidth = unit * (0.001 + r() * 0.004);
        ctx.beginPath();
        for (let x = 0; x <= w; x += w / 60) {
          const y = y0 + Math.sin((x / w) * TAU * (1 + r() * 0.02) + i) * amp;
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    } else if (cfg.motif === 'orbit') {
      // Training: many circling one centre.
      const cx = w * 0.5; const cy = h * 0.5;
      for (let i = 0; i < 11; i += 1) {
        ctx.strokeStyle = `rgba(255,154,61,${0.07 + r() * 0.16})`;
        ctx.lineWidth = unit * 0.0018;
        ctx.beginPath();
        ctx.ellipse(cx, cy, unit * (0.1 + i * 0.06), unit * (0.05 + i * 0.032), r() * 0.5, 0, TAU);
        ctx.stroke();
      }
      for (let i = 0; i < 60; i += 1) {
        const a = r() * TAU;
        const rr = unit * (0.1 + r() * 0.62);
        ctx.fillStyle = r() > 0.5 ? IN.amber : IN.crimson;
        ctx.globalAlpha = 0.3 + r() * 0.6;
        ctx.beginPath();
        ctx.arc(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * 0.55, unit * (0.002 + r() * 0.007), 0, TAU);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    } else {
      // Event: stage beams converging.
      for (let i = 0; i < 12; i += 1) {
        const x = w * (0.1 + r() * 0.8);
        const spread = w * (0.03 + r() * 0.1);
        const g = ctx.createLinearGradient(x, 0, x, h);
        g.addColorStop(0, `rgba(255,154,61,${0.1 + r() * 0.2})`);
        g.addColorStop(1, 'rgba(225,16,58,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + spread, h);
        ctx.lineTo(x - spread * 1.6, h);
        ctx.closePath();
        ctx.fill();
      }
    }
    ctx.restore();

    petalStorm(ctx, w, h, r, {
      count: 70, cx: 0.5, cy: 0.5, spread: 0.62, maxSize: 0.055,
    });
    sparks(ctx, w, h, r, 420, 0.45);

    // Bottom scrim: these sit behind card captions.
    const scrim = ctx.createLinearGradient(0, h * 0.45, 0, h);
    scrim.addColorStop(0, 'rgba(6,3,5,0)');
    scrim.addColorStop(1, 'rgba(6,3,5,0.72)');
    ctx.fillStyle = scrim;
    ctx.fillRect(0, 0, w, h);
    grain(ctx, w, h, r, 9);
  };
}

if (IN_BROWSER) window.__BS_SCENES = scenes;
