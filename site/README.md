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
| 0.16 – 0.34 | Push-in: cards sweep past the lens, the plate scales into the face and dissolves into the clip. |
| 0.34 – 0.42 | The clip's opening close-up, held. Clip 2 at 0.3–1.8s. |
| 0.42 – 0.70 | Pull-back: the camera eases out and the stars spread. Clip 2 at 1.8–4.4s. |
| 0.68 – 0.70 | The plate fades up on the clip's figure — while the camera is still moving. |
| 0.70 – 0.74 | The clip's background dissolves away underneath it. |
| 0.72 – 0.94 | The plate carries the same camera move on, down to its resting size. |
| 0.81 – 0.95 | The embers are drawn into the plates and the three orbits condense out of them. |
| 0.94 – 1.00 | Logo ring at rest, interactive. |

### One character, not two

There is one figure on this page and it is one image. `media/hero/character-plate.webp`
is not an illustration of the figure in the clip — it is a cut-out **of** that
figure, lifted from clip 2 at t = 5.40s of the 1920×1080 master (`u2net_human_seg`,
alpha-matted, largest blob only, 210px of transparent margin all round).

`PLATE_TRACK` in `hero-ring.js` is where that cut-out's rectangle sits inside
the clip's own frame at a given clip time, fitted by maximising silhouette IoU
between the cut-out and the clip's figure. Only the tail of the pull-back is
listed, because that is both the only stretch where the two are on screen
together and the only stretch where a rigid cut-out fits well — 0.96 at 4.2s
and 4.4s, 0.88 by 3.8s, and it falls apart altogether in the close-up. The
script runs the same `object-fit: cover` maths the browser runs on the
`<video>`, so at any viewport the plate sits exactly on top of the clip's
figure.

That is what makes the swap invisible, and the order is why:

1. **swap** (0.68 – 0.70) — the plate comes up to full opacity *over* the clip,
   tracking its framing frame by frame, so this happens while the camera is
   still moving and the figure never stops. A straight cross-dissolve would not
   do either: two half-opaque copies of the same picture composite to 75%, and
   the figure would visibly thin out mid-cut.
2. **clipOut** (0.70 – 0.74) — only then does the clip go, and it takes only the
   background with it.
3. **recede** (0.72 – 0.94) — overlaps the tail of clipOut on purpose. By the
   time the plate has drifted far enough off the clip's frozen figure to show a
   ghost, the clip is down to a quarter opacity and falling.

Get that order wrong and a second, smaller figure appears to materialise in
front of the first one. That was the bug.

### The camera does not stop and start

The recede leaves the lock at exactly the speed the clip's dolly was
travelling. `CLIP_DOLLY_RATE` is that speed — 0.2104 of the figure's size per
second of clip time, read off the same fit — and the recede uses a cubic
Hermite whose initial slope is solved to match it, then coasts to a stop:

```
relative shrink per unit of scroll
  pull-back, into the change-over   -2.08
  recede, out of the change-over    -2.06   ← was -11.6
  peak, mid-recede                  -5.68
  arrival                            0
```

Before this the recede used a plain `easeOutCubic`, which starts at three times
its average speed. The camera crept back, stopped, then lurched. Matching that
first derivative is the whole difference between one camera move and two bolted
together.

**Why the clip stops at 4.4s.** Past about 4.6s it starts assembling its own
logo ring, which would sit behind ours.

Three supporting details:

* The plate is drawn **above** the vignette and the clip is now drawn above it
  too (`z-index` 1 / 2 / 3 / 4 for ambient clip, vignette, scrub clip, stage).
  Grading one and not the other made the figure jump in brightness at the cut.
* The plate's crimson glow and drop shadow are divided by the plate's current
  scale every frame, because CSS filters run in the element's own space. Left
  alone the glow would blow up to 2.4× through the hand-over. The 210px margin
  in the image exists for the same reason: `mask-image` clips to the element
  box, so a tight crop squared the glow off into a visible rectangle.
* Cursor lean and idle bob are scaled to zero while the plate is locked to the
  clip. 14px of parallax is 14px of mismatch.

The push-in at the other end is a dissolve rather than a match cut, and
deliberately so: a flat plate cannot hold up against an extreme face close-up,
the foreshortening is nowhere near the same (the same IoU fit only reaches 0.80
there). The plate blurs through the change-over instead, which is what a camera
moving that fast would do anyway.

### The ember field

950 embers, and every one of them carries a depth. Depth drives size,
brightness, how fast it crosses the frame and how far off the ring's horizon it
sits, so the field reads as a volume in perspective rather than a flat band of
identical specks.

Anything above a pixel or so is drawn by blitting one of four pre-rendered
radial-gradient sprites. The soft halo is most of what makes the clip's field
look dense, painting it per particle with `shadowBlur` would be ruinous, and
`drawImage` of a small cached canvas costs less than an arc fill — so the field
got softer and cheaper at once. Below that size no halo is visible anyway and
the ember is a `fillRect`.

Each ember also belongs to one of the plates. As a plate resolves, the embers
assigned to it are drawn into it along an `easeInCubic` path — they hang, then
dart the last stretch — and go out as they land, trailing a short comet tail
capped at 17px. That cap matters: uncapped, the tail is proportional to how far
the ember still has to travel, which draws a dash right across the frame. About
a fifth of the embers keep no plate at all and stay as ambient drift under the
finished ring.

The field also swells by up to 44% across 0.66 – 0.94. The clip's own field is
denser than anything worth drawing on a canvas every frame, so when it goes,
ours has to cover the difference instead of the frame visibly thinning out.

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
