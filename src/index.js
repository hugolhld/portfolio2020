import './style/main.styl'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Model from './js/model.js'
import PhotoTest from './images/test.png'
import Loader from './js/Loader.js'
const photo = new Image()
photo.src = PhotoTest
document.querySelector('.test').appendChild(photo)

const model = new Model

let options = {assets: [], oncomplete: () => {init(), loop()}}

const loader = new Loader(options)


const assets = () =>
{
    let model = model.load
}

assets()

const init = () =>
{

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
    scene.background = new THREE.Color( 0xa0a0a0 )

    /* 
        Object
    */

    //Character
    scene.add(model.group)

    //Grid
    const wall = new THREE.GridHelper(200, 40)
    wall.rotation.set(0, Math.PI * 0.5, Math.PI * 0.5)
    wall.position.z = -50
    wall.position.y = 95
    scene.add(wall)

    const mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
    mesh.rotation.x = - Math.PI / 2;
    mesh.receiveShadow = true;
    mesh.position.y = -6
    scene.add( mesh );
    const ground = new THREE.GridHelper(150, 40)
    ground.position.y = -5
    scene.add(ground)


    /** 
     * Light
    */

    let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
    hemiLight.position.set(0, 50, 0);
    // Add hemisphere light to scene
    scene.add(hemiLight);

    let d = 8.25;
    let dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
    dirLight.position.set(-8, 12, 8);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 1500;
    dirLight.shadow.camera.left = d * -1;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = d * -1;
    // Add directional Light to scene
    scene.add(dirLight);

    // const ambient = new THREE.PointLight(0xffffff, 1, 20)
    // ambient.position.set(0, 1, 2)
    // scene.add(ambient)

    // const light = new THREE.SpotLight(0xffffff, 1, 0, Math.PI * 0.2, 0.5);
    // light.position.set(0, 10, 5);
    // scene.add(light)

    // light.target.position.set(0,-5,0)
    // scene.add(light.target)

    // const helper = new THREE.SpotLightHelper(light)
    // scene.add(helper)
    // const light = new THREE.Light(0xffffff, 1)
    // scene.add(light)

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
    renderer.shadowMap.enabled = true
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

}

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
        if(divToOpen == false)
        {
            let activeContent = document.querySelectorAll('.active')
            for(const active of activeContent)
            {
                active.classList.remove('active')
                // active.classList.add('desactive')
                active.style.display = 'none'
                // if(active.classList.contains("desactive"))
                // {
                //     active.addEventListener('animationend', () =>
                //     {
                //         active.classList.remove('desactive')
                //         console.log("bruh")
                //     })
                // }
            }
        }
    }

    button.addEventListener('click', () =>
    {
        model.changeAnimation(animation)
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
    if(pourcentValue >= 100 && model)
    {
        document.querySelector('.loader').style.display = 'none'
        // this.hiddenoadingScreen()
        clearInterval(int);
    }
},100)