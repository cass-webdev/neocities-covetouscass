import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

// #########################
// ##### Web GL Checks #####
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

const canvasElem = document.getElementById('canvas-container');
const scene = new THREE.Scene();
// Camera params - fov, aspect ratio, near clipping plane, far clipping plane
const camera = new THREE.PerspectiveCamera( 75, CANVAS_WIDTH / CANVAS_HEIGHT, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: canvasElem
});
// renderer.setClearColor(0xFFFFFF, 1)
renderer.setSize( CANVAS_WIDTH, CANVAS_HEIGHT );

document.body.appendChild( renderer.domElement );
// White directional light at half intensity shining from the top.
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
scene.add( directionalLight );

// Load a glTF resource
const loader = new GLTFLoader();

// Optional: Provide a DRACOLoader instance to decode compressed mesh data
// ^^ Not sure if this is working anyways ^^
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( '/examples/jsm/libs/draco/' );
loader.setDRACOLoader( dracoLoader );

var shark;

loader.load(
	// resource URL
	'low_poly_blahaj_gltf/scene.gltf',
	// called when the resource is loaded
	function ( gltf ) {
    shark = gltf.scene;

		scene.add( gltf.scene );

		gltf.animations; // Array<THREE.AnimationClip>
	  gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log('Error occurred: ' + error);

	}
);

camera.position.z = 5;

function animate() {

  if (shark) {
    shark.rotation.x += 0.01;
    shark.rotation.y += 0.01;
  }

	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );


// // Simple ideas:
// // Spinning blahaj x]

// // Complex ideas:
// // 90s themed room looking out the window with runescape on the crt
// // Social sim of moving an avatar of me around a room, isometric viewpoint, certain articles highlighted are context objects detailing my life