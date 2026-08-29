import { chapters, CHAPTER_VH } from '../content/chapters';
import { useScroll } from '../scroll/ScrollProvider';

const SIDE = {
  left: 'mr-auto items-start text-left',
  right: 'ml-auto items-start text-left',
  center: 'mx-auto items-center text-center',
};

/**
 * Scrim geometry per side — keeps copy legible over the bright canvas
 * without blacking out the character it is sitting on top of.
 */
const SCRIM = {
  left: '-left-[12%] -right-[6%] bg-[radial-gradient(75%_65%_at_28%_50%,rgba(18,20,28,0.94)_0%,rgba(18,20,28,0.74)_46%,rgba(18,20,28,0)_100%)]',
  right:
    '-left-[6%] -right-[12%] bg-[radial-gradient(75%_65%_at_72%_50%,rgba(18,20,28,0.94)_0%,rgba(18,20,28,0.74)_46%,rgba(18,20,28,0)_100%)]',
  center:
    '-left-[14%] -right-[14%] bg-[radial-gradient(72%_62%_at_50%_50%,rgba(18,20,28,0.82)_0%,rgba(18,20,28,0.5)_52%,rgba(18,20,28,0)_100%)]',
};

/** Vertical anchor of the pinned copy block within its chapter. */
const ALIGN = {
  center: 'items-center',
  bottom: 'items-end pb-[9vh]',
};

const ACCENT_DOT = {
  coral: 'bg-coral',
  amber: 'bg-amber',
  storm: 'bg-storm',
};

/**
 * The DOM half of a chapter.
 *
 * Every chapter is a real <section> with a real heading and a real list of
 * services — the 3D layer is decoration on top, so the page is fully
 * readable, indexable and navigable with the canvas switched off entirely.
 *
 * The copy block is sticky inside the section so it stays put while the
 * camera travels, then hands over to the next chapter.
 */
export default function ChapterSection({ chapter, index, showPanelList }) {
  const { active } = useScroll();
  const isActive = active === index;
  const Heading = index === 0 ? 'h1' : 'h2';

  return (
    <section
      id={chapter.id}
      aria-labelledby={`${chapter.id}-title`}
      style={{ minHeight: `${CHAPTER_VH * 100}vh` }}
      className="relative z-20"
    >
      {/* The copy pins for the length of the chapter while the camera travels,
          then releases as the next section pushes it up. */}
      <div
        className={`sticky top-0 flex h-screen ${
          ALIGN[chapter.align] ?? ALIGN.center
        }`}
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div
            className={`relative flex max-w-xl flex-col gap-5 ${
              SIDE[chapter.side] ?? SIDE.left
            }`}
          >
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute -bottom-[18%] -top-[18%] -z-10 ${
                SCRIM[chapter.side] ?? SCRIM.left
              }`}
            />
            <p className="eyebrow flex items-center gap-2.5">
              <span
                className={`inline-block h-1.5 w-1.5 rounded-full ${
                  ACCENT_DOT[chapter.accent] ?? 'bg-coral'
                } transition-opacity duration-500 ${
                  isActive ? 'opacity-100' : 'opacity-40'
                }`}
              />
              {chapter.eyebrow}
            </p>

            <Heading
              id={`${chapter.id}-title`}
              className="font-display text-[clamp(2rem,5.2vw,3.6rem)] font-semibold leading-[1.06] tracking-tight"
            >
              {chapter.title}
            </Heading>

            <p className="max-w-lg text-[1.02rem] leading-relaxed text-chalk/70">
              {chapter.lede}
            </p>

            {chapter.panels.length > 0 && (
              <ul
                className={`mt-2 flex flex-wrap gap-2 ${
                  chapter.side === 'center' ? 'justify-center' : ''
                } ${showPanelList ? '' : 'lg:sr-only'}`}
              >
                {chapter.panels.map((panel) => (
                  <li key={panel.label}>
                    <span className="glass flex items-baseline gap-2 rounded-full px-4 py-2">
                      <span className="font-display text-[0.84rem] font-medium text-chalk/90">
                        {panel.label}
                      </span>
                      {panel.value ? (
                        <span className="font-display text-[0.84rem] font-semibold text-amber">
                          {panel.value}
                        </span>
                      ) : (
                        <span className="text-[0.74rem] text-chalk/45">
                          {panel.meta}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Progress rail: one tick per chapter, filled up to the active one. */
export function ChapterRail() {
  const { active, scrollTo } = useScroll();

  return (
    <nav
      aria-label="Chapters"
      className="fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 md:flex"
    >
      {chapters.map((chapter, i) => (
        <button
          key={chapter.id}
          type="button"
          onClick={() => scrollTo(chapter.id)}
          aria-label={`Go to ${chapter.nav ?? chapter.title}`}
          aria-current={i === active ? 'true' : undefined}
          className="group flex items-center justify-end gap-2"
        >
          <span className="pointer-events-none font-display text-[0.7rem] uppercase tracking-widest text-chalk/0 transition-colors duration-300 group-hover:text-chalk/60">
            {chapter.nav}
          </span>
          <span
            className={`block h-[2px] rounded-full transition-all duration-500 ${
              i === active
                ? 'w-7 bg-bloom'
                : i < active
                  ? 'w-4 bg-chalk/35'
                  : 'w-4 bg-chalk/15'
            }`}
          />
        </button>
      ))}
    </nav>
  );
}
