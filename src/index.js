import './style/main.styl'
import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Model from './js/model.js'
// import Punch from '../static/model/Punching.fbx'
// import Character from '../static/model/character.fbx'


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

// const dummy = new THREE.Mesh(
//     new THREE.SphereGeometry(1),
//     new THREE.MeshNormalMaterial()
// )

// scene.add(dummy)

// const loader = new FBXLoader()
// let model 
// let mixer
// let bigTest = 0
// let clock = new THREE.Clock()
// let root
// // let animationsTab = [Character, Belly, Punch]

// loader.load(
//     './model/SambaCharacter.fbx',
//     (_fbx) => {
//         console.log(_fbx)
//         model = _fbx
//         model.scale.set(0.3,0.3,0.3)
//         model.position.y = -20
        
//         mixer = new THREE.AnimationMixer(model) 
//         // root = mixer.getRoot()
//         /* idle =  */mixer.clipAction(model.animations[bigTest]).play()
//         // idle.play()
//         // addAnim(loader)
//         scene.add(model)
//     }
// )

// const addAnim = (loader) =>
// {
//     let animation = animationsTab.pop()

//     loader.load(animation, model =>
//         {
//             model[animation] = model.animation[0]

//             if(animationsTab.length > 0)
//             {
//                 addAnim(loader)
//             }
//             // else
//             // {
//             //     animationsTab = null

//             // }
//         })
// }

// document.querySelector('body').addEventListener('click', () => 
// {
//     mixer.stopAllAction()
//     // /* idle =  */mixer.clipAction(Belly, root).play()
//     // idle.play()

// })

// document.querySelector('body').addEventListener('keypress', () =>
// {
//     mixer.stopAllAction()
//     mixer.clipAction(model.animations[0]).play()
// })

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

// model.model.mixer.addEventListener('finished', console.log('h'))
window.addEventListener('keypress', (_event) => 
{
    if(_event.key == 'q')
    {
        model.changeAnimation('back')
    }

    // if(_event.key == 'z')
    // {

    // }
})