import { useEffect, useState } from 'react';
import Logo from './Logo';

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#training', label: 'Training' },
];

/**
 * Transparent over the hero, solid once you are past it.
 * `simple` is the sub-page variant: mark on the left, a way back on the right.
 */
export default function Nav({ simple = false }) {
  const [solid, setSolid] = useState(simple);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (simple) return undefined;
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [simple]);

  return (
    <header className={`nav ${solid ? 'is-solid' : ''}`}>
      <div className="nav__bar">
        <a href={simple ? '/' : '#top'} aria-label={`${'Blüten Sturm'} — home`}>
          <Logo size={simple ? 38 : 42} />
        </a>

        {simple ? (
          <a className="nav__back" href="/">← Back to site</a>
        ) : (
          <>
            <nav className="nav__links" aria-label="Primary">
              {LINKS.map((l) => (
                <a key={l.href} href={l.href}>{l.label}</a>
              ))}
            </nav>
            <div className="nav__actions">
              <a className="nav__cta" href="#contact">Let’s talk</a>
              <button
                type="button"
                className="nav__burger"
                aria-expanded={open}
                aria-controls="nav-mobile"
                aria-label={open ? 'Close menu' : 'Open menu'}
                onClick={() => setOpen((v) => !v)}
              >
                <span aria-hidden="true">{open ? '✕' : '☰'}</span>
              </button>
            </div>
          </>
        )}
      </div>

      {open && !simple && (
        <nav id="nav-mobile" className="nav__mobile" aria-label="Primary, mobile">
          {[...LINKS, { href: '#contact', label: 'Contact' }].map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
        </nav>
      )}
    </header>
  );
}
