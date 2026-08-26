// CALIBRE — hero WebGL scene: an abstract mechanical movement rendered as
// concentric rings, jewel bearings, and a glass crystal center. Purely
// procedural — no textures or model files to load, so there's nothing to
// fail to fetch and nothing to optimize beyond geometry/segment counts.
//
// Contained entirely inside the hero section: the canvas is sized to the
// hero's own box (not the full viewport), the render loop pauses when the
// hero scrolls out of view or the tab is hidden, and reduced-motion visitors
// get a single static frame instead of a continuous animation.

import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";

function initCalibreScene() {
  const hero = document.querySelector(".hero");
  const wrap = document.querySelector(".hero-canvas-wrap");
  if (!hero || !wrap) return;

  if (!window.WebGLRenderingContext) {
    document.body.classList.add("no-webgl");
    return;
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isNarrow = window.innerWidth < 760;
  const dpr = Math.min(window.devicePixelRatio || 1, isNarrow ? 1.5 : 2);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  } catch (e) {
    document.body.classList.add("no-webgl");
    return;
  }
  renderer.setPixelRatio(dpr);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  wrap.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  // On narrow viewports the hero copy runs full-width instead of sharing
  // the row with the rig, so without a pull-back and a smaller scale the
  // mechanism renders oversized and sits directly behind the body text,
  // hurting legibility. Pulling the camera back and shrinking + centering
  // the rig keeps it a supporting backdrop instead of a competing element.
  const baseCameraZ = isNarrow ? 11 : 6.2;
  const rigScaleBase = isNarrow ? 0.5 : 1;
  camera.position.set(isNarrow ? 0.1 : 0.6, 0.3, baseCameraZ);

  // Procedural studio environment (no HDR file needed) for PBR reflections
  // on the metal rings and refraction through the glass crystal.
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  const rig = new THREE.Group();
  // NOTE: the camera targets a fixed point (lookTarget below), not
  // rig.position — a rig-tracking lookAt would recenter on it every frame
  // and cancel out this offset entirely, which is exactly what silently
  // broke the first attempt at pushing the mobile composition down.
  rig.position.set(0, isNarrow ? -1.1 : 0, 0);
  rig.scale.setScalar(rigScaleBase);
  scene.add(rig);
  const lookTarget = new THREE.Vector3(0, 0, 0);

  const brassMat = new THREE.MeshStandardMaterial({ color: 0xb8865a, metalness: 0.92, roughness: 0.28 });
  const graphiteMat = new THREE.MeshStandardMaterial({ color: 0x2a2723, metalness: 0.85, roughness: 0.4 });
  const jewelMat = new THREE.MeshStandardMaterial({ color: 0xd9a56e, metalness: 0.4, roughness: 0.15, emissive: 0x552f10, emissiveIntensity: 0.4 });
  const crystalMat = new THREE.MeshPhysicalMaterial({
    color: 0xf3efe8, metalness: 0, roughness: 0.05, transmission: 1,
    thickness: 0.6, ior: 1.45, envMapIntensity: 1.2,
  });

  const rings = [];
  const ringDefs = [
    { radius: 1.7, tube: 0.035, tiltX: 0.15, tiltZ: 0.05, mat: graphiteMat, speed: 0.045 },
    { radius: 1.3, tube: 0.045, tiltX: -0.22, tiltZ: 0.1, mat: brassMat, speed: -0.07 },
    { radius: 0.92, tube: 0.03, tiltX: 0.3, tiltZ: -0.08, mat: graphiteMat, speed: 0.09 },
  ];
  ringDefs.forEach((def) => {
    const geo = new THREE.TorusGeometry(def.radius, def.tube, 16, 100);
    const mesh = new THREE.Mesh(geo, def.mat);
    mesh.rotation.x = Math.PI / 2 + def.tiltX;
    mesh.rotation.z = def.tiltZ;
    rig.add(mesh);
    rings.push({ mesh, speed: def.speed, baseRadius: def.radius });
  });

  // Jewel bearings riding the middle ring.
  const jewelGroup = new THREE.Group();
  const jewelCount = 5;
  for (let i = 0; i < jewelCount; i++) {
    const angle = (i / jewelCount) * Math.PI * 2;
    const jewel = new THREE.Mesh(new THREE.SphereGeometry(0.055, 20, 20), jewelMat);
    jewel.position.set(Math.cos(angle) * 1.3, Math.sin(angle) * 1.3 * 0.35, Math.sin(angle) * 0.25);
    jewelGroup.add(jewel);
  }
  rig.add(jewelGroup);

  // Crystal center.
  const crystal = new THREE.Mesh(new THREE.IcosahedronGeometry(0.5, 2), crystalMat);
  rig.add(crystal);

  // Sparse atmospheric particles — restrained, secondary, not the focal shape.
  const particleCount = isNarrow ? 60 : 160;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    const r = 3 + Math.random() * 3.5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
    positions[i * 3 + 2] = r * Math.cos(phi) * 0.6;
  }
  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const particleMat = new THREE.PointsMaterial({ color: 0xd9a56e, size: 0.02, transparent: true, opacity: 0.35 });
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // Lighting: warm brass key, cool fill, soft ambient base.
  scene.add(new THREE.HemisphereLight(0xf3efe8, 0x0e0d0c, 0.55));
  const key = new THREE.PointLight(0xd9a56e, 18, 20, 2);
  key.position.set(4, 3, 4);
  scene.add(key);
  const fill = new THREE.PointLight(0xcfd8e3, 6, 20, 2);
  fill.position.set(-4, -1, 3);
  scene.add(fill);

  // Post-processing: bloom used sparingly (high threshold, low strength),
  // skipped on narrow/mobile viewports and under reduced motion for cost.
  let composer = null;
  const useBloom = !isNarrow && !reducedMotion;
  if (useBloom) {
    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.35, 0.4, 0.86);
    composer.addPass(bloom);
    composer.addPass(new OutputPass());
  }

  function resize() {
    const rect = hero.getBoundingClientRect();
    const w = rect.width, h = rect.height;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
    if (composer) composer.setSize(w, h);
  }
  resize();
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(hero);

  // Mouse parallax — desktop/fine-pointer only, damped toward target.
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const mouse = { x: 0, y: 0 };
  const mouseTarget = { x: 0, y: 0 };
  if (canHover && !reducedMotion) {
    hero.addEventListener("mousemove", (e) => {
      const rect = hero.getBoundingClientRect();
      mouseTarget.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseTarget.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    });
  }

  let scrollProgress = 0;
  function updateScrollProgress() {
    const rect = hero.getBoundingClientRect();
    const total = rect.height + window.innerHeight;
    const passed = window.innerHeight - rect.top;
    scrollProgress = Math.min(Math.max(passed / total, 0), 1);
  }
  window.addEventListener("scroll", updateScrollProgress, { passive: true });
  updateScrollProgress();

  let running = true;
  let visible = true;
  if ("IntersectionObserver" in window) {
    new IntersectionObserver((entries) => {
      entries.forEach((entry) => { visible = entry.isIntersecting; });
    }).observe(hero);
  }
  document.addEventListener("visibilitychange", () => {
    running = document.visibilityState === "visible";
  });

  const clock = new THREE.Clock();

  function renderFrame() {
    const delta = clock.getDelta();

    if (!reducedMotion) {
      rings.forEach((r) => { r.mesh.rotation.y += r.speed * delta; });
      jewelGroup.rotation.y += rings[1].speed * delta;
      crystal.rotation.y += 0.12 * delta;
      crystal.rotation.x += 0.05 * delta;
      particles.rotation.y += 0.01 * delta;

      mouse.x += (mouseTarget.x - mouse.x) * 0.04;
      mouse.y += (mouseTarget.y - mouse.y) * 0.04;
      camera.position.x = (isNarrow ? 0.1 : 0.6) + mouse.x * (isNarrow ? 0.2 : 0.5);
      camera.position.y = 0.3 - mouse.y * 0.3;

      // Scroll drives a gentle "expand and recede" as the hero scrolls away.
      const spread = 1 + scrollProgress * 0.5;
      rig.scale.setScalar(rigScaleBase * spread);
      camera.position.z = baseCameraZ + scrollProgress * 2.5;
      wrap.style.opacity = String(Math.max(1 - scrollProgress * 1.3, 0));
    }

    camera.lookAt(lookTarget);

    if (composer) composer.render();
    else renderer.render(scene, camera);
  }

  function loop() {
    requestAnimationFrame(loop);
    if (!running || !visible) return;
    renderFrame();
  }

  // Reduced-motion visitors still get one settled frame, just no ongoing loop.
  if (reducedMotion) {
    renderFrame();
  } else {
    loop();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCalibreScene);
} else {
  initCalibreScene();
}
