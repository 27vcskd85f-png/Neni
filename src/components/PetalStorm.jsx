import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * The petal storm that sits behind every page.
 *
 * Petals orbit and rise; a spark cloud turns slowly behind them. Scroll pulls
 * the camera in and rolls the whole group, so the storm keeps moving even on
 * a static section. Skipped entirely for reduced motion or without WebGL —
 * the rendered backdrop image underneath carries the page on its own.
 */
export default function PetalStorm({ density = 1, scrollDrive = true }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas, alpha: true, antialias: false, powerPreference: 'high-performance',
      });
    } catch {
      return undefined; // no WebGL — the backdrop image already looks finished
    }

    const narrow = window.innerWidth < 900;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, narrow ? 1.5 : 2));

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060305, 0.042);
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 160);
    camera.position.set(0, 0, 25);

    // A teardrop petal, built once and shared by every instance.
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.28, 0.16, 0.42, 0.42, 0, 0.86);
    shape.bezierCurveTo(-0.42, 0.42, -0.28, 0.16, 0, 0);
    const geo = new THREE.ShapeGeometry(shape, 10);
    geo.center();

    const matA = new THREE.MeshBasicMaterial({ color: 0xe1103a, transparent: true, opacity: 0.5, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false });
    const matB = new THREE.MeshBasicMaterial({ color: 0xff6a22, transparent: true, opacity: 0.42, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false });

    const group = new THREE.Group();
    const petals = [];
    const count = Math.round((narrow ? 45 : 88) * density);
    for (let i = 0; i < count; i += 1) {
      const m = new THREE.Mesh(geo, i % 3 === 0 ? matB : matA);
      const a = Math.random() * Math.PI * 2;
      const rad = 6 + Math.random() * 16;
      m.position.set(Math.cos(a) * rad, (Math.random() - 0.5) * 32, Math.sin(a) * rad - 5);
      m.rotation.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);
      m.scale.setScalar(0.6 + Math.random() * 1.8);
      group.add(m);
      petals.push({
        m, a, rad,
        sx: (Math.random() - 0.5) * 0.022,
        sy: (Math.random() - 0.5) * 0.026,
        rise: 0.011 + Math.random() * 0.03,
        orbit: 0.0012 + Math.random() * 0.0036,
        ph: Math.random() * 6.3,
      });
    }
    scene.add(group);

    const n = Math.round((narrow ? 380 : 800) * density);
    const sg = new THREE.BufferGeometry();
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i += 1) {
      pos[i * 3] = (Math.random() - 0.5) * 58;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 42;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 42 - 6;
    }
    sg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const sparks = new THREE.Points(sg, new THREE.PointsMaterial({
      color: 0xff9a5b, size: 0.12, transparent: true, opacity: 0.5,
      blending: THREE.AdditiveBlending, depthWrite: false,
    }));
    scene.add(sparks);

    let mx = 0, my = 0, tx = 0, ty = 0, sk = 0, tk = 0, t = 0, raf = 0;
    let running = true;

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();

    const onPointer = (e) => {
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
    };
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      tk = h > 0 ? Math.min(1, window.scrollY / h) : 0;
    };
    // Pause when the tab is hidden — an offscreen rAF loop is wasted battery.
    const onVisibility = () => { running = !document.hidden; };

    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);
    if (scrollDrive) window.addEventListener('scroll', onScroll, { passive: true });

    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!running) return;
      t += 1;
      mx += (tx - mx) * 0.04;
      my += (ty - my) * 0.04;
      sk += (tk - sk) * 0.05;
      for (const p of petals) {
        p.a += p.orbit;
        p.m.position.x = Math.cos(p.a) * p.rad + Math.sin(t * 0.007 + p.ph) * 0.8;
        p.m.position.z = Math.sin(p.a) * p.rad - 5;
        p.m.position.y += p.rise;
        if (p.m.position.y > 17) p.m.position.y = -17;
        p.m.rotation.x += p.sx;
        p.m.rotation.y += p.sy;
      }
      sparks.rotation.y += 0.0006;
      group.rotation.y = mx * 0.5 + sk * 0.7;
      group.rotation.x = my * 0.26;
      camera.position.x = mx * 3.4;
      camera.position.y = -my * 2.2 + sk * 1.6;
      camera.position.z = 25 - sk * 8;
      camera.lookAt(0, sk * 1.2, 0);
      renderer.render(scene, camera);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
      renderer.dispose();
      geo.dispose();
      sg.dispose();
      matA.dispose();
      matB.dispose();
    };
  }, [density, scrollDrive]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'fixed', inset: 0, width: '100vw', height: '100vh',
        display: 'block', zIndex: 1, pointerEvents: 'none',
      }}
    />
  );
}
