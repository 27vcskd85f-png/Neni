/**
 * Line icons for the hero service ring, one per discipline.
 * Single stroke weight, 24×24 grid, no fills — they read at 20px on a card.
 */
const P = {
  compass: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5z" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.4" /></>,
  spark: <><path d="M12 3v6M12 15v6M3 12h6M15 12h6" /><path d="m6.5 6.5 3 3M14.5 14.5l3 3M17.5 6.5l-3 3M9.5 14.5l-3 3" /></>,
  bars: <><path d="M3 20h18" /><rect x="5" y="12" width="3.2" height="6" rx="1" /><rect x="10.4" y="8" width="3.2" height="10" rx="1" /><rect x="15.8" y="4" width="3.2" height="14" rx="1" /></>,
  chat: <><path d="M20 14a3 3 0 0 1-3 3H9l-4 3v-3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3z" /><path d="M8 9h7M8 12.5h4.5" /></>,
  camera: <><path d="M3 8.5A2.5 2.5 0 0 1 5.5 6h1.7l1.2-2h7.2l1.2 2h1.7A2.5 2.5 0 0 1 21 8.5v8A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5z" /><circle cx="12" cy="12.5" r="3.6" /></>,
  screen: <><rect x="3" y="4" width="18" height="12.5" rx="2" /><path d="M8.5 20h7M12 16.5V20" /><path d="M3 13.5h18" /></>,
  megaphone: <><path d="M4 10v4a1.5 1.5 0 0 0 1.5 1.5H7l1 4h2l-1-4h1l7 4V6l-7 4H5.5A1.5 1.5 0 0 0 4 11.5z" /><path d="M19.5 9.5a3.5 3.5 0 0 1 0 5" /></>,
  signal: <><circle cx="12" cy="12" r="2.4" /><path d="M8.2 8.2a5.4 5.4 0 0 0 0 7.6M15.8 15.8a5.4 5.4 0 0 0 0-7.6" /><path d="M5.4 5.4a9.4 9.4 0 0 0 0 13.2M18.6 18.6a9.4 9.4 0 0 0 0-13.2" /></>,
  handshake: <><path d="m8 12-3 3 3.5 3.5 2-2" /><path d="m16 12 3 3-3.5 3.5-2-2" /><path d="M8 12 5 9l4-4 3 2 3-2 4 4-3 3" /><path d="m10.5 16.5 1.5 1.5 1.5-1.5" /></>,
  ticket: <><path d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4z" /><path d="M13 6v2M13 11v2M13 16v2" /></>,
  play: <><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m10.5 9.5 4.5 2.5-4.5 2.5z" /></>,
  pulse: <path d="M3 12h3.5l2-6 3.5 12 2.5-7 1.5 3H21" />,
  star: <path d="M12 3.5 13.9 9l5.6 1.9-5.6 1.9L12 18.5 10.1 12.8 4.5 10.9 10.1 9z" />,
  people: <><circle cx="9" cy="8.5" r="3.2" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0" /><path d="M16 5.6a3.2 3.2 0 0 1 0 5.9M17.5 14.2A5.5 5.5 0 0 1 20.5 19" /></>,
  badge: <><circle cx="12" cy="9.5" r="5.5" /><path d="m8.5 14-1.5 6 5-2.5 5 2.5-1.5-6" /></>,
  cycle: <><path d="M4 12a8 8 0 0 1 13.7-5.6L20 8" /><path d="M20 4v4h-4" /><path d="M20 12a8 8 0 0 1-13.7 5.6L4 16" /><path d="M4 20v-4h4" /></>,
  cap: <><path d="m12 4 9 4.5-9 4.5-9-4.5z" /><path d="M7 11v4.5c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5V11" /><path d="M21 8.5V14" /></>,
};

export default function Icon({ name, size = 22, className }) {
  const shape = P[name];
  if (!shape) return null;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {shape}
    </svg>
  );
}

/** Instagram glyph, used in the footer and contact block. */
export function InstagramIcon({ size = 17 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}
