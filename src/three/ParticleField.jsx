import { useLayoutEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScroll } from '../scroll/ScrollProvider';
import { EMITTERS } from './Character';

/**
 * Petals and storm particles.
 *
 * Petals are an InstancedMesh (they need orientation); storm motes are a
 * Points cloud (they do not). Both share one behaviour: they live around the
 * character, and on the final chapter they abandon their orbits and converge
 * into the brand mark.
 */

const COUNTS = {
  high: { petals: 150, storm: 950 },
  low: { petals: 52, storm: 300 },
};

const COLOR_CORAL = new THREE.Color('#FF7A59');
const COLOR_AMBER = new THREE.Color('#FFC15E');
const COLOR_STORM = new THREE.Color('#6E5BFF');
const COLOR_STORM_HI = new THREE.Color('#9B8BFF');

/** Petal silhouette drawn once to a canvas and used as an alpha map. */
function petalTexture() {
  const S = 128;
  const canvas = document.createElement('canvas');
  canvas.width = S;
  canvas.height = S;
  const ctx = canvas.getContext('2d');
  const g = ctx.createRadialGradient(S / 2, S * 0.58, 2, S / 2, S * 0.58, S * 0.5);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.55, 'rgba(255,255,255,0.85)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  // Teardrop petal: a wide bowl tapering to a point at the top.
  ctx.beginPath();
  ctx.moveTo(S / 2, S * 0.06);
  ctx.bezierCurveTo(S * 0.95, S * 0.4, S * 0.86, S * 0.92, S / 2, S * 0.96);
  ctx.bezierCurveTo(S * 0.14, S * 0.92, S * 0.05, S * 0.4, S / 2, S * 0.06);
  ctx.closePath();
  ctx.fill();
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/**
 * Target point cloud for the closing convergence: a three-petal rose curve
 * (the blossom) wrapped in a rising spiral (the storm).
 */
function markPoint(i, total, spiral) {
  const t = i / total;
  // Sat high in frame so the mark reads above the CTA form rather than
  // behind it.
  if (spiral) {
    const a = t * Math.PI * 6;
    const r = 0.35 + t * 0.85;
    return new THREE.Vector3(
      Math.cos(a) * r,
      1.75 + t * 1.05,
      Math.sin(a) * r * 0.42,
    );
  }
  const a = t * Math.PI * 2;
  const r = 0.62 * Math.abs(Math.cos(3 * a)) + 0.16;
  return new THREE.Vector3(Math.cos(a) * r, 2.25 + Math.sin(a) * r, 0);
}

export default function ParticleField({ tier = 'high' }) {
  const { progress, burst, count: chapterCount } = useScroll();
  const petalsRef = useRef();
  const stormRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const scratch = useMemo(() => new THREE.Vector3(), []);

  const counts = COUNTS[tier] ?? COUNTS.low;
  const alphaMap = useMemo(petalTexture, []);

  /** Per-petal constants: emitter, direction, speed, spin, lifetime offset. */
  const petals = useMemo(() => {
    const arr = [];
    for (let i = 0; i < counts.petals; i += 1) {
      const em = EMITTERS[i % EMITTERS.length];
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI - Math.PI / 2;
      arr.push({
        origin: new THREE.Vector3(...em.at),
        dir: new THREE.Vector3(
          Math.cos(theta) * Math.cos(phi),
          Math.abs(Math.sin(phi)) * 0.7 + 0.25,
          Math.sin(theta) * Math.cos(phi) * 0.6,
        ).normalize(),
        reach: (0.55 + Math.random() * 1.5) * em.weight,
        life: 3.4 + Math.random() * 3.6,
        offset: Math.random() * 8,
        spin: (Math.random() - 0.5) * 1.6,
        size: 0.045 + Math.random() * 0.06,
        mark: markPoint(i, counts.petals, false),
      });
    }
    return arr;
  }, [counts.petals]);

  /** Per-mote constants for the storm cloud. */
  const storm = useMemo(() => {
    const arr = [];
    for (let i = 0; i < counts.storm; i += 1) {
      arr.push({
        angle: Math.random() * Math.PI * 2,
        radius: 0.45 + Math.random() * 1.95,
        y: Math.random() * 2.6,
        speed: 0.06 + Math.random() * 0.22,
        bob: 0.05 + Math.random() * 0.22,
        phase: Math.random() * 10,
        mark: markPoint(i, counts.storm, true),
      });
    }
    return arr;
  }, [counts.storm]);

  const stormGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(counts.storm * 3);
    const col = new Float32Array(counts.storm * 3);
    const c = new THREE.Color();
    for (let i = 0; i < counts.storm; i += 1) {
      c.copy(COLOR_STORM).lerp(COLOR_STORM_HI, Math.random());
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    return geo;
  }, [counts.storm]);

  // Instance tints go through setColorAt so three manages the instanceColor
  // buffer itself — hand-rolled instanced attributes break on material swaps.
  useLayoutEffect(() => {
    const mesh = petalsRef.current;
    if (!mesh) return;
    const c = new THREE.Color();
    for (let i = 0; i < counts.petals; i += 1) {
      c.copy(COLOR_CORAL).lerp(COLOR_AMBER, (i * 0.6180339887) % 1);
      mesh.setColorAt(i, c);
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [counts.petals]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // 1 on the closing chapter, 0 before it — drives the logo convergence.
    const convergeStart = (chapterCount - 2) / (chapterCount - 1);
    const converge = THREE.MathUtils.clamp(
      (progress.current - convergeStart) / (1 - convergeStart),
      0,
      1,
    );
    const conv = converge * converge * (3 - 2 * converge); // smoothstep

    // A chapter change kicks the field outward for ~700ms.
    const sinceBurst = (performance.now() - burst.at) / 700;
    const kick = sinceBurst > 0 && sinceBurst < 1 ? (1 - sinceBurst) ** 2 : 0;

    if (petalsRef.current) {
      for (let i = 0; i < petals.length; i += 1) {
        const p = petals[i];
        const cycle = ((time + p.offset) % p.life) / p.life;
        const eased = 1 - Math.pow(1 - cycle, 2);
        const dist = eased * p.reach * (1 + kick * 0.8);

        scratch
          .copy(p.dir)
          .multiplyScalar(dist)
          .add(p.origin);
        scratch.x += Math.sin(time * 0.7 + p.offset) * 0.06 * eased;
        scratch.y += Math.cos(time * 0.5 + p.offset) * 0.05 * eased;

        scratch.lerp(p.mark, conv);

        dummy.position.copy(scratch);
        dummy.rotation.set(
          time * p.spin * 0.4,
          time * p.spin * 0.6,
          time * p.spin,
        );
        // Petals bloom then dissolve; convergence overrides the fade so the
        // mark reads as solid.
        const fade = Math.sin(cycle * Math.PI);
        dummy.scale.setScalar(p.size * (fade * (1 - conv) + conv));
        dummy.updateMatrix();
        petalsRef.current.setMatrixAt(i, dummy.matrix);
      }
      petalsRef.current.instanceMatrix.needsUpdate = true;
    }

    if (stormRef.current) {
      const pos = stormRef.current.geometry.attributes.position;
      for (let i = 0; i < storm.length; i += 1) {
        const s = storm[i];
        const a = s.angle + time * s.speed;
        const r = s.radius * (1 + kick * 0.35);
        scratch.set(
          Math.cos(a) * r,
          s.y + Math.sin(time * 0.5 + s.phase) * s.bob,
          Math.sin(a) * r * 0.55,
        );
        scratch.lerp(s.mark, conv);
        pos.setXYZ(i, scratch.x, scratch.y, scratch.z);
      }
      pos.needsUpdate = true;
    }
  });

  return (
    <group>
      <instancedMesh
        ref={petalsRef}
        args={[undefined, undefined, counts.petals]}
        frustumCulled={false}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          alphaMap={alphaMap}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </instancedMesh>

      <points ref={stormRef} geometry={stormGeometry} frustumCulled={false}>
        <pointsMaterial
          size={tier === 'high' ? 0.026 : 0.034}
          vertexColors
          transparent
          opacity={0.72}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </points>
    </group>
  );
}
