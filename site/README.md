# Blüten Sturm — website export

The site as previously exported, with the homepage hero replaced by the
interactive service/brand ring. Everything else — nav, About, Services, Work,
Portfolio, Academy, Contact, forms, and the five-language switcher — is
untouched.

Entry point: **`Bluten Sturm v2.dc.html`** (what `netlify.toml` serves at `/`).

## Run it locally

```
python3 -m http.server 4200
# http://127.0.0.1:4200/Bluten%20Sturm%20v2.dc.html
```

Two query overrides help while reviewing:

| URL suffix | Effect |
| --- | --- |
| `?motion=full` | Force the ring sequence on any machine |
| `?motion=reduced` | Force the static fallback |

## What the hero does

A 340vh scroll runway with the scene pinned. A ring of 18 service cards sits
around the character; scrolling scatters them into ember particles, and client
brand logos settle into the same ring. Clicking any card opens a detail panel.

| Progress | Phase |
| --- | --- |
| 0.00 – 0.26 | Services ring at rest. Cards clickable, ring leans toward the cursor. |
| 0.26 – 0.52 | Scatter: cards fly outward, blur and fade. Particles ramp up. |
| 0.44 – 0.74 | Settle: brand logos arrive from outside the ring, staggered. |
| 0.74 – 1.00 | Brand ring at rest, heading at full opacity. |

## Files added by this version

| File | |
| --- | --- |
| `hero-ring.js` | The whole hero: geometry, animation loops, particles, detail panel, static fallback. Plain JS, no build step. |
| `hero-ring.css` | All hero styling, scoped under `.bs-hero`. |
| `media/hero/` | Two backdrop clips (WebM + MP4), the character cutout, posters. |

## What changed in `Bluten Sturm v2.dc.html`

Only four things:

1. The `#top` section was replaced with the hero markup.
2. `hero-ring.css` and `hero-ring.js` were added to `<helmet>`.
3. One `window.BSHeroRing.mount(root)` call was added to `componentDidMount`.
4. The nav logo got a `bs-navmark` class, which gives it a slow breathing pulse.

The old hero's script hooks (`[data-hero-video]`, `[data-marquee]`,
`[data-hero-inner]`) are all null-guarded in the existing component, so removing
those elements is safe. `Bluten Sturm.dc.html` and `Bluten Sturm v2 copy.dc.html`
are the previous versions, left exactly as they were.

## Fill these in

**Brand logos.** Open `hero-ring.js` and find the `BRANDS` array near the top:

```js
var BRANDS = [
  { name: 'Zott',   logo: './media/brands/zott.svg' },
  { name: 'Woerle', logo: './media/brands/woerle.svg' },
];
```

Drop the files into `media/brands/` and add one entry per brand. Any length
works. While the array is empty, 18 neutral placeholder plates render so the
sequence stays reviewable.

**Detail-panel copy in DE/FR/ES/IT.** All 18 card labels, the hero copy and the
panel chrome are translated. The 18 taglines, descriptions and bullet lists are
not — they fall back to English, so a German visitor currently sees a German
frame around English body copy.

That was left deliberately: it is long-form marketing copy and should be written
by whoever wrote the rest of `i18n.js`, not machine-drafted. There is a marked
block at the end of the dictionary in `i18n.js` explaining exactly where the rows
go. Add rows keyed by the exact English string from `hero-ring.js` and the panels
pick them up with no code change.

## Notes on the media

Both backdrop clips were originally HEVC/H.265, which Chrome and Firefox will not
decode in a `<video>` element. They ship as VP9/WebM with H.264/MP4 fallback at
1280×720, with a keyframe every 6 frames so scroll-seeking stays cheap
(23 MB → 2.9 MB and 27 MB → 3.3 MB).

The character is a real alpha cutout taken from frame 132 of the second clip,
which is why ring cards pass genuinely behind the figure rather than faking it.

Video sources are held in `data-src` and only attached once the device is known
to be getting the ring, so phones and reduced-motion visitors download neither
clip.

The three logo PNGs in `assets/` were re-encoded from up to 3072px down to 800px
(12.9 MB → 1.8 MB). They render between 34px and 130px, so this is visually
identical; the untouched originals are in the previous export if you need them.
