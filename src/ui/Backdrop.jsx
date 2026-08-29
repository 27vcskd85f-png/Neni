import { assets } from '../content/site';
import { useAssetAvailable } from '../lib/useEnvironment';

/**
 * The layer behind everything: brand gradient, a faint grain, and — in the
 * reduced-motion / no-WebGL path — the static hero still standing in for the
 * whole 3D scene.
 */
export default function Backdrop({ still }) {
  const hasPoster = useAssetAvailable(assets.heroPoster);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 bg-night" />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(70% 55% at 22% 18%, rgba(110,91,255,0.20) 0%, rgba(18,20,28,0) 62%),' +
            'radial-gradient(60% 50% at 82% 74%, rgba(255,122,89,0.16) 0%, rgba(18,20,28,0) 58%)',
        }}
      />

      {/* Static hero art for the no-motion path. Prefers the exported still;
          falls back to a drawn brand mark so the reduced-motion page still
          has a composition instead of an empty half. */}
      {still &&
        (hasPoster ? (
          <img
            src={assets.heroPoster}
            alt=""
            className="absolute left-1/2 top-1/2 h-[78vh] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain opacity-45"
          />
        ) : (
          <StillMark />
        ))}

      {/* Grain, to stop the large flat gradients from banding. */}
      <div
        className="absolute inset-0 opacity-[0.055] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-night to-transparent" />
    </div>
  );
}

/**
 * The drawn stand-in for the hero still: the brand mark at poster scale, its
 * storm spiral echoed three times so the reduced-motion page keeps a
 * composition instead of an empty half.
 */
function StillMark() {
  const spiral =
    'M33.5 9.5C27 3.5 14 4 8.5 12.5 3.5 20.5 8 31 17 33.5c7 2 13-1.5 14.5-7';

  return (
    <svg
      viewBox="0 0 40 40"
      className="absolute right-[-4%] top-1/2 h-[72vh] max-w-none -translate-y-1/2 opacity-[0.16]"
      fill="none"
    >
      <defs>
        <linearGradient id="still-bloom" x1="8" y1="8" x2="33" y2="33">
          <stop offset="0%" stopColor="#FF7A59" />
          <stop offset="100%" stopColor="#FFC15E" />
        </linearGradient>
        <linearGradient id="still-storm" x1="4" y1="34" x2="36" y2="6">
          <stop offset="0%" stopColor="#6E5BFF" />
          <stop offset="100%" stopColor="#9B8BFF" />
        </linearGradient>
      </defs>

      {[0, 28, 56, 84].map((deg, i) => (
        <path
          key={deg}
          d={spiral}
          stroke="url(#still-storm)"
          strokeWidth={0.55 - i * 0.09}
          strokeLinecap="round"
          transform={`rotate(${deg} 20 20) scale(${1 + i * 0.06}) translate(${
            -1.2 * i
          } ${-1.2 * i})`}
        />
      ))}

      <g fill="url(#still-bloom)">
        <ellipse cx="20" cy="14" rx="4.1" ry="6.4" />
        <ellipse cx="25.3" cy="23" rx="4.1" ry="6.4" transform="rotate(60 25.3 23)" />
        <ellipse cx="14.7" cy="23" rx="4.1" ry="6.4" transform="rotate(-60 14.7 23)" />
      </g>
      <circle cx="20" cy="20.5" r="2.1" fill="#12141C" />
    </svg>
  );
}
