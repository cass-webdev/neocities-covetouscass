import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

if ( !WebGL.isWebGL2Available() ) {

	// Initiate function or other initializations here
	animate();

} else {

	const warning = WebGL.getWebGL2ErrorMessage();
	document.getElementById( 'canvas-container' ).appendChild( warning );

}

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

const scene = new THREE.Scene();
// Camera params - fov, aspect ratio, near clipping plane, far clipping plane
const camera = new THREE.PerspectiveCamera( 75, CANVAS_WIDTH / CANVAS_HEIGHT, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( CANVAS_WIDTH / CANVAS_HEIGHT );
document.getElementById('canvas-container').append( renderer.domElement ); // Shouldn't need to keep a canvas-container ref alive

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );


// Simple ideas:
// Spinning blahaj x]

// Complex ideas:
// 90s themed room looking out the window with runescape on the crt
// Social sim of moving an avatar of me around a room, isometric viewpoint, certain articles highlighted are context objects detailing my life