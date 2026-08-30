import { useState } from 'react';
import Nav from '../components/Nav';
import PetalStorm from '../components/PetalStorm';
import { InstagramIcon } from '../components/Icons';
import { Field, Select } from '../components/ContactForm';
import { site, options } from '../content/site';
import { sendEnquiry, mailtoHref } from '../lib/form';

const SUBJECT = 'Projekt-Fragebogen — bluetensturm.com';

export default function Questionnaire() {
  const [state, setState] = useState({ busy: false, msg: '', ok: true });

  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setState({ busy: true, ok: true, msg: `Sending your questionnaire to ${site.email}…` });

    const res = await sendEnquiry(form, { subject: SUBJECT, formName: 'Full questionnaire' });
    if (res.ok) {
      window.location.href = '/thank-you';
      return;
    }
    setState({
      busy: false,
      ok: false,
      msg: `We could not reach the form service. Opening your mail app addressed to ${site.email} — just press send.`,
    });
    window.location.href = mailtoHref(form, SUBJECT);
  };

  return (
    <div className="page">
      <PetalStorm density={0.8} />
      <Nav simple />

      <main className="page__main">
        <div className="shell" style={{ maxWidth: 920 }}>
          <div className="page__head">
            <p className="eyebrow" style={{ margin: 0 }}>Project questionnaire</p>
            <h1 className="h1" style={{ fontSize: 'clamp(34px, 5vw, 72px)' }}>
              Tell us about<br />your <span className="gradient">business</span>.
            </h1>
            <p className="body" style={{ maxWidth: '56ch' }}>
              Ten questions, about four minutes. Everything you send goes straight to our
              partners at <a href={`mailto:${site.email}`}>{site.email}</a> — no chatbot,
              no call centre.
            </p>
          </div>

          <form className="qform" onSubmit={onSubmit}>
            <input type="text" name="_honey" className="trap" tabIndex={-1} autoComplete="off" aria-hidden="true" />

            <section className="qblock">
              <h2 className="qblock__n">01 — About you</h2>
              <div className="qgrid qgrid--2">
                <Field label="Your name"><input className="input" type="text" name="Name" required placeholder="Ihr Name" autoComplete="name" /></Field>
                <Field label="Name of your business"><input className="input" type="text" name="Business name" required placeholder="Unternehmen" autoComplete="organization" /></Field>
                <Field label="Email"><input className="input" type="email" name="Email" required placeholder="name@firma.de" autoComplete="email" /></Field>
                <Field label="Phone" hint="optional"><input className="input" type="tel" name="Phone" placeholder="+49 …" autoComplete="tel" /></Field>
                <Field label="Website" hint="optional"><input className="input" type="text" name="Website" placeholder="www…" autoComplete="url" /></Field>
                <Field label="Your role" hint="optional"><input className="input" type="text" name="Role" placeholder="Geschäftsführung, Marketing …" /></Field>
              </div>
            </section>

            <section className="qblock">
              <h2 className="qblock__n">02 — Your company</h2>
              <div className="qgrid qgrid--2">
                <Field label="Industry"><input className="input" type="text" name="Industry" placeholder="Branche" /></Field>
                <Field label="Company size"><Select name="Company size" list={options.companySize} /></Field>
                <Field label="Markets you sell in"><input className="input" type="text" name="Markets" placeholder="DACH, EU, global …" /></Field>
                <Field label="In-house marketing team?"><Select name="In-house team" list={options.inHouse} /></Field>
              </div>
            </section>

            <section className="qblock qblock--accent">
              <h2 className="qblock__n">03 — The project</h2>
              <div className="qgrid">
                <Field label="What do you need?"><Select name="Services needed" list={options.questionnaireService} /></Field>
                <Field label="What are you trying to achieve?">
                  <textarea className="input" name="Goals" rows={4} required placeholder="Was möchten Sie erreichen?" />
                </Field>
                <Field label="What has held you back so far?" hint="optional">
                  <textarea className="input" name="Obstacles" rows={3} placeholder="Budget, Kapazität, unklare Positionierung …" />
                </Field>
                <div className="qgrid qgrid--2">
                  <Field label="Budget range"><Select name="Budget" list={options.budget} /></Field>
                  <Field label="Timeline"><Select name="Timeline" list={options.timeline} /></Field>
                </div>
                <Field label="How did you hear about us?"><Select name="Source" list={options.source} /></Field>
                <Field label="Preferred language for the reply"><Select name="Reply language" list={options.replyLanguage} /></Field>
              </div>
            </section>

            <div className="contact__foot" style={{ marginTop: 0 }}>
              <div className="contact__meta">
                <a href={`mailto:${site.email}`}>{site.email}</a>
                <span>{site.name} · {site.city}</span>
                <a className="contact__ig" href={site.instagram.url} target="_blank" rel="noopener noreferrer">
                  <InstagramIcon size={16} />{site.instagram.handle}
                </a>
              </div>
              <button className="btn btn--bloom" type="submit" disabled={state.busy}>
                {state.busy ? 'Sending…' : 'Send questionnaire'}
              </button>
            </div>

            {state.msg && (
              <p className="form-note" data-ok={state.ok} role="status" aria-live="polite">{state.msg}</p>
            )}
          </form>
        </div>
      </main>

      <footer className="footer">
        <div className="shell footer__inner">
          <p className="footer__legal">© {new Date().getFullYear()} {site.legalName} · Würzburg</p>
          <a className="nav__back" href="/">{site.domain}</a>
        </div>
      </footer>
    </div>
  );
}
