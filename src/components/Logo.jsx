import { motion } from 'framer-motion'

/**
 * The permanent brand mark.
 *
 * Mirrors the lockup in the live site's nav — the petal-storm "B" mark beside a
 * Syne wordmark in wide uppercase — so the hero reads as the same site.
 *
 * Fixed to the top-left of the viewport and mounted outside the scroll
 * container, so it never moves with scroll and never fades. Present for the
 * entire sequence, including the reduced-motion path.
 *
 * The animation is deliberately small: a slow opacity breath plus a matching
 * glow behind the mark. It should read as alive at the edge of vision without
 * competing with the ring.
 */
export default function Logo({ src = '/media/brand/logo-mark.webp', reducedMotion = false }) {
  return (
    <a
      href="#top"
      className="brandmark"
      aria-label="Blüten Sturm — back to top"
    >
      <span className="brandmark__figure">
        {/* Soft glow, pulsing slightly out of phase with the mark itself. */}
        {!reducedMotion && (
          <motion.span
            aria-hidden="true"
            className="brandmark__glow"
            animate={{ opacity: [0.4, 0.85, 0.4], scale: [0.92, 1.08, 0.92] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        <motion.img
          src={src}
          alt=""
          className="brandmark__img"
          draggable={false}
          initial={reducedMotion ? false : { opacity: 0, y: -6 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: [0.88, 1, 0.88], y: 0 }}
          transition={
            reducedMotion
              ? { duration: 0 }
              : {
                  opacity: { duration: 6.5, repeat: Infinity, ease: 'easeInOut' },
                  y: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                }
          }
        />
      </span>

      <span className="brandmark__word">Blüten Sturm</span>
    </a>
  )
}
