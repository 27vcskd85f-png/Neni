import { lazy, Suspense } from 'react';
import { chapters } from './content/chapters';
import { ScrollProvider } from './scroll/ScrollProvider';
import { useRenderTier } from './lib/useEnvironment';
import Nav from './ui/Nav';
import Backdrop from './ui/Backdrop';
import ChapterSection, { ChapterRail } from './ui/ChapterSection';
import CtaSection from './ui/CtaSection';
import TransitionBurst from './ui/TransitionBurst';

// three.js and its friends are the heaviest thing on the page — keep them out
// of the initial bundle so the copy is on screen before they are parsed.
const ThreeStage = lazy(() => import('./three/ThreeStage'));

export default function App() {
  const tier = useRenderTier();

  // null = still detecting. Paint the 2D shell, commit to nothing yet.
  const immersive = tier === 'high' || tier === 'low';
  const still = tier === 'none';

  return (
    <ScrollProvider>
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-amber focus:px-5 focus:py-2 focus:font-display focus:text-night"
      >
        Skip to content
      </a>

      <Backdrop still={still} />

      {immersive && (
        <Suspense fallback={null}>
          <ThreeStage tier={tier} />
        </Suspense>
      )}

      {immersive && <TransitionBurst />}

      <Nav />
      <ChapterRail />

      <main id="main" className="relative z-20">
        {chapters.map((chapter, index) =>
          chapter.id === 'cta' ? (
            <CtaSection key={chapter.id} chapter={chapter} index={index} />
          ) : (
            <ChapterSection
              key={chapter.id}
              chapter={chapter}
              index={index}
              // With no canvas, the service chips are the only thing carrying
              // each chapter visually — so show them at every breakpoint.
              showPanelList={still}
            />
          ),
        )}
      </main>
    </ScrollProvider>
  );
}
