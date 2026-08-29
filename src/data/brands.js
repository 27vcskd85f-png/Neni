// Brand logos for the second ring.
//
// Fill this in yourself — drop logo files into /public/media/brands/ and add an
// entry per brand. Nothing else needs to change: BrandRing lays out whatever is
// in this array, at any length.
//
//   { name: 'Zott', logo: '/media/brands/zott.svg' }
//
// `name` is used for the alt text and the hover label, so keep it the brand's
// real name. SVG is preferred; transparent PNG is fine.
//
// Until this array is populated the ring renders neutral placeholder plates, so
// the sequence is testable before the real assets land.

export const BRANDS = []

// Shown in the heading above the ring. Update if the count changes.
export const BRAND_COUNT_LABEL = '45+'

export const BRAND_RING_COPY = {
  heading: '45+ International Brands. One Person’s Playbook.',
  subtext:
    'Before Blüten Sturm, our founder led marketing strategy, design, video advertising, and promotional budget management for these brands across the Balkans and EU.',
}

// How many plates to draw when BRANDS is empty, so the ring still reads as a ring.
export const PLACEHOLDER_COUNT = 18
