import { useEffect, useRef } from 'react'
import { BRANDS, PLACEHOLDER_COUNT } from '../data/brands'
import {
  PHASE,
  clamp,
  easeOutCubic,
  lerp,
  project,
  range,
  slotAngle,
} from '../lib/ring'

// Whatever is in BRANDS drives the ring. Empty array -> neutral placeholder
// plates, so the whole sequence is testable before the real logos land.
const ITEMS =
  BRANDS.length > 0
    ? BRANDS
    : Array.from({ length: PLACEHOLDER_COUNT }, (_, i) => ({ name: `Brand ${i + 1}`, logo: null }))

const N = ITEMS.length
const MAX_POINTER_SPIN = 0.42
const IDLE_SPIN = 0.035

/**
 * The brand-logo ring: the same geometry as the service ring, populated from
 * `brands.js`.
 *
 * This ring is proof, not a menu — logos brighten to full colour and lift
 * slightly on hover, and that is the whole interaction. Nothing here opens.
 */
export default function BrandRing({ sceneRef, progressRef, pointerRef }) {
  const slotRefs = useRef([])
  const spinRef = useRef(0)

  useEffect(() => {
    let raf
    let last = performance.now()

    const tick = (now) => {
      raf = requestAnimationFrame(tick)
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now

      const scene = sceneRef.current
      if (!scene) return
      const box = { w: scene.clientWidth, h: scene.clientHeight }
      if (!box.w || !box.h) return

      const p = progressRef.current
      const settle = range(p, ...PHASE.settle)

      const target = pointerRef.current.x * MAX_POINTER_SPIN
      spinRef.current += (target - spinRef.current) * Math.min(1, dt * 3.5)
      const spin = spinRef.current + now / 1000 * IDLE_SPIN

      for (let i = 0; i < N; i++) {
        const el = slotRefs.current[i]
        if (!el) continue

        // Staggered arrival: each logo starts its own settle a little after the
        // one before it, so they drop into the ring one by one rather than
        // appearing as a block.
        const offset = (i / N) * 0.45
        const t = easeOutCubic(clamp((settle - offset) / (1 - 0.45)))

        const angle = slotAngle(i, N, spin)
        // Arrive from outside the ring and ease inward onto the resting radius.
        const radiusMul = lerp(1.9, 1, t)
        const g = project(angle, radiusMul, box)

        const opacity = g.opacity * t
        const scale = g.scale * lerp(1.2, 1, t)

        el.style.transform =
          `translate3d(${g.x.toFixed(2)}px, ${g.y.toFixed(2)}px, 0)` +
          ` translate(-50%, -50%) scale(${scale.toFixed(3)}) rotateY(${g.turn.toFixed(3)}rad)`
        el.style.zIndex = String(g.z)
        el.style.opacity = opacity.toFixed(3)
        el.style.filter = g.blur > 0.05 ? `blur(${g.blur.toFixed(2)}px)` : 'none'
        el.style.pointerEvents = opacity > 0.45 ? 'auto' : 'none'
        el.setAttribute('aria-hidden', opacity > 0.45 ? 'false' : 'true')
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [sceneRef, progressRef, pointerRef])

  return (
    <>
      {ITEMS.map((brand, i) => (
        <div
          key={`${brand.name}-${i}`}
          ref={(el) => (slotRefs.current[i] = el)}
          className="ring-slot ring-slot--brand"
          style={{ opacity: 0, willChange: 'transform, opacity, filter' }}
        >
          <span className="brand-card">
            {brand.logo ? (
              <img src={brand.logo} alt={brand.name} className="brand-card__logo" draggable={false} />
            ) : (
              <span className="brand-card__placeholder" aria-hidden="true" />
            )}
            <span className="brand-card__name">{brand.name}</span>
          </span>
        </div>
      ))}
    </>
  )
}
