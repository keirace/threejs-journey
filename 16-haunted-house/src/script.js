import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Timer } from "three/addons/misc/Timer.js";
import GUI from "lil-gui";
import { Sky } from "three/examples/jsm/objects/Sky.js";

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

// Floor
const floorAlphaTexture = textureLoader.load("./floor/alpha.webp");
const floorTextures = {
	color: textureLoader.load("./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.webp"),
	normal: textureLoader.load("./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.webp"),
	ARM: textureLoader.load("./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.webp"),
	displacement: textureLoader.load("./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.webp"),
};

floorTextures.color.colorSpace = THREE.SRGBColorSpace;

for (const texture of Object.values(floorTextures)) {
	texture.repeat.set(8, 8);
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
}

// Wall
const wallColorTexture = textureLoader.load("./wall/concrete_wall_006_1k/concrete_wall_006_diff_1k.webp");
const wallNormalTexture = textureLoader.load("./wall/concrete_wall_006_1k/concrete_wall_006_nor_gl_1k.webp");
const wallARMTexture = textureLoader.load("./wall/concrete_wall_006_1k/concrete_wall_006_arm_1k.webp");

wallColorTexture.colorSpace = THREE.SRGBColorSpace;

// Roof
const roofTextures = {
	color: textureLoader.load("./roof/roof_slates_02_1k/roof_slates_02_diff_1k.webp"),
	normal: textureLoader.load("./roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.webp"),
	ARM: textureLoader.load("./roof/roof_slates_02_1k/roof_slates_02_arm_1k.webp"),
	displacement: textureLoader.load("./roof/roof_slates_02_1k/roof_slates_02_disp_1k.webp"),
};
roofTextures.color.colorSpace = THREE.SRGBColorSpace;

for (const texture of Object.values(roofTextures)) {
	texture.repeat.set(2, 1);
	texture.wrapS = THREE.RepeatWrapping;
}

// Bush
const bushTexture = textureLoader.load("./bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.webp");
bushTexture.colorSpace = THREE.SRGBColorSpace;
const bushNormalTexture = textureLoader.load("./bush/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.webp");
const bushARMTexture = textureLoader.load("./bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.webp");

// Grave
const graveTexture = textureLoader.load("./grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.webp");
graveTexture.colorSpace = THREE.SRGBColorSpace;
const graveNormalTexture = textureLoader.load("./grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.webp");
const graveARMTexture = textureLoader.load("./grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.webp");

// Door
const doorTexture = textureLoader.load("./door/color.webp");
doorTexture.colorSpace = THREE.SRGBColorSpace;
const doorNormalTexture = textureLoader.load("./door/normal.webp");
const doorAOTexture = textureLoader.load("./door/ambientOcclusion.webp");
const doorRoughnessTexture = textureLoader.load("./door/roughness.webp");
const doorMetalnessTexture = textureLoader.load("./door/metalness.webp");
const doorHeightTexture = textureLoader.load("./door/height.webp");
const doorAlphaTexture = textureLoader.load("./door/alpha.webp");

// Ghost
const ghost1 = new THREE.PointLight("#8800ff", 6, 3);
const ghost2 = new THREE.PointLight("#ff0088", 6, 3);
const ghost3 = new THREE.PointLight("#ff00ff", 6, 3);
scene.add(ghost1, ghost2, ghost3);

/* *
 * House
 */

// Floor
const floor = new THREE.Mesh(
	new THREE.PlaneGeometry(20, 20, 100, 100), // more segments for displacement
	new THREE.MeshStandardMaterial({
		alphaMap: floorAlphaTexture,
		transparent: true,
		map: floorTextures.color,
		normalMap: floorTextures.normal,
		aoMap: floorTextures.ARM,
		roughnessMap: floorTextures.ARM,
		metalnessMap: floorTextures.ARM,
		displacementMap: floorTextures.displacement,
		displacementScale: 0.3,
		displacementBias: 0.02,
	})
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

gui.add(floor.material, "displacementScale").min(0).max(1).step(0.001).name("displacementScale");
gui.add(floor.material, "displacementBias").min(-1).max(1).step(0.001).name("displacementBias");

// House container
const house = new THREE.Group();
scene.add(house);

// Walls
const walls = new THREE.Mesh(
	new THREE.BoxGeometry(4, 2.5, 4, 100, 100),
	new THREE.MeshStandardMaterial({
		map: wallColorTexture,
		normalMap: wallNormalTexture,
		aoMap: wallARMTexture,
		roughnessMap: wallARMTexture,
		metalnessMap: wallARMTexture,
	})
);
walls.position.y = 2.5 / 2;
house.add(walls);

// Roof
const roof = new THREE.Mesh(
	new THREE.ConeGeometry(3.5, 1.5, 4), // radius, height, radialSegments
	new THREE.MeshStandardMaterial({ color: "brown", map: roofTextures.color, normalMap: roofTextures.normal, aoMap: roofTextures.ARM, roughnessMap: roofTextures.ARM, metalnessMap: roofTextures.ARM })
);
roof.position.y = 2.5 + 1.5 / 2;
roof.rotation.y = Math.PI / 4;
house.add(roof);

// Door
const door = new THREE.Mesh(
	new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
	new THREE.MeshStandardMaterial({
		color: "red",
		map: doorTexture,
		normalMap: doorNormalTexture,
		aoMap: doorAOTexture,
		roughnessMap: doorRoughnessTexture,
		metalnessMap: doorMetalnessTexture,
		displacementMap: doorHeightTexture,
		displacementScale: 0.15,
		displacementBias: -0.04,
		alphaMap: doorAlphaTexture,
		transparent: true,
	})
);
door.position.z = 4 / 2 + 0.01;
door.position.y = 1;
house.add(door);

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({
	color: "#ccffcc",
	map: bushTexture,
	normalMap: bushNormalTexture,
	aoMap: bushARMTexture,
	roughnessMap: bushARMTexture,
	metalnessMap: bushARMTexture,
});

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);
bush1.rotation.x = -0.75;

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);
bush2.rotation.x = -0.75;

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-1.4, 0.1, 2.1);
bush3.rotation.x = -0.75;

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1.7, 0.05, 2.6);
bush4.rotation.x = -0.75;

