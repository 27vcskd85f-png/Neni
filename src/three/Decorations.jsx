import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScroll, chapterSignal } from '../scroll/ScrollProvider';
import Character from './Character';

/**
 * Per-chapter set pieces. Each one is keyed to a chapter index and driven by
 * that chapter's focus signal, so they appear and dissolve with their section
 * and cost nothing when off screen.
 */

/** Repeating film-strip texture: sprocket holes down both edges. */
function filmTexture() {
  const W = 256;
  const H = 128;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = 'rgba(10,11,16,0.92)';
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = 'rgba(237,237,242,0.5)';
  for (let x = 12; x < W; x += 34) {
    ctx.fillRect(x, 10, 16, 12);
    ctx.fillRect(x, H - 22, 16, 12);
  }

  // Frame window between the perforations.
  ctx.fillStyle = 'rgba(110,91,255,0.18)';
  ctx.fillRect(8, 32, W - 16, H - 64);
  ctx.strokeStyle = 'rgba(255,122,89,0.5)';
  ctx.lineWidth = 2;
  ctx.strokeRect(8, 32, W - 16, H - 64);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.repeat.set(6, 1);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** A ribbon of film curving past the character — the creative chapter motif. */
export function FilmRibbon({ index }) {
  const { progress, count } = useScroll();
  const ref = useRef();
  const map = useMemo(filmTexture, []);

  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2.6, 1.05, -0.9),
      new THREE.Vector3(-1.3, 1.85, 0.5),
      new THREE.Vector3(0.4, 2.15, 0.2),
      new THREE.Vector3(1.7, 1.6, -0.8),
      new THREE.Vector3(2.3, 0.9, -1.6),
    ]);
    // A flat ribbon rather than a tube: square section, almost no depth.
    const geo = new THREE.TubeGeometry(curve, 120, 0.17, 4, false);
    geo.scale(1, 1, 0.12);
    return geo;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const { focus } = chapterSignal(progress.current, index, count);
    ref.current.visible = focus > 0.002;
    if (!ref.current.visible) return;
    ref.current.material.opacity = focus * 0.85;
    map.offset.x = -state.clock.elapsedTime * 0.05;
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.06;
  });

  return (
    <mesh ref={ref} geometry={geometry} visible={false} renderOrder={1}>
      <meshBasicMaterial
        map={map}
        transparent
        opacity={0}
        side={THREE.DoubleSide}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

/**
 * The wireframe cube that resolves into a browser window — the character
 * "building" the site in the web-experience chapter.
 */
export function WireBuild({ index, free = 1 }) {
  const { progress, count } = useScroll();
  const group = useRef();
  const wire = useRef();
  const screen = useRef();

  const chrome = useMemo(() => {
    const W = 512;
    const H = 320;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgba(24,27,38,0.92)';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(245,243,240,0.10)';
    ctx.fillRect(0, 0, W, 42);
    ['#FF7A59', '#FFC15E', '#6E5BFF'].forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.arc(28 + i * 26, 21, 7, 0, Math.PI * 2);
      ctx.fill();
    });
    // Suggestion of a laid-out page rather than legible copy.
    ctx.fillStyle = 'rgba(237,237,242,0.22)';
    ctx.fillRect(28, 74, 300, 22);
    ctx.fillRect(28, 110, 210, 14);
    ctx.fillRect(28, 134, 240, 14);
    const g = ctx.createLinearGradient(28, 0, 190, 0);
    g.addColorStop(0, '#FF7A59');
    g.addColorStop(1, '#FFC15E');
    ctx.fillStyle = g;
    ctx.fillRect(28, 176, 150, 30);
    ctx.fillStyle = 'rgba(110,91,255,0.30)';
    ctx.fillRect(300, 74, 184, 180);

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    const { focus } = chapterSignal(progress.current, index, count);
    group.current.visible = focus > 0.002;
    if (!group.current.visible) return;

    const t = state.clock.elapsedTime;
    // First half of the chapter: the cube. Second half: the browser window.
    const resolve = THREE.MathUtils.clamp((focus - 0.45) / 0.5, 0, 1);

    group.current.position.y = 1.78 + Math.sin(t * 0.4) * 0.03;
    group.current.rotation.y = t * 0.25 * (1 - resolve) + resolve * 0.12;

    if (wire.current) {
      wire.current.material.opacity = focus * (1 - resolve) * 0.9;
      wire.current.scale.setScalar(1 - resolve * 0.15);
    }
    if (screen.current) {
      screen.current.material.opacity = focus * resolve;
      screen.current.scale.setScalar(0.85 + resolve * 0.15);
    }
  });

  return (
    <group ref={group} position={[free * 0.95, 1.78, 0.45]} visible={false}>
      <lineSegments ref={wire}>
        <edgesGeometry args={[new THREE.BoxGeometry(0.62, 0.62, 0.62)]} />
        <lineBasicMaterial
          color="#6E5BFF"
          transparent
          opacity={0}
          toneMapped={false}
        />
      </lineSegments>
      <mesh ref={screen} renderOrder={2}>
        <planeGeometry args={[1.05, 0.656]} />
        <meshBasicMaterial
          map={chrome}
          transparent
          opacity={0}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/** The second, smaller figure for the training chapter. */
export function MentorFigure({ index, useModel, free = -1 }) {
  const { progress, count } = useScroll();
  const group = useRef();

  useFrame(() => {
    if (!group.current) return;
    const { focus } = chapterSignal(progress.current, index, count);
    group.current.visible = focus > 0.01;
    if (!group.current.visible) return;
    // Steps in from behind the guide as the chapter arrives.
    group.current.position.x = free * (0.92 + (1 - focus) * 0.6);
    group.current.position.z = 0.35 - (1 - focus) * 0.9;
    group.current.scale.setScalar(0.74 + focus * 0.06);
  });

  return (
    <group ref={group} position={[free * 0.92, 0, 0.35]} visible={false}>
      <Character useModel={useModel} mentor />
    </group>
  );
}

/** Ground plane: a soft radial pool of light the character stands in. */
export function GroundGlow() {
  const map = useMemo(() => {
    const S = 256;
    const canvas = document.createElement('canvas');
    canvas.width = S;
    canvas.height = S;
    const ctx = canvas.getContext('2d');
    const g = ctx.createRadialGradient(S / 2, S / 2, 4, S / 2, S / 2, S / 2);
    g.addColorStop(0, 'rgba(110,91,255,0.42)');
    g.addColorStop(0.45, 'rgba(255,122,89,0.14)');
    g.addColorStop(1, 'rgba(18,20,28,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, S, S);
    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
      <planeGeometry args={[9, 9]} />
      <meshBasicMaterial
        map={map}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </mesh>
  );
}
