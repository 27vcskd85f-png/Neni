import { useEffect, useState } from 'react'

// Decides how much motion this device should get.
//
//   'full'    — scroll-scrubbed video, 3D ring, particle field
//   'reduced' — static character plate, CSS-grid cards, no video, no scrub
//
// We drop to 'reduced' for prefers-reduced-motion, for small viewports, and for
// devices that look low-powered or are on a metered connection. Scroll-scrubbed
// video is the expensive part, so the bar for keeping it is deliberately high.
function detect() {
  if (typeof window === 'undefined') return 'reduced'

  // Manual override, for previewing either path on any machine:
  //   ?motion=full     force the full ring sequence
  //   ?motion=reduced  force the static fallback
  const forced = new URLSearchParams(window.location.search).get('motion')
  if (forced === 'full' || forced === 'reduced') return forced

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) return 'reduced'

  // Coarse pointer + narrow viewport: phones and small tablets.
  if (window.innerWidth < 900) return 'reduced'

  const cores = navigator.hardwareConcurrency
  if (typeof cores === 'number' && cores > 0 && cores <= 4) return 'reduced'

  const conn = navigator.connection
  if (conn) {
    if (conn.saveData) return 'reduced'
    if (typeof conn.effectiveType === 'string' && /(^|-)2g$/.test(conn.effectiveType)) return 'reduced'
  }

  if (typeof navigator.deviceMemory === 'number' && navigator.deviceMemory <= 4) return 'reduced'

  return 'full'
}

export function useMotionProfile() {
  // Start at 'reduced' so the cheap path renders first and we only upgrade once
  // we've measured the client. Avoids shipping video to a device that can't use it.
  const [profile, setProfile] = useState('reduced')

  useEffect(() => {
    const update = () => setProfile(detect())
    update()

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    mq.addEventListener('change', update)

    let t
    const onResize = () => {
      clearTimeout(t)
      t = setTimeout(update, 200)
    }
    window.addEventListener('resize', onResize)

    return () => {
      mq.removeEventListener('change', update)
      window.removeEventListener('resize', onResize)
      clearTimeout(t)
    }
  }, [])

  return profile
}
