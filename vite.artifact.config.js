import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Single-file build, used only to publish a shareable preview of the site.
 *
 * The production build in vite.config.js deliberately splits three/R3F/GSAP
 * into their own chunks and lazy-loads the canvas. An Artifact is one HTML
 * document, so here everything collapses into a single module that gets
 * inlined by scripts/build-artifact.mjs. This config is not what ships to
 * bluetensturm.com.
 */
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist-artifact',
    cssCodeSplit: false,
    assetsInlineLimit: 100_000_000, // inline every asset as a data URI
    modulePreload: false,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        manualChunks: undefined,
        entryFileNames: 'app.js',
        assetFileNames: 'app.[ext]',
      },
    },
  },
});
