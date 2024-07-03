import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

// Particles

const particleGeometry = new THREE.BufferGeometry();
const count = 5000;


const particleTexture = textureLoader.load('/textures/particles/12.png')

// multiplying by 3 because vertices have 3 values x y z
const positions = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);
// filling the array

for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
    colors[i] = Math.random();
}
// size  = 3 because we have 3 coordinates xyz
particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))


const particleMaterial = new THREE.PointsMaterial();
particleMaterial.size = 0.08;
particleGeometry.sizeAttenuation = true; // size of points changes perspective to camera zoom.
particleMaterial.map = particleTexture;
// particleMaterial.color = new THREE.Color('#FFFF00');
particleMaterial.transparent = true
//particleMaterial.alphaTest = 0.001 // tell GPU to not render the blackish part
//particleMaterial.depthTest = false; // the webGl tests if what is being drawn is closer to whats already drawn, false will turn off test
particleMaterial.depthWrite = false; // the webFl writes the depth of whats drawn in depthBuffer and checks if something is behind or not in the
// when drawing something new. turning off fixes the problem usually.
particleMaterial.blending = THREE.AdditiveBlending // draws pixels on top of each other and colors are blended together which creates a mixture of new color
// it affects performance when dealing with big or large number of particles
particleMaterial.vertexColors = true; // for multiple colors for each particles

const particles = new THREE.Points(particleGeometry, particleMaterial);

scene.add(particles);




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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    // animation
    //particles.position.y = - elapsedTime * 0.02

    for (let i = 0; i < count; i++) {
        let i3 = i * 3; // because we have float array count * 3 [x, y, z, x ,y, z];
        const x = particleGeometry.attributes.position.array[i3];
        particleGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x);
    }

    particleGeometry.attributes.position.needsUpdate = true; // tell THREE to update the attribute before re rendering


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()