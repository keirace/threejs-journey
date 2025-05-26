import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import fragmentShader from './shaders/fragment.glsl'
import vertexShader from './shaders/vertex.glsl'

/**
 * Base
 */
// Debug
const gui = new GUI()
const smokeFolder = gui.addFolder('Smoke Settings')
smokeFolder.addColor({ color: 0xffffff }, 'color').onChange((value) => {
    smokeMaterial.uniforms.uColor.value.set(value)
})
smokeFolder.add({ opacity: 0.5 }, 'opacity', 0, 1).onChange((value) => {
    smokeMaterial.uniforms.uOpacity.value = value
})

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Loaders
const textureLoader = new THREE.TextureLoader()
const gltfLoader = new GLTFLoader()

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(25, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 8
camera.position.y = 10
camera.position.z = 12
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.y = 3
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Model
 */
gltfLoader.load(
    './bakedModel.glb',
    (gltf) =>
    {
        gltf.scene.getObjectByName('baked').material.map.anisotropy = 8
        scene.add(gltf.scene)
    }
)

/**
 * Smoke
 */
const smokeGeometry = new THREE.PlaneGeometry(1, 1, 16, 32);
smokeGeometry.translate(0, 0.5, 0); // Adjust the position of the plane to be above the coffee cup
smokeGeometry.scale(1.5, 6, 1.5); // Scale the plane to cover the coffee cup

// Perlin noise texture for smoke effect
const perlinTexture = textureLoader.load('./perlin.png');
// perlinTexture.wrapS = THREE.RepeatWrapping; // Repeat the texture in the horizontal direction
perlinTexture.wrapT = THREE.RepeatWrapping; // Repeat the texture in the vertical direction

// Material for the smoke effect
const smokeMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    side: THREE.DoubleSide,
    transparent: true,
    // wireframe: true,
    depthWrite: false, // Disable depth writing to allow blending with the background
    uniforms: {
        uPerlinTexture: new THREE.Uniform(perlinTexture),
        uTime: new THREE.Uniform(0),
        uColor: { value: new THREE.Color(0xFFFFFF) }, // White smoke
        uOpacity: { value: 0.5 }
    }
});

const smokeMesh = new THREE.Mesh(smokeGeometry, smokeMaterial);
smokeMesh.position.y = 1.83; // Position the smoke above the coffee cup
scene.add(smokeMesh);

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update smoke material
    smokeMaterial.uniforms.uTime.value = elapsedTime;

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()