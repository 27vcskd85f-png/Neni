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
  };

  // Fill this in yourself: drop files into ./media/brands/ and add entries.
  //   { name: 'Zott', logo: './media/brands/zott.svg' }
  // Any length works. While empty, neutral placeholder plates render so the
  // sequence stays testable before the real assets land.
  var BRANDS = [];
  var PLACEHOLDER_COUNT = 44;

  // The logo ring is split across two orbits so 44 marks can breathe. Orbit 0
  // is the wide lower band, orbit 1 rides above it, smaller and set back.
  var ORBITS = [
    { rx: 0.492, ry: 0.126, dyF: 0.058, scale: 1.00, phase: 0 },
    { rx: 0.430, ry: 0.104, dyF: -0.120, scale: 0.82, phase: 0.5 }
  ];


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

  var PHASE = {
    scatter: [0.26, 0.52],
    settle: [0.44, 0.74]
  };
  var INTERACTIVE_UNTIL = 0.16;

  function clamp(v, lo, hi) {
    lo = lo === undefined ? 0 : lo; hi = hi === undefined ? 1 : hi;
    return Math.min(hi, Math.max(lo, v));
  }
  function range(v, a, b) { return clamp((v - a) / (b - a)); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function easeInSoft(t) { return Math.pow(t, 1.5); }
  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

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

    var half = Math.ceil(brandItems.length / 2);
    var brandSlots = brandItems.map(function (b, i) {
      var el = document.createElement('div');
      el.className = 'bs-slot bs-slot--brand';
      // First half on the lower orbit, second half on the upper one.
      el._orbit = i < half ? 0 : 1;
      el._idx = i < half ? i : i - half;
      el._of = i < half ? half : brandItems.length - half;
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
          '<div class="bs-panel__eyebrow">' + svgIcon(d.icon, '') + '<span>' + t(id.indexOf('academy-') === 0 ? 'Academy' : 'Services') + '</span></div>' +
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

    function onDown(e) {
      if (state.frozen) return;
      drag.active = true;
      drag.lastX = e.clientX;
      drag.lastT = performance.now();
      drag.moved = 0;
      drag.vel = 0;
      stage.classList.add('is-dragging');
      try { stage.setPointerCapture(e.pointerId); } catch (err) {}
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
    function onUp(e) {
      if (!drag.active) return;
      drag.active = false;
      stage.classList.remove('is-dragging');
      try { stage.releasePointerCapture(e.pointerId); } catch (err) {}
      // A tap that never travelled is a click, so let the card handle it.
      setTimeout(function () { drag.moved = 0; }, 0);
    }
    stage.addEventListener('pointerdown', onDown);
    stage.addEventListener('pointermove', onDrag);
    stage.addEventListener('pointerup', onUp);
    stage.addEventListener('pointercancel', onUp);
    cleanups.push(function () {
      stage.removeEventListener('pointerdown', onDown);
      stage.removeEventListener('pointermove', onDrag);
      stage.removeEventListener('pointerup', onUp);
      stage.removeEventListener('pointercancel', onUp);
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
    var V2_START = 4.1, V2_END = 9.6;

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
    // In the source clip the gold is a wide horizontal river streaming across
    // the frame at ring height — a dense glittering band, not a radial burst.
    // Two thirds sit in a tight bright core, the rest spread into the haze.
    function seed(p, firstFill) {
      var core = Math.random() < 0.62;
      var spread = core ? 0.055 : 0.20;
      // sum of two uniforms gives a soft centre-weighted band
      var g = (Math.random() + Math.random() - 1);
      p.x = -0.08 * cw + Math.random() * cw * 1.16;
      p.y = ch * 0.60 + g * ch * spread;
      p.dir = Math.random() < 0.5 ? -1 : 1;
      p.vx = p.dir * (26 + Math.random() * 86);
      p.vy = -3 - Math.random() * 12;
      p.life = firstFill ? Math.random() * 2.4 : 0;
      p.ttl = 2.4 + Math.random() * 3.6;
      p.size = core ? (0.5 + Math.random() * 1.5) : (0.9 + Math.random() * 2.4);
      p.hue = 22 + Math.random() * 26;   // amber -> warm gold, as in the clip
      return p;
    }
    if (ctx) {
      sizeCanvas();
      for (var i = 0; i < 460; i++) parts.push(seed({}, true));
      window.addEventListener('resize', sizeCanvas);
      cleanups.push(function () { window.removeEventListener('resize', sizeCanvas); });
    }

    function tick(now) {
      raf = requestAnimationFrame(tick);
      var dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      var w = scene.clientWidth, h = scene.clientHeight;
      if (!w || !h) return;
      var p = state.progress;
      var scatter = range(p, PHASE.scatter[0], PHASE.scatter[1]);
      var settle = range(p, PHASE.settle[0], PHASE.settle[1]);

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
        var g = project((i / n) * TAU + s, 1 + 1.15 * eased, w, h);
        var scale = g.scale * (DATA[el.getAttribute('data-service')] && DATA[el.getAttribute('data-service')].featured ? 1.10 : 1) * lerp(1, 1.25, eased);
        var op = g.opacity * (1 - clamp(scatter * 1.15));
        var blur = g.blur + 12 * eased;
        el.style.transform = 'translate3d(' + g.x.toFixed(2) + 'px,' + (g.y - h * 0.10 * eased).toFixed(2) + 'px,0)' +
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
        var plateAt = jitter * 0.40;
        var plateT = easeOutCubic(clamp((settle - plateAt) / 0.30));
        var logoT = easeOutCubic(clamp((settle - (plateAt + 0.13)) / 0.32));

        // Half-slot phase offset keeps the two orbits from lining up in columns.
        var ang = ((bel._idx + orb.phase) / bel._of) * TAU + s * (bel._orbit ? -0.82 : 1);
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
      }

      // Character: the camera pulls back across the sequence, so the figure
      // recedes. A flat plate cannot turn its head, so it leans to the pointer.
      if (character) {
        character.style.transform =
          'translate3d(calc(-50% + ' + (state.px * 14).toFixed(1) + 'px), calc(-50% + ' + (Math.sin(now / 2600) * 5).toFixed(1) + 'px), 0)' +
          ' scale(' + lerp(1.0, 0.88, clamp(range(p, 0.2, 0.85))).toFixed(3) + ')' +
          ' rotateX(' + (-state.py * 2.6).toFixed(2) + 'deg) rotateY(' + (state.px * 4.2).toFixed(2) + 'deg)';
        character.style.zIndex = String(CHARACTER_Z);
      }

      if (copyServices) copyServices.style.opacity = (1 - clamp(range(p, 0, 0.14))).toFixed(3);
      if (copyBrands) copyBrands.style.opacity = clamp(range(p, 0.62, 0.76)).toFixed(3);
      if (hint) hint.style.opacity = (1 - clamp(range(p, 0, 0.06))).toFixed(3);
      if (dragHint) dragHint.style.opacity = (1 - clamp(range(p, 0.10, 0.22))).toFixed(3);

      if (v1) v1.style.opacity = (0.34 * (1 - clamp(range(p, 0.18, 0.46)))).toFixed(3);
      if (v2 && v2.readyState >= 2) {
        v2.style.opacity = (0.42 * clamp(range(p, 0.2, 0.42)) * (1 - clamp(range(p, 0.92, 1)) * 0.5)).toFixed(3);
        var target = lerp(V2_START, Math.min(V2_END, v2.duration || V2_END), range(p, 0.22, 0.9));
        // Only seek on a real change; a seek every frame stalls the decoder.
        if (Math.abs(target - lastSeek) > 1 / 48) {
          lastSeek = target;
          try { v2.currentTime = target; } catch (e) {}
        }
      }

      // ---- particles ----
      if (ctx) {
        syncCanvas();
        // Full through the scatter and the whole materialisation, thinning
        // only once every plate has resolved — the clip does the same.
        var rise = range(p, PHASE.scatter[0], PHASE.scatter[0] + 0.14);
        var fall = range(p, PHASE.settle[1] - 0.04, 1);
        var intensity = clamp(rise * (1 - fall * 0.88));
        ctx.clearRect(0, 0, cw, ch);
        if (intensity >= 0.01) {
          ctx.globalCompositeOperation = 'lighter';
          for (var k = 0; k < parts.length; k++) {
            var q = parts[k];
            q.life += dt;
            if (q.life > q.ttl) seed(q);
            q.x += q.vx * dt; q.y += q.vy * dt;
            q.vy += 2.2 * dt;              // gentle settle, not a fountain
            q.vx *= 1 - 0.06 * dt;         // keeps the river running
            var fade = Math.sin(Math.PI * (q.life / q.ttl));
            var alpha = fade * intensity * 0.85;
            if (alpha <= 0.01) continue;
            ctx.beginPath();
            ctx.fillStyle = 'hsla(' + q.hue + ',95%,' + (58 + fade * 18) + '%,' + alpha + ')';
            ctx.arc(q.x, q.y, q.size * (0.55 + fade * 0.75), 0, TAU);
            ctx.fill();
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
