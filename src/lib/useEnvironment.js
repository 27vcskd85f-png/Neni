import { useEffect, useState } from 'react';

/** Tracks a media query and re-renders when it flips. */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia(query).matches
      : false,
  );

  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mql = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

export const usePrefersReducedMotion = () =>
  useMediaQuery('(prefers-reduced-motion: reduce)');

/**
 * Classifies the device into a rendering tier once, at mount.
 *
 *   'high'   desktop GPU — full particle count, shadows, post-ish effects
 *   'low'    mobile / weak GPU — reduced particles, no shadows, capped DPR
 *   'none'   no WebGL, or the user asked for reduced motion — 2D only
 *
 * Detection is deliberately conservative: anything we cannot confirm as
 * capable is treated as 'low' rather than risking a 15fps hero section.
 */
export function detectTier() {
  if (typeof window === 'undefined') return 'none';

  // ?render=high|low|none forces a tier — for QA on machines whose GPU we
  // would otherwise (correctly) refuse, and for checking the fallback path.
  const forced = new URLSearchParams(window.location.search).get('render');
  if (forced === 'high' || forced === 'low' || forced === 'none') return forced;

  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return 'none';

  let gl = null;
  try {
    const canvas = document.createElement('canvas');
    gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
  } catch {
    gl = null;
  }
  if (!gl) return 'none';

  const coarse = window.matchMedia?.('(pointer: coarse)').matches;
  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = navigator.deviceMemory ?? 4;
  const narrow = window.innerWidth < 900;

  // Software renderers (SwiftShader, llvmpipe) report through this extension.
  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
  const renderer = debugInfo
    ? String(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || '')
    : '';
  const software = /swiftshader|llvmpipe|software|basic render/i.test(renderer);

  if (software) return 'none';
  if (coarse || narrow || cores <= 4 || memory <= 4) return 'low';
  return 'high';
}

/**
 * Returns null on the first render and a tier once detection has run, so the
 * caller can paint the 2D shell before committing to a rendering mode instead
 * of flashing the fallback art at capable devices.
 */
export function useRenderTier() {
  const reduced = usePrefersReducedMotion();
  const [tier, setTier] = useState(null);

  useEffect(() => {
    setTier(reduced ? 'none' : detectTier());
  }, [reduced]);

  return tier;
}

/**
 * Probes optional media in /public/assets with a HEAD request so a missing
 * file degrades to the procedural scene instead of a console full of 404s.
 * Returns null while probing, then true/false.
 */
export function useAssetAvailable(url) {
  const [available, setAvailable] = useState(null);

  useEffect(() => {
    if (!url) {
      setAvailable(false);
      return undefined;
    }
    let cancelled = false;
    fetch(url, { method: 'HEAD' })
      .then((res) => {
        if (cancelled) return;
        const type = res.headers.get('content-type') || '';
        // A dev server or SPA host may answer 200 with index.html for a
        // missing file — only trust a non-HTML content type.
        setAvailable(res.ok && !type.includes('text/html'));
      })
      .catch(() => {
        if (!cancelled) setAvailable(false);
      });
    return () => {
      cancelled = true;
    };
  }, [url]);

  return available;
}
