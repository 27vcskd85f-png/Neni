/**
 * Global site constants. Everything brand-level that is not chapter content
 * lives here so copy edits never touch component or scroll code.
 */
export const site = {
  name: 'Blüten Sturm',
  domain: 'bluetensturm.com',
  email: 'info@bluetensturm.com',
  tagline: 'We make brands bloom — and cut through the noise.',
  legal: `© ${new Date().getFullYear()} Blüten Sturm. All rights reserved.`,
  cta: {
    label: "Let's Elevate Your Brand",
    href: '#cta',
  },
};

/**
 * Asset filenames expected in /public/assets. Every one is optional: the site
 * detects what is present at runtime and falls back to the procedural scene
 * for anything missing, so dropping a new file in is the whole "swap" workflow.
 */
export const assets = {
  characterModel: '/assets/character.glb',
  idleLoop: '/assets/idle-loop.mp4',
  panelBurst: '/assets/panel-burst.mp4',
  logoConverge: '/assets/logo-converge.mp4',
  heroPoster: '/assets/hero-poster.png',
};
