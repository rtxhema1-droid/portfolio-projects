import * as THREE from "./vendor/three.module.min.js";

// A glass of juice with fruit orbiting it. Drag to rotate.
// Fruit models are built once per kind and reused, and rendering
// pauses while the tab is hidden or the canvas is off screen.
export function createScene(canvas) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch (e) {
    return null; // no WebGL: the page shows a flat fallback
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 1.4, 12.5);
  camera.lookAt(0, 0.6, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.9));
  const sun = new THREE.DirectionalLight(0xffffff, 1.6); sun.position.set(4, 7, 5); scene.add(sun);
  const rim = new THREE.PointLight(0xffffff, 25, 30); rim.position.set(-5, 2, -3); scene.add(rim);

  const root = new THREE.Group(); scene.add(root);

  // Glass: a lathe shape, slightly wider at the top.
  const profile = [[0.0, 0], [0.8, 0], [0.82, 0.1], [1.05, 3.0], [1.1, 3.05]].map(([x, y]) => new THREE.Vector2(x, y));
  const glass = new THREE.Mesh(
    new THREE.LatheGeometry(profile, 48),
    new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.22, roughness: 0.05, metalness: 0, side: THREE.DoubleSide, depthWrite: false })
  );
  glass.position.y = -1.5; root.add(glass);

  const liquidMat = new THREE.MeshStandardMaterial({ color: 0xffb21f, roughness: 0.35 });
  const liquid = new THREE.Mesh(new THREE.CylinderGeometry(0.98, 0.76, 2.5, 48), liquidMat);
  liquid.position.y = -0.2; root.add(liquid);
  const top = new THREE.Mesh(new THREE.CircleGeometry(0.98, 48), new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.35 }));
  top.rotation.x = -Math.PI / 2; top.position.y = 1.05; root.add(top);

  const straw = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 3.6, 12), new THREE.MeshStandardMaterial({ color: 0xe23d4b }));
  straw.position.set(0.35, 0.8, 0); straw.rotation.z = -0.22; root.add(straw);

  // Fruit models built from simple shapes.
  const mat = (c, r = 0.5) => new THREE.MeshStandardMaterial({ color: c, roughness: r });
  const FRUIT = {
    mango() { const m = new THREE.Mesh(new THREE.SphereGeometry(0.5, 24, 24), mat(0xf6a21b)); m.scale.set(1, 1.2, 0.85); const r = new THREE.Mesh(new THREE.SphereGeometry(0.5, 24, 24), mat(0xd9482b)); r.scale.set(0.5, 0.7, 0.4); r.position.set(0.2, 0.2, 0.2); const g = new THREE.Group(); g.add(m, r); return g; },
    banana() { const c = new THREE.CatmullRomCurve3([new THREE.Vector3(-0.7, 0.2, 0), new THREE.Vector3(-0.3, -0.25, 0), new THREE.Vector3(0.3, -0.25, 0), new THREE.Vector3(0.7, 0.25, 0)]); return new THREE.Mesh(new THREE.TubeGeometry(c, 24, 0.16, 12), mat(0xf7dc3a)); },
    apple() { const g = new THREE.Group(); const a = new THREE.Mesh(new THREE.SphereGeometry(0.5, 24, 24), mat(0xc8262f, 0.35)); a.scale.set(1, 0.92, 1); const s = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.25, 8), mat(0x5a3b1f)); s.position.y = 0.5; const l = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 12), mat(0x3f8a3a)); l.scale.set(1.6, 0.4, 0.8); l.position.set(0.15, 0.55, 0); g.add(a, s, l); return g; },
    strawberry() { const g = new THREE.Group(); const b = new THREE.Mesh(new THREE.ConeGeometry(0.42, 0.8, 20), mat(0xe0213f, 0.4)); b.rotation.x = Math.PI; const t = new THREE.Mesh(new THREE.SphereGeometry(0.42, 20, 20), mat(0xe0213f, 0.4)); t.position.y = 0.25; t.scale.y = 0.7; const lf = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.12, 6), mat(0x3f8a3a)); lf.position.y = 0.55; g.add(b, t, lf); return g; },
    orange() { const g = new THREE.Group(); g.add(new THREE.Mesh(new THREE.SphereGeometry(0.5, 24, 24), mat(0xff8a00, 0.7))); const l = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 12), mat(0x3f8a3a)); l.scale.set(1.6, 0.4, 0.8); l.position.y = 0.5; g.add(l); return g; },
    guava() { const g = new THREE.Group(); const m = new THREE.Mesh(new THREE.SphereGeometry(0.48, 24, 24), mat(0xb7d36a, 0.6)); m.scale.set(1, 1.08, 1); const b = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 16), mat(0xf29aa2)); b.position.set(0.3, 0.1, 0.25); g.add(m, b); return g; }
  };

  const orbit = new THREE.Group(); root.add(orbit);
  // Each fruit kind is built once on first use, then shown/hidden on switch.
  const fruitSets = {};
  let fruits = [];
  function setFruit(kind) {
    if (!fruitSets[kind]) {
      const set = new THREE.Group();
      for (let i = 0; i < 4; i++) {
        const f = FRUIT[kind]();
        f.userData.phase = (i / 4) * Math.PI * 2;
        f.scale.setScalar(1.1);
        set.add(f);
      }
      set.visible = false;
      fruitSets[kind] = set;
      orbit.add(set);
    }
    for (const k in fruitSets) fruitSets[k].visible = false;
    fruitSets[kind].visible = true;
    fruits = fruitSets[kind].children;
  }
  setFruit("mango");

  // Smooth color change.
  const target = new THREE.Color(0xffb21f);
  function setJuice(j) { target.set(j.color); setFruit(j.fruit); }

  // Drag to rotate.
  let drag = false, lastX = 0, spin = 0;
  canvas.addEventListener("pointerdown", (e) => { drag = true; lastX = e.clientX; canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener("pointerup", () => (drag = false));
  canvas.addEventListener("pointercancel", () => (drag = false));
  canvas.addEventListener("pointermove", (e) => { if (drag) { spin += (e.clientX - lastX) * 0.01; lastX = e.clientX; } });

  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.position.z = w / h < 1 ? 12.5 + (1 - w / h) * 9 : 12.5; camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(canvas); resize();

  // Animation pauses when the tab is hidden or the cup scrolls out of view.
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let hidden = document.hidden, offscreen = false, rafId = 0, seenOnScreen = false;
  document.addEventListener("visibilitychange", () => { hidden = document.hidden; start(); });
  // Ignore "not intersecting" until the cup was seen on screen once, so an
  // early observer callback can't stop the scene before it ever drew.
  new IntersectionObserver((entries) => {
    const vis = entries[0].isIntersecting;
    if (vis) seenOnScreen = true;
    offscreen = seenOnScreen && !vis;
    start();
  }).observe(canvas);
  function start() { if (!rafId && !hidden && !offscreen) { last = performance.now(); rafId = requestAnimationFrame(frame); } }

  let t = 0, last = performance.now();
  function frame(now) {
    rafId = 0;
    const dt = Math.min((now - last) / 1000, 0.5); last = now; t += dt;
    liquidMat.color.lerp(target, 1 - Math.exp(-dt * 7)); liquidMat.emissive.copy(liquidMat.color).multiplyScalar(0.35);
    root.rotation.y = spin + (reduce ? 0 : t * 0.35);
    root.position.y = reduce ? 0 : Math.sin(t * 1.2) * 0.12;
    fruits.forEach((f) => {
      const a = f.userData.phase + (reduce ? 0 : t * 0.8);
      f.position.set(Math.cos(a) * 2.2, 0.9 + Math.sin(t * 1.5 + f.userData.phase) * 0.35, Math.sin(a) * 2.2);
      f.rotation.y = a * 2; f.rotation.z = Math.sin(t + f.userData.phase) * 0.3;
    });
    renderer.render(scene, camera);
    if (!hidden && !offscreen) rafId = requestAnimationFrame(frame);
  }
  start();
  return { setJuice };
}
