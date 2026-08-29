import { Suspense } from 'react';
import { chapters, chapterIndex } from '../content/chapters';
import { useCompact } from './useCompact';
import { freeSide } from './panels/layouts';
import CameraRig from './CameraRig';
import Character from './Character';
import ParticleField from './ParticleField';
import ChapterPanels from './panels/ChapterPanels';
import {
  FilmRibbon,
  WireBuild,
  MentorFigure,
  GroundGlow,
} from './Decorations';

/**
 * Contents of the single, persistent <Canvas>.
 *
 * The character is mounted once here and never remounted — chapters change
 * what surrounds it, not what it is. Panels are generated straight from the
 * manifest, so a re-order needs no edit in this file.
 *
 * Set pieces are looked up by chapter id rather than by position, so they
 * follow their chapter wherever it moves in the running order (and simply do
 * not render if that chapter is removed).
 */
export default function Scene({ tier, useModel }) {
  const compact = useCompact();
  const creative = chapterIndex.creative;
  const web = chapterIndex['web-experience'];
  const training = chapterIndex.training;

  return (
    <>
      <CameraRig />

      {/* Key light, plus the violet/coral rim pair the brand is built on. */}
      <ambientLight intensity={0.9} color="#252B45" />
      <hemisphereLight args={['#39406B', '#0A0B10', 1.1]} />
      <directionalLight position={[2.5, 4.5, 3.5]} intensity={1.6} color="#DDE2FF" />
      {/* The violet/coral rim pair is what gives the chassis its edge — it
          carries most of the character's form, so it is deliberately hot. */}
      <pointLight position={[-2.6, 2.3, -1.9]} intensity={26} distance={11} decay={1.6} color="#6E5BFF" />
      <pointLight position={[2.8, 1.8, -1.6]} intensity={22} distance={11} decay={1.6} color="#FF7A59" />
      <pointLight position={[0.9, 2.9, 2.2]} intensity={9} distance={9} decay={1.7} color="#FFC15E" />
      <pointLight position={[-1.4, 0.9, 2.4]} intensity={5} distance={8} decay={1.8} color="#8FA0FF" />

      <GroundGlow />

      <Suspense fallback={null}>
        <Character useModel={useModel} />
      </Suspense>

      {training !== undefined && (
        <Suspense fallback={null}>
          <MentorFigure
            index={training}
            useModel={useModel}
            free={freeSide(chapters[training].side)}
          />
        </Suspense>
      )}

      <ParticleField tier={tier} />

      {creative !== undefined && !compact && <FilmRibbon index={creative} />}
      {web !== undefined && !compact && (
        <WireBuild index={web} free={freeSide(chapters[web].side)} />
      )}

      {chapters.map((chapter, index) => (
        <ChapterPanels key={chapter.id} chapter={chapter} index={index} />
      ))}

      <fog attach="fog" args={['#12141C', 6, 18]} />
    </>
  );
}
