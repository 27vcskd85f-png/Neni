import { useEffect, useRef, useState } from 'react';
import { useScroll } from '../scroll/ScrollProvider';
import { assets } from '../content/site';
import { useAssetAvailable } from '../lib/useEnvironment';

const DURATION = 850;

/**
 * The chapter-transition beat.
 *
 * Plays the generated panel-burst clip over the canvas for well under a
 * second when the chapter changes. Without the clip it degrades to a coral /
 * violet bloom — the same rhythm, none of the bytes.
 */
export default function TransitionBurst() {
  const { burst } = useScroll();
  const hasClip = useAssetAvailable(assets.panelBurst);
  const video = useRef(null);
  const [firing, setFiring] = useState(false);

  useEffect(() => {
    if (!burst.at) return undefined; // initial state, not a real transition
    setFiring(true);
    if (video.current) {
      video.current.currentTime = 0;
      video.current.play().catch(() => {});
    }
    const timer = setTimeout(() => setFiring(false), DURATION);
    return () => clearTimeout(timer);
  }, [burst.at]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-20 transition-opacity duration-500 ${
        firing ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {hasClip ? (
        <video
          ref={video}
          src={assets.panelBurst}
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover opacity-45 mix-blend-screen"
        />
      ) : (
        <div
          className="h-full w-full"
          style={{
            background:
              'radial-gradient(58% 42% at 50% 46%, rgba(255,122,89,0.16) 0%, rgba(110,91,255,0.10) 42%, rgba(18,20,28,0) 72%)',
          }}
        />
      )}
    </div>
  );
}
