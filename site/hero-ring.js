/* Blüten Sturm — hero ring.
 *
 * Self-contained: no framework, no build step. Loaded from the page <helmet>
 * and mounted by the DC component's componentDidMount.
 *
 *   window.BSHeroRing.mount(root)   // root = the DC component element
 *   window.BSHeroRing.unmount()
 *
 * The 18 service cards are authored in the page markup, not generated here, so
 * the site's own i18n walker translates their labels before this ever runs.
 * Detail-panel prose is held in DATA below and translated on demand.
 */
(function () {
  'use strict';

  // ---------------------------------------------------------------- data
  // Order matches the ring. `featured` marks the four elevated services.
  var DATA = {
    'brand-strategy': {
      icon: 'compass',
      tagline: 'Positioning you can defend to a board.',
      desc: 'Market and category analysis, brand architecture, naming, and verbal and visual identity systems. We find the sharp edge, then build everything around it.',
      items: ['Positioning & brand platform', 'Brand architecture', 'Naming', 'Identity systems']
    },
    'marketing-strategy': {
      icon: 'target',
      tagline: 'A plan with numbers attached.',
      desc: 'Audience, channel mix, budget allocation and a quarter-by-quarter roadmap, built from your funnel data rather than category habit — and reviewed against results.',
      items: ['Audience & segment mapping', 'Channel & budget planning', 'Campaign roadmap', 'KPI framework']
    },
    'creative-services': {
      icon: 'sparkle',
      tagline: 'Ideas that survive contact with a media plan.',
      desc: 'Concepting, art direction, copywriting and design across every format you ship — from a hero campaign down to the fifteenth story frame.',
      items: ['Campaign concepting', 'Art direction', 'German & English craft copy', 'Design systems & templates']
    },
    'digital-marketing': {
      icon: 'chart',
      featured: true,
      tagline: 'Measured against pipeline, not impressions.',
      desc: 'Performance media, SEO, CRM and marketing automation, planned together so channels compound instead of competing. We run the media, build the creative, and report what it returned.',
      items: ['Performance media', 'SEO & content strategy', 'CRM & marketing automation', 'Conversion rate optimisation', 'Reporting & attribution']
    },
    'social-media-management': {
      icon: 'chat',
      featured: true,
      tagline: 'Always-on presence, run by people who post daily.',
      desc: 'Strategy, calendar, production, publishing, community management and monthly reporting. One team owns the whole loop, so what you learn in the comments feeds next month’s plan.',
      items: ['Channel strategy & calendar', 'Content production', 'Publishing & scheduling', 'Community management', 'Monthly reporting']
    },
    'content-production': {
      icon: 'camera',
      featured: true,
      tagline: 'Editorial systems, not one-off assets.',
      desc: 'Film, photography, motion and editorial produced in batches, so a single shoot day feeds a full quarter of channels. Full pre-production, crew, post and delivery.',
      items: ['Film & photography', 'Motion & animation', 'Editorial & long-form', 'Asset libraries & versioning']
    },
    'website-digital-experience': {
      icon: 'monitor',
      featured: true,
      tagline: 'Sites that load fast and convert honestly.',
      desc: 'Design and build of marketing sites, landing pages and digital products — accessible, fast, measurable, and handed over in a CMS your team can run without us.',
      items: ['UX & information architecture', 'UI design & design system', 'Front-end build & CMS', 'Analytics & tracking', 'Performance & accessibility']
    },
    'advertising': {
      icon: 'megaphone',
      tagline: 'Above and below the line, planned as one.',
      desc: 'Campaign development and media buying across TV, OOH, radio, print and digital, with creative built per placement rather than resized into it.',
      items: ['Campaign development', 'Media planning & buying', 'Production across formats', 'Post-campaign analysis']
    },
    'pr': {
      icon: 'broadcast',
      tagline: 'Coverage earned, not bought.',
      desc: 'Media relations, press materials, launches, thought-leadership placement and crisis communications, with the DACH press contacts to make them land.',
      items: ['Media relations', 'Press kits & releases', 'Launch & event PR', 'Crisis communications']
    },
    'business-development-support': {
      icon: 'handshake',
      tagline: 'Marketing that shows up in the pipeline.',
      desc: 'Sales enablement, pitch materials, partner and channel marketing, and lead-generation programmes built with your commercial team rather than handed to them.',
      items: ['Sales enablement', 'Pitch & proposal design', 'Partner & channel marketing', 'Lead generation']
    },
    'event-marketing-promotions': {
      icon: 'ticket',
      tagline: 'Turnout, not just a venue.',
      desc: 'Launches, trade fairs, activations and internal summits — concept, production and on-site direction, plus the campaign that fills the room.',
      items: ['Event concept & production', 'Trade fair presence', 'Activations & sampling', 'Staffing & logistics']
    },
    'video-multimedia': {
      icon: 'play',
      tagline: 'From a six-second bumper to a brand film.',
      desc: 'Scripting, direction, shooting, editing, colour, sound and motion — cut natively for each platform instead of letterboxed into it.',
      items: ['Brand films & commercials', 'Social-native video', 'Motion & 3D', 'Post-production & sound']
    },
    'analytics': {
      icon: 'pulse',
      tagline: 'Evidence, not platform-reported wins.',
      desc: 'Tracking implementation, dashboards, attribution modelling and incrementality testing, so budget decisions rest on something you can defend.',
      items: ['Tracking & tagging', 'Dashboards & reporting', 'Attribution modelling', 'Experimentation']
    },
    'ai-innovation': {
      icon: 'spark',
      tagline: 'Applied AI, scoped to real workflows.',
      desc: 'Where AI genuinely shortens a marketing workflow we build it in: production tooling, personalisation and content operations — with the governance to keep output on-brand.',
      items: ['AI-assisted production', 'Personalisation systems', 'Content operations tooling', 'Governance & brand safety']
    },
    'consulting': {
      icon: 'users',
      tagline: 'Senior help, without the retainer.',
      desc: 'Marketing audits, team and structure reviews, agency selection, and interim marketing leadership for teams in transition. The people in the pitch are the people on the work.',
      items: ['Marketing & brand audits', 'Team & structure review', 'Agency selection', 'Interim leadership']
    },
    'employer-branding': {
      icon: 'badge',
      tagline: 'The story that makes people apply.',
      desc: 'Employee value proposition, careers content, recruitment campaigns and internal communications, built with the same rigour as your consumer brand.',
      items: ['EVP development', 'Careers site & content', 'Recruitment campaigns', 'Internal communications']
    },
    'ongoing-client-services': {
      icon: 'loop',
      tagline: 'A team that already knows your brand.',
      desc: 'Monthly retainers covering planning, production, reporting and day-to-day marketing support, with a named senior team and a scope you adjust each quarter.',
      items: ['Dedicated senior team', 'Monthly planning & reporting', 'Rolling production capacity', 'Quarterly scope reviews']
    },
    'corporate-training': {
      icon: 'grad',
      tagline: 'Capability that outlives the campaign.',
      desc: 'Leadership development, communication and sales enablement — certified, bilingual, in-house or off-site. Your team leaves able to run it themselves.',
      items: ['Leadership development', 'Marketing & brand training', 'Communication & sales enablement', 'Workshop facilitation']
    }
    ,
    'academy-leadership': {
      title: 'Leadership development',
      icon: 'users',
      tagline: 'Führung, die auch unter Druck trägt.',
      desc: 'For newly promoted and scaling leaders. Decision-making under uncertainty, delegation that actually transfers ownership, feedback that changes behaviour, and handling conflict before it becomes attrition. Built around your own cases, not generic role play.',
      items: ['Decision-making under uncertainty', 'Delegation & ownership transfer', 'Feedback and difficult conversations', 'Conflict and escalation handling', 'Individual leadership plan']
    },
    'academy-communication': {
      title: 'Executive communication',
      icon: 'broadcast',
      tagline: 'Presence that survives the room and the camera.',
      desc: 'Narrative structure, pitch craft and executive presence — in the room, on stage and on camera. Participants leave with their own story architecture and a recorded, coached delivery of it.',
      items: ['Narrative structure & story architecture', 'Pitch craft and Q&A defence', 'Stage and on-camera presence', 'Executive writing', 'Recorded delivery with coaching']
    },
    'academy-sales': {
      title: 'Sales enablement',
      icon: 'handshake',
      tagline: 'Enablement your sales team will actually open.',
      desc: 'Discovery, qualification, value framing and negotiation for B2B teams — plus the materials to support them. We build the playbook with the team rather than handing one over.',
      items: ['Discovery & qualification', 'Value framing and business cases', 'Negotiation and objection handling', 'Playbook build', 'Call shadowing & 90-day follow-up']
    },
    'academy-change': {
      title: 'Change & culture',
      icon: 'loop',
      tagline: 'Change people carry rather than survive.',
      desc: 'For restructures, mergers and new operating models. Diagnosis of where the organisation actually is, a communications architecture leaders can run, and the rituals that make the new way stick.',
      items: ['Organisational diagnosis', 'Change narrative & communications architecture', 'Leadership alignment workshops', 'Team rituals and operating rhythm', 'Pulse checks and review']
    },
    'academy-modul-1': {
      title: 'Führung unter Druck',
      icon: 'badge',
      tagline: 'Modul I · Two days.',
      desc: 'Decision-making, delegation and conflict for new and scaling leaders. Two intensive days built on the participants’ own live situations, with a written leadership plan produced on day two.',
      items: ['Two days, inhouse or off-site', 'Up to twelve participants', 'Own cases, not role play', 'Written leadership plan', 'German or English']
    },
    'academy-modul-2': {
      title: 'Story & Stage',
      icon: 'play',
      tagline: 'Modul II · One day.',
      desc: 'Narrative structure, pitch craft and presence on camera and in the room. Every participant is filmed, coached and filmed again, so the improvement is visible before they leave.',
      items: ['One day, inhouse', 'Up to twelve participants', 'Filmed and coached delivery', 'Personal story architecture', 'German or English']
    },
    'academy-modul-3': {
      title: 'Marketing für Nicht-Marketer',
      icon: 'grad',
      tagline: 'Modul III · Half a day.',
      desc: 'Positioning, channels and budgets for founders and department heads who commission marketing without having run it. Enough fluency to brief well and to challenge an agency properly.',
      items: ['Half a day, inhouse or online', 'Up to fifteen participants', 'Positioning and channel basics', 'Budget logic and what to expect', 'How to brief and judge agencies']
    }
    ,
    'portfolio-brand-systems': {
      title: 'Brand systems',
      icon: 'compass',
      tagline: 'From the positioning line to the rollout kit.',
      desc: 'The whole identity, not just a logo: naming, verbal and visual system, motion and sound, and the guidelines that let a distributed team apply it without calling us. We build the system and the tooling around it — templates, asset libraries and a rollout plan per market.',
      items: ['Positioning & naming', 'Visual and verbal identity', 'Motion and sound identity', 'Guidelines & templates', 'Per-market rollout kits']
    },
    'portfolio-campaign-films': {
      title: 'Campaign films',
      icon: 'play',
      tagline: 'One shoot day, a season of cutdowns.',
      desc: 'Brand films, product films and social-native video — scripted, directed, shot, cut, graded and scored. We agree the cutdown matrix before the shoot, so a single day yields every format the media plan actually needs rather than one hero film and a scramble.',
      items: ['Brand and product films', 'TV and pre-roll', 'Social-native verticals', 'Motion and 3D', 'Colour, sound and versioning']
    },
    'portfolio-digital-products': {
      title: 'Digital products',
      icon: 'monitor',
      tagline: 'Sites and tools that carry their weight.',
      desc: 'Marketing sites, campaign landing pages, product configurators and internal tools. Fast, accessible and measurable, built on a design system rather than a pile of pages, and handed over in a CMS your team can run on its own.',
      items: ['Marketing sites & landing pages', 'Product configurators', 'Design systems in code', 'CMS build and editor training', 'Analytics and experimentation']
    },
    'portfolio-live-experiences': {
      title: 'Live experiences',
      icon: 'ticket',
      tagline: 'Rooms that fill, stages that hold.',
      desc: 'Trade fair stands, launches, customer summits and internal conferences: concept, spatial and graphic design, production, staffing and on-site direction — plus the campaign that gets people through the door and the content that outlives the day.',
      items: ['Stand and stage concept', 'Spatial and graphic design', 'Production and logistics', 'Promotion and invitations', 'On-site capture and follow-up']
    },
    'portfolio-editorial': {
      title: 'Editorial & content',
      icon: 'camera',
      tagline: 'A publishing rhythm, not a pile of posts.',
      desc: 'Editorial systems for brands that need to say something regularly and credibly: magazines, annual and impact reports, whitepapers, photography libraries and always-on social. We set the beats, build the calendar and produce against it.',
      items: ['Editorial strategy and calendar', 'Magazines, reports, whitepapers', 'Photography and asset libraries', 'Always-on social', 'German and English craft copy']
    },
    'portfolio-academy': {
      title: 'Academy programmes',
      icon: 'grad',
      tagline: 'Curricula your team keeps using.',
      desc: 'Training built as a product: curriculum, workbooks, slide systems, video modules and facilitator guides, in German or English. Delivered by us, or handed over so your own L&D team can run it without us in the room.',
      items: ['Curriculum design', 'Workbooks and slide systems', 'Video modules', 'Facilitator guides', 'Certification and follow-up']
    }
  };

  // Fill this in yourself: drop files into ./media/brands/ and add entries.
  //   { name: 'Zott', logo: './media/brands/zott.svg' }
  // Any length works. While empty, neutral placeholder plates render so the
  // sequence stays testable before the real assets land.
  var BRANDS = [];
  var PLACEHOLDER_COUNT = 44;

  // Three orbits, so 44 marks can breathe: a wide lower band of 20, a middle
  // band of 20 set back above it, and a crown of 4 riding on top. The crown
  // plates are a touch larger than the rest, and their half-slot phase keeps
  // them off the character's head at rest.
  var ORBITS = [
    { count: 20, rx: 0.505, ry: 0.128, dyF:  0.072, scale: 1.00, phase: 0.0, dir:  1.00 },
    { count: 20, rx: 0.448, ry: 0.108, dyF: -0.052, scale: 0.86, phase: 0.5, dir: -0.82 },
    { count:  4, rx: 0.420, ry: 0.082, dyF: -0.240, scale: 1.08, phase: 0.5, dir:  0.62 }
  ];

  // Split any number of brands across the orbits in the ratio above.
  function orbitCounts(n) {
    var base = ORBITS.map(function (o) { return o.count; });
    var sum = base.reduce(function (a, b) { return a + b; }, 0);
    if (n === sum) return base;
    var out = base.map(function (c) { return Math.max(1, Math.round(c * n / sum)); });
    var drift = n - out.reduce(function (a, b) { return a + b; }, 0);
    var biggest = out.indexOf(Math.max.apply(null, out));
    out[biggest] = Math.max(1, out[biggest] + drift);
    return out;
  }


  // Two packages per service. Indicative NET prices for the Bavarian / DACH
  // mid-market, benchmarked against published 2026 agency rates (agency hours
  // 80-180 EUR; Mittelstand retainers 1.500-5.000 EUR/month; social media
  // 1.000-2.500 EUR/month for SME and 2.500-4.500 for full service; corporate
  // websites 8.000-25.000 EUR; inhouse training days 2.000-5.000 EUR).
  // They are a starting ladder, not a rate card — confirm before publishing.
  var PACKAGES = {
    'brand-strategy':              [['ab 4.900 €', 'Positioning sprint over three weeks: category analysis, positioning statement, messaging hierarchy.'], ['ab 14.500 €', 'Full brand platform: architecture, naming, verbal and visual identity system, rollout guide.']],
    'marketing-strategy':          [['ab 3.900 €', 'Audit plus a twelve-month channel, budget and campaign plan with a KPI framework.'], ['ab 2.400 €/Monat', 'Strategy retainer: quarterly steering, budget reallocation and performance review.']],
    'creative-services':           [['ab 2.400 €', 'One campaign concept: key visual, headline system and a single-format rollout.'], ['ab 3.900 €/Monat', 'Rolling creative retainer: concepting, art direction and design across all channels.']],
    'digital-marketing':           [['ab 1.900 €/Monat', 'One channel run properly: setup, optimisation and monthly reporting. Media budget separate.'], ['ab 4.800 €/Monat', 'Full-funnel across paid, SEO and lifecycle, with creative production and attribution.']],
    'social-media-management':     [['ab 1.200 €/Monat', 'Two channels, organic: strategy, calendar, publishing and a monthly report.'], ['ab 3.400 €/Monat', 'Full service: quarterly shoot day, reels, paid social, community management, testing.']],
    'content-production':          [['ab 2.900 €', 'One shoot day with a delivered, edited set of stills and short-form video.'], ['ab 8.900 €', 'Quarterly production block: multi-day shoot, motion, editorial and an asset library.']],
    'website-digital-experience':  [['ab 6.500 €', 'Focused site or campaign landing page: UX, design, build and CMS handover.'], ['ab 19.500 €', 'Full relaunch: research, information architecture, design system, build, analytics.']],
    'advertising':                 [['ab 2.400 €', 'Single-channel campaign: concept, production and placement planning.'], ['ab 6.500 €', 'Integrated above and below the line, with media buying and post-campaign analysis.']],
    'pr':                          [['ab 1.600 €/Monat', 'Press office: materials, reactive media handling and distribution.'], ['ab 3.800 €/Monat', 'Proactive programme: story pipeline, thought leadership, launches and crisis readiness.']],
    'business-development-support':[['ab 2.200 €', 'Sales enablement kit: pitch deck, one-pagers and proposal templates.'], ['ab 3.200 €/Monat', 'Lead-generation programme with partner marketing and pipeline reporting.']],
    'event-marketing-promotions':  [['ab 3.500 €', 'One activation or trade fair presence: concept, assets and on-site direction.'], ['ab 12.000 €', 'Flagship event end to end: concept, production, staffing, promotion, follow-up.']],
    'video-multimedia':            [['ab 2.800 €', 'One shoot day: a single film plus platform-native cutdowns.'], ['ab 9.500 €', 'Brand film plus a full campaign set, including motion, colour and sound.']],
    'analytics':                   [['ab 2.400 €', 'Tracking implementation, tagging plan and a working dashboard.'], ['ab 1.900 €/Monat', 'Ongoing measurement: attribution modelling, experimentation and monthly readouts.']],
    'ai-innovation':               [['ab 3.400 €', 'Workflow audit plus one AI-assisted production pipeline, built and documented.'], ['ab 11.500 €', 'Tooling build with personalisation, content operations and brand-safety governance.']],
    'consulting':                  [['ab 1.800 €/Tag', 'Advisory day: audit, review or agency selection, with a written recommendation.'], ['ab 4.500 €/Monat', 'Interim marketing leadership, roughly two days a week.']],
    'employer-branding':           [['ab 4.200 €', 'EVP workshop and messaging framework for recruiting and internal use.'], ['ab 12.500 €', 'EVP, careers content, recruitment campaign and internal communications.']],
    'ongoing-client-services':     [['ab 1.500 €/Monat', 'Planning, reporting and light production with a named contact.'], ['ab 5.500 €/Monat', 'Senior team with rolling production capacity and quarterly scope reviews.']],
    'corporate-training':          [['ab 2.900 €/Tag', 'One module, inhouse, up to twelve participants, materials included.'], ['ab 14.500 €', 'Four modules across six months with 1:1 coaching, transfer tasks and certification.']],
    // --- academy tracks and modules (section 06) ---
    'academy-leadership':          [['ab 2.900 €/Tag', 'One module, inhouse, up to twelve participants, materials included.'], ['ab 14.500 €', 'Four modules across six months with 1:1 coaching, transfer tasks and certification.']],
    'academy-communication':       [['ab 2.900 €/Tag', 'One module, inhouse, up to twelve participants, materials included.'], ['ab 12.900 €', 'Three modules plus on-camera coaching and a live pitch rehearsal.']],
    'academy-sales':               [['ab 2.900 €/Tag', 'One module, inhouse, up to twelve participants, materials included.'], ['ab 13.500 €', 'Three modules plus call shadowing, playbook build and a 90-day follow-up.']],
    'academy-change':              [['ab 3.200 €/Tag', 'One facilitated day for a leadership team, including preparation interviews.'], ['ab 16.500 €', 'Six-month change programme: diagnosis, workshops, communications and review.']],
    'academy-modul-1':             [['ab 5.800 €', 'Two days inhouse for up to twelve leaders, materials and workbook included.'], ['ab 14.500 €', 'Run as the anchor of the four-module leadership programme with coaching.']],
    'academy-modul-2':             [['ab 2.900 €', 'One day inhouse for up to twelve participants, including on-camera work.'], ['ab 12.900 €', 'Extended into the executive communication track with individual coaching.']],
    'academy-modul-3':             [['ab 1.800 €', 'Half a day for founders and department heads, up to fifteen participants.'], ['ab 6.400 €', 'Half-day plus a follow-up clinic and a twelve-month marketing plan for your team.']]
  };

  var PRICE_NOTE = 'Indicative net prices, excluding VAT and media budget. Final scope is quoted after a briefing call.';

  var ICONS = {
    compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4"/>',
    sparkle: '<path d="M12 3v6M12 15v6M3 12h6M15 12h6"/><path d="m6.5 6.5 3 3M14.5 14.5l3 3M17.5 6.5l-3 3M9.5 14.5l-3 3"/>',
    chart: '<path d="M3 20h18"/><rect x="5" y="12" width="3.2" height="6" rx="1"/><rect x="10.4" y="8" width="3.2" height="10" rx="1"/><rect x="15.8" y="4" width="3.2" height="14" rx="1"/>',
    chat: '<path d="M20 14a3 3 0 0 1-3 3H9l-4 3v-3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3z"/><path d="M8 9h7M8 12.5h4.5"/>',
    camera: '<path d="M3 8.5A2.5 2.5 0 0 1 5.5 6h1.7l1.2-2h7.2l1.2 2h1.7A2.5 2.5 0 0 1 21 8.5v8A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5z"/><circle cx="12" cy="12.5" r="3.6"/>',
    monitor: '<rect x="3" y="4" width="18" height="12.5" rx="2"/><path d="M8.5 20h7M12 16.5V20"/><path d="M3 13.5h18"/>',
    megaphone: '<path d="M4 10v4a1.5 1.5 0 0 0 1.5 1.5H7l1 4h2l-1-4h1l7 4V6l-7 4H5.5A1.5 1.5 0 0 0 4 11.5z"/><path d="M19.5 9.5a3.5 3.5 0 0 1 0 5"/>',
    broadcast: '<circle cx="12" cy="12" r="2.4"/><path d="M8.2 8.2a5.4 5.4 0 0 0 0 7.6M15.8 15.8a5.4 5.4 0 0 0 0-7.6"/><path d="M5.4 5.4a9.4 9.4 0 0 0 0 13.2M18.6 18.6a9.4 9.4 0 0 0 0-13.2"/>',
    handshake: '<path d="m8 12-3 3 3.5 3.5 2-2"/><path d="m16 12 3 3-3.5 3.5-2-2"/><path d="M8 12 5 9l4-4 3 2 3-2 4 4-3 3"/><path d="m10.5 16.5 1.5 1.5 1.5-1.5"/>',
    ticket: '<path d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4z"/><path d="M13 6v2M13 11v2M13 16v2"/>',
    play: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m10.5 9.5 4.5 2.5-4.5 2.5z"/>',
    pulse: '<path d="M3 12h3.5l2-6 3.5 12 2.5-7 1.5 3H21"/>',
    spark: '<path d="M12 3.5 13.9 9l5.6 1.9-5.6 1.9L12 18.5 10.1 12.8 4.5 10.9 10.1 9z"/>',
    users: '<circle cx="9" cy="8.5" r="3.2"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><path d="M16 5.6a3.2 3.2 0 0 1 0 5.9M17.5 14.2A5.5 5.5 0 0 1 20.5 19"/>',
    badge: '<circle cx="12" cy="9.5" r="5.5"/><path d="m8.5 14-1.5 6 5-2.5 5 2.5-1.5-6"/>',
    loop: '<path d="M4 12a8 8 0 0 1 13.7-5.6L20 8"/><path d="M20 4v4h-4"/><path d="M20 12a8 8 0 0 1-13.7 5.6L4 16"/><path d="M4 20v-4h4"/>',
    grad: '<path d="m12 4 9 4.5-9 4.5-9-4.5z"/><path d="M7 11v4.5c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5V11"/><path d="M21 8.5V14"/>'
  };

  function svgIcon(name, cls) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" ' +
      'stroke-linecap="round" stroke-linejoin="round" class="' + cls + '" aria-hidden="true">' +
      (ICONS[name] || ICONS.sparkle) + '</svg>';
  }

  // ------------------------------------------------------------- geometry
  // The ring is projected by hand rather than built as a CSS 3D scene. Two
  // reasons: depth sorting against the character plate has to be identical in
  // every engine (an explicit z-index does that; transform-style: preserve-3d
  // does not once a sibling image shares the 3D context), and the scatter needs
  // per-card control of radius, blur and opacity on one timeline.
  var TAU = Math.PI * 2;
  var CHARACTER_Z = 500;
  // Peak billboard turn at the ring's left and right extremes. The projection
  // bunches cards where |sin(angle)| nears 1, and foreshortening them there is
  // what stops the ring piling up on its own sides.
  var MAX_TURN = 0.72;

  // Scroll choreography, matched shot for shot to the two source clips.
  //
  //   services  the ring at rest, interactive          (clip 1's wide framing)
  //   zoomIn    cards blow past, camera pushes in to the character's face
  //   face      clip 2's opening close-up, held
  //   pullBack  camera eases out and the stars spread  (clip 2, 1.8s -> 4.4s)
  //   swap      the plate fades up on the clip's figure, both still moving
  //   clipOut   the clip's background dissolves; the figure does not move
  //   recede    the plate carries the same camera move on to its resting size
  //   form      plates condense out of the particles
  //   brand     the logo ring at rest, interactive
  //
  // swap runs inside the tail of pullBack on purpose. The plate tracks the
  // clip's own framing there (see PLATE_TRACK), so it can fade up while the
  // camera is still moving and the figure never stops. recede then overlaps
  // clipOut: by the time the plate has drifted far enough off the clip's
  // frozen figure to show a ghost, the clip is down to a quarter opacity and
  // falling. What is left of a hold is 0.02 of the runway.
  var PHASE = {
    services: [0.00, 0.16],
    zoomIn:   [0.16, 0.34],
    face:     [0.34, 0.42],
    pullBack: [0.42, 0.70],
    swap:     [0.68, 0.70],
    clipOut:  [0.70, 0.74],
    recede:   [0.72, 0.94],
    form:     [0.81, 0.95],
    brand:    [0.94, 1.00]
  };

  // Where clip 2 is scrubbed to at each phase boundary, in seconds. Read off
  // the clip: 0-2s is the face, 2-4.4s the pull-back and particle spread, and
  // past 4.6s the clip starts assembling its own logo ring, which would sit
  // behind ours. So the clip stops at 4.40s and the plate takes over there.
  var V2 = { hold: 0.30, faceEnd: 1.80, pullEnd: 4.40 };

  // --- the hand-over -----------------------------------------------------
  // There is one character on this page and only one. The plate is not an
  // illustration of the figure in the clip, it is a cut-out of that exact
  // figure, lifted from clip 2 at t = 5.40s of the 1920x1080 master. So the
  // swap is not a dissolve between two figures; it is the same pixels in the
  // same place, and nothing about the figure moves across the cut.
  //
  // PLATE_TRACK is where the plate's rectangle sits inside the clip's own
  // frame at a given clip time, as fractions of frame width and height, fitted
  // by maximising silhouette IoU between the cut-out and the clip's figure.
  // Only the tail of the pull-back is listed, because that is the only stretch
  // where both are on screen together and also the only stretch where a rigid
  // cut-out fits well: 0.96 at 4.2s and 4.4s, 0.88 by 3.8s, and it falls apart
  // altogether in the close-up.
  //
  // The clip is object-fit: cover, so the same cover maths converts these to
  // stage pixels at any viewport.
  var PLATE_TRACK = [
    { t: 4.20, cx: 0.49674, cy: 0.60016, w: 1.04470 },
    { t: 4.40, cx: 0.49525, cy: 0.57748, w: 0.99990 }
  ];
  var CLIP_AR = 16 / 9;

  // How fast the clip's dolly is shrinking the figure at the hand-over, as a
  // fraction of its size per second of clip time, read off the same fit
  // (1.0447 -> 0.9184 across 4.2s -> 4.8s). The recede starts at exactly this
  // rate, so the camera carries its speed through the change-over instead of
  // stopping and lurching.
  var CLIP_DOLLY_RATE = 0.2104;

  // Fraction of the plate's height that the face sits at. The push-in scales
  // about this point, so the camera drives into the face and not the chest.
  var HEAD_AT = 0.33;

  // The plate carries a wide transparent margin so the crimson glow has room
  // inside the element box; mask-image clips to that box, so a tight crop
  // would square the glow off. These are the mask stops as percentages of the
  // image height. MASK_REST fades out the cut edge where the clip's frame
  // cropped the chest. MASK_OPEN leaves the plate whole, which is what the
  // hand-over needs: there the cut edge is below the viewport anyway.
  var MASK_OPEN = [100, 100];
  var MASK_REST = [67.4, 85.9];

  var INTERACTIVE_UNTIL = 0.12;

  function clamp(v, lo, hi) {
    lo = lo === undefined ? 0 : lo; hi = hi === undefined ? 1 : hi;
    return Math.min(hi, Math.max(lo, v));
  }
  function range(v, a, b) { return clamp((v - a) / (b - a)); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function easeInSoft(t) { return Math.pow(t, 1.5); }
  function easeInCubic(t) { return t * t * t; }
  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  // Cubic Hermite from 0 to 1 that leaves at slope k and arrives at a stop.
  // Its derivative factorises to (u - 1)(3(k - 2)u - k), which is positive
  // across [0, 1) for any k in (0, 2), so the move never doubles back.
  function hermiteOut(u, k) {
    return k * u + (3 - 2 * k) * u * u + (k - 2) * u * u * u;
  }

  // The plate's rectangle inside the clip's frame at a given clip time.
  function trackAt(t) {
    var a = PLATE_TRACK[0], b = PLATE_TRACK[PLATE_TRACK.length - 1];
    for (var i = 0; i < PLATE_TRACK.length - 1; i++) {
      if (t <= PLATE_TRACK[i + 1].t) { a = PLATE_TRACK[i]; b = PLATE_TRACK[i + 1]; break; }
    }
    var f = a === b ? 0 : clamp((t - a.t) / (b.t - a.t));
    return { cx: lerp(a.cx, b.cx, f), cy: lerp(a.cy, b.cy, f), w: lerp(a.w, b.w, f) };
  }

  // Stable pseudo-random in [0,1) for a plate index, so each plate keeps the
  // same arrival time every frame.
  function hash01(i) {
    var x = Math.sin(i * 12.9898 + 4.1) * 43758.5453;
    return x - Math.floor(x);
  }

  function project(angle, radiusMul, w, h, opt) {
    opt = opt || {};
    // Wide and shallow: a broad ellipse gives long service names room to sit
    // side by side without crowding, which a tighter ring cannot.
    var rx = w * (opt.rx || 0.468) * radiusMul;
    var ry = h * (opt.ry || 0.125) * radiusMul;
    var depth = Math.cos(angle);          // +1 nearest camera, -1 furthest
    var d01 = (depth + 1) / 2;
    return {
      x: w * 0.5 + rx * Math.sin(angle),
      // Front cards sit lower, back cards ride higher: the ellipse you get
      // looking slightly down onto a horizontal ring.
      y: h * 0.628 + (opt.dy || 0) + ry * depth,
      d01: d01,
      scale: lerp(0.54, 1.0, d01) * (opt.scale || 1),
      opacity: lerp(0.42, 1, d01),
      blur: lerp(2.6, 0, d01),
      z: Math.round(CHARACTER_Z + depth * 420),
      turn: Math.sin(angle) * MAX_TURN
    };
  }

  // ------------------------------------------------------------ i18n hook
  // Card labels live in the page markup and are translated by the site's own
  // walker. Panel prose is built here, so it asks the dictionary directly.
  var dict = null;
  var lang = 'en';
  function currentLang() {
    try { return localStorage.getItem('bs-lang') || 'en'; } catch (e) { return 'en'; }
  }
  function t(str) {
    if (!dict || lang === 'en') return str;
    try { return dict.translate(str, lang) || str; } catch (e) { return str; }
  }

  // ------------------------------------------------------------- instance
  var instance = null;

  function mount(root) {
    if (instance) unmount();
    var scope = root || document;
    var hero = scope.querySelector('.bs-hero');
    if (!hero) return;

    var scene = hero.querySelector('.bs-hero__scene');
    var stage = hero.querySelector('.bs-hero__stage');
    var character = hero.querySelector('.bs-hero__character');
    var v1 = hero.querySelector('[data-bs-video="ambient"]');
    var v2 = hero.querySelector('[data-bs-video="scrub"]');
    var copyServices = hero.querySelector('.bs-hero__copy--services');
    var copyBrands = hero.querySelector('.bs-hero__copy--brands');
    var hint = hero.querySelector('.bs-hero__hint');
    var dragHint = hero.querySelector('.bs-hero__drag-hint');
    var canvas = hero.querySelector('.bs-hero__particles');
    var serviceSlots = Array.prototype.slice.call(hero.querySelectorAll('[data-service]'));

    var cleanups = [];
    var state = { progress: 0, px: 0, py: 0, frozen: false };
    // Cached layout box of the character plate, refreshed on resize only.
    var charBox = { w: 0, h: 0, rw: 0, rh: 0 };

    lang = currentLang();
    // Panels are built on demand; load the dictionary in the background.
    import('./i18n.js').then(function (m) { dict = m; }).catch(function () {});

    // ---- how much motion this device gets ----
    // Override for previewing either path on any machine:
    //   ?motion=full     force the ring sequence
    //   ?motion=reduced  force the static fallback
    function wantsStatic() {
      var forced = null;
      try { forced = new URLSearchParams(window.location.search).get('motion'); } catch (e) {}
      if (forced === 'full') return false;
      if (forced === 'reduced') return true;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
      if (window.innerWidth < 900) return true;
      var c = navigator.hardwareConcurrency;
      if (typeof c === 'number' && c > 0 && c <= 4) return true;
      var conn = navigator.connection;
      if (conn && (conn.saveData || /(^|-)2g$/.test(conn.effectiveType || ''))) return true;
      if (typeof navigator.deviceMemory === 'number' && navigator.deviceMemory <= 4) return true;
      return false;
    }

    // ---- brand plates ----
    var brandItems = BRANDS.length ? BRANDS : (function () {
      var out = [];
      for (var i = 0; i < PLACEHOLDER_COUNT; i++) out.push({ name: 'Brand ' + (i + 1), logo: null });
      return out;
    })();

    var counts = orbitCounts(brandItems.length);
    var starts = [];
    (function () { var acc = 0; for (var k = 0; k < counts.length; k++) { starts.push(acc); acc += counts[k]; } })();

    var brandSlots = brandItems.map(function (b, i) {
      var el = document.createElement('div');
      el.className = 'bs-slot bs-slot--brand';
      var o = 0;
      while (o < counts.length - 1 && i >= starts[o + 1]) o++;
      el._orbit = o;
      el._idx = i - starts[o];
      el._of = counts[o];
      if (o === ORBITS.length - 1) el.classList.add('bs-slot--crown');
      el.style.opacity = '0';
      el.setAttribute('data-no-i18n', '');
      el.innerHTML = '<span class="bs-brand"><span class="bs-brand__content">' +
        (b.logo
          ? '<img class="bs-brand__logo" src="' + b.logo + '" alt="' + b.name + '" draggable="false">'
          : '<span class="bs-brand__placeholder" aria-hidden="true"></span>') +
        '<span class="bs-brand__name">' + b.name + '</span></span></span>';
      el._content = el.querySelector('.bs-brand__content');
      stage.appendChild(el);
      return el;
    });

    // ---- detail panel ----
    var overlay = document.createElement('div');
    overlay.className = 'bs-overlay';
    overlay.hidden = true;
    overlay.setAttribute('data-no-i18n', '');
    document.body.appendChild(overlay);

    var lastFocus = null;
    var openId = null;

    function panelMarkup(id) {
      var d = DATA[id];
      if (!d) return '';
      // The card in the ring already carries the translated service name.
      var slot = hero.querySelector('[data-service="' + id + '"] .bs-card__label');
      var name = slot ? slot.textContent.trim() : (d.title ? t(d.title) : id);
      var list = d.items.map(function (i) { return '<li>' + t(i) + '</li>'; }).join('');
      return '<div class="bs-panel' + (d.featured ? ' bs-panel--featured' : '') + '" role="dialog" aria-modal="true" aria-label="' + name + '">' +
        '<button type="button" class="bs-panel__close" aria-label="' + t('Close') + '">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="m6 6 12 12M18 6 6 18"/></svg>' +
        '</button>' +
        (d.featured
          ? '<div class="bs-panel__visual" aria-hidden="true">' + svgIcon(d.icon, 'bs-panel__visual-icon') +
            '<span class="bs-panel__visual-tag">' + t('Featured service') + '</span></div>'
          : '') +
        '<div class="bs-panel__body">' +
          '<div class="bs-panel__eyebrow">' + svgIcon(d.icon, '') + '<span>' + t(id.indexOf('academy-') === 0 ? 'Academy' : (id.indexOf('portfolio-') === 0 ? 'Portfolio' : 'Services')) + '</span></div>' +
          '<h2 class="bs-panel__title">' + name + '</h2>' +
          '<p class="bs-panel__tagline">' + t(d.tagline) + '</p>' +
          '<p class="bs-panel__desc">' + t(d.desc) + '</p>' +
          '<h3 class="bs-panel__subhead">' + t('What that includes') + '</h3>' +
          '<ul class="bs-panel__list">' + list + '</ul>' +
          pkgMarkup(id) +
          '<div class="bs-panel__footer">' +
            '<a class="bs-hero__cta" href="#contact" data-bs-panel-cta>' + t("Let's talk") + '</a>' +
          '</div>' +
        '</div>' +
      '</div>';
    }

    function pkgMarkup(id) {
      var rows = PACKAGES[id];
      if (!rows) return '';
      var labels = ['Compact', 'Premium'];
      var cells = rows.map(function (r, i) {
        return '<div class="bs-pkg' + (i ? ' bs-pkg--premium' : '') + '">' +
          '<span class="bs-pkg__name">' + t(labels[i]) + '</span>' +
          '<span class="bs-pkg__price">' + r[0] + '</span>' +
          '<span class="bs-pkg__note">' + t(r[1]) + '</span>' +
        '</div>';
      }).join('');
      return '<h3 class="bs-panel__subhead">' + t('Packages') + '</h3>' +
        '<div class="bs-pkgs">' + cells + '</div>' +
        '<p class="bs-pkg__legal">' + t(PRICE_NOTE) + '</p>';
    }

    function openPanel(id) {
      openId = id;
      lastFocus = document.activeElement;
      overlay.innerHTML = panelMarkup(id);
      overlay.hidden = false;
      state.frozen = true;
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(function () {
        overlay.classList.add('is-open');
        var b = overlay.querySelector('.bs-panel__close');
        if (b) b.focus();
      });
    }

    function closePanel() {
      if (overlay.hidden) return;
      openId = null;
      overlay.classList.remove('is-open');
      state.frozen = false;
      document.body.style.overflow = '';
      var done = function () {
        overlay.hidden = true;
        overlay.innerHTML = '';
      };
      setTimeout(done, 300);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    function onOverlayClick(e) {
      if (e.target === overlay) { closePanel(); return; }
      if (e.target.closest('.bs-panel__close')) { closePanel(); return; }
      if (e.target.closest('[data-bs-panel-cta]')) closePanel();
    }
    overlay.addEventListener('click', onOverlayClick);
    cleanups.push(function () { overlay.removeEventListener('click', onOverlayClick); });

    function onKey(e) {
      if (overlay.hidden) return;
      if (e.key === 'Escape') { closePanel(); return; }
      if (e.key !== 'Tab') return;
      // Keep focus inside the panel while it is open.
      var f = overlay.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    document.addEventListener('keydown', onKey);
    cleanups.push(function () { document.removeEventListener('keydown', onKey); });

    serviceSlots.forEach(function (el) {
      var h = function () {
        // A click that concluded a drag should not also open a panel.
        if (typeof drag !== 'undefined' && drag && drag.moved > 8) return;
        openPanel(el.getAttribute('data-service'));
      };
      el.addEventListener('click', h);
      cleanups.push(function () { el.removeEventListener('click', h); });
    });

    // Section boxes (Services, Academy) reuse the same panel. Bound from the
    // component root, not the hero, so they work on the static path too.
    Array.prototype.forEach.call(scope.querySelectorAll('[data-panel]'), function (el) {
      var h = function (e) {
        e.preventDefault();
        openPanel(el.getAttribute('data-panel'));
      };
      el.addEventListener('click', h);
      var k = function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPanel(el.getAttribute('data-panel')); }
      };
      el.addEventListener('keydown', k);
      if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
      if (!el.hasAttribute('role')) el.setAttribute('role', 'button');
      cleanups.push(function () {
        el.removeEventListener('click', h);
        el.removeEventListener('keydown', k);
      });
    });

    // Rebuild an open panel when the visitor switches language.
    var langButtons = document.querySelectorAll('[data-lang]');
    Array.prototype.forEach.call(langButtons, function (b) {
      var h = function () {
        lang = b.getAttribute('data-lang') || 'en';
        if (openId) overlay.innerHTML = panelMarkup(openId);
      };
      b.addEventListener('click', h);
      cleanups.push(function () { b.removeEventListener('click', h); });
    });

    // ---- static path: no video, no scrub, no ring, no particles ----
    if (wantsStatic()) {
      hero.classList.add('is-static');
      if (v1) v1.remove();
      if (v2) v2.remove();
      if (canvas) canvas.remove();

      if (copyServices && stage.parentNode) stage.parentNode.insertBefore(copyServices, stage);

      var sGrid = document.createElement('div');
      sGrid.className = 'bs-static-grid';
      serviceSlots.forEach(function (el) { sGrid.appendChild(el); });

      var bHead = document.createElement('p');
      bHead.className = 'bs-static-heading';
      bHead.textContent = 'Selected clients';

      var bGrid = document.createElement('div');
      bGrid.className = 'bs-static-grid';
      brandSlots.forEach(function (el) {
        el.style.opacity = '1';
        if (el._content) el._content.style.opacity = '1';
        bGrid.appendChild(el);
      });

      scene.appendChild(sGrid);
      scene.appendChild(bHead);
      scene.appendChild(bGrid);

      instance = { cleanups: cleanups, overlay: overlay };
      return;
    }

    // ---- ring path ----
    // Drag state. The ring can be thrown with a mouse or a finger; `moved`
    // tracks the distance so a drag that ends on a card does not also open it.
    var drag = { active: false, lastX: 0, moved: 0, vel: 0, lastT: 0 };
    var DRAG_GAIN = 0.0042;   // radians of spin per pixel dragged

    // Deliberately NOT using setPointerCapture. Capturing on the stage retargets
    // the pointer stream — and the click that follows — away from the card that
    // was pressed, so tapping a card silently stopped opening its panel. Window
    // listeners give us the same reach while leaving normal click behaviour on
    // the children intact.
    function onDown(e) {
      if (state.frozen || e.button > 0) return;
      drag.active = true;
      drag.lastX = e.clientX;
      drag.lastT = performance.now();
      drag.moved = 0;
      drag.vel = 0;
      stage.classList.add('is-dragging');
    }
    function onDrag(e) {
      if (!drag.active) return;
      var now = performance.now();
      var dx = e.clientX - drag.lastX;
      var dt = Math.max(8, now - drag.lastT) / 1000;
      drag.lastX = e.clientX;
      drag.lastT = now;
      drag.moved += Math.abs(dx);
      var d = dx * DRAG_GAIN;
      spin += d;
      // Blend the throw velocity so a flick reads smoothly rather than spiking.
      drag.vel = drag.vel * 0.6 + (d / dt) * 0.4;
    }
    function onUp() {
      if (!drag.active) return;
      drag.active = false;
      stage.classList.remove('is-dragging');
      // A tap that never travelled is a click, so let the card handle it. The
      // click fires before this timeout, so the threshold is still readable.
      setTimeout(function () { drag.moved = 0; }, 0);
    }
    // Pressing an image or a label would otherwise start a native drag or a
    // text selection that runs right across the ring.
    function noDrag(e) { e.preventDefault(); }

    stage.addEventListener('pointerdown', onDown);
    stage.addEventListener('dragstart', noDrag);
    window.addEventListener('pointermove', onDrag, { passive: true });
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    window.addEventListener('blur', onUp);
    cleanups.push(function () {
      stage.removeEventListener('pointerdown', onDown);
      stage.removeEventListener('dragstart', noDrag);
      window.removeEventListener('pointermove', onDrag);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      window.removeEventListener('blur', onUp);
    });

    // Only now do the clips get their URLs, so a phone never starts the
    // download at all.
    [v1, v2].forEach(function (v) {
      if (!v) return;
      if (v.getAttribute('data-poster')) v.poster = v.getAttribute('data-poster');
      Array.prototype.forEach.call(v.querySelectorAll('source[data-src]'), function (sc) {
        sc.src = sc.getAttribute('data-src');
      });
      v.preload = 'auto';
      v.load();
    });

    var spin = 0;
    var lastSeek = -1;
    var raf = 0;
    var last = performance.now();

    function onScroll() {
      var r = hero.getBoundingClientRect();
      var total = hero.offsetHeight - window.innerHeight;
      state.progress = total > 0 ? clamp(-r.top / total) : 0;
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    cleanups.push(function () {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    });

    function onMove(e) {
      state.px = (e.clientX / window.innerWidth) * 2 - 1;
      state.py = (e.clientY / window.innerHeight) * 2 - 1;
    }
    window.addEventListener('pointermove', onMove, { passive: true });
    cleanups.push(function () { window.removeEventListener('pointermove', onMove); });

    // ---- particles: the ember handover between the two rings ----
    var ctx = canvas ? canvas.getContext('2d') : null;
    var parts = [];
    var cw = 0, ch = 0;
    function sizeCanvas() {
      if (!canvas) return;
      var dpr = Math.min(2, window.devicePixelRatio || 1);
      cw = scene.clientWidth; ch = scene.clientHeight;
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
      canvas.style.width = cw + 'px';
      canvas.style.height = ch + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // The stylesheet is a <link> in <helmet>; if it has not applied yet the
    // scene still measures as the un-styled stacked layout, which would pin the
    // particle river far below the viewport. Re-measure whenever the scene size
    // disagrees with the buffer, which also covers resize and orientation.
    function syncCanvas() {
      if (!ctx) return;
      if (cw === scene.clientWidth && ch === scene.clientHeight) return;
      sizeCanvas();
      for (var i = 0; i < parts.length; i++) seed(parts[i], true);
    }
    // In the source clip the gold is not a flat band of identical specks: it
    // is a volume seen in perspective, with big soft embers drifting past the
    // lens and a fine haze receding behind the figure. So every ember carries a
    // depth, and depth drives all four things that sell the parallax — size,
    // brightness, how fast it crosses the frame, and how far off the ring's
    // horizon it sits.
    //
    // Each ember also belongs to a plate. As the plates resolve, the embers
    // assigned to them are drawn in and go out as they land, so the stars
    // visibly become the boxes rather than merely fading out near them. About
    // a fifth keep no slot at all and stay as ambient drift under the finished
    // ring.
    var SLOTLESS = 0.22;
    var TRAIL_MAX = 17;      // px; a comet tail, not a dash across the frame

    // The embers in the clip are out-of-focus points of light with a soft
    // halo, not hard dots, and that halo is most of what makes the field read
    // as dense. Painting it per particle with shadowBlur would be ruinous, so
    // bake four hues into small radial-gradient sprites once and blit those.
    // drawImage of a cached canvas also costs less than an arc fill, so the
    // field gets softer and cheaper at the same time.
    var EMBER_HUES = [24, 31, 39, 47];
    var SPRITE_R = 24;
    var sprites = EMBER_HUES.map(function (hue) {
      var c = document.createElement('canvas');
      c.width = c.height = SPRITE_R * 2;
      var g = c.getContext('2d');
      var rg = g.createRadialGradient(SPRITE_R, SPRITE_R, 0, SPRITE_R, SPRITE_R, SPRITE_R);
      rg.addColorStop(0.00, 'hsla(' + hue + ', 96%, 88%, 1)');
      rg.addColorStop(0.16, 'hsla(' + hue + ', 95%, 70%, 0.82)');
      rg.addColorStop(0.42, 'hsla(' + hue + ', 95%, 57%, 0.24)');
      rg.addColorStop(1.00, 'hsla(' + hue + ', 95%, 50%, 0)');
      g.fillStyle = rg;
      g.fillRect(0, 0, SPRITE_R * 2, SPRITE_R * 2);
      return c;
    });
    function seed(p, firstFill) {
      var d = Math.random();
      d = d * d;                             // most embers far, a few close
      p.depth = d;
      // sum of two uniforms gives a soft centre-weighted band
      var g = (Math.random() + Math.random() - 1);
      var spread = lerp(0.045, 0.26, d);
      p.x = -0.10 * cw + Math.random() * cw * 1.20;
      p.y = ch * (0.615 - 0.035 * d) + g * ch * spread;
      p.dir = Math.random() < 0.5 ? -1 : 1;
      p.vx = p.dir * lerp(16, 150, d);
      p.vy = -2 - Math.random() * 14 * (0.4 + d);
      p.life = firstFill ? Math.random() * 2.4 : 0;
      p.ttl = 2.6 + Math.random() * 3.8;
      p.size = lerp(0.42, 3.1, d) * (0.7 + Math.random() * 0.6);
      p.glow = lerp(0.42, 1, d);
      p.sp = (Math.random() * EMBER_HUES.length) | 0;
      p.hue = EMBER_HUES[p.sp];              // amber -> warm gold, as in the clip
      if (p.slot === undefined) {
        p.slot = Math.random() < SLOTLESS ? -1 : (Math.random() * brandSlots.length) | 0;
      }
      return p;
    }
    if (ctx) {
      sizeCanvas();
      for (var i = 0; i < 950; i++) parts.push(seed({}, true));
      window.addEventListener('resize', sizeCanvas);
      cleanups.push(function () { window.removeEventListener('resize', sizeCanvas); });
    }

    // Where each plate is this frame, and how far along its own arrival it is.
    // Written by the brand loop, read by the particle loop right after.
    var slotX = new Float64Array(brandSlots.length);
    var slotY = new Float64Array(brandSlots.length);
    var slotT = new Float64Array(brandSlots.length);

    function tick(now) {
      raf = requestAnimationFrame(tick);
      var dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      var w = scene.clientWidth, h = scene.clientHeight;
      if (!w || !h) return;
      var p = state.progress;
      // The push-in drives the service cards: they do not drift away, the
      // camera moves through them.
      var scatter = range(p, PHASE.zoomIn[0], PHASE.zoomIn[1]);
      var settle = range(p, PHASE.form[0], PHASE.form[1]);

      // While dragging the ring follows the finger exactly. On release it
      // coasts. Only once it has settled does the gentle cursor lean and idle
      // drift take back over, so the two never fight each other.
      if (!drag.active) {
        spin += drag.vel * dt;
        drag.vel *= Math.pow(0.14, dt);        // frame-rate independent decay
        if (Math.abs(drag.vel) < 0.02) {
          drag.vel = 0;
          spin += (state.px * 0.42 - spin) * Math.min(1, dt * 1.6);
        }
      }
      var s = spin + now / 1000 * 0.035;
      var eased = easeInSoft(scatter);
      var interactive = !state.frozen && p < INTERACTIVE_UNTIL;

      var n = serviceSlots.length;
      for (var i = 0; i < n; i++) {
        var el = serviceSlots[i];
        // Radius and scale both run out hard, so the cards read as sweeping
        // past the lens rather than floating outwards.
        var g = project((i / n) * TAU + s, 1 + 2.30 * eased, w, h);
        var scale = g.scale * (DATA[el.getAttribute('data-service')] && DATA[el.getAttribute('data-service')].featured ? 1.10 : 1) * lerp(1, 3.10, eased);
        var op = g.opacity * (1 - clamp(scatter * 1.25));
        var blur = g.blur + 18 * eased;
        el.style.transform = 'translate3d(' + g.x.toFixed(2) + 'px,' + (g.y - h * 0.16 * eased).toFixed(2) + 'px,0)' +
          ' translate(-50%,-50%) scale(' + scale.toFixed(3) + ') rotateY(' + g.turn.toFixed(3) + 'rad)';
        el.style.zIndex = String(g.z);
        el.style.opacity = op.toFixed(3);
        el.style.filter = blur > 0.05 ? 'blur(' + blur.toFixed(2) + 'px)' : 'none';
        var live = interactive && op > 0.35;
        el.style.pointerEvents = live ? 'auto' : 'none';
        el.tabIndex = live ? 0 : -1;
        el.setAttribute('aria-hidden', live ? 'false' : 'true');
      }

      var bn = brandSlots.length;
      for (var j = 0; j < bn; j++) {
        var bel = brandSlots[j];
        var orb = ORBITS[bel._orbit];
        var opt = { rx: orb.rx, ry: orb.ry, dy: h * orb.dyF, scale: orb.scale };

        // Matches the source clip: the plates do not fly in from anywhere. The
        // empty glass condenses out of the particle river first, then the logo
        // resolves inside it a beat later. The only travel is the camera
        // easing back, which is the slight radius and scale settle below.
        // NB: not named `seed` — that is the particle seeding function in this
        // same scope, and a `var` here would shadow it.
        var jitter = hash01(j);
        var plateAt = jitter * 0.46;
        // plateRaw is the un-eased arrival ramp. The plate itself uses the
        // eased one, but the embers converging on it ride the raw ramp: the
        // ease front-loads so hard that on the eased curve the whole flight
        // would be over in a couple of frames.
        var plateRaw = clamp((settle - plateAt) / 0.38);
        var plateT = easeOutCubic(plateRaw);
        var logoT = easeOutCubic(clamp((settle - (plateAt + 0.16)) / 0.36));

        // Half-slot phase offset keeps the two orbits from lining up in columns.
        var ang = ((bel._idx + orb.phase) / bel._of) * TAU + s * orb.dir;
        var bg = project(ang, lerp(1.10, 1, plateT), w, h, opt);
        var bop = bg.opacity * plateT;

        bel.style.transform = 'translate3d(' + bg.x.toFixed(2) + 'px,' + bg.y.toFixed(2) + 'px,0)' +
          ' translate(-50%,-50%) scale(' + (bg.scale * lerp(1.07, 1, plateT)).toFixed(3) + ') rotateY(' + bg.turn.toFixed(3) + 'rad)';
        bel.style.zIndex = String(bg.z);
        bel.style.opacity = bop.toFixed(3);
        // Blurred while condensing, sharp once formed.
        var bblur = bg.blur + 7 * (1 - plateT);
        bel.style.filter = bblur > 0.05 ? 'blur(' + bblur.toFixed(2) + 'px)' : 'none';
        if (bel._content) bel._content.style.opacity = logoT.toFixed(3);
        bel.style.pointerEvents = bop > 0.45 ? 'auto' : 'none';
        bel.setAttribute('aria-hidden', bop > 0.45 ? 'false' : 'true');

        // Hand the plate's mark to the embers assigned to it.
        slotX[j] = bg.x; slotY[j] = bg.y; slotT[j] = plateRaw;
      }

      // --- character -------------------------------------------------------
      // One figure, one image, start to finish. The plate carries the push-in,
      // the clip carries the close-up, and they change places at the tail of
      // the pull-back without the figure moving a pixel: trackAt() puts the
      // plate exactly where the clip's own figure sits at that frame, because
      // the plate was cut out of that figure. The plate then carries the same
      // camera move on, at the speed the clip was travelling, all the way down
      // to its resting size.
      if (character) {
        var chScale = 1, chOp = 1, chTX = 0, chTY = 0, chMask = 1, chBlur = 0, chIdle = 1;
        // offsetWidth forces layout, so measure only when the stage resizes.
        if (charBox.w !== w || charBox.h !== h || !charBox.rw) {
          charBox.w = w; charBox.h = h;
          charBox.rw = character.offsetWidth || 0;
          charBox.rh = charBox.rw * ((character.naturalHeight || 1493) / (character.naturalWidth || 1564));
        }
        var restW = charBox.rw, restH = charBox.rh;
        // Resting placement, straight off the CSS: left 50%, top 61%.
        var restCx = w * 0.5, restCy = h * 0.61;

        if (p < PHASE.zoomIn[0]) {
          chScale = 1;
          chOp = 1;
        } else if (p < PHASE.face[0]) {
          // Push in on the face. Scaling about the centre would drive into the
          // chest, so pull the figure back down by the amount the head rises.
          var z = range(p, PHASE.zoomIn[0], PHASE.zoomIn[1]);
          chScale = lerp(1, 3.4, easeInCubic(z));
          chTY = (chScale - 1) * (0.5 - HEAD_AT) * restH;
          // Hand off to the clip, which is the same figure filling the frame.
          // This one is a dissolve rather than a match cut: a flat plate cannot
          // hold up against an extreme close-up, the foreshortening is nowhere
          // near the same. So blur the plate through the change-over, which is
          // what a camera moving this fast would do anyway.
          chOp = 1 - clamp(range(z, 0.46, 0.88));
          chBlur = 7 * Math.sin(Math.PI * clamp(range(z, 0.32, 1)));
        } else {
          // The clip's frame this instant — the same expression the clip's own
          // scrub uses, so the two cannot drift apart.
          var tc = p < PHASE.pullBack[0] ? V2.faceEnd
            : lerp(V2.faceEnd, V2.pullEnd, range(p, PHASE.pullBack[0], PHASE.pullBack[1]));
          // Cover rect of the clip inside the stage, as the browser lays it out.
          var fw, fh;
          if (w / h > CLIP_AR) { fw = w; fh = w / CLIP_AR; }
          else { fh = h; fw = h * CLIP_AR; }
          var tr = trackAt(tc);
          var lockScale = restW > 0 ? (tr.w * fw) / restW : 1;
          var lockTX = (w - fw) / 2 + tr.cx * fw - restCx;
          var lockTY = (h - fh) / 2 + tr.cy * fh - restCy;

          // Leave the lock at the speed the clip's dolly was travelling, and
          // coast to a stop. Matching that first derivative is what stops the
          // move reading as two moves bolted together.
          var dP = PHASE.recede[1] - PHASE.recede[0];
          var ratePerP = CLIP_DOLLY_RATE * (V2.pullEnd - V2.faceEnd) /
            (PHASE.pullBack[1] - PHASE.pullBack[0]);
          var k = lockScale > 1.02
            ? clamp(ratePerP * lockScale * dP / (lockScale - 1), 0.12, 1.6)
            : 1;
          var e = hermiteOut(range(p, PHASE.recede[0], PHASE.recede[1]), k);

          chScale = lerp(lockScale, 1, e);
          chTX = lerp(lockTX, 0, e);
          chTY = lerp(lockTY, 0, e);
          chOp = clamp(range(p, PHASE.swap[0], PHASE.swap[1]));
          chMask = e;
          // Cursor lean and idle bob are suppressed while the plate is locked
          // to the clip — 14px of parallax would be 14px of mismatch.
          chIdle = e;
        }

        // The crop runs off the bottom of the clip's frame, which is right
        // while the figure fills the screen and wrong once it is a bust
        // floating in the dark. Fade that cut edge in as the camera pulls out.
        var maskCss = 'linear-gradient(to bottom, #000 ' +
          lerp(MASK_OPEN[0], MASK_REST[0], chMask).toFixed(1) + '%, transparent ' +
          lerp(MASK_OPEN[1], MASK_REST[1], chMask).toFixed(1) + '%)';
        if (character._mask !== maskCss) {
          character._mask = maskCss;
          character.style.webkitMaskImage = maskCss;
          character.style.maskImage = maskCss;
        }

        // Filters run in the element's own space, so the glow would blow up
        // with the plate. Divide it back out and it stays the same size on
        // screen from the push-in through to the ring.
        var gl = (60 / chScale).toFixed(1);
        var sy = (24 / chScale).toFixed(1);
        var filterCss = 'hue-rotate(24deg) saturate(1.06)' +
          (chBlur > 0.05 ? ' blur(' + (chBlur / chScale).toFixed(2) + 'px)' : '') +
          ' drop-shadow(0 0 ' + gl + 'px rgba(225, 16, 58, 0.42))' +
          ' drop-shadow(0 ' + sy + 'px ' + gl + 'px rgba(0, 0, 0, 0.75))';
        if (character._filter !== filterCss) {
          character._filter = filterCss;
          character.style.filter = filterCss;
        }

        character.style.transform =
          'translate(-50%, -50%)' +
          ' translate3d(' + (chTX + state.px * 14 * chIdle).toFixed(1) + 'px, ' +
            (chTY + Math.sin(now / 2600) * 5 * chIdle).toFixed(1) + 'px, 0)' +
          ' scale(' + chScale.toFixed(4) + ')' +
          ' rotateX(' + (-state.py * 2.6 * chIdle).toFixed(2) + 'deg)' +
          ' rotateY(' + (state.px * 4.2 * chIdle).toFixed(2) + 'deg)';
        character.style.opacity = chOp.toFixed(3);
        character.style.zIndex = String(CHARACTER_Z);
      }

      if (copyServices) copyServices.style.opacity = (1 - clamp(range(p, 0.04, 0.13))).toFixed(3);
      if (copyBrands) copyBrands.style.opacity = clamp(range(p, 0.92, 0.98)).toFixed(3);
      if (hint) hint.style.opacity = (1 - clamp(range(p, 0, 0.05))).toFixed(3);
      if (dragHint) dragHint.style.opacity = (1 - clamp(range(p, 0.06, 0.13))).toFixed(3);

      // --- clip 1: ambient only, gone before the push-in bites -------------
      if (v1) v1.style.opacity = (0.34 * (1 - clamp(range(p, 0.08, 0.20)))).toFixed(3);

      // --- clip 2: the hero of the middle act -------------------------------
      // It holds on its last frame through the swap. That matters: the plate
      // was cut from this figure at this framing, so while both are on screen
      // they are the same picture, and the clip only starts to go once the
      // plate is fully up. Nothing about the figure changes across the cut,
      // only the background behind it.
      if (v2 && v2.readyState >= 2) {
        var zi = range(p, PHASE.zoomIn[0], PHASE.zoomIn[1]);
        var vOp = clamp(range(zi, 0.42, 0.84)) * (1 - range(p, PHASE.clipOut[0], PHASE.clipOut[1]));
        v2.style.opacity = vOp.toFixed(3);

        var dur = v2.duration || V2.pullEnd;
        var target;
        if (p < PHASE.face[0]) target = V2.hold;
        else if (p < PHASE.face[1]) target = lerp(V2.hold, V2.faceEnd, range(p, PHASE.face[0], PHASE.face[1]));
        else target = lerp(V2.faceEnd, V2.pullEnd, range(p, PHASE.pullBack[0], PHASE.pullBack[1]));
        target = Math.min(target, dur - 0.05);

        // Only seek on a real change; a seek every frame stalls the decoder.
        if (Math.abs(target - lastSeek) > 1 / 48) {
          lastSeek = target;
          try { v2.currentTime = target; } catch (e) {}
        }
      }

      // ---- particles ----
      if (ctx) {
        syncCanvas();
        // The clip supplies the field through the pull-back. Ours lifts in
        // under it to cover the hand-over, carries the whole spread alone once
        // the clip has gone, and thins to ambient drift under the finished ring.
        var rise = range(p, 0.52, 0.64);
        var fall = range(p, 0.94, 1);
        // The clip's field is denser than anything worth drawing on a canvas
        // every frame, so when it goes, ours swells to cover the difference
        // rather than the frame visibly thinning out. Compositing is 'lighter',
        // so intensity above 1 reads as more field, not as clipping.
        var swell = 1 + 0.44 * Math.sin(Math.PI * range(p, 0.66, 0.94));
        var intensity = clamp(rise * swell * (1 - fall * 0.86), 0, 1.5);
        ctx.clearRect(0, 0, cw, ch);
        if (intensity >= 0.01) {
          ctx.globalCompositeOperation = 'lighter';
          ctx.lineCap = 'round';
          for (var k = 0; k < parts.length; k++) {
            var q = parts[k];
            q.life += dt;
            if (q.life > q.ttl) seed(q);
            q.x += q.vx * dt; q.y += q.vy * dt;
            q.vy += lerp(0.8, 3.4, q.depth) * dt;   // gentle settle, not a fountain
            q.vx *= 1 - 0.06 * dt;                  // keeps the river running
            var fade = Math.sin(Math.PI * (q.life / q.ttl));
            var alpha = fade * intensity * lerp(0.5, 1, q.depth) * 0.9;
            var px = q.x, py = q.y;

            // Drawn into its plate as that plate resolves. easeInCubic on the
            // travel makes the ember hang, then dart the last stretch, which
            // is what makes the ring look like it condensed rather than
            // cross-faded.
            var tail = 0;
            if (q.slot >= 0) {
              var conv = clamp(slotT[q.slot] * 1.12);
              if (conv > 0.001) {
                var e3 = conv * conv * conv;
                var back = conv > 0.09 ? conv - 0.09 : 0;
                back = back * back * back;
                px += (slotX[q.slot] - px) * e3;
                py += (slotY[q.slot] - py) * e3;
                tail = e3 - back;              // how far it moved this beat
                alpha *= 1 - conv;
              }
            }
            if (alpha <= 0.012) continue;
            var r = q.size * (0.55 + fade * 0.75);
            var lum = 56 + fade * 20 * q.glow;

            // A short comet tail on the last stretch of the flight. This is the
            // shot: the field does not fade out near the plates, it is drawn
            // into them. The tail is capped in pixels — uncapped it is
            // proportional to how far the ember still has to travel, which on
            // the outer plates draws a dash right across the frame.
            if (tail > 0.002) {
              var dxs = (slotX[q.slot] - q.x) * tail;
              var dys = (slotY[q.slot] - q.y) * tail;
              var len = Math.sqrt(dxs * dxs + dys * dys);
              if (len > 2.5) {
                if (len > TRAIL_MAX) { dxs *= TRAIL_MAX / len; dys *= TRAIL_MAX / len; }
                ctx.strokeStyle = 'hsla(' + q.hue + ',95%,' + lum + '%,' + (alpha * 0.5) + ')';
                ctx.lineWidth = Math.max(0.6, r * 1.05);
                ctx.beginPath();
                ctx.moveTo(px - dxs, py - dys);
                ctx.lineTo(px, py);
                ctx.stroke();
              }
            }

            if (r < 0.8) {
              // Sub-pixel embers are the bulk of the field and read identically
              // as squares. No halo is visible at that size anyway, so skip the
              // blit and spend the frame budget on having more of them.
              ctx.fillStyle = 'hsla(' + q.hue + ',95%,' + lum + '%,' + alpha + ')';
              ctx.fillRect(px - r, py - r, r * 2, r * 2);
            } else {
              var rad = r * 3.3;
              ctx.globalAlpha = alpha < 0.8 ? alpha * 1.25 : 1;
              ctx.drawImage(sprites[q.sp], px - rad, py - rad, rad * 2, rad * 2);
              ctx.globalAlpha = 1;
            }
          }
          ctx.globalCompositeOperation = 'source-over';
        }
      }
    }

    raf = requestAnimationFrame(tick);
    cleanups.push(function () { cancelAnimationFrame(raf); });

    if (v1) v1.play().catch(function () {});

    instance = { cleanups: cleanups, overlay: overlay };
  }

  function unmount() {
    if (!instance) return;
    instance.cleanups.forEach(function (f) { try { f(); } catch (e) {} });
    if (instance.overlay && instance.overlay.parentNode) instance.overlay.parentNode.removeChild(instance.overlay);
    document.body.style.overflow = '';
    instance = null;
  }

  window.BSHeroRing = { mount: mount, unmount: unmount };
})();
