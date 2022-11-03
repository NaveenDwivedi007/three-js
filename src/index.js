import * as THREE from "three";
import "../style.css"

//  to control view with mouse 
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { angleToRadian } from "./helperFunctions/mathHelper";
import * as dat from "dat.gui";

import space from './img/space.jpg';
import galaxy from './img/galaxy.jpg'

const width = window.innerWidth
const height = window.innerHeight
const renderer = new THREE.WebGL1Renderer()
const gui = new dat.GUI()
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  45,
  width / height,
  0.1,
  1000
)

// shadow enable
renderer.shadowMap.enabled = true

// background color

// renderer.setClearColor('#fff')

// when we need to load a asset in three js
// we have its own loader class and then need to added into the scene

const textureLoader = new THREE.TextureLoader()
// it will load only on one side of cube 
// scene.background = textureLoader.load(space)

// to load multiple img on diff side of cube we can use diff class

const cubeTextureLoader = new THREE.CubeTextureLoader()
scene.background = cubeTextureLoader.load([
  space,
  space,
  space,
  space,
  space,
  space
])


// shadow camera has to work on it to display shadow properly
// info: each type of camera has its own shadow camera 



// light 
// const ambientLight = new THREE.AmbientLight('blue')
// scene.add(ambientLight)

// directional Ligth

// const directionalLight = new THREE.DirectionalLight('white', 0.8)
// scene.add(directionalLight)
// directionalLight.position.set(-30, 50, 0)
// directionalLight.castShadow = true
// const directionalLight2 = new THREE.DirectionalLight('pink', 0.8)
// scene.add(directionalLight2)
// directionalLight2.position.set(-1, -1, 0)

// directional light helper

// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 7)
// scene.add(directionalLightHelper)

// shadow camera helper

// const directionalLightShadowCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
// scene.add(directionalLightShadowCameraHelper)

// moving the shadow camare
// directionalLight.shadow.camera.bottom = -12
// directionalLight.shadow.camera.top = 12


// spot light
const spotLight = new THREE.SpotLight('blue')
spotLight.position.set(35,35,0)
scene.add(spotLight)

// spot light shadow get pixalated when direction and angle changes 
spotLight.castShadow = true
// narrow the angle to clear the shadow
spotLight.angle = 0.2;

const spotLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(spotLightHelper)

// adding fog we have 2 diff methods
// fog will appere when we move away from the element

// scene.fog = new THREE.Fog('#fff',0,500)


// in the below fog ,fog will increase exponitionly with the distance from the camera
scene.fog = new THREE.FogExp2('#fff',0.005)

const spotLightOptions = {
  x:35,
  y:35,
  z:0,
  angle:0.2,
  peNumbra:0,
  intensity:1
}

gui.add(spotLightOptions, 'x', -100, 100).onChange((e) => {
  spotLight.position.x = e
})
gui.add(spotLightOptions, 'y', -100, 100).onChange((e) => {
  spotLight.position.y = e
})
gui.add(spotLightOptions, 'z', -100, 100).onChange((e) => {
  spotLight.position.z = e
})
gui.add(spotLightOptions, 'angle', -100, 100).onChange((e) => {
  spotLight.angle = e
})
gui.add(spotLightOptions, 'peNumbra', -100, 100).onChange((e) => {
  spotLight.penumbra = e
})

gui.add(spotLightOptions, 'intensity', 0, 1000).onChange((e) => {
  spotLight.intensity = e
})


renderer.setSize(width, height,
  0.1,
  1000)

document.body.appendChild(renderer.domElement)




// camera view controler take camera and render dom element
const orbit = new OrbitControls(camera, renderer.domElement)

const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)
// to set one axis at a time 
// camera.position.z = 5

//  to set all axis at ones 

camera.position.set(-10, 30, 30)
// when we change the camera position we need to update it 
orbit.update()


// box element
const boxGeometry = new THREE.BoxGeometry()
const boxMaterial = new THREE.MeshBasicMaterial({ color: 'red' })
const box = new THREE.Mesh(boxGeometry, boxMaterial)
scene.add(box)
box.position.set(-5, 3)


const box2Geometry = new THREE.BoxGeometry(4,4,4)
const box2Material = new THREE.MeshBasicMaterial({ 
  // color: 'red',
  map:textureLoader.load(space)
})
const box2MaterialMesh =[
  new THREE.MeshBasicMaterial({ map:textureLoader.load(space)}),
  new THREE.MeshBasicMaterial({ map:textureLoader.load(space)}),
  new THREE.MeshBasicMaterial({ map:textureLoader.load(galaxy)}),
  new THREE.MeshBasicMaterial({ map:textureLoader.load(galaxy)}),
  new THREE.MeshBasicMaterial({ map:textureLoader.load(space)}),
  new THREE.MeshBasicMaterial({ map:textureLoader.load(space)}),
]
const box2 = new THREE.Mesh(box2Geometry, box2MaterialMesh)
scene.add(box2)
box2.position.set(0,15,10)

// shadow will not work on basic material  

// plane geometry 
const planeGeometry = new THREE.PlaneGeometry(30, 30)
const planeMaterial = new THREE.MeshStandardMaterial({
  color: '#fff',
  side: THREE.DoubleSide,
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
scene.add(plane)
plane.receiveShadow = true
// rotation with take radian 
plane.rotation.x = angleToRadian(90)

// grid helper will add grid to the scene 
const gridHelper = new THREE.GridHelper(30)
scene.add(gridHelper)

// sphere 
const sphereGeometry = new THREE.SphereGeometry(4, 50, 50)
// it req a ligth source to show the material
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: '#ccc',
  wireframe: false,
})
// const sphereMaterial = new THREE.MeshBasicMaterial({
//   color: 'blue',
//   // wireframe: true,
// })
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
scene.add(sphere)
sphere.castShadow = true
sphere.position.set(0, 5)


const options = {
  sphereColor: 'red',
  showWireFrame: false,
  bounceSpeed: 0,
  bounceOffSet: 4.2,
  x: 0,
  y: 5,
  z: 0
};

// gui not working

// gui.addColor(options, 'sphereColor').listen().onChange(function (e) {
//   console.log(e);
// });
gui.add(options, "showWireFrame").onChange((e) => {
  sphere.material.wireframe = e
})
gui.add(options, 'bounceSpeed', 0, .1)
gui.add(options, 'bounceOffSet', 0, 10, 0.2)
gui.add(options, 'x', -10, 10).onChange((e) => {
  sphere.position.x = e
})
gui.add(options, 'y', -10, 10).onChange((e) => {
  sphere.position.y = e
})
gui.add(options, 'z', -10, 10).onChange((e) => {
  sphere.position.z = e
})




// sphere bounce

let step = 0

// animation rotation 
function animationBoxRotation(time) {
  box.rotation.x += 0.01
  box.rotation.y += 0.01
  // box.rotation.z += 0.01
  step += options.bounceSpeed
  sphere.position.y = (10 * Math.abs(Math.sin(step))) + options.bounceOffSet
  // box.position.x += 0.5
  // box.position.y += 0.5 

  spotLight.angle = spotLightOptions.angle
  spotLight.penumbra = spotLightOptions.peNumbra
  spotLight.intensity = spotLightOptions.intensity

  // we need to update the helper when ever we change the value
  spotLightHelper.update()
  renderer.render(scene, camera)

}

renderer.setAnimationLoop(animationBoxRotation)
