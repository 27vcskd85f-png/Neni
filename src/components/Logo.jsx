import { motion } from 'framer-motion'

/**
 * The permanent brand mark.
 *
 * Fixed to the top-left of the viewport and mounted outside the scroll
 * container, so it never moves with scroll and never fades — it is present for
 * the entire sequence, including the reduced-motion path.
 *
 * The animation is deliberately small: a slow opacity breath plus a matching
 * glow behind the mark. It should read as alive at the edge of vision without
 * competing with the ring.
 *
 * Swap /media/hero/logo.svg for your own file (SVG or transparent PNG) — the
 * component only cares about the path and the height.
 */
export default function Logo({ src = '/media/hero/logo.svg', reducedMotion = false }) {
  return (
    <div className="pointer-events-none fixed left-5 top-5 z-[100] select-none sm:left-7 sm:top-6">
      <div className="relative">
        {/* Soft glow, pulsing slightly out of phase with the mark itself. */}
        {!reducedMotion && (
          <motion.div
            aria-hidden="true"
            className="absolute -inset-6 rounded-full blur-2xl"
            style={{
              background:
                'radial-gradient(closest-side, rgba(200,120,255,0.30), rgba(90,120,240,0.10) 60%, transparent 100%)',
            }}
            animate={{ opacity: [0.35, 0.7, 0.35], scale: [0.94, 1.06, 0.94] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        <motion.img
          src={src}
          alt="Blüten Sturm"
          className="relative h-9 w-auto sm:h-11"
          draggable={false}
          initial={reducedMotion ? false : { opacity: 0, y: -6 }}
          animate={
            reducedMotion
              ? { opacity: 1 }
              : { opacity: [0.86, 1, 0.86], y: 0 }
          }
          transition={
            reducedMotion
              ? { duration: 0 }
              : {
                  opacity: { duration: 6.5, repeat: Infinity, ease: 'easeInOut' },
                  y: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                }
          }
        />
      </div>
    </div>
  )
}
