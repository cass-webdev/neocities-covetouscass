import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;
let scene, renderer, camera, canvasElem, shark;

function setupScene() {
	canvasElem = document.getElementById('canvas-container');
	scene = new THREE.Scene();
	// Camera params - fov, aspect ratio, near clipping plane, far clipping plane
	camera = new THREE.PerspectiveCamera( 75, CANVAS_WIDTH / CANVAS_HEIGHT, 0.1, 1000 );
	camera.position.z = 5;

	renderer = new THREE.WebGLRenderer({
		canvas: canvasElem
	});
	renderer.setSize( CANVAS_WIDTH, CANVAS_HEIGHT );
	canvasElem.innerHTML = renderer.domElement; // need to attach canvas to specific container
}

function addLighting() {
	// White directional light at half intensity shining from the top.
	const directionalLight = new THREE.DirectionalLight( 0xffffff, 1.0 );
	scene.add( directionalLight );
}

async function gltfLoader() {
	const loader = new GLTFLoader();
	const gltfData = await modelLoader('assets/shark/scene.gltf', loader);
	shark = gltfData.scene;
	scene.add(shark);
}

function animate() {
  if (shark) {
    shark.rotation.x += 0.01;
    shark.rotation.y += 0.01;
  }

	renderer.render( scene, camera );
}

async function init() {
	setupScene();
	addLighting();
	await gltfLoader();

	renderer.setAnimationLoop( animate );
}

init();

// Lifted from https://discourse.threejs.org/t/most-simple-way-to-wait-loading-in-gltf-loader/13896/2
// this utility function allows you to use any three.js
// loader with promises and async/await
function modelLoader(url, loader) {
  return new Promise((resolve, reject) => {
    loader.load(url, data=> resolve(data), null, reject);
  });
}

// Simple ideas:
// [x] Spinning blahaj x]

// Complex ideas:
// 90s themed room looking out the window with runescape on the crt
// Social sim of moving an avatar of me around a room, isometric viewpoint, certain articles highlighted are context objects detailing my life