import { Suspense, lazy, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useAssetAvailable } from '../lib/useEnvironment';
import { assets } from '../content/site';
import { chapters } from '../content/chapters';

const Scene = lazy(() => import('./Scene'));

/**
 * The fixed, full-viewport WebGL layer.
 *
 * Mounted only after the first paint (and only on a capable device), so the
 * 2D hero is readable before three.js is parsed. Everything visual lives in
 * <Scene>; this file is purely the host.
 */
export default function ThreeStage({ tier }) {
  const [mounted, setMounted] = useState(false);
  const hasModel = useAssetAvailable(assets.characterModel);

  useEffect(() => {
    // Two frames of headroom lets the DOM hero paint and the fonts settle
    // before the 3D bundle starts competing for the main thread.
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setMounted(true));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-10"
      aria-hidden="true"
      data-testid="three-stage"
    >
      <Canvas
        // Cap the pixel ratio: retina at 3× costs ~9× the fill rate for a
        // difference nobody sees on a dark, hazy scene.
        dpr={tier === 'high' ? [1, 1.75] : [1, 1.25]}
        gl={{
          antialias: tier === 'high',
          powerPreference: 'high-performance',
          alpha: true,
        }}
        camera={{
          position: chapters[0].camera.position,
          fov: chapters[0].camera.fov ?? 42,
          near: 0.1,
          far: 60,
        }}
        // The scene is lit entirely by our own lights; no tone-map surprises.
        flat
      >
        <Suspense fallback={null}>
          <Scene tier={tier} useModel={hasModel === true} />
        </Suspense>
      </Canvas>
    </div>
  );
}
