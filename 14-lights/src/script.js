import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";

/**
 * Base
 */
// Debug
const gui = new GUI({ closeFolders: true });

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Lights
 */

/** Performance **/
// Minimal cost light - AmbientLight, HemisphereLight
// Moderate cost light - DirectionalLight, PointLight
// High cost light - SpotLight, RectAreaLight

// Ambient light - omnidirectional lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);
const ambientLightFolder = gui.addFolder("Ambient Light");
ambientLightFolder.add(ambientLight, "intensity").min(0).max(3).step(0.001);

// Directional light - sun-like lighting
const directionalLight = new THREE.DirectionalLight(0x00fffc, 1);
directionalLight.position.set(1, 0.25, 0);
scene.add(directionalLight);
const directionalLightFolder = gui.addFolder("Directional Light");
directionalLightFolder.add(directionalLight, "intensity").min(0).max(3).step(0.001);

// Hemisphere light - gradient lighting (sky and ground)
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 1);
scene.add(hemisphereLight);
const hemisphereLightFolder = gui.addFolder("Hemisphere Light");
hemisphereLightFolder.add(hemisphereLight, "intensity").min(0).max(3).step(0.001);

// Point light - light bulb lighting
const pointLight = new THREE.PointLight(0x009000, 1, 10, 2); // color, intensity, distance, decay
pointLight.position.set(1, -0.5, 1);
scene.add(pointLight);
const pointLightFolder = gui.addFolder("Point Light");
pointLightFolder.add(pointLight, "intensity").min(0).max(3).step(0.001);
pointLightFolder.add(pointLight, "decay").min(0).max(4).step(0.001);

// RectArea light - light panel lighting only works with MeshStandardMaterial and MeshPhysicalMaterial
const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 6, 1, 1);
rectAreaLight.position.set(-1.5, 0, 1.5);
rectAreaLight.lookAt(new THREE.Vector3());
scene.add(rectAreaLight);
const rectAreaLightFolder = gui.addFolder("RectArea Light");
rectAreaLightFolder.add(rectAreaLight, "intensity").min(0).max(10).step(0.001);

// Spot light - flashlight lighting
const spotLight = new THREE.SpotLight(0x78ff00, 4.5, 10, Math.PI * 0.1, 0.25, 1); // color, intensity, distance, angle, penumbra, decay
spotLight.position.set(0, 2, 3);
scene.add(spotLight);
// to rotate the spotLight, we need to create a target object
spotLight.target.position.x = -1;
scene.add(spotLight.target);
const spotLightFolder = gui.addFolder("Spot Light");
spotLightFolder.add(spotLight, "intensity").min(0).max(10).step(0.001);
spotLightFolder.add(spotLight, "distance").min(0).max(20).step(0.001);
spotLightFolder
	.add(spotLight, "angle")
	.min(0)
	.max(Math.PI / 2)
	.step(0.001)
	.name("spotLight angle");
spotLightFolder.add(spotLight, "penumbra").min(0).max(1).step(0.001);
spotLightFolder.add(spotLight, "decay").min(0).max(4).step(0.001);

// Light helpers
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2);
hemisphereLightHelper.visible = false;
scene.add(hemisphereLightHelper);
hemisphereLightFolder.add(hemisphereLightHelper, "visible").name("helper");

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2);
directionalLightHelper.visible = false;
scene.add(directionalLightHelper);
directionalLightFolder.add(directionalLightHelper, "visible").name("helper");

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
pointLightHelper.visible = false;
scene.add(pointLightHelper);
pointLightFolder.add(pointLightHelper, "visible").name("helper");

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
spotLightHelper.visible = false;
scene.add(spotLightHelper);
spotLightFolder.add(spotLightHelper, "visible").name("helper");

const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight); // RectAreaLightHelper is not part of the three.js library
rectAreaLightHelper.visible = false;
scene.add(rectAreaLightHelper);
rectAreaLightFolder.add(rectAreaLightHelper, "visible").name("helper");

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;

// Objects
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.position.x = -1.5;

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material);

const torus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 32, 64), material);
torus.position.x = 1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;

scene.add(sphere, cube, torus, plane);

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
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
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

	// Update objects
	sphere.rotation.y = 0.1 * elapsedTime;
	cube.rotation.y = 0.1 * elapsedTime;
	torus.rotation.y = 0.1 * elapsedTime;

	sphere.rotation.x = 0.15 * elapsedTime;
	cube.rotation.x = 0.15 * elapsedTime;
	torus.rotation.x = 0.15 * elapsedTime;

	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
