/**
 * Renders the artwork in tools/art/scenes.js to real image files.
 *
 * The scenes are canvas drawings, so a browser is the renderer: headless
 * Chromium draws each one at full output size and hands back PNG/JPEG bytes.
 * No network, no image service — re-running this reproduces the same files.
 *
 *     node tools/art/render.mjs
 */
import { chromium } from 'playwright';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(HERE, '../../public/media');
mkdirSync(OUT, { recursive: true });

/** name → [width, height, format, quality] */
const TARGETS = [
  ['hero-backdrop', 2560, 1440, 'jpeg', 86],
  // WebP, not PNG: the plate needs alpha, and WebP carries it at roughly
  // a tenth the bytes. It is displayed at most ~330 CSS px wide.
  ['character-plate', 1000, 1130, 'webp', 80],
  ['og-card', 1200, 630, 'jpeg', 90],
  ['case-rebrand', 1600, 900, 'jpeg', 84],
  ['case-campaign', 1600, 900, 'jpeg', 84],
  ['case-training', 1600, 900, 'jpeg', 84],
  ['case-event', 1600, 900, 'jpeg', 84],
];

const sceneSrc = readFileSync(resolve(HERE, 'scenes.js'), 'utf8')
  .replace(/^export /gm, '')
  .replace(/^import .*$/gm, '');

const browser = await chromium.launch({
  channel: 'chromium',
  executablePath: '/opt/pw-browsers/chromium',
});
const page = await browser.newPage({ viewport: { width: 600, height: 400 } });
await page.setContent('<canvas id="c"></canvas>');
await page.addScriptTag({ content: sceneSrc });

for (const [name, w, h, format, quality] of TARGETS) {
  const dataUrl = await page.evaluate(
    ({ name, w, h, format, quality }) => {
      const c = document.getElementById('c');
      c.width = w;
      c.height = h;
      const ctx = c.getContext('2d');
      // eslint-disable-next-line no-undef
      scenes[name](ctx, w, h);
      if (format === 'png') return c.toDataURL('image/png');
      return c.toDataURL(`image/${format}`, quality / 100);
    },
    { name, w, h, format, quality },
  );

  const ext = { png: 'png', webp: 'webp', jpeg: 'jpg' }[format];
  const buf = Buffer.from(dataUrl.split(',')[1], 'base64');
  const file = resolve(OUT, `${name}.${ext}`);
  writeFileSync(file, buf);
  console.log(
    `${name}.${ext}`.padEnd(26),
    `${w}x${h}`.padEnd(11),
    `${(buf.length / 1024).toFixed(0)} KB`,
  );
}

await browser.close();
