import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Reveal from '../components/Reveal';
import Counter from '../components/Counter';
import PetalStorm from '../components/PetalStorm';
import Embers from '../components/Embers';
import ContactForm from '../components/ContactForm';
import Logo from '../components/Logo';
import {
  site, heroCta, about, disciplines, why, work, training, contact,
} from '../content/site';

export default function Home() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <PetalStorm />
      <Embers />
      <Nav />

      <main id="main">
        <Hero />

        <section id="hero-cta" className="section section--tight">
          <Reveal className="shell" style={{ textAlign: 'center', display: 'grid', justifyItems: 'center', gap: 24 }}>
            <p className="eyebrow" style={{ margin: 0 }}>{heroCta.eyebrow}</p>
            <h2 className="h2">{heroCta.title[0]}<br />{heroCta.title[1]}</h2>
            <p className="body" style={{ maxWidth: '62ch' }}>{heroCta.body}</p>
            <div className="hero__actions" style={{ marginTop: 12 }}>
              <a className="btn btn--bloom" href="#contact">Start a project</a>
              <a className="btn btn--ghost" href="#services">What we do</a>
            </div>
          </Reveal>
        </section>

        <section id="about" className="section">
          <div className="shell about__grid">
            <Reveal>
              <p className="eyebrow">{about.eyebrow}</p>
              <h2 className="h2">{about.title[0]}<br />{about.title[1]}</h2>
              <div className="about__mark"><Logo size={110} withWordmark={false} id="about" /></div>
            </Reveal>
            <Reveal delay={120}>
              <p className="lead" style={{ marginBottom: 26 }}>{about.lead}</p>
              <p className="body">{about.body}</p>
              <div className="stats">
                {about.stats.map((s) => (
                  <div key={s.label}>
                    <Counter className="stat__value" value={s.value} suffix={s.suffix} />
                    <div className="stat__label">{s.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="services" className="section">
          <div className="shell">
            <Reveal className="head head--split">
              <div>
                <p className="eyebrow">{disciplines.eyebrow}</p>
                <h2 className="h2">{disciplines.title[0]}<br />{disciplines.title[1]}</h2>
              </div>
              <p className="body head__aside">{disciplines.aside}</p>
            </Reveal>

            <div className="services">
              {disciplines.items.map((d, i) => (
                <Reveal
                  key={d.n}
                  delay={(i % 3) * 80}
                  className={[
                    'card', 'services__item',
                    d.wide && 'services__item--wide card--bloom',
                    d.accent && 'card--accent',
                  ].filter(Boolean).join(' ')}
                >
                  <p className="services__n">{d.n}</p>
                  <h3 className="h3" style={{ marginBottom: 16 }}>{d.title}</h3>
                  <p className="body" style={{ maxWidth: '56ch' }}>{d.body}</p>
                  {d.tags && (
                    <div className="services__tags">
                      {d.tags.map((t) => <span key={t} className="pill">{t}</span>)}
                    </div>
                  )}
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section why">
          <div className="shell">
            <Reveal className="head">
              <p className="eyebrow" style={{ margin: 0 }}>{why.eyebrow}</p>
              <h2 className="h2" style={{ maxWidth: '18ch' }}>{why.title}</h2>
            </Reveal>
            <div className="why__grid">
              {why.items.map((w, i) => (
                <Reveal key={w.title} delay={i * 80} className="why__item">
                  <h3 className="h4" style={{ marginBottom: 14 }}>{w.title}</h3>
                  <p className="body" style={{ fontSize: 15 }}>{w.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="section">
          <div className="shell">
            <Reveal className="head head--split">
              <div>
                <p className="eyebrow">{work.eyebrow}</p>
                <h2 className="h2">{work.title}</h2>
              </div>
              <a className="altlink" href={work.link.href}>{work.link.label}</a>
            </Reveal>

            <div className="work">
              {work.items.map((item, i) => (
                <Reveal key={item.title} delay={(i % 2) * 100} className="card work__item">
                  <figure className="work__figure">
                    <img
                      src={item.image}
                      alt={`Commissioned artwork for ${item.title}`}
                      loading="lazy"
                      width="1600"
                      height="900"
                    />
                    {item.pending && <figcaption className="work__badge">Case detail on request</figcaption>}
                  </figure>
                  <div className="work__body">
                    <p className="work__kicker">{item.kicker}</p>
                    <h3 className="h3" style={{ marginBottom: 10 }}>{item.title}</h3>
                    <p className="body" style={{ fontSize: 15 }}>{item.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="training" className="section">
          <div className="shell training__grid">
            <Reveal>
              <p className="eyebrow">{training.eyebrow}</p>
              <h2 className="h2" style={{ marginBottom: 26 }}>{training.title}</h2>
              <p className="lead" style={{ maxWidth: '54ch' }}>{training.body}</p>
              <div className="training__tags">
                {training.tags.map((t) => <span key={t} className="pill pill--warm">{t}</span>)}
              </div>
              <a className="btn btn--bloom" href={training.cta.href}>{training.cta.label}</a>
            </Reveal>
            <Reveal delay={120} className="training__modules">
              {training.modules.map((m) => (
                <div key={m.n} className="card training__module">
                  <p className="training__n">{m.n}</p>
                  <h3 className="h4" style={{ marginBottom: 8 }}>{m.title}</h3>
                  <p className="body" style={{ fontSize: 15 }}>{m.body}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="shell" style={{ maxWidth: 1080 }}>
            <Reveal className="contact__head">
              <p className="eyebrow" style={{ margin: 0 }}>{contact.eyebrow}</p>
              <h2 className="h2"><span className="gradient">{contact.title}</span></h2>
              <p className="body" style={{ maxWidth: '52ch' }}>{contact.body}</p>
              <a className="altlink" href="/questionnaire">Prefer the full questionnaire?</a>
            </Reveal>
            <Reveal delay={100}><ContactForm /></Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
