import * as THREE from 'three';

/**
 * Panel faces are drawn to a 2D canvas rather than composed from 3D text.
 *
 * Reasons: crisp type at any distance, no webfont fetch inside the WebGL
 * layer, full control of the frosted-glass look, and one cheap texture per
 * panel instead of a few hundred glyph meshes.
 */

const ACCENTS = {
  coral: ['#FF7A59', '#FFC15E'],
  amber: ['#FFC15E', '#FF7A59'],
  storm: ['#6E5BFF', '#9B8BFF'],
};

const cache = new Map();

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/**
 * @param {object} panel  { label, meta, value } from the chapter manifest
 * @param {string} accent 'coral' | 'amber' | 'storm'
 * @param {string} variant 'card' | 'metric' | 'frame' — frame is the film-strip cell
 */
export function panelTexture(panel, accent = 'coral', variant = 'card') {
  const key = `${panel.label}|${panel.meta}|${panel.value ?? ''}|${accent}|${variant}`;
  if (cache.has(key)) return cache.get(key);

  const W = 512;
  const H = 320;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  const [c1, c2] = ACCENTS[accent] ?? ACCENTS.coral;

  const pad = 18;
  const bw = W - pad * 2;
  const bh = H - pad * 2;

  // Frosted glass body.
  const body = ctx.createLinearGradient(pad, pad, W - pad, H - pad);
  body.addColorStop(0, 'rgba(245,243,240,0.14)');
  body.addColorStop(1, 'rgba(245,243,240,0.06)');
  roundRect(ctx, pad, pad, bw, bh, 26);
  ctx.fillStyle = body;
  ctx.fill();

  // Hairline border that picks up the chapter accent along the top edge.
  const border = ctx.createLinearGradient(pad, pad, W - pad, pad);
  border.addColorStop(0, c1);
  border.addColorStop(0.55, 'rgba(237,237,242,0.30)');
  border.addColorStop(1, 'rgba(237,237,242,0.10)');
  ctx.strokeStyle = border;
  ctx.lineWidth = 2;
  roundRect(ctx, pad, pad, bw, bh, 26);
  ctx.stroke();

  // Accent bar, top-left.
  const bar = ctx.createLinearGradient(pad + 30, 0, pad + 110, 0);
  bar.addColorStop(0, c1);
  bar.addColorStop(1, c2);
  ctx.fillStyle = bar;
  roundRect(ctx, pad + 30, pad + 34, 74, 5, 3);
  ctx.fill();

  ctx.textBaseline = 'top';

  if (variant === 'metric' && panel.value) {
    ctx.fillStyle = 'rgba(237,237,242,0.55)';
    ctx.font = '500 21px Inter, system-ui, sans-serif';
    ctx.fillText(panel.meta.toUpperCase(), pad + 30, pad + 62);

    const num = ctx.createLinearGradient(pad + 30, 0, pad + 300, 0);
    num.addColorStop(0, c1);
    num.addColorStop(1, c2);
    ctx.fillStyle = num;
    ctx.font = '700 74px "Space Grotesk", system-ui, sans-serif';
    ctx.fillText(panel.value, pad + 30, pad + 96);

    ctx.fillStyle = '#EDEDF2';
    ctx.font = '600 27px "Space Grotesk", system-ui, sans-serif';
    ctx.fillText(panel.label, pad + 30, pad + 196);
  } else {
    ctx.fillStyle = 'rgba(237,237,242,0.5)';
    ctx.font = '500 20px Inter, system-ui, sans-serif';
    ctx.fillText((panel.meta ?? '').toUpperCase(), pad + 30, pad + 62);

    ctx.fillStyle = '#EDEDF2';
    ctx.font = '600 38px "Space Grotesk", system-ui, sans-serif';
    wrap(ctx, panel.label, pad + 30, pad + 108, bw - 60, 46);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  cache.set(key, tex);
  return tex;
}

function wrap(ctx, text, x, y, maxWidth, lineHeight) {
  const words = String(text).split(' ');
  let line = '';
  let cursor = y;
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, cursor);
      line = word;
      cursor += lineHeight;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, x, cursor);
}

export function disposePanelTextures() {
  cache.forEach((t) => t.dispose());
  cache.clear();
}
