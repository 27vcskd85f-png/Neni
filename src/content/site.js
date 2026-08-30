/**
 * Every piece of copy and structured content on bluetensturm.com.
 *
 * Text lives here rather than inside components so wording can be changed
 * without touching layout, and so the same service list feeds the hero ring,
 * the services grid and the enquiry form's dropdown.
 */

export const site = {
  name: 'Blüten Sturm',
  legalName: 'Blüten Sturm GmbH',
  domain: 'bluetensturm.com',
  email: 'info@bluetensturm.com',
  city: 'Würzburg, Deutschland',
  instagram: {
    handle: '@bluetensturmcreative',
    url: 'https://www.instagram.com/bluetensturmcreative',
  },
  markets: 'Würzburg · Berlin · Zürich · Wien · Milano',
  tagline: 'Where brands bloom and ideas storm.',
  /**
   * Formspree endpoint from the supplied design. Swap the id to point the
   * forms at a different inbox; both forms fall back to a pre-filled mailto
   * if the service cannot be reached.
   */
  formEndpoint: 'https://formspree.io/f/mvkpynzr',
};

/** Hero ring — every discipline, in the order they orbit the bloom. */
export const services = [
  { id: 'brand-strategy', label: 'Brand Strategy', icon: 'compass', featured: false },
  { id: 'marketing-strategy', label: 'Marketing Strategy', icon: 'target', featured: false },
  { id: 'creative-services', label: 'Creative Services', icon: 'spark', featured: false },
  { id: 'digital-marketing', label: 'Digital Marketing', icon: 'bars', featured: true },
  { id: 'social-media-management', label: 'Social Media Management', icon: 'chat', featured: true },
  { id: 'content-production', label: 'Content Production', icon: 'camera', featured: true },
  { id: 'website-digital-experience', label: 'Website & Digital Experience', icon: 'screen', featured: true },
  { id: 'advertising', label: 'Advertising', icon: 'megaphone', featured: false },
  { id: 'pr', label: 'PR', icon: 'signal', featured: false },
  { id: 'business-development-support', label: 'Business Development Support', icon: 'handshake', featured: false },
  { id: 'event-marketing-promotions', label: 'Event Marketing & Promotions', icon: 'ticket', featured: false },
  { id: 'video-multimedia', label: 'Video & Multimedia', icon: 'play', featured: false },
  { id: 'analytics', label: 'Analytics', icon: 'pulse', featured: false },
  { id: 'ai-innovation', label: 'AI & Innovation', icon: 'star', featured: false },
  { id: 'consulting', label: 'Consulting', icon: 'people', featured: false },
  { id: 'employer-branding', label: 'Employer Branding', icon: 'badge', featured: false },
  { id: 'ongoing-client-services', label: 'Ongoing Client Services', icon: 'cycle', featured: false },
  { id: 'corporate-training', label: 'Corporate Training & Organizational Development', icon: 'cap', featured: false },
];

export const hero = {
  eyebrow: site.markets,
  title: ['Where brands bloom', 'and ideas ', 'storm', '.'],
  sub:
    'Marketing, creative and corporate training from Würzburg — built with the rigour of consultants and the nerve of artists.',
};

export const heroCta = {
  eyebrow: 'Blüten Sturm',
  title: ['Ready to bloom?', 'Let’s make some noise.'],
  body:
    'Whether it’s a single campaign or a full rebrand, this is where it starts — a short conversation about what you’re trying to move.',
};

export const about = {
  eyebrow: '01 — The agency',
  title: ['Franconian roots.', 'European reach.'],
  lead:
    'Blüten Sturm was founded in Würzburg — a city of vineyards, baroque stone and stubborn craft. We kept the craft and added velocity. Today we work with Mittelstand leaders, challenger brands and institutions who need marketing that moves markets and teams able to carry it.',
  body:
    'One team, three disciplines: creative that gets remembered, strategy that gets signed off, and training that makes it stick inside the organisation.',
  stats: [
    { value: 120, suffix: '+', label: 'Projects shipped' },
    { value: 9, suffix: '', label: 'Markets' },
    { value: 2400, suffix: '+', label: 'Leaders trained' },
    { value: 94, suffix: '%', label: 'Client retention' },
  ],
};

export const disciplines = {
  eyebrow: '02 — Services',
  title: ['Five disciplines,', 'one operating system.'],
  aside:
    'Engage one. Or let us run the whole stack — from positioning workshop to performance dashboard.',
  items: [
    {
      n: '01',
      title: 'Brand strategy & positioning',
      body:
        'Market and category analysis, brand architecture, naming, verbal and visual identity systems. We find the sharp edge, then build everything around it.',
      tags: ['Positioning', 'Identity systems', 'Naming'],
      wide: true,
    },
    {
      n: '02',
      title: 'Digital marketing',
      body:
        'Performance media, SEO, CRM and marketing automation — measured against pipeline, not impressions.',
    },
    {
      n: '03',
      title: 'Content & social',
      body:
        'Editorial systems, film, photography and always-on social built for German and EU-wide audiences.',
    },
    {
      n: '04',
      title: 'Events & experience',
      body:
        'Launches, trade fairs and internal summits — concept, production and on-site direction.',
    },
    {
      n: '05',
      title: 'Corporate training',
      body:
        'Leadership development, communication and sales enablement — certified, bilingual, in-house or off-site.',
      accent: true,
    },
  ],
};

