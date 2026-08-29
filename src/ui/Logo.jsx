/**
 * Blüten Sturm mark: a three-petal blossom caught in a storm spiral.
 * Pure SVG so it stays crisp at any size and needs no asset fetch.
 */
export default function Logo({ className = '', showWordmark = true }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width="30"
        height="30"
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="bs-bloom" x1="6" y1="6" x2="34" y2="34">
            <stop offset="0%" stopColor="#FF7A59" />
            <stop offset="100%" stopColor="#FFC15E" />
          </linearGradient>
          <linearGradient id="bs-storm" x1="4" y1="34" x2="36" y2="6">
            <stop offset="0%" stopColor="#6E5BFF" />
            <stop offset="100%" stopColor="#9B8BFF" />
          </linearGradient>
        </defs>
        {/* Storm spiral */}
        <path
          d="M33.5 9.5C27 3.5 14 4 8.5 12.5 3.5 20.5 8 31 17 33.5c7 2 13-1.5 14.5-7"
          stroke="url(#bs-storm)"
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />
        {/* Three petals */}
        <g fill="url(#bs-bloom)">
          <ellipse cx="20" cy="14" rx="4.1" ry="6.4" />
          <ellipse cx="25.3" cy="23" rx="4.1" ry="6.4" transform="rotate(60 25.3 23)" />
          <ellipse cx="14.7" cy="23" rx="4.1" ry="6.4" transform="rotate(-60 14.7 23)" />
        </g>
        <circle cx="20" cy="20.5" r="2.1" fill="#12141C" />
      </svg>
      {showWordmark && (
        <span className="font-display text-[1.05rem] font-semibold tracking-tight text-chalk">
          Blüten<span className="text-coral"> Sturm</span>
        </span>
      )}
    </span>
  );
}
