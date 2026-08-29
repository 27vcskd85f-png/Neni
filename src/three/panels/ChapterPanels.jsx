import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScroll, chapterSignal } from '../../scroll/ScrollProvider';
import { useCompact } from '../useCompact';
import {
  panelTransform,
  entryOffset,
  hasPanels,
  freeSide,
  BILLBOARD,
} from './layouts';
import { panelTexture } from './panelTexture';

const PANEL_W = 1.0;
const PANEL_H = 0.625;

/** Fraction of a chapter's scroll span in which its panels are fully absent. */
const HANDOFF = 0.34;

const easeOut = (t) => 1 - Math.pow(1 - t, 3);

/**
 * The panels for a single chapter.
 *
 * Rest transforms come from the layout function; the animation is entirely
 * derived from this chapter's focus signal, so panels fade and drift in as
 * the chapter arrives and out as the next one takes over — no timelines to
 * keep in sync, and re-ordering chapters changes nothing here.
 */
export default function ChapterPanels({ chapter, index }) {
  const { progress, count } = useScroll();
  const group = useRef();

  const billboard = BILLBOARD.has(chapter.layout);
  const compact = useCompact();

  const items = useMemo(() => {
    if (!hasPanels(chapter.layout)) return [];
    const n = chapter.panels.length;
    return chapter.panels.map((panel, i) => {
      const rest = panelTransform(chapter.layout, i, n, {
        free: freeSide(chapter.side),
      });
      return {
        panel,
        rest,
        entry: entryOffset(rest),
        texture: panelTexture(
          panel,
          chapter.accent,
          panel.value ? 'metric' : 'card',
        ),
        phase: i * 1.7,
        // Later panels settle slightly later, giving the group a cascade.
        stagger: n === 1 ? 0 : (i / n) * 0.22,
      };
    });
  }, [chapter]);

  useFrame((state) => {
    if (!group.current) return;
    const { focus: raw } = chapterSignal(progress.current, index, count);

    // A linear focus ramp leaves three chapters' panels on screen at once.
    // Clipping the outer third of the ramp and squaring what is left gives a
    // clean hand-off: the outgoing set is gone before the next one is legible.
    const focus = Math.pow(THREE.MathUtils.clamp((raw - HANDOFF) / (1 - HANDOFF), 0, 1), 1.4);

    const visible = focus > 0.004 && !compact;
    group.current.visible = visible;
    if (!visible) return;

    const time = state.clock.elapsedTime;

    group.current.children.forEach((mesh, i) => {
      const item = items[i];
      if (!item) return;

      // Stagger: each panel gets its own slice of the chapter's focus ramp.
      const local = THREE.MathUtils.clamp(
        (focus - item.stagger) / (1 - item.stagger || 1),
        0,
        1,
      );
      const e = easeOut(local);

      const [rx, ry, rz] = item.rest.position;
      const [ex, ey, ez] = item.entry;

      // Idle float — a slow, continuous 4–6s breath so a settled panel is
      // never completely static.
      const floatY = Math.sin(time * 0.42 + item.phase) * 0.035 * e;
      const floatX = Math.cos(time * 0.31 + item.phase) * 0.022 * e;

      mesh.position.set(
        rx + ex * (1 - e) + floatX,
        ry + ey * (1 - e) + floatY,
        rz + ez * (1 - e),
      );

      if (billboard) {
        // Face the camera, then add the same idle sway the fixed panels get.
        mesh.lookAt(state.camera.position);
        mesh.rotation.z += Math.sin(time * 0.27 + item.phase) * 0.035 * e;
        mesh.rotation.y += (1 - e) * 0.4;
      } else {
        mesh.rotation.set(
          item.rest.rotation[0] + Math.sin(time * 0.27 + item.phase) * 0.018 * e,
          item.rest.rotation[1] + (1 - e) * 0.5,
          item.rest.rotation[2],
        );
      }

      const s = item.rest.scale * (0.78 + 0.22 * e);
      mesh.scale.setScalar(s);
      mesh.material.opacity = e;
    });
  });

  if (!items.length) return null;

  return (
    <group ref={group} visible={false}>
      {items.map((item, i) => (
        <mesh key={`${chapter.id}-${i}`} renderOrder={2}>
          <planeGeometry args={[PANEL_W, PANEL_H]} />
          <meshBasicMaterial
            map={item.texture}
            transparent
            opacity={0}
            depthWrite={false}
            side={THREE.DoubleSide}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}