export const why = {
  eyebrow: '03 — Why Blüten Sturm',
  title: 'Agencies pitch ideas. We are accountable for outcomes.',
  items: [
    {
      title: 'Consultant rigour',
      body: 'Every creative route is tied to a commercial thesis you can defend to a board.',
    },
    {
      title: 'Bilingual by default',
      body: 'German and English craft copy, DACH nuance, EU-wide rollout without translation drift.',
    },
    {
      title: 'Senior-only teams',
      body: 'The people in the pitch are the people on the work. No handover to juniors.',
    },
    {
      title: 'We train the handover',
      body: 'Campaigns end. Capability stays — your team leaves able to run it themselves.',
    },
  ],
};

/**
 * Selected work.
 *
 * The imagery is commissioned artwork per discipline, not photography of
 * client deliverables. `pending: true` marks a card whose case detail is
 * still to be supplied — the card says so plainly rather than carrying
 * invented metrics.
 */
export const work = {
  eyebrow: '04 — Selected work',
  title: 'Recent storms.',
  link: { label: 'Request full portfolio', href: '#contact' },
  items: [
    {
      image: '/media/case-rebrand.jpg',
      kicker: 'Rebrand · Mittelstand',
      title: 'Manufacturer, repositioned for Europe',
      body: 'Case detail to follow — ask us for the full write-up and the numbers behind it.',
      pending: true,
      tall: true,
    },
    {
      image: '/media/case-campaign.jpg',
      kicker: 'Campaign · DACH',
      title: 'Launch campaign across three markets',
      body: 'Case detail to follow — ask us for the full write-up and the numbers behind it.',
      pending: true,
      tall: true,
    },
    {
      image: '/media/case-training.jpg',
      kicker: 'Training · Leadership',
      title: 'Leadership programme, 400 managers',
      body: 'Case detail to follow — ask us for the full write-up and the numbers behind it.',
      pending: true,
    },
    {
      image: '/media/case-event.jpg',
      kicker: 'Experience · Event',
      title: 'Flagship summit, Würzburg',
      body: 'Case detail to follow — ask us for the full write-up and the numbers behind it.',
      pending: true,
    },
  ],
};

export const training = {
  eyebrow: '05 — Corporate academy',
  title: 'Training that outlives the campaign.',
  body:
    'The Blüten Sturm Academy runs modular programmes for leadership, communication, sales and marketing teams — delivered in German or English, in Würzburg, on your site, or hybrid across Europe.',
  tags: [
    'Leadership development',
    'Executive communication',
    'Sales enablement',
    'Change & culture',
  ],
  cta: { label: 'Request the curriculum', href: '#contact' },
  modules: [
    {
      n: 'Modul I',
      title: 'Führung unter Druck',
      body: 'Two days · decision-making, delegation and conflict for new and scaling leaders.',
    },
    {
      n: 'Modul II',
      title: 'Story & Stage',
      body: 'One day · narrative structure, pitch craft and presence on camera and in the room.',
    },
    {
      n: 'Modul III',
      title: 'Marketing für Nicht-Marketer',
      body: 'Half day · positioning, channels and budgets for founders and department heads.',
    },
  ],
};

export const contact = {
  eyebrow: '06 — Contact',
  title: 'Let’s make weather.',
  body:
    'Tell us what you’re building. We answer every serious enquiry within two working days.',
};

/** Shared option lists — the two forms must offer the same vocabulary. */
export const options = {
  service: [
    'Brand strategy',
    'Digital marketing',
    'Content & social',
    'Events & experience',
    'Corporate training',
  ],
  companySize: ['1–10 employees', '11–50 employees', '51–250 employees', '250+ employees'],
  budget: ['Under €10k', '€10k–€30k', '€30k–€75k', '€75k+', 'Not sure yet'],
  timeline: ['As soon as possible', 'Within 1–3 months', 'This year', 'Just exploring'],
  source: [
    'Google search',
    'Google Ads',
    'Instagram',
    'LinkedIn',
    'Referral / word of mouth',
    'Event or trade fair',
    'Other',
  ],
  inHouse: [
    'No — we need full support',
    'One or two people',
    'A full team, needing extra capacity',
    'A full team, needing strategy only',
  ],
  replyLanguage: ['Deutsch', 'English', 'Français', 'Español', 'Italiano'],
  questionnaireService: [
    'Brand strategy & positioning',
    'Digital marketing',
    'Content & social',
    'Events & experience',
    'Corporate training & leadership',
    'A combination — let’s discuss',
  ],
};
