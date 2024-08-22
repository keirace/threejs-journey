import * as THREE from "three";

// Create a scene
const scene = new THREE.Scene();

// Create an object
const geometry = new THREE.BoxGeometry(1, 1, 1); // width, height, depth
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 /* , wireframe: true */ }); // color, wireframe
const mesh = new THREE.Mesh(geometry, material); // combination of geometry and material
scene.add(mesh);

const sizes = {
	width: 800,
	height: 600,
};

// Create a camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height); // fov, aspect ratio
camera.position.z = 3;
scene.add(camera);

// Create a renderer
const canvas = document.querySelector("canvas.webgl");
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);
