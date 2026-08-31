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

export const BRAND_RING_COPY = {
  heading: 'Mittelstand leaders. Challenger brands. Nine markets.',
  subtext:
    'From Würzburg we work with Mittelstand leaders, challenger brands and institutions who need marketing that moves markets — and teams able to carry it.',
}

// How many plates to draw when BRANDS is empty, so the ring still reads as a ring.
export const PLACEHOLDER_COUNT = 18
