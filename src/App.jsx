import HeroScene from './components/HeroScene'
import ReducedMotionHero from './components/ReducedMotionHero'
import Logo from './components/Logo'
import { useMotionProfile } from './hooks/useMotionProfile'

export default function App() {
  const profile = useMotionProfile()
  const reduced = profile === 'reduced'

  return (
    <>
      {/* Mounted outside the scroll container: fixed, permanent, never fades. */}
      <Logo reducedMotion={reduced} />

      <main>
        {reduced ? <ReducedMotionHero /> : <HeroScene />}

        <section className="contact" id="contact">
          <h2 className="contact__title">Let’s talk.</h2>
          <p className="contact__sub">
            Tell us what you are trying to move, and we will tell you what it takes.
          </p>
          <a className="contact__cta" href="mailto:hello@bluetensturm.com">
            hello@bluetensturm.com
          </a>
        </section>
      </main>
    </>
  )
}
