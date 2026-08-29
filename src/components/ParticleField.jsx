import { useEffect, useRef } from 'react'
import { PHASE, clamp, range } from '../lib/ring'

/**
 * The warm gold particles that carry the handover between the two rings.
 *
 * Particles are seeded on the ring's ellipse and drift outward and upward, so
 * they read as the service cards dissolving into light rather than as a generic
 * overlay. Density is driven by scroll: nothing at rest, peak mid-transition,
 * a thin residue once the brand ring has settled.
 *
 * Canvas rather than DOM nodes — a few hundred particles as elements would cost
 * far more than the ring itself.
 */
const COUNT = 260

export default function ParticleField({ sceneRef, progressRef }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const scene = sceneRef.current
    if (!canvas || !scene) return

    const ctx = canvas.getContext('2d', { alpha: true })
    let raf
    let dpr = 1
    let w = 0
    let h = 0

    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1)
      w = scene.clientWidth
      h = scene.clientHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const seed = (p) => {
      // Start on the ring ellipse, with a little scatter.
      const a = Math.random() * Math.PI * 2
      const r = 0.75 + Math.random() * 0.5
      p.x = w * 0.5 + Math.cos(a) * w * 0.375 * r
      p.y = h * 0.545 + Math.sin(a) * h * 0.135 * r
      p.vx = (Math.random() - 0.5) * 26
      p.vy = -8 - Math.random() * 34
      p.life = 0
      p.ttl = 2.2 + Math.random() * 3.4
      p.size = 0.7 + Math.random() * 2.1
      p.hue = 34 + Math.random() * 18 // amber -> warm gold
      return p
    }

    const particles = Array.from({ length: COUNT }, () => seed({}))
    let last = performance.now()

    const tick = (now) => {
      raf = requestAnimationFrame(tick)
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now

      const p = progressRef.current
      // Ramp up through the scatter, hold through the settle, thin out after.
      const rise = range(p, PHASE.scatter[0], PHASE.scatter[1])
      const fall = range(p, PHASE.settle[1], 1)
      const intensity = clamp(rise * (1 - fall * 0.82))

      ctx.clearRect(0, 0, w, h)
      if (intensity < 0.01) return

      ctx.globalCompositeOperation = 'lighter'

      for (const q of particles) {
        q.life += dt
        if (q.life > q.ttl) seed(q)

        q.x += q.vx * dt
        q.y += q.vy * dt
        q.vy += 6 * dt // slight buoyancy falloff
        q.vx *= 1 - 0.35 * dt

        const t = q.life / q.ttl
        const fade = Math.sin(Math.PI * t) // in and out over the lifetime
        const alpha = fade * intensity * 0.85
        if (alpha <= 0.01) continue

        ctx.beginPath()
        ctx.fillStyle = `hsla(${q.hue}, 92%, ${62 + fade * 16}%, ${alpha})`
        ctx.arc(q.x, q.y, q.size * (0.6 + fade * 0.7), 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalCompositeOperation = 'source-over'
    }

    raf = requestAnimationFrame(tick)
    const ro = new ResizeObserver(resize)
    ro.observe(scene)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [sceneRef, progressRef])

  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />
}
