import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

/**
 * Loaders
 */
const gltfLoader = new GLTFLoader();
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
 * Textures
 */
const brickDiffuseTexture = textureLoader.load("/textures/castle_brick_broken_06/castle_brick_broken_06_diff_1k.jpg");
const brickARMTexture = textureLoader.load("/textures/castle_brick_broken_06/castle_brick_broken_06_arm_1k.jpg");
const brickNormalTexture = textureLoader.load("/textures/castle_brick_broken_06/castle_brick_broken_06_nor_gl_1k.png");
brickDiffuseTexture.colorSpace = THREE.SRGBColorSpace; // color space optimizes how colors are being stored according to the human eye sensitivity

const woodDiffuseTexture = textureLoader.load("/textures/wood_cabinet_worn_long/wood_cabinet_worn_long_diff_1k.jpg");
const woodARMTexture = textureLoader.load("/textures/wood_cabinet_worn_long/wood_cabinet_worn_long_arm_1k.jpg");
const woodNormalTexture = textureLoader.load("/textures/wood_cabinet_worn_long/wood_cabinet_worn_long_nor_gl_1k.png");
woodDiffuseTexture.colorSpace = THREE.SRGBColorSpace;

/**
 * Update all materials
 */
const updateAllMaterials = () => {
	scene.traverse((child) => {
		if (child.isMesh) {
			// Activate shadow here
			child.castShadow = true;
			child.receiveShadow = true;
		}
	});
};

/**
 * Environment map
 */
// Intensity
scene.environmentIntensity = 1;
gui.add(scene, "environmentIntensity").min(0).max(10).step(0.001);

// HDR (RGBE) equirectangular
rgbeLoader.load("/environmentMaps/0/2k.hdr", (environmentMap) => {
	environmentMap.mapping = THREE.EquirectangularReflectionMapping;

	scene.background = environmentMap;
	scene.environment = environmentMap;
});

/**
 * Directional Light
 */
const directionalLight = new THREE.DirectionalLight("#ffffff", 6);
directionalLight.position.set(-4, 6.5, 2.5);
directionalLight.castShadow = true;
scene.add(directionalLight);

gui.add(directionalLight, "intensity").min(0).max(10).step(0.001).name("light intensity");
gui.add(directionalLight.position, "x").min(-10).max(10).step(0.001).name("light x");
gui.add(directionalLight.position, "y").min(-10).max(10).step(0.001).name("light y");
gui.add(directionalLight.position, "z").min(-10).max(10).step(0.001).name("light z");

// Shadow
directionalLight.castShadow = true;
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.normalBias = 0.05;
directionalLight.shadow.bias = -0.001;

gui.add(directionalLight, "castShadow").name("light shadow");
gui.add(directionalLight.shadow, "bias").min(-0.01).max(0.01).step(0.0001).name("shadow bias");
gui.add(directionalLight.shadow, "normalBias").min(-0.01).max(0.01).step(0.0001).name("shadow normal bias");

// Helper
// const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(directionalLightCameraHelper);

// Target
directionalLight.target.position.set(0, 4, 0);
// scene.add(directionalLight.target); // option 1 in updating the target
directionalLight.target.updateMatrixWorld(); // option 2

/**
 * Models
 */
// Helmet
gltfLoader.load("/models/hamburger.glb", (gltf) => {
	gltf.scene.scale.setScalar(0.4);
    gltf.scene.position.set(0, 2.5, 0);
	scene.add(gltf.scene);

	updateAllMaterials();
});

/**
 * Plane
 */
const plane = new THREE.Mesh(
	new THREE.PlaneGeometry(8, 8),
	new THREE.MeshStandardMaterial({ map: brickDiffuseTexture, normalMap: brickNormalTexture, aoMap: brickARMTexture, roughnessMap: brickARMTexture, metalnessMap: brickARMTexture })
);
plane.position.set(0, 4, -4);

const plane2 = new THREE.Mesh(
	new THREE.PlaneGeometry(8, 8),
	new THREE.MeshStandardMaterial({ map: woodDiffuseTexture, normalMap: woodNormalTexture, aoMap: woodARMTexture, roughnessMap: woodARMTexture, metalnessMap: woodARMTexture })
);
plane2.rotation.x = -Math.PI * 0.5;

scene.add(plane, plane2);

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
	antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 2;

gui.add(renderer, "toneMapping", {
	No: THREE.NoToneMapping,
	Linear: THREE.LinearToneMapping,
	Reinhard: THREE.ReinhardToneMapping,
	Cineon: THREE.CineonToneMapping,
	ACESFilmic: THREE.ACESFilmicToneMapping,
}); /* .onFinishChange(() => {
	renderer.toneMapping = Number(renderer.toneMapping);
	updateAllMaterials();
}); */
gui.add(renderer, "toneMappingExposure").min(0).max(10).step(0.001);

// Physically accurate lighting
renderer.useLegacyLights = true;
gui.add(renderer, "useLegacyLights");

// Shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

/**
 * Animate
 */
const tick = () => {
	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
