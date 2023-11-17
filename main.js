import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import model from './assets/rap_export2.gltf';
import deviceRotation from 'device-rotation';
import { getBrowserVersion, isAndroid } from './utils/browserVersion.js';
import { setCfg } from './utils/setCfg.js';
import { sceneCfg } from './assets/sceneCfg.js';
import { getDateString } from './utils/date.js';
import { TypeShuffle, initAccordionShuffle } from './utils/typeShuffle.js';

const $splash = document.querySelector('.splash');
const $acceptButton = $splash.querySelector('.splash__button');
const $accordion = document.querySelector('.accordion');
const $footerTime = document.querySelector('.footer__time');
const $footerSensors = document.querySelector('.footer__sensors');
const $footerVersion = document.querySelector('.footer__browser-version');

$footerTime.textContent = getDateString(new Date());
$footerVersion.textContent = getBrowserVersion() || '';

const loader = new GLTFLoader();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.autoClear = false;
renderer.setClearAlpha(1);
renderer.setClearColor(0x000000, 0.0);
document.body.appendChild(renderer.domElement);

let plane;
const base = new THREE.Object3D();
const raycaster = new THREE.Raycaster();
const inputInterface = new THREE.Vector2(); // mouse or orientation sensor
const pointOfIntersection = new THREE.Vector3();
const lerpedInputInterface = new THREE.Vector2();

let mixer;
let isModelReady = false;

const initShuffle2 = () =>
  initAccordionShuffle($accordion, '#tab2-span', '#tab2-label', initShuffle3);
const initShuffle3 = () =>
  initAccordionShuffle($accordion, '#tab3-span', '#tab3-label', initShuffle4);
const initShuffle4 = () => initAccordionShuffle($accordion, '#tab4-span', '#tab4-label');

function initGyroscope() {
  let isGranted = sessionStorage.getItem('isGranted');
  if (deviceRotation?.isAvailable()) {
    deviceRotation.setCallback(({ x, y }) => {
        inputInterface.x = x / 40;
        inputInterface.y = y / 100;
        $footerSensors.textContent = `X: ${Math.floor(
          lerpedInputInterface.x * 1000
        )}; Y: ${Math.floor(lerpedInputInterface.y * 1000)};`;
        $splash.style.display = 'none';
    });

    if (!isAndroid()) {
      if (isGranted !== 'true') {
        // if (deviceRotation?.needPermission()) {
        if (navigator?.maxTouchPoints !== 0) {
          $acceptButton.addEventListener('click', () => {
            sessionStorage.setItem('isGranted', 'true');
            initAccordionShuffle($accordion, '#tab1-span', '#tab1-label', initShuffle2);
            deviceRotation.start({ withPermission: true });
          });
        }
      } else {
        deviceRotation.start();
        $splash.style.display = 'none';
        initAccordionShuffle($accordion, '#tab1-span', '#tab1-label', initShuffle2);
      }
    } else if (isAndroid()) {
      deviceRotation.start();
      $splash.style.display = 'none';
      initAccordionShuffle($accordion, '#tab1-span', '#tab1-label', initShuffle2);
    }
  } else if (!deviceRotation?.isAvailable()) {
    deviceRotation.stop();
    $splash.style.display = 'none';
    initAccordionShuffle($accordion, '#tab1-span', '#tab1-label', initShuffle2);
  } else {
    $splash.style.display = 'none';
    initAccordionShuffle($accordion, '#tab1-span', '#tab1-label', initShuffle2);
  }

	if (navigator?.maxTouchPoints === 0) {
    window.addEventListener(
      'mousemove',
      (e) => {
          inputInterface.x = (e.clientX / window.innerWidth) * 2 - 1;
          inputInterface.y = -(e.clientY / window.innerHeight) * 2 + 1;

          $footerSensors.textContent = `X: ${Math.floor(
            lerpedInputInterface.x * 1000
          )}; Y: ${Math.floor(lerpedInputInterface.y * 1000)};`;
      },
      false
    );
  }
}

function sceneInit(cfg) {
  scene.clear();
  base.position.x = cfg.model.x;
  base.position.y = cfg.model.y;
  base.position.z = cfg.model.z;
  scene.add(base);

  camera.position.set(cfg.camera.x, cfg.camera.y, cfg.camera.z);
  camera.lookAt(cfg.model.z, cfg.model.y, cfg.model.z);

  const pointLight = new THREE.PointLight(
    new THREE.Color(cfg.light1.r, cfg.light1.g, cfg.light1.b),
    cfg.light1.intensity,
    0,
    cfg.light1.decay
  );
  pointLight.position.set(cfg.light1.x, cfg.light1.y, cfg.light1.z);
  scene.add(pointLight);

  const pointLight2 = new THREE.PointLight(
    0xffffff,
    cfg.light2.intensity,
    0,
    cfg.light2.decay
  );
  pointLight2.position.set(cfg.light2.x, cfg.light2.y, cfg.light2.z);
  pointLight2.visible = true;
  scene.add(pointLight2);

  loader.load(
    model,
    (gltf) => {
      mixer = new THREE.AnimationMixer(gltf.scene);

      gltf.animations.forEach((clip) => mixer.clipAction(clip).play());

      base.clear();
      base.add(gltf.scene);

      isModelReady = true;

      const splashShuffle = new TypeShuffle(document.querySelector('.splash__text'));
      splashShuffle
        .trigger()
        .then(() => ($acceptButton.style.display = 'block'));
    },
    undefined,
    (error) => console.error(error)
  );

  plane = new THREE.Plane(
    new THREE.Vector3(cfg.camera.x, cfg.camera.y, cfg.camera.z),
    cfg.model.normal
  );

  initGyroscope(plane);
}

let cfg = setCfg(sceneCfg);
sceneInit(cfg);

screen.orientation.addEventListener('change', () => location.reload());
window.addEventListener('resize', onWindowResize);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  scene.clear();
  cfg = setCfg(sceneCfg);
  sceneInit(cfg);
}


function cursorAnimation(plane) {
  lerpedInputInterface.lerp(
    new THREE.Vector2(inputInterface.x, inputInterface.y),
    0.08
  );

  raycaster.setFromCamera(lerpedInputInterface, camera);
  raycaster.ray.intersectPlane(plane, pointOfIntersection);
  base.lookAt(pointOfIntersection);
}

const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);

  $footerTime.textContent = getDateString(new Date());

  cursorAnimation(plane);

  // remove after testing!
  // camera.lookAt(cameraOpts.lookAtX, cameraOpts.lookAtY, cameraOpts.lookAtZ);
  if (isModelReady) mixer.update(clock.getDelta());
  renderer.render(scene, camera);
}
animate(cfg);
