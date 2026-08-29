/**
 * ORDERED CHAPTER MANIFEST — the single source of truth for the whole site.
 *
 * The 2D sections, the nav, the scroll timeline and the 3D scene are all
 * derived from this array. To re-order the story, move an entry; to add a
 * chapter, insert one. Nothing in src/scroll or src/three needs to change,
 * because progress is computed from an entry's index, never hard-coded.
 *
 * Fields
 *   id       anchor id + DOM section id (must be unique)
 *   side     which side of the viewport the DOM copy sits on
 *   align    'center' (default) or 'bottom' — vertical anchor for the copy
 *   nav      short label for the navigation; omit to hide from the nav
 *   eyebrow  small kicker above the heading
 *   title    section <h2> (the hero uses <h1>)
 *   lede     one supporting paragraph
 *   panels   service cards — rendered as 3D panels and as DOM list items
 *   layout   3D arrangement key, resolved in src/three/panels/layouts.js
 *   camera   keyframe on the dolly spline: eye position + look-at target
 *   accent   'coral' | 'storm' | 'amber' — drives lighting and UI accents
 */
export const chapters = [
  {
    id: 'hero',
    side: 'center',
    align: 'bottom',
    nav: 'Start',
    eyebrow: 'Blüten Sturm',
    title: 'A storm of ideas. A bloom of results.',
    lede:
      'We are a marketing and creative agency built around one idea: strategy without craft is theory, and craft without strategy is decoration. We do both, under one roof.',
    panels: [],
    layout: 'idle',
    camera: { position: [0, 1.18, 4.75], target: [0, 1.12, 0], fov: 42 },
    accent: 'coral',
  },
  {
    id: 'strategy',
    side: 'left',
    nav: 'Strategy',
    eyebrow: 'Chapter 01',
    title: 'Direction before decoration.',
    lede:
      'Before a single asset is designed, we define what the brand stands for, who it is for, and how it earns its place in the market.',
    panels: [
      { label: 'Brand Strategy', meta: 'Positioning & identity' },
      { label: 'Marketing Strategy', meta: 'Channels & funnels' },
      { label: 'Business Development', meta: 'Growth pathways' },
      { label: 'Consulting', meta: 'Sparring & audits' },
    ],
    layout: 'arc',
    camera: { position: [1.7, 1.55, 4.05], target: [0.25, 1.3, 0], fov: 40 },
    accent: 'storm',
  },
  {
    id: 'creative',
    side: 'right',
    nav: 'Creative',
    eyebrow: 'Chapter 02',
    title: 'Made to be remembered.',
    lede:
      'Concept, production and post under one roof — so the idea that survives the pitch is the idea that reaches the audience.',
    panels: [
      { label: 'Creative Services', meta: 'Concept & art direction' },
      { label: 'Content Production', meta: 'Photo, copy, design' },
      { label: 'Video & Multimedia', meta: 'Film & motion' },
      { label: 'Employer Branding', meta: 'Talent storytelling' },
    ],
    layout: 'filmstrip',
    camera: { position: [-1.95, 1.25, 3.7], target: [-0.2, 1.15, 0], fov: 44 },
    accent: 'coral',
  },
  {
    id: 'digital-growth',
    side: 'left',
    nav: 'Growth',
    eyebrow: 'Chapter 03',
    title: 'Reach you can read in numbers.',
    lede:
      'Paid, owned and earned working as one system, measured against the metrics that actually move the business.',
    panels: [
      { label: 'Digital Marketing', meta: 'ROAS', value: '4.8×' },
      { label: 'Social Media', meta: 'Engagement', value: '+126%' },
      { label: 'Analytics', meta: 'Attribution', value: '98.2%' },
      { label: 'Advertising', meta: 'CPA', value: '−34%' },
      { label: 'Public Relations', meta: 'Reach', value: '12.4M' },
    ],
    layout: 'ring',
    camera: { position: [0.4, 2.0, 4.85], target: [0.5, 1.95, 0], fov: 48 },
    accent: 'storm',
  },
  {
    id: 'web-experience',
    side: 'left',
    nav: 'Web',
    eyebrow: 'Chapter 04',
    title: 'Built, not just designed.',
    lede:
      'Sites and products that load fast, rank well and feel deliberate on every device — with AI woven in where it earns its keep.',
    panels: [
      { label: 'Website & Digital Experience', meta: 'Design & build' },
      { label: 'AI & Innovation', meta: 'Applied automation' },
    ],
    layout: 'build',
    camera: { position: [1.15, 1.48, 4.6], target: [0.85, 1.22, 0], fov: 44 },
    accent: 'amber',
  },
  {
    id: 'experiential',
    side: 'left',
    nav: 'Live',
    eyebrow: 'Chapter 05',
    title: 'Where the brand meets the room.',
    lede:
      'The moment a customer can touch the brand is the moment it becomes real. We plan, staff and run it end to end.',
    panels: [
      { label: 'In-Store Promotions', meta: 'Retail activation' },
      { label: 'Event Marketing', meta: 'Trade fairs & launches' },
    ],
    layout: 'scatter',
    camera: { position: [0.4, 1.78, 7.0], target: [0.35, 1.05, 0], fov: 46 },
    accent: 'coral',
  },
  {
    id: 'training',
    side: 'right',
    nav: 'Training',
    eyebrow: 'Chapter 06',
    title: 'We hand the craft over.',
    lede:
      'The best campaign we run is the one your team can run without us. We train marketers, leaders and whole organisations.',
    panels: [
      { label: 'Corporate Training', meta: 'Team enablement' },
      { label: 'Leadership Development', meta: 'Coaching & sparring' },
      { label: 'Organisational Development', meta: 'Culture & process' },
    ],
    layout: 'mentor',
    camera: { position: [-0.35, 1.42, 5.05], target: [0.2, 1.08, 0], fov: 44 },
    accent: 'amber',
  },
  {
    id: 'cta',
    side: 'center',
    nav: 'Contact',
    eyebrow: 'Let’s begin',
    title: 'Let’s elevate your brand.',
    lede:
      'Tell us what you are working on. We will come back with a point of view, not a price list.',
    panels: [],
    layout: 'converge',
    camera: { position: [0, 1.62, 6.6], target: [0, 1.55, 0], fov: 42 },
    accent: 'storm',
  },
];

/** Fast id → index lookup used by the nav and the scroll controller. */
export const chapterIndex = Object.fromEntries(chapters.map((c, i) => [c.id, i]));

/** How much scroll height (in viewport heights) each chapter occupies. */
export const CHAPTER_VH = 1.35;
