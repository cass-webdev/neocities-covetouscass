import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

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
renderer.setClearColor(0xff0000, 1)
renderer.setSize( CANVAS_WIDTH, CANVAS_HEIGHT );
// canvasElem.appendChild( renderer.domElement ); 
document.body.appendChild( renderer.domElement );

// Load a glTF resource
const loader = new GLTFLoader();
loader.load(
	// resource URL
	'low_poly_blahaj_gltf/scene.gltf',
	// called when the resource is loaded
	function ( gltf ) {

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

		console.log( 'An error happened' );

	}
);

camera.position.z = 5;

function animate() {

	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );


// // Simple ideas:
// // Spinning blahaj x]

// // Complex ideas:
// // 90s themed room looking out the window with runescape on the crt
// // Social sim of moving an avatar of me around a room, isometric viewpoint, certain articles highlighted are context objects detailing my life