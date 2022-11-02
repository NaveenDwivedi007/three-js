import * as THREE from "three";
import "../style.css"

//  to control view with mouse 
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { angleToRadian } from "./helperFunctions/mathHelper";
import * as dat from "dat.gui";

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

// shadow camera has to work on it to display shadow properly
// info: each type of camera has its own shadow camera 



// light 
// const ambientLight = new THREE.AmbientLight('blue')
// scene.add(ambientLight)

// directional Ligth

const directionalLight = new THREE.DirectionalLight('white', 0.8)
scene.add(directionalLight)
directionalLight.position.set(-30, 50, 0)
directionalLight.castShadow = true
// const directionalLight2 = new THREE.DirectionalLight('pink', 0.8)
// scene.add(directionalLight2)
// directionalLight2.position.set(-1, -1, 0)

// directional light helper

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 7)
scene.add(directionalLightHelper)

// shadow camera helper

const directionalLightShadowCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
scene.add(directionalLightShadowCameraHelper)

// moving the shadow camare
directionalLight.shadow.camera.bottom = -12
directionalLight.shadow.camera.top = 12



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

  renderer.render(scene, camera)

}

renderer.setAnimationLoop(animationBoxRotation)
