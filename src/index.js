import './style/main.styl'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Model from './js/model.js'
import PhotoTest from './images/test.png'
const photo = new Image()
photo.src = PhotoTest
document.querySelector('.test').appendChild(photo)

/**
 * Loader
 */

let pourcentValue = 0
const pourcentDiv = document.querySelector('.js-pourcent')
const pourcentBar = document.querySelector('.js-pourcent-bar')

let int =  setInterval(()=>
{
    pourcentValue++
    pourcentDiv.innerText = pourcentValue + '%'
    pourcentBar.style.transform = `scaleX(${pourcentValue / 100})`
    if(pourcentValue >= 100)
    {
        document.querySelector('.loader').style.display = 'none'
        // this.hiddenoadingScreen()
        clearInterval(int);
    }
},10)

/**
 * Close instruction
 */

const instructionDiv = document.querySelector('.instruction')
const instructionContent = document.querySelector('.instruction__content')
const instructionButton = document.querySelector('.instruction__content button')

instructionButton.addEventListener('click', () =>
{
    instructionContent.style.animation = 'test .7s'
    instructionContent.addEventListener('animationend', () =>
    {
        instructionDiv.style.display = 'none'
    })
})

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

const openDiv = (button, key, divToOpen, animation, duration, display) =>
{
    const closeActiveContent = () => 
    {
        if(divToOpen === false)
        {
            let activeContent = document.querySelectorAll('.active')
            for(const active of activeContent)
            {
                active.classList.remove('active')
                active.style.display = 'none'
            }
        }
    }

    button.addEventListener('click', () =>
    {
        if(divToOpen != false)
        {
            divToOpen.classList.add('active')
            divToOpen.style.display = display
        }
        // console.log(duration)
        closeActiveContent()
    })

    window.addEventListener('keypress', (_event) =>
    {
        if(_event.key == key)
        {
            model.changeAnimation(animation)
            if(divToOpen != false)
            {
                setTimeout(() =>
                {
                    divToOpen.classList.add('active')
                    divToOpen.style.display = display
                },model.model.duration * 1000)
            }
            closeActiveContent()
        }
    })
}

openDiv(document.querySelector('.js-projects'), 'q', document.querySelector('.js-projects-content'), 'back', model.duration, 'block')
openDiv(document.querySelector('.js-contact'), 'd', document.querySelector('.js-contact-content'), 'dance', model.duration, 'flex')
openDiv(document.querySelector('.js-home'), 'z', false, 'back', model.duration, false)
// openDiv(document.querySelector('.js-about'), 's', document.querySelector('.js-contact-content'), 'back', model.duration)
console.log(document.querySelector('.js-contact-content'))