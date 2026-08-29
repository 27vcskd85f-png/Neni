import { useState } from 'react';
import { site, assets } from '../content/site';
import { useAssetAvailable } from '../lib/useEnvironment';
import Logo from './Logo';

/**
 * Closing chapter: the convergence beat, the ask, and the way to reach us.
 *
 * The form has no backend on purpose — bluetensturm.com is static hosting on
 * STRATO, so submitting composes a pre-filled mail to info@bluetensturm.com
 * in the visitor's own client. If a form endpoint is added later, swap the
 * onSubmit body for a fetch(); nothing else here needs to change.
 */
export default function CtaSection({ chapter }) {
  const [form, setForm] = useState({ name: '', company: '', message: '' });
  const [sent, setSent] = useState(false);
  const hasConverge = useAssetAvailable(assets.logoConverge);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = (event) => {
    event.preventDefault();
    const subject = encodeURIComponent(
      `New enquiry — ${form.company || form.name || 'Website'}`,
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nCompany: ${form.company}\n\n${form.message}\n`,
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section
      id={chapter.id}
      aria-labelledby={`${chapter.id}-title`}
      // Exactly one viewport, unlike the 135vh story chapters. That is what
      // puts this chapter's camera keyframe at scroll progress 1.0: with n-1
      // chapters of CHAPTER_VH above it, the scrollable range works out to
      // exactly (n-1) equal slices, so every keyframe lands on its chapter.
      style={{ minHeight: '100vh' }}
      className="relative z-20 flex items-center"
    >
      {/* Not pinned: the block is centred in that final viewport, and simply
          scrolls if a short window cannot hold all of it. */}
      <div className="mx-auto w-full max-w-7xl px-5 py-[clamp(2rem,6vh,5rem)] sm:px-8">
        <div className="relative flex flex-col items-center gap-[clamp(1rem,2.6vh,1.75rem)] text-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-[10%] -bottom-[8%] -top-[10%] -z-10 bg-[radial-gradient(62%_58%_at_50%_34%,rgba(18,20,28,0.86)_0%,rgba(18,20,28,0.52)_54%,rgba(18,20,28,0)_100%)]"
          />
          {/* The A5 convergence clip plays here when present; the WebGL
              particle convergence runs underneath either way. */}
          {hasConverge && (
            <video
              className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto w-full max-w-3xl opacity-60 mix-blend-screen"
              src={assets.logoConverge}
              autoPlay
              loop
              muted
              playsInline
              aria-hidden="true"
            />
          )}

          <div className="flex max-w-2xl flex-col items-center gap-[clamp(0.5rem,1.4vh,1rem)]">
            <p className="eyebrow">{chapter.eyebrow}</p>
            <h2
              id={`${chapter.id}-title`}
              className="font-display text-[clamp(1.85rem,min(5.4vw,7.5vh),3.6rem)] font-semibold leading-[1.03] tracking-tight"
            >
              <span className="gradient-text">{chapter.title}</span>
            </h2>
            <p className="max-w-lg text-[1.02rem] leading-relaxed text-chalk/70">
              {chapter.lede}
            </p>
          </div>

          <form
            onSubmit={onSubmit}
            className="glass-strong w-full max-w-xl rounded-3xl p-6 text-left shadow-panel sm:p-[clamp(1.25rem,3vh,1.75rem)]"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                id="cf-name"
                label="Name"
                value={form.name}
                onChange={set('name')}
                required
              />
              <Field
                id="cf-company"
                label="Company"
                value={form.company}
                onChange={set('company')}
              />
            </div>

            <div className="mt-[clamp(0.75rem,2vh,1rem)]">
              <label
                htmlFor="cf-message"
                className="mb-1.5 block font-display text-[0.78rem] font-medium uppercase tracking-widest text-chalk/50"
              >
                What are you working on?
              </label>
              <textarea
                id="cf-message"
                rows={4}
                required
                value={form.message}
                onChange={set('message')}
                className="w-full resize-y rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-[0.95rem] text-chalk placeholder-chalk/30 outline-none transition-colors focus:border-amber/60"
                placeholder="A relaunch, a campaign, a team that needs training…"
              />
            </div>

            <div className="mt-[clamp(0.75rem,2vh,1.25rem)] flex flex-wrap items-center justify-between gap-4">
              <button type="submit" className="btn-bloom">
                {site.cta.label}
                <span aria-hidden="true">→</span>
              </button>
              <a
                href={`mailto:${site.email}`}
                className="font-display text-[0.9rem] text-chalk/60 underline decoration-white/20 underline-offset-4 transition-colors hover:text-amber"
              >
                {site.email}
              </a>
            </div>

            <p
              role="status"
              aria-live="polite"
              className={`mt-4 text-[0.85rem] text-amber transition-opacity duration-300 ${
                sent ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {sent
                ? 'Opening your mail client — if nothing happens, write to us directly at the address above.'
                : ' '}
            </p>
          </form>

          <footer className="mt-[clamp(0.5rem,1.5vh,1rem)] flex w-full flex-col items-center gap-4 border-t border-white/10 pt-[clamp(1rem,2.5vh,1.5rem)] text-[0.82rem] text-chalk/45 sm:flex-row sm:justify-between">
            <Logo />
            <p>{site.legal}</p>
            <a
              href={`https://${site.domain}`}
              className="transition-colors hover:text-chalk/80"
            >
              {site.domain}
            </a>
          </footer>
        </div>
      </div>
    </section>
  );
}

function Field({ id, label, ...props }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block font-display text-[0.78rem] font-medium uppercase tracking-widest text-chalk/50"
      >
        {label}
      </label>
      <input
        id={id}
        type="text"
        className="w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-[0.95rem] text-chalk placeholder-chalk/30 outline-none transition-colors focus:border-amber/60"
        {...props}
      />
    </div>
  );
}
