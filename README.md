# Blüten Sturm — bluetensturm.com

A scroll-driven 3D one-page site for the Blüten Sturm marketing and creative
agency. React + Vite, React Three Fiber for the 3D layer, GSAP ScrollTrigger
for the scroll-linked camera, Tailwind for the 2D chrome.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # → dist/
npm run preview
```

## How it is put together

The whole site is generated from one ordered array:

```
src/content/chapters.js     ← the single source of truth
```

Each entry declares its anchor id, copy, service panels, 3D layout, camera
keyframe and accent. The DOM sections, the navigation, the chapter rail, the
scroll timeline and the 3D scene all read from it.

**To re-order the story, move an entry. To add a chapter, insert one.** Nothing
in `src/scroll` or `src/three` needs to change, because every animation is
derived from an entry's *index*, never from a hard-coded chapter:

- `CameraRig` builds a Catmull-Rom spline through the chapters' `camera`
  keyframes. A Catmull-Rom parameter maps uniformly across its control points,
  so scroll progress `t` lands exactly on chapter *i* at `t = i/(n-1)`.
- `chapterSignal(progress, index, count)` turns global progress into a
  per-chapter *focus* value that drives every entrance and exit.
- Chapter-specific set pieces (film ribbon, wireframe build, mentor figure) are
  looked up by chapter **id**, so they follow their chapter wherever it moves and
  simply stop rendering if it is removed.

### Layout directory

```
src/
  content/     chapters.js (the manifest), site.js (brand constants)
  scroll/      ScrollProvider — the one ScrollTrigger on the page
  three/       Canvas host, camera rig, character, particles, set pieces
    panels/    layout functions, canvas-drawn panel faces
  ui/          nav, chapter sections, CTA, backdrop, transition burst
  lib/         capability detection, media-query and asset-probe hooks
```

The 3D and 2D layers only ever meet through `chapters.js` and the scroll
context, so either can be reworked without touching the other.

## The character

`src/three/Character.jsx` has two interchangeable implementations behind one
component:

- **`character.glb`**, when present in `public/assets` — auto-fitted to the rig
  (normalised to 1.8 world units tall, centred on X/Z, sat on the ground plane),
  so the exporter's scale and origin do not matter.
- **A procedural rig**, built from primitives, used whenever the GLB is absent.

Swapping the character is therefore just dropping a new `.glb` in. Particle
emission points live in `EMITTERS` in the same file — adjust those if the new
mesh wears its shoulders somewhere else.

## Assets

Everything in `public/assets` is optional; see
[`public/assets/README.md`](public/assets/README.md). The site probes for each
file at runtime and falls back to the procedural scene for anything missing, so
the repo builds and runs with that folder empty.

```bash
bash scripts/fetch-assets.sh
```

## Rendering tiers

`detectTier()` in `src/lib/useEnvironment.js` classifies each visitor once:

| Tier | When | What renders |
|---|---|---|
| `high` | Desktop GPU | Full particle counts, antialiasing, DPR up to 1.75 |
| `low` | Touch, narrow, ≤4 cores or ≤4 GB, mobile GPU | Reduced particles, DPR capped at 1.25, no 3D panels below 900 px |
| `none` | `prefers-reduced-motion`, no WebGL, software renderer | No canvas at all — static hero art, plain fades, service chips at every breakpoint |

Anything that cannot be confirmed capable is treated as `low` rather than
risking a 15 fps hero. Append `?render=high`, `?render=low` or `?render=none`
to force a tier when checking a change.

The `<Canvas>` is lazy-imported and mounted two frames after first paint, and
three.js, R3F and GSAP are split into their own chunks, so the copy is on screen
before the 3D runtime is parsed.

## Accessibility

Every chapter is a real `<section>` with a real heading and a real list of
services — the canvas is `aria-hidden` decoration on top. The page is fully
readable, indexable and keyboard-navigable with WebGL switched off. There is a
skip link, a visible focus ring, and reduced motion is honoured at the CSS level
as well as by tier detection.

## Deploying

`npm run build` emits a fully static `dist/`. No server-side runtime is
required anywhere.

**STRATO** — upload the **contents** of `dist/` to the document root.
`vite.config.js` sets `base: '/'`; change it if you serve from a subfolder.

**Netlify, drag and drop** —

```bash
bash scripts/pack-netlify.sh      # → bluetensturm-netlify.zip
```

Drop the zip on <https://app.netlify.com/drop>. `index.html` sits at the zip
root, which is what Netlify Drop expects, and a `_headers` file travels with it
carrying the caching and security headers (Drop ignores build settings, so they
cannot come from `netlify.toml`).

**Netlify, connected to Git** — `netlify.toml` at the repo root already declares
the build command, publish directory, Node version and the same headers. Point
Netlify at the repo and it needs no further configuration.

Fingerprinted files in `/assets` are cached immutably for a year; `index.html`
is always revalidated, so a deploy cannot leave browsers asking for hashed
assets that no longer exist.

The contact form has no backend by design: submitting composes a pre-filled mail
to `info@bluetensturm.com` in the visitor's own client. To move to a real
endpoint later, replace the body of `onSubmit` in `src/ui/CtaSection.jsx` with a
`fetch()`; nothing else changes.
