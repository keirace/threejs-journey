import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load("/textures/particles/2.png");

/**
 * Particles
 */

// Material
const particleMaterial = new THREE.PointsMaterial({
	size: 0.1,
	sizeAttenuation: true, // particles that are further away from the camera will appear smaller
	// map: particleTexture,
	transparent: true,
	alphaMap: particleTexture,
	// alphaTest: 0.001, // if the alpha value is below 0.001, the pixel will be discarded
	// depthTest: false, // particles will not be occluded by other particles but they will be drawn on top of everything
	depthWrite: false, // particles will not write to the depth buffer
	blending: THREE.AdditiveBlending, // particles will be blended together
	vertexColors: true, // particles will have different colors
});

// Points
// const particles = new THREE.Points(particleGeometry, particleMaterial)
// scene.add(particles)

// scene.add(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({color: 0xff0000})));

// Random particles
const geometry = new THREE.BufferGeometry();
const count = 5000;
const positionsArray = new Float32Array(count * 3);
const colorsArray = new Float32Array(count * 3); // RGB values
for (let i = 0; i < count * 3; i++) {
	positionsArray[i] = (Math.random() - 0.5) * 10;
	colorsArray[i] = Math.random();
}
geometry.setAttribute("position", new THREE.BufferAttribute(positionsArray, 3));
geometry.setAttribute("color", new THREE.BufferAttribute(colorsArray, 3));
const particles = new THREE.Points(geometry, particleMaterial);
scene.add(particles);

/**
 * Sizes
 */
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

window.addEventListener("resize", () => {
	// Update sizes
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// Update camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Update renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
	const elapsedTime = clock.getElapsedTime();

    // particles.rotation.y = elapsedTime * 0.1;

    // Wave effect - bad practice - better to use custom shaders
    for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const x = particles.geometry.attributes.position.array[i3];
        particles.geometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x); // y
    }
    particles.geometry.attributes.position.needsUpdate = true;

	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
