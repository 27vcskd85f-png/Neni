import { useEffect, useMemo, useRef, useState } from 'react';
import Icon from './Icons';
import { services, hero } from '../content/site';

/**
 * The hero: eighteen service cards orbiting the bloom.
 *
 * The ring is a real ellipse computed per card, not a hand-placed layout, so
 * adding a service to src/content/site.js re-spaces the whole ring. Cards on
 * the far half of the ellipse sit behind the bloom (lower z-index, dimmed and
 * scaled down); cards on the near half come forward. That single depth value
 * drives z-index, scale, opacity and blur together, which is what sells it as
 * an orbit rather than a circle of divs.
 *
 * Everything is real, focusable DOM: each card is a button that scrolls to the
 * matching service, so the ring is navigable by keyboard and readable by a
 * screen reader.
 */
export default function Hero() {
  const stageRef = useRef(null);
  const [spin, setSpin] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const on = (e) => setReduced(e.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  // The ring turns on its own; hovering or focusing it holds still so a
  // visitor can actually read and click a card.
  useEffect(() => {
    if (reduced || paused) return undefined;
    let raf = 0;
    let last = performance.now();
    const tick = (now) => {
      const dt = Math.min(now - last, 64);
      last = now;
      setSpin((s) => (s + dt * 0.000042) % 1);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, paused]);

  const placed = useMemo(() => {
    const n = services.length;
    return services.map((s, i) => {
      const a = ((i / n) + spin) * Math.PI * 2;
      // depth: 0 at the back of the ellipse, 1 at the front.
      const depth = (Math.cos(a) + 1) / 2;
      return {
        ...s,
        // Percentages so the ring scales with the stage rather than the window.
        x: 50 + Math.sin(a) * 43,
        y: 50 - Math.cos(a) * 36,
        depth,
        scale: 0.72 + depth * 0.38,
        opacity: 0.3 + depth * 0.7,
        blur: (1 - depth) * 2.4,
        z: Math.round(depth * 900),
      };
    });
  }, [spin]);

  return (
    <section id="top" className="hero">
      <img className="hero__backdrop" src="/media/hero-backdrop.jpg" alt="" aria-hidden="true" />
      <div className="hero__vignette" aria-hidden="true" />

      <div
        ref={stageRef}
        className="hero__stage"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <img
          className="hero__bloom"
          src="/media/character-plate.webp"
          alt=""
          aria-hidden="true"
          draggable="false"
        />

        <ul className="hero__ring">
          {placed.map((s) => (
            <li
              key={s.id}
              className="hero__slot"
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                zIndex: s.z,
                transform: `translate(-50%, -50%) scale(${s.scale.toFixed(3)})`,
                opacity: s.opacity.toFixed(3),
                filter: s.blur > 0.15 ? `blur(${s.blur.toFixed(2)}px)` : 'none',
              }}
            >
              <a
                className={`hero__card ${s.featured ? 'is-featured' : ''}`}
                href="#services"
              >
                <span className="hero__card-glow" aria-hidden="true" />
                <Icon name={s.icon} size={20} className="hero__card-icon" />
                <span className="hero__card-label">{s.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="hero__copy shell">
        <div className="hero__scrim" aria-hidden="true" />
        <p className="hero__eyebrow">{hero.eyebrow}</p>
        <h1 className="h1 hero__title">
          {hero.title[0]}
          <br />
          {hero.title[1]}
          <em className="gradient">{hero.title[2]}</em>
          {hero.title[3]}
        </h1>
        <p className="hero__sub">{hero.sub}</p>
        <div className="hero__actions">
          <a className="btn btn--bloom" href="#contact">Start a project</a>
          <a className="btn btn--ghost" href="#services">What we do</a>
        </div>
      </div>

      <div className="hero__hint" aria-hidden="true">
        <span>Scroll</span>
        <span className="hero__hint-rail"><i /></span>
      </div>
    </section>
  );
}
