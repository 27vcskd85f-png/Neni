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
  };

  // Fill this in yourself: drop files into ./media/brands/ and add entries.
  //   { name: 'Zott', logo: './media/brands/zott.svg' }
  // Any length works. While empty, neutral placeholder plates render so the
  // sequence stays testable before the real assets land.
  var BRANDS = [];
  var PLACEHOLDER_COUNT = 18;

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

  function project(angle, radiusMul, w, h) {
    var rx = w * 0.445 * radiusMul;
    var ry = h * 0.170 * radiusMul;
    var depth = Math.cos(angle);          // +1 nearest camera, -1 furthest
    var d01 = (depth + 1) / 2;
    return {
      x: w * 0.5 + rx * Math.sin(angle),
      // Front cards sit lower, back cards ride higher: the ellipse you get
      // looking slightly down onto a horizontal ring.
      y: h * 0.628 + ry * depth,
      d01: d01,
      scale: lerp(0.54, 1.0, d01),
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

    var brandSlots = brandItems.map(function (b) {
      var el = document.createElement('div');
      el.className = 'bs-slot bs-slot--brand';
      el.style.opacity = '0';
      el.setAttribute('data-no-i18n', '');
      el.innerHTML = '<span class="bs-brand">' +
        (b.logo
          ? '<img class="bs-brand__logo" src="' + b.logo + '" alt="' + b.name + '" draggable="false">'
          : '<span class="bs-brand__placeholder" aria-hidden="true"></span>') +
        '<span class="bs-brand__name">' + b.name + '</span></span>';
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
      var name = slot ? slot.textContent.trim() : id;
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
          '<div class="bs-panel__eyebrow">' + svgIcon(d.icon, '') + '<span>' + t('Services') + '</span></div>' +
          '<h2 class="bs-panel__title">' + name + '</h2>' +
          '<p class="bs-panel__tagline">' + t(d.tagline) + '</p>' +
          '<p class="bs-panel__desc">' + t(d.desc) + '</p>' +
          '<h3 class="bs-panel__subhead">' + t('What that includes') + '</h3>' +
          '<ul class="bs-panel__list">' + list + '</ul>' +
          '<div class="bs-panel__footer">' +
            '<a class="bs-hero__cta" href="#contact" data-bs-panel-cta>' + t("Let's talk") + '</a>' +
          '</div>' +
        '</div>' +
      '</div>';
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
      var h = function () { openPanel(el.getAttribute('data-service')); };
      el.addEventListener('click', h);
      cleanups.push(function () { el.removeEventListener('click', h); });
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
      brandSlots.forEach(function (el) { el.style.opacity = '1'; bGrid.appendChild(el); });

      scene.appendChild(sGrid);
      scene.appendChild(bHead);
      scene.appendChild(bGrid);

      instance = { cleanups: cleanups, overlay: overlay };
      return;
    }

    // ---- ring path ----
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
    function seed(p) {
      var a = Math.random() * TAU, r = 0.75 + Math.random() * 0.5;
      p.x = cw * 0.5 + Math.cos(a) * cw * 0.445 * r;
      p.y = ch * 0.628 + Math.sin(a) * ch * 0.170 * r;
      p.vx = (Math.random() - 0.5) * 26;
      p.vy = -8 - Math.random() * 34;
      p.life = 0; p.ttl = 2.2 + Math.random() * 3.4;
      p.size = 0.7 + Math.random() * 2.1;
      p.hue = 12 + Math.random() * 26;   // ember -> amber, matching the brand gradient
      return p;
    }
    if (ctx) {
      sizeCanvas();
      for (var i = 0; i < 260; i++) parts.push(seed({}));
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

      // Ring leans toward the cursor and drifts slowly on its own, damped so a
      // fast pointer move never snaps it.
      spin += (state.px * 0.42 - spin) * Math.min(1, dt * 3.5);
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
        // Staggered arrival, so logos drop in one by one rather than as a block.
        var tt = easeOutCubic(clamp((settle - (j / bn) * 0.45) / 0.55));
        var bg = project((j / bn) * TAU + s, lerp(1.9, 1, tt), w, h);
        var bop = bg.opacity * tt;
        bel.style.transform = 'translate3d(' + bg.x.toFixed(2) + 'px,' + bg.y.toFixed(2) + 'px,0)' +
          ' translate(-50%,-50%) scale(' + (bg.scale * lerp(1.2, 1, tt)).toFixed(3) + ') rotateY(' + bg.turn.toFixed(3) + 'rad)';
        bel.style.zIndex = String(bg.z);
        bel.style.opacity = bop.toFixed(3);
        bel.style.filter = bg.blur > 0.05 ? 'blur(' + bg.blur.toFixed(2) + 'px)' : 'none';
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
        var rise = range(p, PHASE.scatter[0], PHASE.scatter[1]);
        var fall = range(p, PHASE.settle[1], 1);
        var intensity = clamp(rise * (1 - fall * 0.82));
        ctx.clearRect(0, 0, cw, ch);
        if (intensity >= 0.01) {
          ctx.globalCompositeOperation = 'lighter';
          for (var k = 0; k < parts.length; k++) {
            var q = parts[k];
            q.life += dt;
            if (q.life > q.ttl) seed(q);
            q.x += q.vx * dt; q.y += q.vy * dt;
            q.vy += 6 * dt; q.vx *= 1 - 0.35 * dt;
            var fade = Math.sin(Math.PI * (q.life / q.ttl));
            var alpha = fade * intensity * 0.85;
            if (alpha <= 0.01) continue;
            ctx.beginPath();
            ctx.fillStyle = 'hsla(' + q.hue + ',95%,' + (58 + fade * 18) + '%,' + alpha + ')';
            ctx.arc(q.x, q.y, q.size * (0.6 + fade * 0.7), 0, TAU);
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
