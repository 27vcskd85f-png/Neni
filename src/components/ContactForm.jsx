import { useState } from 'react';
import { InstagramIcon } from './Icons';
import { site, options } from '../content/site';
import { sendEnquiry, mailtoHref } from '../lib/form';

const SUBJECT = 'Neue Anfrage über bluetensturm.com';

function Field({ label, hint, children }) {
  return (
    <label className="field">
      <span>{label} {hint && <em>({hint})</em>}</span>
      {children}
    </label>
  );
}

const Select = ({ name, list }) => (
  <select className="input" name={name} defaultValue="">
    <option value="" disabled>Please choose…</option>
    {list.map((o) => <option key={o} value={o}>{o}</option>)}
  </select>
);

/** The short enquiry form on the home page. */
export default function ContactForm() {
  const [state, setState] = useState({ busy: false, msg: '', ok: false });

  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setState({ busy: true, msg: `Sending your enquiry to ${site.email}…`, ok: true });

    const res = await sendEnquiry(form, { subject: SUBJECT, formName: 'Short enquiry' });
    if (res.ok) {
      window.location.href = '/thank-you';
      return;
    }
    // Formspree unreachable — hand the visitor a pre-filled mail instead of
    // losing what they typed.
    setState({
      busy: false,
      ok: false,
      msg: `We could not reach the form service. Opening your mail app addressed to ${site.email} — just press send.`,
    });
    window.location.href = mailtoHref(form, SUBJECT);
  };

  return (
    <form className="contact__form" onSubmit={onSubmit} noValidate={false}>
      <input type="text" name="_honey" className="trap" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <Field label="Your name"><input className="input" type="text" name="Name" required placeholder="Ihr Name" autoComplete="name" /></Field>
      <Field label="Business name"><input className="input" type="text" name="Business" required placeholder="Name Ihres Unternehmens" autoComplete="organization" /></Field>
      <Field label="Email"><input className="input" type="email" name="Email" required placeholder="name@firma.de" autoComplete="email" /></Field>
      <Field label="Phone" hint="optional"><input className="input" type="tel" name="Phone" placeholder="+49 …" autoComplete="tel" /></Field>

      <Field label="Interested in"><Select name="Service" list={options.service} /></Field>
      <Field label="Company size"><Select name="Company size" list={options.companySize} /></Field>
      <Field label="Budget range"><Select name="Budget" list={options.budget} /></Field>
      <Field label="Timeline"><Select name="Timeline" list={options.timeline} /></Field>

      <div className="contact__span">
        <Field label="Project">
          <textarea className="input" name="Project" rows={5} required placeholder="Was möchten Sie erreichen?" />
        </Field>
      </div>
      <div className="contact__span">
        <Field label="How did you hear about us?"><Select name="Source" list={options.source} /></Field>
      </div>

      <div className="contact__foot">
        <div className="contact__meta">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <span>{site.name} · {site.city}</span>
          <a className="contact__ig" href={site.instagram.url} target="_blank" rel="noopener noreferrer">
            <InstagramIcon size={16} />{site.instagram.handle}
          </a>
        </div>
        <button className="btn btn--bloom" type="submit" disabled={state.busy}>
          {state.busy ? 'Sending…' : 'Send enquiry'}
        </button>
      </div>

      {state.msg && (
        <p className="form-note contact__span" data-ok={state.ok} role="status" aria-live="polite">
          {state.msg}
        </p>
      )}
    </form>
  );
}

export { Field, Select };
