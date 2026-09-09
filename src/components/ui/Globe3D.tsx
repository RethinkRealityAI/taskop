"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const NAVY = "#1b1f5e";
const SKY = "#1b9dd9";
const ACCENT = "#2563eb";

/** Canvas texture of latitude bands echoing the TaskOp logo mark. */
function makeBandTexture() {
  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size / 2;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#f7f7f5";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const bands = 14;
  const bandH = canvas.height / bands;
  for (let i = 0; i < bands; i++) {
    const y = i * bandH;
    // Alternate navy / sky bands with a white gap to read like the logo's stripes.
    const color = i % 2 === 0 ? NAVY : SKY;
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.92;
    ctx.fillRect(0, y + bandH * 0.18, canvas.width, bandH * 0.64);
  }
  ctx.globalAlpha = 1;

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

export function Globe3D({ className }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0, 4.6);

    // Lighting: soft studio feel to match the photography.
    scene.add(new THREE.HemisphereLight(0xffffff, 0xdfe6f5, 1.1));
    const key = new THREE.DirectionalLight(0xffffff, 1.4);
    key.position.set(3, 4, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(new THREE.Color(SKY), 0.6);
    rim.position.set(-4, -2, -3);
    scene.add(rim);

    // Earth-like tilt (23.4°) so the bands read as latitude lines.
    const tilt = new THREE.Group();
    tilt.rotation.z = THREE.MathUtils.degToRad(-23.4);
    scene.add(tilt);

    const texture = makeBandTexture();
    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(1, 64, 64),
      new THREE.MeshStandardMaterial({ map: texture, roughness: 0.55, metalness: 0.05 }),
    );
    tilt.add(globe);

    // Faint meridian wireframe for depth.
    const wire = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.SphereGeometry(1.004, 24, 12)),
      new THREE.LineBasicMaterial({ color: new THREE.Color(NAVY), transparent: true, opacity: 0.08 }),
    );
    tilt.add(wire);

    // Soft atmosphere halo.
    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(1.05, 48, 48),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(ACCENT), transparent: true, opacity: 0.05, side: THREE.BackSide }),
    );
    scene.add(halo);

    // Orbiting marker: a small "client" dot circling the globe.
    const orbit = new THREE.Group();
    orbit.rotation.x = THREE.MathUtils.degToRad(60);
    scene.add(orbit);
    const marker = new THREE.Mesh(
      new THREE.SphereGeometry(0.035, 16, 16),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(ACCENT) }),
    );
    marker.position.set(1.28, 0, 0);
    orbit.add(marker);
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.28, 0.004, 8, 128),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(ACCENT), transparent: true, opacity: 0.25 }),
    );
    orbit.add(ring);

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // Only animate while on screen and the tab is visible.
    let visible = true;
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(tick);
    });
    io.observe(mount);

    let last = performance.now();
    function tick(now: number) {
      raf = 0;
      if (!visible || document.hidden) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!reduce) {
        globe.rotation.y += dt * 0.35;
        wire.rotation.y += dt * 0.35;
        orbit.rotation.y += dt * 0.5;
      }
      renderer.render(scene, camera);
      if (!reduce) raf = requestAnimationFrame(tick);
    }
    // Reduced motion: render one static frame; otherwise start the loop.
    raf = requestAnimationFrame(tick);

    const onVisibility = () => {
      if (!document.hidden && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
      ro.disconnect();
      io.disconnect();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.LineSegments) {
          obj.geometry.dispose();
          const m = obj.material as THREE.Material | THREE.Material[];
          (Array.isArray(m) ? m : [m]).forEach((mat) => mat.dispose());
        }
      });
      texture.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className={className} aria-hidden />;
}