house.add(bush1, bush2, bush3, bush4);

// Graves
const graves = new THREE.Group();
scene.add(graves);

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({ map: graveTexture, normalMap: graveNormalTexture, aoMap: graveARMTexture, roughnessMap: graveARMTexture, metalnessMap: graveARMTexture });

for (let i = 0; i < 30; i++) {
	const angle = Math.random() * Math.PI * 2;
	const radius = 3 + Math.random() * 6; // random number between 3 and 9
	const x = Math.sin(angle) * radius;
	const y = Math.random() * 0.4;
	const z = Math.cos(angle) * radius;
	// console.log(angle, x, z);

	const grave = new THREE.Mesh(graveGeometry, graveMaterial);
	grave.position.set(x, y, z);
	grave.rotation.x = (Math.random() - 0.5) * 0.4; // random number between -0.2 and 0.2
	graves.add(grave);
}

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#86cdff", 0.275);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight("#86cdff", 1);
directionalLight.position.set(3, 2, -8);
scene.add(directionalLight);

// Door light
const doorLight = new THREE.PointLight("#ff7d46", 3, 7);
doorLight.position.set(0, 2.2, 2.5);
house.add(doorLight);

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
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
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

/*
 * Shadows
 */
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Cast and receive shadows
directionalLight.castShadow = true;
floor.receiveShadow = true;
walls.castShadow = true;
walls.receiveShadow = true;
roof.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;
graves.children.forEach((child) => {
	child.castShadow = true;
	child.receiveShadow = true;
});

// Mapping
directionalLight.shadow.mapSize.set(256, 256);
directionalLight.shadow.camera.top = 8;
directionalLight.shadow.camera.right = 8;
directionalLight.shadow.camera.bottom = -8;
directionalLight.shadow.camera.left = -8;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 20;

ghost1.shadow.mapSize.set(256, 256);
ghost1.shadow.camera.far = 10;

ghost2.shadow.mapSize.set(256, 256);
ghost2.shadow.camera.far = 10;

ghost3.shadow.mapSize.set(256, 256);
ghost3.shadow.camera.far = 10;

/**
 * Sky
 */
const sky = new Sky();
sky.scale.setScalar(100);
scene.add(sky);
sky.material.uniforms["turbidity"].value = 10;
sky.material.uniforms["rayleigh"].value = 3;
sky.material.uniforms["mieCoefficient"].value = 0.1;
sky.material.uniforms["mieDirectionalG"].value = 0.95;
sky.material.uniforms["sunPosition"].value.set(0.3, -0.038, -0.95);

/**
 * Fog
 */
scene.fog = new THREE.Fog("#02343f", 10, 20);

/**
 * Animate
 */
const timer = new Timer();

const tick = () => {
	// Timer
	timer.update();
	const elapsedTime = timer.getElapsed();

	// Ghosts
	const ghost1Angle = elapsedTime * 0.5;
	ghost1.position.x = Math.cos(ghost1Angle) * 4;
	ghost1.position.z = Math.sin(ghost1Angle) * 4;
	ghost1.position.y = Math.sin(ghost1Angle) * Math.sin(ghost1Angle * 4) + Math.sin(ghost1Angle * 2);

	const ghost2Angle = -elapsedTime * 0.3;
	ghost2.position.x = Math.cos(ghost2Angle) * 4;
	ghost2.position.z = Math.sin(ghost2Angle) * 4;
	ghost2.position.y = Math.sin(ghost2Angle) * Math.sin(ghost2Angle * 4) + Math.sin(ghost2Angle * 2);

	const ghost3Angle = elapsedTime * 0.2;
	ghost3.position.x = Math.cos(ghost3Angle) * 4;
	ghost3.position.z = Math.sin(ghost3Angle) * 4;
	ghost3.position.y = Math.sin(ghost3Angle) * Math.sin(ghost3Angle * 4) + Math.sin(ghost3Angle * 2);

    // Door light flicker
    doorLight.intensity = Math.sin(elapsedTime * 0.5) * 2 + 3 + Math.sin(elapsedTime * 4);

	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
