import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { chapters } from '../content/chapters';
import { useScroll } from '../scroll/ScrollProvider';

/**
 * Dollies the camera along a spline built from the chapter manifest.
 *
 * Because a Catmull-Rom curve's parameter maps uniformly across its control
 * points, global scroll progress t lands exactly on chapter i at t = i/(n-1).
 * Re-ordering or inserting chapters just rebuilds the curve — nothing here
 * hard-codes a chapter, a count, or a position.
 */
export default function CameraRig() {
  const { progress, count } = useScroll();
  const { camera, size } = useThree();
  const pointer = useRef({ x: 0, y: 0 });

  const { path, aim, fovs } = useMemo(() => {
    const toVec = (a) => new THREE.Vector3(...a);
    const positions = chapters.map((c) => toVec(c.camera.position));
    const targets = chapters.map((c) => toVec(c.camera.target));
    return {
      path: new THREE.CatmullRomCurve3(positions, false, 'catmullrom', 0.35),
      aim: new THREE.CatmullRomCurve3(targets, false, 'catmullrom', 0.35),
      fovs: chapters.map((c) => c.camera.fov ?? 42),
    };
  }, []);

  const desiredPos = useMemo(() => new THREE.Vector3(), []);
  const desiredAim = useMemo(() => new THREE.Vector3(), []);
  const smoothAim = useRef(new THREE.Vector3(...chapters[0].camera.target));

  useFrame((state, delta) => {
    const t = THREE.MathUtils.clamp(progress.current, 0, 1);

    path.getPoint(t, desiredPos);
    aim.getPoint(t, desiredAim);

    // Interpolate FOV between the two bracketing chapter keyframes.
    const scaled = t * (count - 1);
    const i = Math.min(count - 2, Math.floor(scaled));
    const frac = count > 1 ? scaled - i : 0;
    let fov = THREE.MathUtils.lerp(fovs[i], fovs[i + 1] ?? fovs[i], frac);

    // Narrow viewports see less of the scene at the same FOV — widen it back
    // out so the character never gets cropped on a phone.
    const aspect = size.width / Math.max(size.height, 1);
    if (aspect < 1) fov += (1 - aspect) * 22;

    // Subtle pointer parallax on top of the scroll dolly.
    const px = pointer.current.x * 0.28;
    const py = pointer.current.y * 0.18;

    // Frame-rate independent smoothing (damp converges the same at any fps).
    const lambda = 4.5;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, desiredPos.x + px, lambda, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, desiredPos.y + py, lambda, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, desiredPos.z, lambda, delta);

    smoothAim.current.x = THREE.MathUtils.damp(smoothAim.current.x, desiredAim.x, lambda, delta);
    smoothAim.current.y = THREE.MathUtils.damp(smoothAim.current.y, desiredAim.y, lambda, delta);
    smoothAim.current.z = THREE.MathUtils.damp(smoothAim.current.z, desiredAim.z, lambda, delta);
    camera.lookAt(smoothAim.current);

    if (Math.abs(camera.fov - fov) > 0.01) {
      camera.fov = THREE.MathUtils.damp(camera.fov, fov, lambda, delta);
      camera.updateProjectionMatrix();
    }

    // Pointer is read from the r3f state so it works with touch too.
    pointer.current.x = state.pointer.x;
    pointer.current.y = state.pointer.y;
  });

  return null;
}
