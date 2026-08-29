import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SERVICES } from '../data/services'
import ServiceIcon from './ServiceIcon'

/**
 * Detail panel for a single service, opened by clicking its ring card.
 *
 * The four featured services (Digital Marketing, Social Media Management,
 * Content Production, Website & Digital Experience) get the wide layout with a
 * supporting visual; the other fourteen get the compact one.
 */
export default function ServiceOverlay({ activeId, onClose }) {
  const service = SERVICES.find((s) => s.id === activeId) ?? null
  const panelRef = useRef(null)
  const restoreRef = useRef(null)

  useEffect(() => {
    if (!service) return

    restoreRef.current = document.activeElement
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return

      // Keep focus inside the panel while it is open.
      const focusables = panelRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      if (!focusables || focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    // Move focus into the panel once it has mounted.
    const id = requestAnimationFrame(() => panelRef.current?.querySelector('button')?.focus())

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      cancelAnimationFrame(id)
      if (restoreRef.current instanceof HTMLElement) restoreRef.current.focus()
    }
  }, [service, onClose])

  return (
    <AnimatePresence>
      {service && (
        <motion.div
          className="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-overlay-title"
            className={`panel${service.featured ? ' panel--featured' : ''}`}
            initial={{ opacity: 0, y: 26, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
          >
            <button type="button" className="panel__close" onClick={onClose} aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>

            {service.featured && (
              <div className="panel__visual" aria-hidden="true">
                <div className="panel__visual-wash" />
                <ServiceIcon name={service.icon} className="panel__visual-icon" />
                <span className="panel__visual-tag">Featured service</span>
              </div>
            )}

            <div className="panel__body">
              <div className="panel__eyebrow">
                <ServiceIcon name={service.icon} className="panel__eyebrow-icon" />
                <span>Services</span>
              </div>

              <h2 id="service-overlay-title" className="panel__title">
                {service.name}
              </h2>
              <p className="panel__tagline">{service.tagline}</p>
              <p className="panel__description">{service.description}</p>

              <div className="panel__deliverables">
                <h3 className="panel__subhead">What that includes</h3>
                <ul>
                  {service.deliverables.map((d) => (
                    <li key={d}>
                      <span className="panel__bullet" aria-hidden="true" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="panel__footer">
                {service.price ? (
                  <div className="panel__price">
                    <span className="panel__price-value">{service.price}</span>
                    {service.priceNote && <span className="panel__price-note">{service.priceNote}</span>}
                  </div>
                ) : (
                  <div className="panel__price">
                    <span className="panel__price-value panel__price-value--quiet">Priced per scope</span>
                    <span className="panel__price-note">Tell us what you need and we will quote it.</span>
                  </div>
                )}

                <a className="panel__cta" href="#contact" onClick={onClose}>
                  Get in Touch
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h13M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
