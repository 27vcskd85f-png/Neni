import { useEffect } from 'react';
import Nav from '../components/Nav';
import PetalStorm from '../components/PetalStorm';
import { InstagramIcon } from '../components/Icons';
import { site } from '../content/site';

const STEPS = [
  { n: '01', title: 'We read the brief', body: 'A partner reviews your goals, market and timing.' },
  { n: '02', title: 'A route, in writing', body: 'You get an approach, a team and an honest number.' },
  { n: '03', title: '30 minutes together', body: 'A call to pressure-test it — no pitch theatre.' },
];

export default function ThankYou() {
  // Lead conversion signal. The tags only fire if a consent manager has
  // already loaded gtag/dataLayer — nothing is injected from here.
  useEffect(() => {
    try {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', { currency: 'EUR', value: 1 });
      }
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'enquiry_submitted', page: 'thank-you' });
    } catch {
      /* analytics must never break the page */
    }
  }, []);

  return (
    <div className="page">
      <PetalStorm density={1.15} scrollDrive={false} />
      <Nav simple />

      <main className="page__main" style={{ display: 'grid', placeItems: 'center' }}>
        <div className="shell thanks">
          <div className="thanks__seal">
            <span className="thanks__ring" aria-hidden="true" />
            <span className="thanks__ring" aria-hidden="true" />
            <span className="thanks__disc">
              <svg viewBox="0 0 24 24" width="46" height="46" fill="none" stroke="#fff" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4.5 12.5l5 5L20 7" />
              </svg>
            </span>
          </div>

          <p className="eyebrow" style={{ margin: 0 }}>Enquiry received</p>
          <h1 className="h1" style={{ fontSize: 'clamp(34px, 5.4vw, 78px)' }}>
            Thank you — the storm is<br />already <span className="gradient">gathering</span>.
          </h1>
          <p className="body" style={{ maxWidth: '56ch' }}>
            Your enquiry has landed with our team in Würzburg. A senior partner reads every
            brief personally and replies within two working days — often sooner.
          </p>

          <div className="thanks__steps">
            {STEPS.map((s) => (
              <div key={s.n} className="thanks__step">
                <p className="thanks__n">{s.n}</p>
                <h2 className="h4" style={{ marginBottom: 8 }}>{s.title}</h2>
                <p className="body" style={{ fontSize: 14 }}>{s.body}</p>
              </div>
            ))}
          </div>

          <div className="hero__actions" style={{ marginTop: 16 }}>
            <a className="btn btn--bloom" href={site.instagram.url} target="_blank" rel="noopener noreferrer">
              <InstagramIcon size={18} />Follow our work
            </a>
            <a className="btn btn--ghost" href="/#work">See our work</a>
          </div>

          <p className="body" style={{ fontSize: 14, marginTop: 22 }}>
            Something urgent? Write straight to <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>
      </main>

      <footer className="footer">
        <div className="shell footer__inner">
          <p className="footer__legal">© {new Date().getFullYear()} {site.legalName} · Würzburg</p>
          <a className="nav__back" href={site.instagram.url} target="_blank" rel="noopener noreferrer">
            {site.instagram.handle}
          </a>
        </div>
      </footer>
    </div>
  );
}
