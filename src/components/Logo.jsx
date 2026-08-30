import { site } from '../content/site';

/**
 * The Blüten Sturm mark: a bloom of petals caught inside a storm spiral.
 * Pure SVG so it stays crisp at 28px in the nav and 130px in the about block.
 */
export default function Logo({ size = 40, withWordmark = true, id = 'nav' }) {
  const bloom = `bs-bloom-${id}`;
  const storm = `bs-storm-${id}`;
  return (
    <span className="logo" style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true" style={{ flex: 'none', filter: 'drop-shadow(0 0 16px rgba(225,16,58,.55))' }}>
        <defs>
          <linearGradient id={bloom} x1="10" y1="8" x2="38" y2="40">
            <stop offset="0%" stopColor="#FF9A3D" />
            <stop offset="55%" stopColor="#FF5A1F" />
            <stop offset="100%" stopColor="#E1103A" />
          </linearGradient>
          <linearGradient id={storm} x1="4" y1="42" x2="44" y2="6">
            <stop offset="0%" stopColor="#E1103A" />
            <stop offset="100%" stopColor="#FF9A6B" />
          </linearGradient>
        </defs>
        <path
          d="M41 12C34 3.5 15.5 4.5 9.5 15 3.5 25.5 10 39.5 22 41.5c9 1.5 16.5-3 18-10.5"
          stroke={`url(#${storm})`}
          strokeWidth="2.6"
          strokeLinecap="round"
          opacity="0.9"
        />
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <ellipse
            key={deg}
            cx="24"
            cy="15.4"
            rx="4.3"
            ry="7.6"
            fill={`url(#${bloom})`}
            opacity={deg % 120 === 0 ? 0.95 : 0.62}
            transform={`rotate(${deg} 24 24)`}
          />
        ))}
        <circle cx="24" cy="24" r="2.6" fill="#060305" />
      </svg>
      {withWordmark && (
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 14,
            letterSpacing: '0.34em',
            textTransform: 'uppercase',
            color: 'var(--chalk)',
            whiteSpace: 'nowrap',
          }}
        >
          {site.name}
        </span>
      )}
    </span>
  );
}
