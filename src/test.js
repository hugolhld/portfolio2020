import './style/main.styl'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Model from './js/model.js'
import PhotoTest from './images/test.png'
import Loader from './js/Loader.js'

class Museum {
    constructor(){

            this.model = new Model
            this.scene
            this.wall
            this.mesh
            this.ground
            this.camera
            this.renderer
            this.controls
            this.sizes = {}
            this.cursor = {}
            this.instructionDiv = document.querySelector('.instruction')
            this.instructionContent = document.querySelector('.instruction__content')
            this.instructionButton = document.querySelector('.instruction__content button')

        /* this.container = document.createElement( 'div' )
        this.container.style.height = '100%'
        document.body.appendChild( this.container ) */

		this.options = {
            assets:[
            ],
			oncomplete: () => {
                this.init()
                this.loop()
                this.openDiv(document.querySelector('.js-projects'), 'q', document.querySelector('.js-projects-content'), 'back', this.model.duration, 'block')
                this.openDiv(document.querySelector('.js-contact'), 'd', document.querySelector('.js-contact-content'), 'dance', this.model.duration, 'flex')
                this.openDiv(document.querySelector('.js-home'), 'z', false, 'back', this.model.duration, false)
                this.addImage()
                // this.action()
			}
        }

        this.assets()
        const preloader = new Loader(this.options)

    }

    assets(){
       this.character = this.model.load
       this.model.animationsArray.forEach( model => this.options.assets.push(model))
    }

    init(){

        this.instructionButton.addEventListener('click', () =>
        {
            this.instructionContent.style.animation = 'test .7s'
            this.instructionContent.addEventListener('animationend', () =>
            {
                this.instructionDiv.style.display = 'none'
            })
        })

        /**
         * Sizes
         */
        this.sizes.width = window.innerWidth
        this.sizes.height = window.innerHeight

        /**
         * Cursor
         */
        this.cursor.x = 0
        this.cursor.y = 0

        window.addEventListener('mousemove', _event =>
        {
            this.cursor.x = _event.clientX / this.sizes.width - 0.5
            this.cursor.y = _event.clientY / this.sizes.height - 0.5
        })
        /**
         * Camera
         */
        this.camera = new THREE.PerspectiveCamera( 75, this.sizes.width / this.sizes.height, 0.1, 100 )
        this.camera.position.set(0, -2, 8)

        /**
         * Scene
         */
		this.scene = new THREE.Scene()
		this.scene.background = new THREE.Color( 0xa0a0a0 )

        /**
         * Light
         */

        this.hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
        this.hemiLight.position.set(0, 50, 0);
        // Add hemisphere light to scene
        this.scene.add(this.hemiLight);

        this.d = 8.25;
        this.dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
        this.dirLight.position.set(-8, 12, 8);
        this.dirLight.castShadow = true;
        this.dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
        this.dirLight.shadow.camera.near = 0.1;
        this.dirLight.shadow.camera.far = 1500;
        this.dirLight.shadow.camera.left = this.d * -1;
        this.dirLight.shadow.camera.right = this.d;
        this.dirLight.shadow.camera.top = this.d;
        this.dirLight.shadow.camera.bottom = this.d * -1;
        // Add directional Light to scene
        this.scene.add(this.dirLight);

         /**
         * Ground
         */

        this.wall = new THREE.GridHelper(200, 40)
        this.wall.rotation.set(0, Math.PI * 0.5, Math.PI * 0.5)
        this.wall.position.z = -50
        this.wall.position.y = 95
        this.scene.add(this.wall)

        this.mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
        this.mesh.rotation.x = - Math.PI / 2;
        this.mesh.receiveShadow = true;
        this.mesh.position.y = -6
        this.scene.add( this.mesh );
        this.ground = new THREE.GridHelper(150, 40)
        this.ground.position.y = -5
        this.scene.add(this.ground)

        /**
         * Character
         */
        this.scene.add(this.model.group)

        /**
         * Renderer
         */
		this.renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true} )
		this.renderer.setPixelRatio( window.devicePixelRatio )
        this.renderer.setSize( window.innerWidth, window.innerHeight )
		this.renderer.shadowMap.enabled = true
        document.body.appendChild( this.renderer.domElement )

        window.addEventListener( 'resize', () => this.onWindowResize() , false )

    }

    /**
     * Resize
     */
    onWindowResize()
    {
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()

        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    /**
     * Loop
     */
    loop()
    {
    
        window.requestAnimationFrame( () => this.loop() )


        this.model.loop()
        // controls.update

        // console.log(model.animations)

        // Render
        this.renderer.render(this.scene, this.camera)
    }

    openDiv(button, key, divToOpen, animation, duration, display)
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
            this.model.changeAnimation(animation)
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
                this.model.changeAnimation(animation)
                if(divToOpen != false)
                {
                    setTimeout(() =>
                    {
                        divToOpen.classList.add('active')
                        divToOpen.style.display = display
                    },this.model.model.duration * 1000)
                }
                closeActiveContent()
            }
        })
    }

    addImage()
    {
        const photo = new Image()
        photo.src = PhotoTest
        document.querySelector('.test').appendChild(photo)

    }
}

document.addEventListener("DOMContentLoaded", function(){
    const museum = new Museum()
})
