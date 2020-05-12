import './style/main.styl'
import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Model from './js/model.js'
import PhotoTest from './images/test.png'
// import Punch from '../static/model/Punching.fbx'
// import Character from '../static/model/character.fbx'

const photo = new Image()
photo.src = PhotoTest
document.querySelector('.test').appendChild(photo)

/**
 * Sizes
 */
const sizes = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight

/**
 * Cursor
 */
const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (_event) =>
{
    cursor.x = _event.clientX / sizes.width - 0.5
    cursor.y = _event.clientY / sizes.height - 0.5
})

/**
 * Scene
 */
const scene = new THREE.Scene()

/* 
    Object
*/

const model = new Model
scene.add(model.group)

/** 
 * Light
*/

const ambient = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambient)

const light = new THREE.Light(0xffffff, 1)
scene.add(light)

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 8
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)

/**
 * Resize
 */
window.addEventListener('resize', () =>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
})

/**
 * Loop
 */
const loop = () =>
{
    window.requestAnimationFrame(loop)

    model.loop()
    // controls.update

    // console.log(model.animations)

    // Render
    renderer.render(scene, camera)
}
loop()

// window.addEventListener('keypress', (_event) => 
// {
//     if(_event.key == 'q')
//     {
//         model.changeAnimation('back')
//     }

//     // if(_event.key == 'z')
//     // {

//     // }
// })

const openDiv = (button, key, divToOpen, animation, duration) =>
{
    button.addEventListener('click', () =>
    {
        divToOpen.classList.add('active')
        console.log(duration)
    })

    window.addEventListener('keypress', (_event) =>
    {
        if(_event.key == key)
        {
            model.changeAnimation(animation)
            setTimeout(() =>
                divToOpen.classList.add('active')
            ,model.model.duration * 1000)
        }
    })
}

openDiv(document.querySelector('.nav__left'), 'q', document.querySelector('main'), 'back', model.duration)