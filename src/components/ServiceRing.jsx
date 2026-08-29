import { useEffect, useRef } from 'react'
import { SERVICES } from '../data/services'
import ServiceIcon from './ServiceIcon'
import {
  PHASE,
  INTERACTIVE_UNTIL,
  TAU,
  clamp,
  easeInSoft,
  lerp,
  project,
  range,
  slotAngle,
} from '../lib/ring'

const N = SERVICES.length
const MAX_POINTER_SPIN = 0.42 // radians the ring leans toward the cursor
const IDLE_SPIN = 0.035 // radians/second of slow drift, so it never looks frozen

/**
 * The 18 service cards, laid out on the projected ring.
 *
 * Returns a fragment rather than a wrapper so the cards are siblings of the
 * character plate in the same stacking context — that is what lets a card with
 * z-index below CHARACTER_Z genuinely render behind the figure.
 *
 * Positioning runs in a rAF loop writing straight to the DOM. React renders the
 * cards once; the 60fps work never touches component state.
 */
export default function ServiceRing({ sceneRef, progressRef, pointerRef, onSelect, frozen }) {
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
      const scatter = range(p, ...PHASE.scatter)

      // Ring leans toward the cursor and drifts slowly on its own. Damped
      // toward the target so a fast pointer move never snaps the ring.
      const target = pointerRef.current.x * MAX_POINTER_SPIN
      spinRef.current += (target - spinRef.current) * Math.min(1, dt * 3.5)
      const spin = spinRef.current + now / 1000 * IDLE_SPIN

      const interactive = !frozen.current && p < INTERACTIVE_UNTIL
      const eased = easeInSoft(scatter)

      for (let i = 0; i < N; i++) {
        const el = slotRefs.current[i]
        if (!el) continue

        const angle = slotAngle(i, N, spin)
        // Cards accelerate outward and lift as they dissolve.
        const radiusMul = 1 + 1.15 * eased
        const g = project(angle, radiusMul, box)

        const scale = g.scale * (SERVICES[i].featured ? 1.10 : 1) * lerp(1, 1.25, eased)
        const opacity = g.opacity * (1 - clamp(scatter * 1.15))
        const blur = g.blur + 12 * eased
        const lift = -box.h * 0.10 * eased

        el.style.transform =
          `translate3d(${g.x.toFixed(2)}px, ${(g.y + lift).toFixed(2)}px, 0)` +
          ` translate(-50%, -50%) scale(${scale.toFixed(3)}) rotateY(${g.turn.toFixed(3)}rad)`
        el.style.zIndex = String(g.z)
        el.style.opacity = opacity.toFixed(3)
        el.style.filter = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : 'none'

        const live = interactive && opacity > 0.35
        el.style.pointerEvents = live ? 'auto' : 'none'
        el.tabIndex = live ? 0 : -1
        el.setAttribute('aria-hidden', live ? 'false' : 'true')
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [sceneRef, progressRef, pointerRef, frozen])

  return (
    <>
      {SERVICES.map((service, i) => (
        <button
          key={service.id}
          ref={(el) => (slotRefs.current[i] = el)}
          type="button"
          onClick={() => onSelect(service.id)}
          className="ring-slot"
          style={{ willChange: 'transform, opacity, filter' }}
          aria-label={service.name}
        >
          <span className={`ring-card${service.featured ? ' ring-card--featured' : ''}`}>
            <span className="ring-card__glow" aria-hidden="true" />
            <ServiceIcon name={service.icon} className="ring-card__icon" />
            <span className="ring-card__label">{service.name}</span>
          </span>
        </button>
      ))}
    </>
  )
}
