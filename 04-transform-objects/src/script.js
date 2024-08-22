import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const group = new THREE.Group();
group.position.y = 1;
group.scale.y = 2;
group.rotation.y = 1;
scene.add(group);

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
group.add(cube1);

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
)
cube2.position.x = -2;
group.add(cube2);

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
)
cube3.position.x = 2;
group.add(cube3);

// Position // Vector3
// cube3.position.x = 0.7
// cube3.position.y = -0.6
// cube3.position.y = 1
// cube3.position.set(0.7, -0.6, 1);

console.log(cube3.position.length()); // length from (0, 0, 0) to (x, y, z)
// console.log(cube3.position.normalize()); // same direction but length = 1
// console.log(cube3.position.length());

// Scale // Vector3
// cube3.scale.x = 2
// cube3.scale.y = 0.5
// cube3.scale.z = 0.5
// cube3.scale.set(2, 0.5, 0.5);

// Rotation // Euler angles
// cube3.rotation.reorder('YXZ'); // fix gimbal lock
// cube3.rotation.x = Math.PI / 4
// cube3.rotation.y = Math.PI * 0.25

// Axes helper
const axesHelper = new THREE.AxesHelper(4);
scene.add(axesHelper);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)
console.log(cube3.position.distanceTo(camera.position));
// camera.lookAt(cube3.position);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)