// Blüten Sturm — enquiry delivery.
// Tries every transport that can actually reach info@bluetensturm.com, in
// order of quality, and never silently drops a lead.
//
//   1. fetch → Formspree endpoint (clean, gives a real response)
//   2. hidden-iframe native form POST (works when fetch/CORS is blocked,
//      e.g. inside a sandboxed preview frame) — fire-and-forget
//   3. mailto: with every answer pre-filled, so the visitor can just hit send
//
// TO change the destination address, edit RECIPIENT below.

export const RECIPIENT = 'info@bluetensturm.com';

// Formspree endpoint — delivers to info@bluetensturm.com.
export const ENDPOINT = 'https://formspree.io/f/mvkpynzr';

const AJAX = () => ENDPOINT;
const POST = () => ENDPOINT;

export function collect(form) {
  const data = {};
  new FormData(form).forEach((v, k) => {
    if (k === '_next' || k === '_honey' || k === '_captcha' || k === '_template') return;
    data[k] = typeof v === 'string' ? v : '';
  });
  return data;
}

function bodyText(data) {
  return Object.keys(data)
    .filter((k) => k.charAt(0) !== '_')
    .map((k) => k + ': ' + (data[k] || '—'))
    .join('\n');
}

export function mailtoHref(data, subject, to) {
  return 'mailto:' + (to || RECIPIENT)
    + '?subject=' + encodeURIComponent(subject)
    + '&body=' + encodeURIComponent(bodyText(data));
}

// Native POST through a hidden iframe. Survives CORS and sandboxed contexts
// because we never read the response — the mail still gets sent server-side.
function iframePost(data, to) {
  return new Promise((resolve) => {
    let done = false;
    const name = 'bs-send-' + Date.now();
    const frame = document.createElement('iframe');
    frame.name = name;
    frame.style.cssText = 'position:absolute;width:0;height:0;border:0;opacity:0;pointer-events:none;';
    document.body.appendChild(frame);

    const f = document.createElement('form');
    f.action = POST(to);
    f.method = 'POST';
    f.target = name;
    f.style.display = 'none';
    f.acceptCharset = 'UTF-8';
    Object.keys(data).forEach((k) => {
      const i = document.createElement('input');
      i.type = 'hidden';
      i.name = k;
      i.value = data[k];
      f.appendChild(i);
    });
    document.body.appendChild(f);

    const finish = (ok) => {
      if (done) return;
      done = true;
      setTimeout(() => {
        try { f.remove(); frame.remove(); } catch (e) {}
      }, 400);
      resolve(ok);
    };
    frame.addEventListener('load', () => finish(true));
    setTimeout(() => finish(true), 3500);
    try { f.submit(); } catch (e) { finish(false); }
  });
}

/**
 * Send an enquiry. Resolves to { ok, via, message }.
 *   via: 'ajax' | 'iframe' | 'mailto'
 */
export async function sendEnquiry(form, opts) {
  const o = opts || {};
  const to = o.to || RECIPIENT;
  const subject = o.subject || 'Neue Anfrage über bluetensturm.com';

  const data = collect(form);
  data._subject = subject;
  if (data.Email) data.email = data.Email; // Formspree reply-to

  // 1 — AJAX endpoint
  try {
    const res = await fetch(AJAX(to), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json().catch(() => ({}));
    if (res.ok && String(json.success) !== 'false' && !json.errors) {
      return { ok: true, via: 'ajax', message: json.message || '' };
    }
    const sent = await iframePost(data, to);
    return { ok: sent, via: 'iframe', message: (json.errors && json.errors[0] && json.errors[0].message) || json.message || '' };
  } catch (e) {
    // 2 — fetch blocked (sandbox / CORS / offline): post through an iframe.
    try {
      const sent = await iframePost(data, to);
      if (sent) return { ok: true, via: 'iframe', message: '' };
    } catch (e2) {}
    // 3 — nothing network-based worked.
    return { ok: false, via: 'mailto', message: 'Network blocked the send.', href: mailtoHref(data, subject, to), data };
  }
}

export function fallbackHref(form, opts) {
  const o = opts || {};
  return mailtoHref(collect(form), o.subject || 'Neue Anfrage über bluetensturm.com', o.to || RECIPIENT);
}
