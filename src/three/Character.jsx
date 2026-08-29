import { useMemo, useRef, useLayoutEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { assets } from '../content/site';

/**
 * The Blüten Sturm Guide.
 *
 * Two implementations behind one component:
 *   • <GltfGuide>       the generated character.glb, auto-fitted to the rig
 *   • <ProceduralGuide> a primitive-built stand-in, used until the GLB exists
 *
 * Both expose the same silhouette, the same 1.8-unit height and the same
 * emitter points, so the particle field, camera spline and panel layouts do
 * not care which one is mounted. Dropping character.glb into /public/assets
 * is the entire swap procedure.
 */

/** Height in world units the character is normalised to. */
export const GUIDE_HEIGHT = 1.8;

/** Where petals and storm particles are born, in character-local space. */
export const EMITTERS = [
  { at: [0.24, 1.36, 0.02], weight: 1.0 }, // right shoulder
  { at: [-0.24, 1.36, 0.02], weight: 0.8 }, // left shoulder
  { at: [0.0, 1.18, 0.12], weight: 1.0 }, // chest
  { at: [0.55, 1.98, 0.06], weight: 1.4 }, // raised hand
];

// The brief's charcoal-navy, lifted just far enough off the #12141C
// background that the rim lights have something to catch. Pure #12141C on
// #12141C renders as a flat black cut-out.
const CHASSIS = {
  color: '#252B42',
  metalness: 0.68,
  roughness: 0.31,
  emissive: '#0E1226',
  emissiveIntensity: 0.55,
};

const VISOR = {
  color: '#161B30',
  metalness: 0.95,
  roughness: 0.08,
  emissive: '#2A2560',
  emissiveIntensity: 0.35,
};

/** A capsule stretched between two joints — the building block of the rig. */
function Limb({ from, to, radius, material }) {
  const { position, quaternion, length } = useMemo(() => {
    const a = new THREE.Vector3(...from);
    const b = new THREE.Vector3(...to);
    const dir = new THREE.Vector3().subVectors(b, a);
    const len = dir.length();
    const q = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      dir.clone().normalize(),
    );
    return {
      position: new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5),
      quaternion: q,
      length: Math.max(len - radius * 2, 0.01),
    };
  }, [from, to, radius]);

  return (
    <mesh position={position} quaternion={quaternion} castShadow>
      <capsuleGeometry args={[radius, length, 4, 12]} />
      <meshStandardMaterial {...material} />
    </mesh>
  );
}

/** A soft emissive bloom marking a particle emission point. */
function EmitterGlow({ at, scale = 1, color = '#FF9A6B' }) {
  return (
    <mesh position={at} scale={scale}>
      <sphereGeometry args={[0.045, 12, 12]} />
      <meshBasicMaterial color={color} transparent opacity={0.85} toneMapped={false} />
    </mesh>
  );
}

