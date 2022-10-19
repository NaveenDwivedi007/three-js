import * as THREE from "three";

//  to control view with mouse 
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


const width = window.innerWidth
const height = window.innerHeight
const renderer = new THREE.WebGL1Renderer()
renderer.setSize(width, height,
  0.1,
  1000)

document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
  75,
  width / height,
  0.1,
  1000
)

// camera view controler take camera and render dom element
const orbit = new OrbitControls(camera, renderer.domElement)

const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)
// to set one axis at a time 
// camera.position.z = 5

//  to set all axis at ones 

camera.position.set(0, 2, 5)
// when we change the camera position we need to update it 
orbit.update()

const boxGeometry = new THREE.BoxGeometry()
const boxMaterial = new THREE.MeshBasicMaterial({ color: 'red' })
const box = new THREE.Mesh(boxGeometry, boxMaterial)
scene.add(box)

// animation rotation 
function animationBoxRotation(time) {
  box.rotation.x += 0.01
  box.rotation.y += 0.01
  renderer.render(scene, camera)

}

renderer.setAnimationLoop(animationBoxRotation)
