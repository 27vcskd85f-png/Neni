import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

/**
 * Multi-page build: three real HTML documents rather than a client-side
 * router, so /questionnaire and /thank-you are indexable, shareable and
 * survive a hard refresh on any static host with no redirect rules.
 */
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 2048,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        questionnaire: resolve(__dirname, 'questionnaire.html'),
        thankYou: resolve(__dirname, 'thank-you.html'),
      },
      output: {
        // three.js is the one heavy dependency; keep it out of the shared
        // chunk so the sub-pages are not paying for the full hero.
        manualChunks: { three: ['three'] },
      },
    },
  },
});
