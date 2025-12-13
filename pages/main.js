import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js';
import { VRButton } from 'https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/webxr/VRButton.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 1.6, 3);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);
document.body.appendChild(VRButton.createButton(renderer));

// Luz
const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
scene.add(light);

// Piso
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({ color: 0x222222 })
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Modelo
const loader = new GLTFLoader();
loader.load('modelo.glb', gltf => {
  gltf.scene.position.set(0, 0, -2);
  scene.add(gltf.scene);
});

// Render loop
renderer.setAnimationLoop(() => {
  renderer.render(scene, camera);
});
