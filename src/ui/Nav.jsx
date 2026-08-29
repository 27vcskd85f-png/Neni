import { useEffect, useState } from 'react';
import { chapters } from '../content/chapters';
import { site } from '../content/site';
import { useScroll } from '../scroll/ScrollProvider';
import Logo from './Logo';

/**
 * Transparent over the hero, solid once you scroll past it.
 * Links are generated from the manifest, so the nav re-orders itself.
 */
export default function Nav() {
  const { active, scrollTo } = useScroll();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = chapters.filter((c) => c.nav && c.id !== 'cta');

  const go = (id) => (event) => {
    event.preventDefault();
    setOpen(false);
    scrollTo(id);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        solid
          ? 'border-b border-white/10 bg-night/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8"
      >
        <a href="#hero" onClick={go('hero')} aria-label={`${site.name} — home`}>
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((c) => (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                onClick={go(c.id)}
                aria-current={chapters[active]?.id === c.id ? 'true' : undefined}
                className={`rounded-full px-4 py-2 font-display text-[0.82rem] font-medium tracking-wide transition-colors duration-300 ${
                  chapters[active]?.id === c.id
                    ? 'text-amber'
                    : 'text-chalk/60 hover:text-chalk'
                }`}
              >
                {c.nav}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#cta"
            onClick={go('cta')}
            className="hidden rounded-full bg-bloom px-5 py-2.5 font-display text-[0.82rem] font-semibold text-night shadow-bloom transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex"
          >
            Start a project
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-chalk lg:hidden"
          >
            <span aria-hidden="true" className="text-lg leading-none">
              {open ? '✕' : '☰'}
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <ul
          id="mobile-nav"
          className="border-t border-white/10 bg-night/95 px-5 pb-6 pt-2 backdrop-blur-xl lg:hidden"
        >
          {[...links, chapters.find((c) => c.id === 'cta')]
            .filter(Boolean)
            .map((c) => (
              <li key={c.id}>
                <a
                  href={`#${c.id}`}
                  onClick={go(c.id)}
                  className="block border-b border-white/5 py-3 font-display text-base text-chalk/80"
                >
                  {c.nav}
                </a>
              </li>
            ))}
        </ul>
      )}
    </header>
  );
}
