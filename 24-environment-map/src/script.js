import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { GroundedSkybox } from "three/addons/objects/GroundedSkybox.js";

/**
 * Loaders
 */
const gltfLoader = new GLTFLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();
const rgbeLoader = new RGBELoader();
const textureLoader = new THREE.TextureLoader();

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
 * Environment map
 */

scene.environmentIntensity = 2; // default is 1
scene.backgroundBlurriness = 0; // default is 0
scene.backgroundIntensity = 1; // default is 1
scene.backgroundRotation.y = 1;
scene.environmentRotation.y = 1;

gui.add(scene, "environmentIntensity").min(0).max(10).step(0.01).name("environment intensity");
gui.add(scene, "backgroundBlurriness").min(0).max(1).step(0.01).name("background blurriness");
gui.add(scene, "backgroundIntensity").min(0).max(10).step(0.01).name("background intensity");
gui.add(scene.backgroundRotation, "y").min(-Math.PI).max(Math.PI).step(0.001).name("background rotation x");
gui.add(scene.environmentRotation, "y").min(-Math.PI).max(Math.PI).step(0.001).name("environment rotation y");

// // LDR (Low Dynamic Range) environment map
// // Must load 6 images (px, nx, py, ny, pz, nz) in this order
// const environmentMap = cubeTextureLoader.load([
// 	"/environmentMaps/1/px.png",
// 	"/environmentMaps/1/nx.png",
// 	"/environmentMaps/1/py.png",
// 	"/environmentMaps/1/ny.png",
// 	"/environmentMaps/1/pz.png",
// 	"/environmentMaps/1/nz.png",
// ]);

// scene.environment = environmentMap; // apply the environment map as lighting to the whole scene
// scene.background = environmentMap;

// // HDR (High Dynamic Range) environment map
// rgbeLoader.load("/environmentMaps/blender-2k.hdr", (environmentMap) => {
//     environmentMap.mapping = THREE.EquirectangularReflectionMapping;
//     scene.environment = environmentMap;
//     // scene.background = environmentMap;
// });

// // LDR Equirectangular
// const environmentMap = textureLoader.load("/environmentMaps/blockadesLabsSkybox/digital_painting_neon_city_night_orange_lights_.jpg");
// environmentMap.mapping = THREE.EquirectangularReflectionMapping;
// environmentMap.colorSpace = THREE.SRGBColorSpace;
// scene.background = environmentMap;
// scene.environment = environmentMap;

// // Ground Projected Skybox
// rgbeLoader.load("/environmentMaps/2/2k.hdr", (environmentMap) => {
//     environmentMap.mapping = THREE.EquirectangularReflectionMapping;
//     scene.environment = environmentMap;

//     // Skybox
//     const skybox = new GroundedSkybox(environmentMap, 15, 70); // texture, size, height
//     // skybox.material.wireframe = true;
//     skybox.position.y = 15;
//     scene.add(skybox);
// });

// Real time environment map
const environmentMap = textureLoader.load("/environmentMaps/blockadesLabsSkybox/interior_views_cozy_wood_cabin_with_cauldron_and_p.jpg");
environmentMap.mapping = THREE.EquirectangularReflectionMapping;
environmentMap.colorSpace = THREE.SRGBColorSpace;
scene.background = environmentMap;
// scene.environment = environmentMap;

// Holy donut
const holyDonut = new THREE.Mesh(new THREE.TorusGeometry(8, 0.5, 16, 100), new THREE.MeshBasicMaterial({ color: new THREE.Color(10, 4, 2) }));
holyDonut.position.y = 4;
holyDonut.layers.enable(1); // Render to the cube camera
scene.add(holyDonut);

// Cube render target
const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(
	256, // 256 pixels per face
	{
		type: THREE.HalfFloatType, // 16-bit floating point
	}
);
scene.environment = cubeRenderTarget.texture;

const cubeCamera = new THREE.CubeCamera(0.1, 100, cubeRenderTarget);
cubeCamera.layers.set(1); // Render only objects with layer 1 and disable the rest

//
/**
 * Torus Knot
 */
const torusKnot = new THREE.Mesh(new THREE.TorusKnotGeometry(1, 0.4, 100, 16), new THREE.MeshStandardMaterial({ roughness: 0, metalness: 1, color: 0xaaaaaa }));
torusKnot.position.x = -4;
torusKnot.position.y = 4;
// torusKnot.material.envMap = environmentMap;
scene.add(torusKnot);

/**
 * Scene
 */
gltfLoader.load("/models/FlightHelmet/glTF/FlightHelmet.gltf", (gltf) => {
	const helmet = gltf.scene;
	helmet.scale.set(10, 10, 10);
	scene.add(helmet);

	// Debug
	gui.add(helmet.rotation, "y").min(-Math.PI).max(Math.PI).step(0.001).name("rotation");
});

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
camera.position.set(4, 5, 4);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.target.y = 3.5;
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
	// Time
	const elapsedTime = clock.getElapsedTime();

	// Real time environment map
	if (holyDonut) {
		holyDonut.rotation.x = Math.sin(elapsedTime) * Math.PI * 0.25;
		cubeCamera.update(renderer, scene);
	}

	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
