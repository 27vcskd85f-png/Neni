import { site } from '../content/site';

/** Collects a form's named fields, skipping the honeypot and internals. */
export function collect(form) {
  const out = {};
  new FormData(form).forEach((v, k) => {
    if (k.startsWith('_') || !String(v).trim()) return;
    out[k] = String(v);
  });
  return out;
}

/** A pre-filled mail to us — the fallback when the form service is down. */
export function mailtoHref(form, subject) {
  const data = collect(form);
  const body = Object.entries(data)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n');
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Posts the enquiry to Formspree.
 *
 * Returns { ok } rather than throwing, so the caller can decide between
 * routing to the thank-you page and opening the visitor's mail client. A
 * honeypot field catches the bots that fill in every input they find.
 */
export async function sendEnquiry(form, { subject, formName }) {
  const trap = form.querySelector('input[name="_honey"]');
  if (trap && trap.value) return { ok: true, skipped: true };

  const payload = new FormData(form);
  payload.set('_subject', subject);
  payload.set('Form', formName);
  payload.delete('_honey');

  try {
    const res = await fetch(site.formEndpoint, {
      method: 'POST',
      body: payload,
      headers: { Accept: 'application/json' },
    });
    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}