function ProceduralGuide() {
  const torso = useRef();

  return (
    <group>
      {/* Legs */}
      <Limb from={[0.11, 0.9, 0]} to={[0.13, 0.48, 0.01]} radius={0.072} material={CHASSIS} />
      <Limb from={[0.13, 0.48, 0.01]} to={[0.12, 0.06, 0.03]} radius={0.055} material={CHASSIS} />
      <Limb from={[-0.11, 0.9, 0]} to={[-0.14, 0.48, -0.02]} radius={0.072} material={CHASSIS} />
      <Limb from={[-0.14, 0.48, -0.02]} to={[-0.15, 0.06, 0.0]} radius={0.055} material={CHASSIS} />

      {/* Pelvis + torso */}
      <mesh position={[0, 0.94, 0]}>
        <capsuleGeometry args={[0.15, 0.08, 4, 16]} />
        <meshStandardMaterial {...CHASSIS} />
      </mesh>
      <group ref={torso} position={[0, 1.18, 0]}>
        <mesh scale={[1.05, 1, 0.72]}>
          <capsuleGeometry args={[0.19, 0.3, 6, 20]} />
          <meshStandardMaterial {...CHASSIS} />
        </mesh>
        {/* Iridescent chest seam */}
        <mesh position={[0, 0.02, 0.14]} rotation={[0, 0, 0]}>
          <planeGeometry args={[0.035, 0.34]} />
          <meshBasicMaterial color="#6E5BFF" transparent opacity={0.5} toneMapped={false} />
        </mesh>
      </group>

      {/* Shoulders */}
      <mesh position={[0.24, 1.36, 0]}>
        <sphereGeometry args={[0.085, 16, 16]} />
        <meshStandardMaterial {...CHASSIS} />
      </mesh>
      <mesh position={[-0.24, 1.36, 0]}>
        <sphereGeometry args={[0.085, 16, 16]} />
        <meshStandardMaterial {...CHASSIS} />
      </mesh>

      {/* Raised right arm — the conducting hand */}
      <Limb from={[0.26, 1.36, 0]} to={[0.5, 1.64, 0.04]} radius={0.058} material={CHASSIS} />
      <Limb from={[0.5, 1.64, 0.04]} to={[0.55, 1.96, 0.06]} radius={0.046} material={CHASSIS} />
      <mesh position={[0.55, 2.0, 0.06]} rotation={[0.3, 0, -0.2]}>
        <boxGeometry args={[0.075, 0.09, 0.035]} />
        <meshStandardMaterial {...CHASSIS} />
      </mesh>

      {/* Relaxed left arm */}
      <Limb from={[-0.26, 1.34, 0]} to={[-0.3, 1.04, 0.02]} radius={0.056} material={CHASSIS} />
      <Limb from={[-0.3, 1.04, 0.02]} to={[-0.26, 0.76, 0.07]} radius={0.044} material={CHASSIS} />

      {/* Neck + faceted visor head */}
      <Limb from={[0, 1.42, 0]} to={[0, 1.52, 0]} radius={0.045} material={CHASSIS} />
      <group position={[0, 1.63, 0]}>
        <mesh scale={[0.88, 1.14, 0.94]}>
          <icosahedronGeometry args={[0.152, 1]} />
          <meshStandardMaterial {...VISOR} flatShading />
        </mesh>
        {/* Face plate: no features, just a cold sheen where a face would be. */}
        <mesh position={[0, 0.005, 0.122]} rotation={[0.06, 0, 0]}>
          <circleGeometry args={[0.095, 6]} />
          <meshStandardMaterial
            color="#0B0E1A"
            metalness={1}
            roughness={0.05}
            emissive="#3A2F7A"
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>

      {EMITTERS.map((e, i) => (
        <EmitterGlow
          key={i}
          at={e.at}
          scale={e.weight * 0.9}
          color={i === 3 ? '#FFC15E' : '#FF7A59'}
        />
      ))}
    </group>
  );
}

function GltfGuide({ url }) {
  const { scene } = useGLTF(url);

  const fitted = useMemo(() => {
    const root = scene.clone(true);
    const box = new THREE.Box3().setFromObject(root);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    // Normalise whatever the generator produced to our rig: 1.8 units tall,
    // centred on X/Z, feet on the ground plane.
    const scale = size.y > 0 ? GUIDE_HEIGHT / size.y : 1;
    root.scale.setScalar(scale);
    root.position.set(
      -center.x * scale,
      -box.min.y * scale,
      -center.z * scale,
    );

    root.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) child.material.envMapIntensity = 1.1;
      }
    });
    return root;
  }, [scene]);

  return <primitive object={fitted} />;
}

export default function Character({ useModel = false, mentor = false }) {
  const group = useRef();

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    // Breathing weight-shift: a slow bob plus a barely-there sway, so the
    // character never reads as a frozen prop between chapters.
    group.current.position.y = Math.sin(t * 0.55) * 0.014;
    group.current.rotation.y = Math.sin(t * 0.23) * 0.055;
    group.current.rotation.z = Math.sin(t * 0.31) * 0.008;
  });

  return (
    <group ref={group} scale={mentor ? 0.72 : 1}>
      {useModel ? <GltfGuide url={assets.characterModel} /> : <ProceduralGuide />}
    </group>
  );
}

export const preloadCharacter = () => useGLTF.preload(assets.characterModel);
