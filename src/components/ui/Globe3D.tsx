"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import landPoints from "@/data/earth-points.json";

/**
 * Floating particle Earth. Land masses are ~6k precomputed points (see src/data/earth-points.json,
 * generated from the three.js example land/water mask), rendered as soft dots that dim on the far
 * side of the sphere so the globe reads as a solid body without a card behind it.
 */

const NAVY = new THREE.Color("#1b1f5e");
const ACCENT = new THREE.Color("#2563eb");
const SKY = new THREE.Color("#1b9dd9");

const vertexShader = /* glsl */ `
  attribute float aSize;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vFacing;
  uniform float uPixelRatio;
  uniform float uScale;
  void main() {
    vColor = aColor;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    // How much this point faces the camera (1 = front, -1 = back).
    vec3 worldNormal = normalize(mat3(modelMatrix) * position);
    vec3 toCamera = normalize(cameraPosition - (modelMatrix * vec4(position, 1.0)).xyz);
    vFacing = dot(worldNormal, toCamera);
    gl_PointSize = aSize * uScale * uPixelRatio * (1.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vFacing;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float edge = smoothstep(0.5, 0.32, d);
    // Front hemisphere solid, back hemisphere ghosted.
    float depth = smoothstep(-0.35, 0.45, vFacing);
    float alpha = edge * mix(0.07, 1.0, depth);
    gl_FragColor = vec4(vColor, alpha);
  }
`;

function buildGeometry() {
  const count = landPoints.length / 2;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const c = new THREE.Color();
  for (let i = 0; i < count; i++) {
    const lat = THREE.MathUtils.degToRad(landPoints[i * 2]);
    const lon = THREE.MathUtils.degToRad(landPoints[i * 2 + 1]);
    const r = 1;
    const x = r * Math.cos(lat) * Math.cos(lon);
    const y = r * Math.sin(lat);
    const z = -r * Math.cos(lat) * Math.sin(lon);
    positions.set([x, y, z], i * 3);

    // Colour: navy at the poles blending toward accent/sky nearer the equator, with slight noise.
    const t = Math.abs(landPoints[i * 2]) / 90;
    c.copy(SKY).lerp(ACCENT, Math.min(1, t * 1.4)).lerp(NAVY, Math.pow(t, 2) * 0.9);
    const jitter = (Math.sin(i * 12.9898) * 43758.5453) % 1;
    c.offsetHSL(0, 0, (jitter - 0.5) * 0.08);
    colors.set([c.r, c.g, c.b], i * 3);
    sizes[i] = 1.0 + Math.abs(jitter) * 0.6;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
  geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  return geo;
}

export function Globe3D({ className }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pixelRatio = Math.min(window.devicePixelRatio, 2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    renderer.setPixelRatio(pixelRatio);
    renderer.setClearColor(0x000000, 0);
    Object.assign(renderer.domElement.style, { display: "block", width: "100%", height: "100%" });
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 0, 4.1);

    // Axial tilt like Earth; the inner group spins around that tilted axis.
    const tilt = new THREE.Group();
    tilt.rotation.z = THREE.MathUtils.degToRad(-23.4);
    scene.add(tilt);
    const spin = new THREE.Group();
    tilt.add(spin);

    const geometry = buildGeometry();
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
      uniforms: { uPixelRatio: { value: pixelRatio }, uScale: { value: 9 } },
    });
    const points = new THREE.Points(geometry, material);
    spin.add(points);

    // Barely-there inner body so the ocean reads as a sphere.
    const body = new THREE.Mesh(
      new THREE.SphereGeometry(0.985, 48, 48),
      new THREE.MeshBasicMaterial({ color: new THREE.Color("#e4ecfb"), transparent: true, opacity: 0.16 }),
    );
    spin.add(body);

    // Fine graticule for a cartographic feel.
    const grid = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.SphereGeometry(0.99, 36, 18)),
      new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.045 }),
    );
    spin.add(grid);

    // Pointer parallax: the globe leans gently toward the cursor.
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      const r = mount.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      target.x = THREE.MathUtils.clamp((e.clientX - cx) / window.innerWidth, -0.5, 0.5);
      target.y = THREE.MathUtils.clamp((e.clientY - cy) / window.innerHeight, -0.5, 0.5);
    };
    if (!reduce) window.addEventListener("pointermove", onPointer, { passive: true });

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      material.uniforms.uScale.value = Math.max(6, Math.min(12, w / 30));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    let visible = true;
    let raf = 0;
    let last = performance.now();

    function tick(now: number) {
      raf = 0;
      if (!visible || document.hidden) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!reduce) {
        spin.rotation.y += dt * 0.22;
        current.x += (target.x - current.x) * 0.04;
        current.y += (target.y - current.y) * 0.04;
        scene.rotation.y = current.x * 0.5;
        scene.rotation.x = current.y * 0.35;
      }
      renderer.render(scene, camera);
      if (!reduce) raf = requestAnimationFrame(tick);
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    });
    io.observe(mount);
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
      window.removeEventListener("pointermove", onPointer);
      ro.disconnect();
      io.disconnect();
      geometry.dispose();
      material.dispose();
      body.geometry.dispose();
      (body.material as THREE.Material).dispose();
      grid.geometry.dispose();
      (grid.material as THREE.Material).dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className={className} aria-hidden />;
}
