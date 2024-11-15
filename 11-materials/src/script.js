import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import doorColorTextureImg from '../static/textures/door/color.jpg';
import doorAlphaTextureImg from '../static/textures/door/alpha.jpg';
import doorAmbientOcclusionTextureImg from '../static/textures/door/ambientOcclusion.jpg';
import doorHeightTextureImg from '../static/textures/door/height.jpg';
import doorNormalTextureImg from '../static/textures/door/normal.jpg';
import doorMetalnessTextureImg from '../static/textures/door/metalness.jpg';
import doorRoughnessTextureImg from '../static/textures/door/roughness.jpg';
import matCapTextureImg from '../static/textures/matcaps/1.png';
import gradientTextureImg from '../static/textures/gradients/3.jpg';
import environmentMap from '../static/textures/environmentMap/2k.hdr'
import {RGBELoader} from "three/examples/jsm/loaders/RGBELoader.js";
import GUI from 'lil-gui'
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')
const textureLoader = new THREE.TextureLoader();

const doorColorTexture = textureLoader.load(doorColorTextureImg)
const doorAlphaTexture = textureLoader.load(doorAlphaTextureImg)
const doorAmbientOcclusionTexture = textureLoader.load(doorAmbientOcclusionTextureImg)
const doorHeightTexture = textureLoader.load(doorHeightTextureImg)
const doorNormalTexture = textureLoader.load(doorNormalTextureImg)
const doorMetalnessTexture = textureLoader.load(doorMetalnessTextureImg)
const doorRoughnessTexture = textureLoader.load(doorRoughnessTextureImg)
const matcapTexture = textureLoader.load(matCapTextureImg)
const gradientTexture = textureLoader.load(gradientTextureImg)

matcapTexture.colorSpace = THREE.SRGBColorSpace
doorColorTexture.colorSpace = THREE.SRGBColorSpace

// Scene
const scene = new THREE.Scene()
const gui = new GUI()
// const material = new THREE.MeshBasicMaterial();
// material.map = doorColorTexture
// material.side = THREE.DoubleSide
// material.transparent = true
// material.opacity = 0.6

// const material = new THREE.MeshNormalMaterial();
// material.normalMap = doorNormalTexture
// material.flatShading = true

// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture;

// const material = new THREE.MeshLambertMaterial()

// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100;
// material.specular = new THREE.Color(0x1188ff)

// const material = new THREE.MeshToonMaterial();
// gradientTexture.magFilter = THREE.NearestFilter;
// gradientTexture.generateMipmaps = false
// material.gradientMap = gradientTexture

// const material = new THREE.MeshStandardMaterial();
// // material.roughness = 0.32;
// // material.metalness = 0.34
// material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclusionTexture;
// material.aoMapIntensity = 1;
// material.displacementScale = doorHeightTexture;
// material.displacementScale = 0.1;
// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture;
// material.transparent = true;
// material.normalMap = doorNormalTexture;

// gui.add(material, 'roughness').min(0).max(1).step(0.0001);
// gui.add(material, 'metalness').min(0).max(1).step(0.0001);


const material = new THREE.MeshPhysicalMaterial();
material.roughness = 0;
material.metalness = 0;
// material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclusionTexture;
// material.aoMapIntensity = 1;
// material.displacementScale = doorHeightTexture;
// material.displacementScale = 0.1;
// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture;
// material.transparent = true;
// material.normalMap = doorNormalTexture;
// material.normalScale.set(0.5, 0.5)
// material.alphaMap = doorAlphaTexture;

// clear coat

// material.clearcoat = 1;
// material.clearcoatRoughness = 0
// gui.add(material, 'clearcoat').min(0).max(1).step(0.0001);
// gui.add(material, 'clearcoatRoughness').min(0).max(1).step(0.0001);

// sheen
//  material.sheen = 1;
//  material.sheenRoughness = 0;
//  material.sheenColor.set(1, 1, 1)

// iridescence

// material.iridescence = 1;
// material.iridescenceIOR =  1;
// material.iridescenceThicknessRange = [100, 100]
// gui.add(material.iridescenceThicknessRange, '0').min(0).max(1000).step(1)
// gui.add(material.iridescenceThicknessRange, '1').min(0).max(1000).step(1)
// gui.add(material, 'iridescence').min(0).max(1).step(0.0001);
// gui.add(material, 'iridescenceIOR').min(0).max(2.33).step(0.0001);

material.transmission = 1;
material.ior = 1.5;
material.thickness = 0.5;

gui.add(material, 'transmission').min(0).max(1).step(0.0001);
gui.add(material, 'ior').min(0).max(10).step(0.0001);
gui.add(material, 'thickness').min(0).max(10).step(0.0001);




const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.6, 16, 16),
  material
)

const plane = new THREE.Mesh(
   new THREE.PlaneGeometry(1, 1),
  material
)

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 16, 32),
  material
)

sphere.position.set(-2, 0, 0);
torus.position.set(2, 0, 0)

scene.add(sphere, plane, torus)

const rgbeLoader = new RGBELoader();
rgbeLoader.load(environmentMap, (environmentMapObject) => {
    environmentMapObject.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = environmentMapObject
    scene.environment =  environmentMapObject
})

// const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// const pointLight = new THREE.PointLight(0xffffff, 30)
//
// pointLight.position.set(0, 2, 4)
// scene.add(pointLight, ambientLight)
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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
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
    sphere.rotation.y = 0.1 * elapsedTime;
    torus.rotation.y = 0.1 * elapsedTime;
    plane.rotation.y = 0.1 * elapsedTime;

    sphere.rotation.x = -0.15 * elapsedTime;
    torus.rotation.x = -0.15 * elapsedTime;
    plane.rotation.x = -0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()