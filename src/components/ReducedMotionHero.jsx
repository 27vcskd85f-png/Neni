import { useCallback, useState } from 'react'
import { SERVICES } from '../data/services'
import { BRANDS, BRAND_RING_COPY, PLACEHOLDER_COUNT } from '../data/brands'
import ServiceIcon from './ServiceIcon'
import ServiceOverlay from './ServiceOverlay'

const BRAND_ITEMS =
  BRANDS.length > 0
    ? BRANDS
    : Array.from({ length: PLACEHOLDER_COUNT }, (_, i) => ({ name: `Brand ${i + 1}`, logo: null }))

/**
 * The reduced-motion and small-screen path.
 *
 * No video, no scroll-scrub, no ring, no particle canvas — a static character
 * plate over a CSS grid of the same service cards, then a logo grid. The cards
 * still open the same ServiceOverlay, so nothing is lost but the motion.
 */
export default function ReducedMotionHero() {
  const [activeId, setActiveId] = useState(null)
  const closeOverlay = useCallback(() => setActiveId(null), [])

  return (
    <>
      <section className="rm-hero" id="top">
        <div className="rm-hero__figure">
          <img
            src="/media/hero/character-plate.webp"
            alt=""
            aria-hidden="true"
            className="rm-hero__character"
            draggable={false}
          />
          <div className="rm-hero__wash" aria-hidden="true" />
        </div>

        <div className="rm-hero__copy">
          <h1 className="rm-hero__title">
            A creative and marketing agency<span className="hero-intro__accent">.</span>
          </h1>
          <p className="rm-hero__sub">Eighteen services, one team. Choose where you want to start.</p>
        </div>
      </section>

      <section className="rm-section" aria-labelledby="rm-services-heading">
        <h2 id="rm-services-heading" className="rm-section__heading">
          Services
        </h2>
        <ul className="rm-grid">
          {SERVICES.map((service) => (
            <li key={service.id}>
              <button
                type="button"
                onClick={() => setActiveId(service.id)}
                className={`rm-card${service.featured ? ' rm-card--featured' : ''}`}
              >
                <ServiceIcon name={service.icon} className="rm-card__icon" />
                <span className="rm-card__label">{service.name}</span>
                {service.price && <span className="rm-card__price">{service.price}</span>}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="rm-section rm-section--brands" aria-labelledby="rm-brands-heading">
        <h2 id="rm-brands-heading" className="rm-section__heading rm-section__heading--brands">
          {BRAND_RING_COPY.heading}
        </h2>
        <p className="rm-section__sub">{BRAND_RING_COPY.subtext}</p>
        <ul className="rm-brandgrid">
          {BRAND_ITEMS.map((brand, i) => (
            <li key={`${brand.name}-${i}`} className="rm-brand">
              {brand.logo ? (
                <img src={brand.logo} alt={brand.name} draggable={false} />
              ) : (
                <span className="rm-brand__placeholder" aria-hidden="true" />
              )}
              <span className="rm-brand__name">{brand.name}</span>
            </li>
          ))}
        </ul>
      </section>

      <ServiceOverlay activeId={activeId} onClose={closeOverlay} />
    </>
  )
}
