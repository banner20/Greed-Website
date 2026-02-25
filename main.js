import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';

// ─── Shared animation state ────────────────────────────────────────────────────
let cupModel = null;       // Three.js group once GLB is loaded
let finalRotY = 0;          // GLB's natural Y rotation (logo facing camera)
let rotStartY = Math.PI;    // Start half-turn away so logo is hidden

// ─── Easing & math helpers ─────────────────────────────────────────────────────
function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
function lerp(a, b, t) {
  return a + (b - a) * t;
}
function clamp(v, lo, hi) {
  return Math.min(Math.max(v, lo), hi);
}

// ─── Hero scroll animation ─────────────────────────────────────────────────────
// hero-section is 150vh. Scroll range = 50vh → drives progress 0→1.
// progress 0 : CTA centered,  cup hidden below,  cup Y = back of cup
// progress 1 : CTA risen ~20vh, cup at rest position, cup Y = logo visible

const heroContent = document.querySelector('.hero-content');
const cupCanvas = document.getElementById('cup-canvas');
const heroSection = document.getElementById('heroSection');

function updateHeroScroll() {
  if (!heroSection) return;

  const maxScroll = heroSection.offsetHeight - window.innerHeight;
  const rawP = clamp(window.scrollY / maxScroll, 0, 1);

  // ── Cup canvas: fully risen by 55% of scroll ─────────────────────────────
  if (cupCanvas) {
    const riseP = easeInOut(clamp(rawP / 0.55, 0, 1));
    const cupY = lerp(115, 0, riseP);
    cupCanvas.style.transform = `translateX(-50%) translateY(${cupY}%)`;
    cupCanvas.style.opacity = clamp(rawP / 0.25, 0, 1);
  }


  // ── Cup Y-rotation: starts AFTER cup is fully risen (rawP 0.6→1.0) ────────
  // Cup is fully up at 0.55, we wait a tiny bit more then spin in place
  if (cupModel) {
    const rotP = easeInOut(clamp((rawP - 0.6) / 0.4, 0, 1));
    cupModel.rotation.y = lerp(rotStartY, finalRotY, rotP);
  }
}

// ─── 3D Cup Scene ─────────────────────────────────────────────────────────────
function initCupScene() {
  const canvas = document.getElementById('cup-canvas');
  if (!canvas) return;

  const W = 420, H = 680;
  const DPR = Math.min(window.devicePixelRatio, 3);

  // ── CUP LOOK — tweak these to adjust brightness / feel ────────────────────
  const CUP = {
    exposure: 1.5,   // Overall brightness  (↑ brighter, ↓ darker)
    envIntensity: 0.04,  // Ambient env light   (↑ more fill, ↓ more contrast)
    keyIntensity: 2.5,   // Main key light      (front-left, top)
    fillIntensity: 0.6,   // Fill light          (right warm bounce)
    keyColor: 0xffffff, // Key light color  (hex, e.g. 0xfff5e0 for warm)
    fillColor: 0xffffff, // Fill light color (hex)
  };
  // ──────────────────────────────────────────────────────────────────────────

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(W, H);
  renderer.setPixelRatio(DPR);
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = CUP.exposure;

  const scene = new THREE.Scene();

  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();
  scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), CUP.envIntensity).texture;
  pmremGenerator.dispose();

  const camera = new THREE.PerspectiveCamera(10, W / H, 0.01, 10000);
  camera.position.set(0, 0, 50);
  camera.lookAt(0, 0, 0);

  const key = new THREE.DirectionalLight(CUP.keyColor, CUP.keyIntensity);
  key.position.set(-2, 4, 3);
  scene.add(key);

  const fill = new THREE.DirectionalLight(CUP.fillColor, CUP.fillIntensity);
  fill.position.set(3, 1, 3);
  scene.add(fill);

  // ── Load GLB ────────────────────────────────────────────────────────────────
  const loader = new GLTFLoader();
  loader.load(
    '/media/asset/greeedcup.glb',

    (gltf) => {
      const model = gltf.scene;

      const box = new THREE.Box3().setFromObject(model);
      const center = new THREE.Vector3();
      box.getCenter(center);
      model.position.sub(center);
      scene.add(model);

      const box2 = new THREE.Box3().setFromObject(model);
      const size = new THREE.Vector3();
      box2.getSize(size);
      const fovRad = (camera.fov * Math.PI) / 180;
      const fitDist = (size.y / 2) / Math.tan(fovRad / 2);
      camera.position.set(0, 0, fitDist * 1.5);
      camera.near = fitDist * 0.001;
      camera.far = fitDist * 100;
      camera.updateProjectionMatrix();
      camera.lookAt(0, 0, 0);

      // 0.7 rad (~40°) offset: enough to hide the logo at start and reveal it
      // on scroll without passing through the 90° edge-on point that looks
      // like the cup is sliding in from the side.
      finalRotY = model.rotation.y;
      rotStartY = finalRotY + 0.7;
      model.rotation.y = rotStartY;

      cupModel = model;

      // Sync to current scroll position (handles back-button mid-scroll)
      updateHeroScroll();

      console.log('[Cup3D] loaded. finalRotY:', finalRotY.toFixed(3), 'rad');
    },

    undefined,
    (err) => console.error('[Cup3D] GLB load error:', err)
  );

  // ── Static render loop ───────────────────────────────────────────────────────
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
}

// ─── Drag + Spring for interactive cards ──────────────────────────────────────
function makeDraggable(selector) {
  const SPRING_MS = 700;
  let zTop = 100;

  document.querySelectorAll(selector).forEach(card => {
    let dragging = false;
    let startX = 0, startY = 0;
    let dragX = 0, dragY = 0;

    card.addEventListener('mousedown', e => {
      e.preventDefault();
      dragging = true;
      startX = e.clientX - dragX;
      startY = e.clientY - dragY;
      card.style.transition = 'none';
      card.style.zIndex = ++zTop;
      card.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', e => {
      if (!dragging) return;
      dragX = e.clientX - startX;
      dragY = e.clientY - startY;
      card.style.translate = `${dragX}px ${dragY}px`;
    });

    const release = () => {
      if (!dragging) return;
      dragging = false;
      dragX = 0;
      dragY = 0;
      card.style.cursor = 'grab';
      card.style.transition = `translate ${SPRING_MS}ms cubic-bezier(0.25, 1.4, 0.5, 1)`;
      card.style.translate = '0px 0px';
      setTimeout(() => { card.style.transition = ''; }, SPRING_MS + 60);
    };

    window.addEventListener('mouseup', release);
    card.style.cursor = 'grab';
  });
}

// ─── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initCupScene();
  makeDraggable('.feature-card');
  makeDraggable('.loyalty-card');

  window.addEventListener('scroll', updateHeroScroll, { passive: true });
  window.addEventListener('resize', updateHeroScroll);
  updateHeroScroll();
});
