# Blüten Sturm — website export

The site as previously exported, with the homepage hero replaced by the
interactive service/brand ring. Everything else — nav, About, Services, Work,
Portfolio, Academy, Contact, forms, and the five-language switcher — is
untouched.

Entry point: **`Bluten Sturm v2.dc.html`** (what `netlify.toml` serves at `/`).

## Run it locally

**Use a server that supports HTTP byte ranges.** The hero scrubs a video by
setting `currentTime`, and a browser can only seek when the server answers
`Range` requests. Netlify does. Python's `http.server` does **not** — under it
the clip loads, reports `seekable: [0, 0]`, and every seek is silently ignored,
so the middle of the sequence just sits on the first frame.

```
npx serve .          # or any static server with range support
```

Then open `Bluten Sturm v2.dc.html`.

Two query overrides help while reviewing:

| URL suffix | Effect |
| --- | --- |
| `?motion=full` | Force the ring sequence on any machine |
| `?motion=reduced` | Force the static fallback |

## What the hero does

A 340vh scroll runway with the scene pinned. A wide, shallow ring of 18 glass
service panels sits around the character; scrolling scatters them into ember
particles, and 44 client logos settle in across **three orbits** — a lower band of 20, a
middle band of 20, and a crown of 4 slightly larger plates on top. Clicking any
panel opens a detail sheet with two package prices.

### The camera move

The hero is one continuous camera move, scrubbed by scroll and cut to match the
two source clips.

| Progress | What happens |
| --- | --- |
| 0.00 – 0.16 | Services ring at rest. Cards clickable, ring draggable. |
| 0.16 – 0.34 | Push-in: cards sweep past the lens, the character plate scales into the face. |
| 0.34 – 0.42 | The clip's opening close-up, held. Clip 2 at 0.3–1.8s. |
| 0.42 – 0.68 | Pull-back: the camera eases out and the stars spread. Clip 2 at 1.8–4.0s. |
| 0.68 – 0.78 | The clip dissolves out through the star field. One character on screen, no plates yet. |
| 0.78 – 0.94 | The plates condense out of the stars into the three orbits. |
| 0.94 – 1.00 | Logo ring at rest, interactive. |

**Why the clip stops at 4.0s.** By then the stars have fully spread but the
clip's own logo ring has not begun to form. Running it further put a second,
different ring on screen behind ours, and a second character at a different
scale — which is exactly what it looked like. The clip now hands over at the
star field, and the live plates condense out of those stars instead.

The character plate carries the push-in — its `transform-origin` sits on the head,
so scaling drives into the face rather than the chest — then cross-fades into the
clip, which is graded with the same 24° hue rotation so the two read as one
figure. The plate fades back in at the far end once the clip has gone, and the
live 3-orbit ring takes over from there.

Clip 2 therefore plays **sharp and full-bleed** through the middle act, not as a
blurred backdrop, and is encoded for that job: **1600×900, CRF 20**, with a
keyframe every 8 frames so seeking lands cheaply.

Clip 1 is the opposite case — it only ever renders under a 30px blur and has
faded out by 20% of the runway, and it is never scrubbed. It ships at 854×480
because nothing above that is visible through the blur, which is what pays for
clip 2's resolution.

**Both rings can be dragged** with a mouse or a finger, and thrown — they coast
and settle. The stage uses `touch-action: pan-y`, so a horizontal drag spins the
ring while a vertical swipe still scrolls the page. A drag that ends on top of a
card does not open it.

Drag is tracked with window-level pointer listeners rather than
`setPointerCapture`. Capturing on the stage retargets the click that follows
away from the card that was pressed, which silently stopped cards opening.

| Progress | Phase |
| --- | --- |
| 0.00 – 0.26 | Services ring at rest. Cards clickable, ring leans toward the cursor. |
| 0.26 – 0.52 | Scatter: cards fly outward, blur and fade. Particles ramp up. |
| 0.44 – 0.74 | Settle: brand logos arrive from outside the ring, staggered. |
| 0.74 – 1.00 | Brand ring at rest, heading at full opacity. |

## Interactive sections

| Section | |
| --- | --- |
| **02 Services** | The five discipline cards, then every one of the 18 services as a touchable box grouped under its discipline. Each opens a detail sheet with a Compact and a Premium package. |
| **04 Selected work** | Four case cards now carry real artwork (`media/cases/`). Imagery is abstract and brand-built, and the section says so — swap in real case photography when you have it. |
| **05 Portfolio** | The six things we make, as icon boxes. Each opens an explanation of what that work involves and what we could build — no prices, this section is about capability. |
| **06 Corporate academy** | All four tracks and all three modules are touchable, each with an explanation, what it includes, and two package prices. |

Everything opens the same panel component, so there is one interaction and one
design to maintain.

## About the prices

Indicative **net** figures for the Bavarian / DACH mid-market, benchmarked
against published 2026 rates: agency hours 80–180 €, Mittelstand retainers
1.500–5.000 €/month, social media 1.000–2.500 €/month for SME work and
2.500–4.500 € for full service, corporate websites 8.000–25.000 €, and inhouse
training days 2.000–5.000 € for the group.

They are a **starting ladder, not a rate card** — read them against your own
cost base and margins before this goes live. All of them live in one place:
the `PACKAGES` map at the top of `hero-ring.js`. The "from" price on each
service box in section 02 is in the page markup and should be kept in step with
the Compact tier.

## Files added by this version

| File | |
| --- | --- |
| `hero-ring.js` | The whole hero: geometry, animation loops, particles, detail panel, static fallback. Plain JS, no build step. |
| `hero-ring.css` | All hero styling, scoped under `.bs-hero`. |
| `media/hero/` | Two backdrop clips (WebM + MP4), the character cutout, posters. |
| `media/cases/` | Four case visuals for section 04. |

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

**Detail-panel copy in DE/FR/ES/IT.** All card labels, section headings, hero and
case copy, and the panel chrome (including `Compact`, `Premium`, `Packages` and
the price disclaimer) are translated. The per-panel prose — 25 taglines,
25 descriptions, their bullet lists and the 50 package descriptions — is not,
and falls back to English, so a German visitor currently sees a German frame
around English body copy.

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
