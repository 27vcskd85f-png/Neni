// The 18 services that populate the hero ring, in ring order.
// `featured: true` marks the four elevated services (items 4-7) which get a
// larger card in the ring and a richer detail panel in ServiceOverlay.
export const SERVICES = [
  {
    id: 'brand-strategy',
    name: 'Brand Strategy',
    icon: 'compass',
    tagline: 'Positioning that holds up under pressure.',
    description:
      'We define what your brand stands for, who it is for, and why it wins — then write it down so every team can act on it. Positioning, architecture, messaging hierarchy, tone of voice and the guardrails that keep it consistent.',
    deliverables: ['Brand positioning & platform', 'Messaging hierarchy', 'Tone of voice guide', 'Naming & architecture'],
  },
  {
    id: 'marketing-strategy',
    name: 'Marketing Strategy',
    icon: 'target',
    tagline: 'A plan with numbers attached.',
    description:
      'Audience, channel mix, budget allocation and a quarter-by-quarter roadmap. Built from your actual funnel data rather than category best practice, and reviewed against results, not opinions.',
    deliverables: ['Audience & segment mapping', 'Channel & budget plan', 'Campaign roadmap', 'KPI framework'],
  },
  {
    id: 'creative-services',
    name: 'Creative Services',
    icon: 'sparkle',
    tagline: 'Ideas that survive contact with a media plan.',
    description:
      'Concepting, art direction, copywriting and design across every format you actually ship — from a hero campaign down to the fifteenth story frame.',
    deliverables: ['Campaign concepting', 'Art direction', 'Copywriting', 'Design systems & templates'],
  },
  {
    id: 'digital-marketing',
    name: 'Digital Marketing',
    icon: 'chart',
    featured: true,
    tagline: 'Performance across every paid and owned channel.',
    description:
      'Full-funnel digital: paid search, paid social, programmatic, email, SEO and CRO — planned together so channels compound instead of competing. We run the media, build the creative, and report on what it returned.',
    deliverables: ['Paid search & paid social', 'Programmatic & display', 'SEO & content strategy', 'Email & lifecycle', 'Conversion rate optimisation'],
  },
  {
    id: 'social-media-management',
    name: 'Social Media Management',
    icon: 'chat',
    featured: true,
    price: '€800–1,300/month',
    priceNote: 'Retainer, scaled to channel count and posting cadence.',
    tagline: 'Always-on presence, run by people who post daily.',
    description:
      'Strategy, content calendar, production, publishing, community management and monthly reporting across your channels. One team owns the whole loop, so what you learn in comments feeds back into next month’s plan.',
    deliverables: ['Channel strategy & calendar', 'Content production', 'Daily publishing & scheduling', 'Community management', 'Monthly performance reporting'],
  },
  {
    id: 'content-production',
    name: 'Content Production',
    icon: 'camera',
    featured: true,
    tagline: 'Studio and on-location production, built for volume.',
    description:
      'Photography, video, motion and copy produced in batches so a single shoot day feeds a full quarter of channels. Full pre-production, crew, post and delivery in every format you need.',
    deliverables: ['Photography & video shoots', 'Motion graphics & animation', 'Editorial & long-form copy', 'Asset libraries & versioning'],
  },
  {
    id: 'website-digital-experience',
    name: 'Website & Digital Experience',
    icon: 'monitor',
    featured: true,
    price: 'From €500',
    priceNote: 'Scope-dependent; landing pages start here, full builds are quoted.',
    tagline: 'Sites that load fast and convert honestly.',
    description:
      'Design and build of marketing sites, landing pages and digital products — accessible, fast, measurable, and handed over in a CMS your team can actually run without us.',
    deliverables: ['UX & information architecture', 'UI design & design system', 'Front-end build & CMS', 'Analytics & tracking setup', 'Performance & accessibility'],
  },
  {
    id: 'advertising',
    name: 'Advertising',
    icon: 'megaphone',
    tagline: 'Above and below the line, planned as one.',
    description:
      'Campaign development and media buying across TV, OOH, radio, print and digital — with the creative built per placement rather than resized into it.',
    deliverables: ['Campaign development', 'Media planning & buying', 'Production across formats', 'Post-campaign analysis'],
  },
  {
    id: 'pr',
    name: 'PR',
    icon: 'broadcast',
    tagline: 'Coverage earned, not bought.',
    description:
      'Media relations, press materials, launches, thought-leadership placement and crisis communications, with the regional press contacts to make them land.',
    deliverables: ['Media relations & outreach', 'Press kits & releases', 'Launch & event PR', 'Crisis communications'],
  },
  {
    id: 'business-development-support',
    name: 'Business Development Support',
    icon: 'handshake',
    tagline: 'Marketing that shows up in the sales pipeline.',
    description:
      'Sales enablement, pitch materials, partner and channel marketing, and lead-generation programmes built with your commercial team rather than handed to them.',
    deliverables: ['Sales enablement materials', 'Pitch & proposal design', 'Partner & channel marketing', 'Lead generation programmes'],
  },
  {
    id: 'event-marketing-promotions',
    name: 'Event Marketing & Promotions',
    icon: 'ticket',
    tagline: 'Turnout, not just a venue.',
    description:
      'Concept, production and promotion of launches, activations, trade fairs and sampling campaigns — including staffing, logistics and the campaign that fills the room.',
    deliverables: ['Event concept & production', 'Activations & sampling', 'Trade fair presence', 'Staffing & logistics'],
  },
  {
    id: 'video-multimedia',
    name: 'Video & Multimedia',
    icon: 'play',
    tagline: 'From a 6-second bumper to a brand film.',
    description:
      'Scripting, direction, shooting, editing, colour, sound and motion — cut natively for each platform instead of letterboxed into it.',
    deliverables: ['Brand films & commercials', 'Social-native video', 'Motion & 3D', 'Post-production & sound'],
  },
  {
    id: 'analytics',
    name: 'Analytics',
    icon: 'pulse',
    tagline: 'Measurement you can defend in a board meeting.',
    description:
      'Tracking implementation, dashboards, attribution modelling and incrementality testing, so budget decisions rest on evidence rather than platform-reported wins.',
    deliverables: ['Tracking & tagging setup', 'Dashboards & reporting', 'Attribution modelling', 'Experimentation & testing'],
  },
  {
    id: 'ai-innovation',
    name: 'AI & Innovation',
    icon: 'spark',
    tagline: 'Applied AI, scoped to real workflows.',
    description:
      'Where AI genuinely shortens a marketing workflow, we build it in: production tooling, personalisation, content operations and internal assistants — with the governance to keep output on-brand.',
    deliverables: ['AI-assisted production pipelines', 'Personalisation systems', 'Content operations tooling', 'Governance & brand safety'],
  },
  {
    id: 'consulting',
    name: 'Consulting',
    icon: 'users',
    tagline: 'Senior help, without the retainer.',
    description:
      'Marketing audits, team and structure reviews, agency selection, and interim marketing leadership for teams in transition.',
    deliverables: ['Marketing & brand audits', 'Team & structure review', 'Agency selection', 'Interim leadership'],
  },
  {
    id: 'employer-branding',
    name: 'Employer Branding',
    icon: 'badge',
    tagline: 'The story that makes people apply.',
    description:
      'Employee value proposition, careers content, recruitment campaigns and internal communications — built with the same rigour as your consumer brand.',
    deliverables: ['EVP development', 'Careers site & content', 'Recruitment campaigns', 'Internal communications'],
  },
  {
    id: 'ongoing-client-services',
    name: 'Ongoing Client Services',
    icon: 'loop',
    tagline: 'A team that already knows your brand.',
    description:
      'Monthly retainers covering planning, production, reporting and day-to-day marketing support, with a named team and an agreed scope you can adjust each quarter.',
    deliverables: ['Dedicated account team', 'Monthly planning & reporting', 'Rolling production capacity', 'Quarterly scope reviews'],
  },
  {
    id: 'corporate-training',
    name: 'Corporate Training & Organizational Development',
    icon: 'grad',
    price: '€2,000–5,000/month',
    priceNote: 'Programme-based; scaled to cohort size and session frequency.',
    tagline: 'Capability that stays after we leave.',
    description:
      'Workshops and structured programmes in marketing, brand, digital and leadership — designed around your team’s actual gaps and measured against what changes in their work.',
    deliverables: ['Marketing & brand training', 'Digital skills programmes', 'Leadership development', 'Workshop facilitation'],
  },
]

export const FEATURED_IDS = SERVICES.filter((s) => s.featured).map((s) => s.id)
