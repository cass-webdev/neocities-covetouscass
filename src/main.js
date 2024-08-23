import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;
let scene, renderer, camera, canvasElem, shark;

function setupScene() {
	canvasElem = document.getElementById('canvas');
	scene = new THREE.Scene();
	// Camera params - fov, aspect ratio, near clipping plane, far clipping plane
	camera = new THREE.PerspectiveCamera(75, CANVAS_WIDTH / CANVAS_HEIGHT, 0.1, 1000);
	camera.position.x = 0;
	camera.position.y = 0;
	camera.position.z = 3;

	renderer = new THREE.WebGLRenderer({
		canvas: canvasElem
	});
	renderer.setSize(CANVAS_WIDTH, CANVAS_HEIGHT);

	// These aren't locking focus on the window like I hoped.. what to do to fix?
	const controls = new PointerLockControls( camera, document.body );
	// add event listener to show/hide a UI (e.g. the game's menu)
	controls.addEventListener('lock', () => {
		menu.style.display = 'none';
	});

	controls.addEventListener('unlock', () => {
		menu.style.display = 'block';
	});

	canvasElem.innerHTML = renderer.domElement; // need to attach canvas to specific container
}

function addLighting() {
	// White directional light shining from above and in front.
	const topFrontLight = new THREE.DirectionalLight(0xffffff, 0.6);
	topFrontLight.position.y = 100;
	topFrontLight.position.z = 100;

	scene.add(topFrontLight);
}

function addExtraModels() {
	const geometry = new THREE.PlaneGeometry(3, 1, 1, 1);
	const material = new THREE.MeshBasicMaterial({
		color: '#00AAAA',
		side: THREE.DoubleSide // What's a "side"?
	});
	const mesh = new THREE.Mesh(geometry, material);
	mesh.rotation.x = 4;
	mesh.rotation.y = 1;
	mesh.rotation.z = 0;
	scene.add(mesh);
}

function addDebugging() {
	const axesHelper = new THREE.AxesHelper(5);
	scene.add(axesHelper);
}

function addControls() {
	document.onkeydown = function(event) {
		/*
			Not quite right.. this keeps increasing x / y linearly but camera will always seem to move farther away from origin..
			Example:

			0:00 (m:ss) - c is camera, 0 is origin
									|
									|
				----------0----------
									|
									c

			0:01 (m:ss) - increase x by 1
									|
									|
				----------0----------
									|
									|c

			0:05 (m:ss) - increase x by 5
									|
									|
				----------0----------
									|
									|    c 

			0:30 (m:ss) - increase x by 30
									|
									|
				----------0----------
									|
							    |                              c

			Modify the Z of the camera so it's never too far?
			- define a desired radius to determine how far away the camera will be from origin
			- 
			- look at camera position
			- if camera is at x: 0, y: 0 OR x: radius or y: radius , set z to radius of the diameter
			- else if camera 
			- lol I need to find out the math for this
		*/
		switch (event.keyCode) {
			case 37:
				camera.position.x -= 0.5;
			break;
			case 38:
				camera.position.y += 0.5;
			break;
			case 39:
				camera.position.x += 0.5;
			break;
			case 40:
				camera.position.y -= 0.5;
			break;
		}
	}
}

async function gltfLoader() {
	const gltfLoader = new GLTFLoader();
	const gltfData = await modelLoader('assets/models/shark/scene.gltf', gltfLoader);
	shark = gltfData.scene;
	scene.add(shark);
}

function animate() {
  if (shark) {
    shark.rotation.x += 0.01;
    shark.rotation.y += 0.01;
  }

	camera.lookAt(0, 0, 0); // Force camera to look at 0,0,0 because we want to move around the origin like a sphere :)

	// TODO - Could I replace the texture w/ a shifting rainbow effect?
	// Like the text appears to shimmer but it's just the text being moved one direction.
	// OOOO OR MAYBE i could warp the texture _while_ I move it in a direction.
	// OR OR OR random direction? But wait I'd have to make the timing of the moves random themselves
	// shark.traverse((child) => {
	// 	if (child.material && child.material.name == "placeholder") {

	// 	}
	// });

	renderer.render( scene, camera );
}

async function init() {
	setupScene();
	addLighting();
	addExtraModels();
	addDebugging();
	addControls();
	await gltfLoader();

	renderer.setAnimationLoop(animate);
}

init();

// Lifted from https://discourse.threejs.org/t/most-simple-way-to-wait-loading-in-gltf-loader/13896/2
// this utility function allows you to use any three.js
// loader with promises and async/await
function modelLoader(url, loader) {
  return new Promise((resolve, reject) => {
    loader.load(url, data => resolve(data), null, reject);
  });
}

// Simple ideas:
// [x] Spinning blahaj x]

// Complex ideas:
// 90s themed room looking out the window with runescape on the crt
// Social sim of moving an avatar of me around a room, isometric viewpoint, certain articles highlighted are context objects detailing my life