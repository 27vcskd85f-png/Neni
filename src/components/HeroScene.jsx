import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ServiceRing from './ServiceRing'
import BrandRing from './BrandRing'
import ParticleField from './ParticleField'
import ServiceOverlay from './ServiceOverlay'
import { BRAND_RING_COPY } from '../data/brands'
import { CHARACTER_Z, PHASE, clamp, lerp, range } from '../lib/ring'

// Which slice of ring-video-2 to scrub. The clip opens on a face close-up and
// pulls back into the ring; we use only the wide back half, where the camera is
// already at ring distance and the gold particles are drifting. That is the part
// that matches what the transition is doing on top of it.
const V2_START = 4.1
const V2_END = 9.6
const V2_SCRUB = [0.22, 0.9]

export default function HeroScene() {
  const wrapRef = useRef(null)
  const sceneRef = useRef(null)
  const characterRef = useRef(null)
  const video1Ref = useRef(null)
  const video2Ref = useRef(null)

  const progressRef = useRef(0)
  const pointerRef = useRef({ x: 0, y: 0 })
  const frozenRef = useRef(false)

  const [activeId, setActiveId] = useState(null)

  // Stable identity: ServiceOverlay's effect depends on it, and a new function
  // each render would tear down and re-run the focus trap mid-open.
  const closeOverlay = useCallback(() => setActiveId(null), [])
  const openOverlay = useCallback((id) => setActiveId(id), [])

  // Scroll drives everything. We keep the value in a ref for the rAF loops and
  // use motion values only for the few things React should actually re-style.
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start start', 'end end'],
  })

  useEffect(() => {
    progressRef.current = scrollYProgress.get()
    return scrollYProgress.on('change', (v) => {
      progressRef.current = v
    })
  }, [scrollYProgress])

  // Opening the overlay freezes ring interaction underneath it.
  useEffect(() => {
    frozenRef.current = activeId !== null
  }, [activeId])

  // Pointer position, normalised to [-1, 1] over the viewport.
  useEffect(() => {
    const onMove = (e) => {
      pointerRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      }
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  // Character plate + backdrop videos.
  useEffect(() => {
    let raf
    let lastSeek = -1

    const tick = (now) => {
      raf = requestAnimationFrame(tick)
      const p = progressRef.current
      const { x: px, y: py } = pointerRef.current

      // --- character -------------------------------------------------------
      const el = characterRef.current
      if (el) {
        // The camera pulls back across the sequence, so the figure recedes.
        const scale = lerp(1.0, 0.88, clamp(range(p, 0.2, 0.85)))
        // A flat plate cannot turn its head, so the whole figure leans toward
        // the cursor instead — the honest 2D reading of "tracks the pointer".
        const rotY = px * 4.2
        const rotX = -py * 2.6
        const breathe = Math.sin(now / 2600) * 5
        const driftX = px * 14

        el.style.transform =
          `translate3d(calc(-50% + ${driftX.toFixed(1)}px), calc(-50% + ${breathe.toFixed(1)}px), 0)` +
          ` scale(${scale.toFixed(3)}) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`
      }

      // --- ambient backdrop (ring-video-1) ---------------------------------
      const v1 = video1Ref.current
      if (v1) {
        v1.style.opacity = (0.52 * (1 - clamp(range(p, 0.18, 0.46)))).toFixed(3)
      }

      // --- scrubbed backdrop (ring-video-2) --------------------------------
      const v2 = video2Ref.current
      if (v2 && v2.readyState >= 2) {
        const t = range(p, ...V2_SCRUB)
        v2.style.opacity = (0.6 * clamp(range(p, 0.2, 0.42)) * (1 - clamp(range(p, 0.92, 1)) * 0.5)).toFixed(3)
        const target = lerp(V2_START, Math.min(V2_END, v2.duration || V2_END), t)
        // Only seek on a real change; a seek per frame stalls the decoder.
        if (Math.abs(target - lastSeek) > 1 / 48) {
          lastSeek = target
          try {
            v2.currentTime = target
          } catch {
            /* seeking before metadata is ready — next frame will retry */
          }
        }
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  // ring-video-1 loops on its own as ambient light; it is never scrubbed.
  useEffect(() => {
    const v1 = video1Ref.current
    if (!v1) return
    const play = () => v1.play().catch(() => {})
    play()
    document.addEventListener('visibilitychange', play)
    return () => document.removeEventListener('visibilitychange', play)
  }, [])

  const hintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0])
  const brandCopyOpacity = useTransform(scrollYProgress, [0.62, 0.76, 0.97, 1], [0, 1, 1, 0.85])
  const brandCopyY = useTransform(scrollYProgress, [0.62, 0.78], [26, 0])
  const introOpacity = useTransform(scrollYProgress, [0, 0.14], [1, 0])

  return (
    <>
      <div ref={wrapRef} className="hero-wrap" id="hero">
        <div ref={sceneRef} className="hero-scene">
          {/* Backdrops -------------------------------------------------- */}
          {/* WebM first: VP9 seeks well and covers Chromium builds shipped
              without H.264. MP4/H.264 is the fallback for Safari. */}
          <video
            ref={video1Ref}
            className="hero-video hero-video--ambient"
            poster="/media/hero/ring-video-1-poster.jpg"
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
          >
            <source src="/media/hero/ring-video-1.webm" type="video/webm" />
            <source src="/media/hero/ring-video-1.mp4" type="video/mp4" />
          </video>
          <video
            ref={video2Ref}
            className="hero-video hero-video--scrub"
            poster="/media/hero/ring-video-2-poster.jpg"
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
          >
            <source src="/media/hero/ring-video-2.webm" type="video/webm" />
            <source src="/media/hero/ring-video-2.mp4" type="video/mp4" />
          </video>
          <div className="hero-vignette" aria-hidden="true" />

          {/* Rings and character share one stacking context so that cards with
              z-index below CHARACTER_Z genuinely pass behind the figure. */}
          <div className="hero-stage">
            <ServiceRing
              sceneRef={sceneRef}
              progressRef={progressRef}
              pointerRef={pointerRef}
              onSelect={openOverlay}
              frozen={frozenRef}
            />

            <img
              ref={characterRef}
              className="hero-character"
              style={{ zIndex: CHARACTER_Z }}
              src="/media/hero/character-plate.webp"
              alt=""
              aria-hidden="true"
              draggable={false}
            />

            <BrandRing sceneRef={sceneRef} progressRef={progressRef} pointerRef={pointerRef} />
          </div>

          <ParticleField sceneRef={sceneRef} progressRef={progressRef} />

          {/* Copy ------------------------------------------------------- */}
          <motion.div className="hero-intro" style={{ opacity: introOpacity }}>
            <h1 className="hero-intro__title">
              A creative and marketing agency<span className="hero-intro__accent">.</span>
            </h1>
            <p className="hero-intro__sub">
              Eighteen services, one team. Choose where you want to start.
            </p>
          </motion.div>

          <motion.div className="hero-brandcopy" style={{ opacity: brandCopyOpacity, x: '-50%', y: brandCopyY }}>
            <h2 className="hero-brandcopy__title">{BRAND_RING_COPY.heading}</h2>
            <p className="hero-brandcopy__sub">{BRAND_RING_COPY.subtext}</p>
          </motion.div>

          <motion.div className="hero-hint" style={{ opacity: hintOpacity }} aria-hidden="true">
            <span>Scroll</span>
            <span className="hero-hint__line" />
          </motion.div>
        </div>
      </div>

      <ServiceOverlay activeId={activeId} onClose={closeOverlay} />
    </>
  )
}
