import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { chapters } from '../content/chapters';

gsap.registerPlugin(ScrollTrigger);

const ScrollContext = createContext(null);

/**
 * Owns the one and only ScrollTrigger on the page.
 *
 * The scroll position is published two ways on purpose:
 *   • `progress` is a ref, read inside useFrame — the 3D layer follows scroll
 *     without React re-rendering 60 times a second.
 *   • `active` / `burst` are state, for the handful of 2D things that really
 *     do need a render (nav highlight, transition flash).
 *
 * Nothing here knows what a chapter contains; it only knows how many there
 * are, so re-ordering src/content/chapters.js is a no-op for this file.
 */
export function ScrollProvider({ children }) {
  const count = chapters.length;
  const progress = useRef(0);
  const velocity = useRef(0);
  const [active, setActive] = useState(0);
  const [burst, setBurst] = useState({ index: 0, at: 0 });
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: 0,
      end: 'max',
      scrub: true,
      onUpdate: (self) => {
        progress.current = self.progress;
        velocity.current = self.getVelocity();

        // Snap to the nearest chapter rest point for the 2D chrome.
        const next = Math.min(
          count - 1,
          Math.max(0, Math.round(self.progress * (count - 1))),
        );
        setActive((prev) => {
          if (prev === next) return prev;
          // Chapter changed — fire the transition burst for the 3D layer.
          setBurst({ index: next, at: performance.now() });
          return next;
        });
      },
    });

    setReady(true);
    // Fonts and images settling can change page height under the trigger.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    document.fonts?.ready.then(refresh).catch(() => {});

    return () => {
      window.removeEventListener('load', refresh);
      trigger.kill();
    };
  }, [count]);

  /** Scrolls to a chapter by id — used by the nav and the CTA button. */
  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
      block: 'start',
    });
  }, []);

  const value = useMemo(
    () => ({ progress, velocity, active, burst, ready, scrollTo, count }),
    [active, burst, ready, scrollTo, count],
  );

  return <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>;
}

export function useScroll() {
  const ctx = useContext(ScrollContext);
  if (!ctx) throw new Error('useScroll must be used inside <ScrollProvider>');
  return ctx;
}

/**
 * Converts global scroll progress into a per-chapter signal.
 *
 *   focus  1 when this chapter is centred, falling to 0 at its neighbours
 *   signed −1 before the chapter, 0 at rest, +1 after — for drift direction
 *
 * Both are plain maths on the index, which is why re-ordering chapters needs
 * no changes anywhere in the animation code.
 */
export function chapterSignal(globalProgress, index, count) {
  const rest = count > 1 ? index / (count - 1) : 0;
  const span = count > 1 ? 1 / (count - 1) : 1;
  const signed = (globalProgress - rest) / span;
  const focus = Math.max(0, 1 - Math.abs(signed));
  return { focus, signed };
}
