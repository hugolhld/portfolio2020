import './style/main.styl'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Model from './js/model.js'
import PhotoTest from './images/test.png'
import Loader from './js/Loader.js'
const photo = new Image()
photo.src = PhotoTest

class Museum {
    constructor(){

            this.model = new Model()
            this.scene
            this.wall
            this.mesh
            this.ground
            this.camera
            this.renderer
            this.controls
            this.sizes
            this.cursor
            this.instructionDiv = document.querySelector('.instruction')
            this.instructionContent = document.querySelector('.instruction__content')
            this.instructionButton = document.querySelector('.instruction__content button')

        this.container = document.createElement( 'div' )
        this.container.style.height = '100%'
        document.body.appendChild( this.container )

		this.options = {
            assets:[
            ],
			oncomplete: () => {
                this.init()
                this.loop()
                // this.action()
			}
        }

        this.assets()
        const preloader = new Preloader(this.options)

    }

    assets(){
       this.character = this.model.person.load
       this.model.animationsArray.loads.forEach( model => this.options.assets.push(model))
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
        this.camera = new THREE.PerspectiveCamera( 75, this.sizes.width / this.sizes.height, 0.1, 1000 )

        /**
         * Scene
         */
		this.scene = new THREE.Scene()
		this.scene.background = new THREE.Color( 0xa0a0a0 )
        this.scene.fog = new THREE.Fog( 0xa0a0a0, 15, 5000 )

        /**
         * Light
         */

        this.scene.add(this.light.group)

         /**
         * WallsCollions
         */

        this.scene.add(this.wallsCollions.environment)


        /**
         * Car
         */
        this.scene.add(this.car.group)
        this.car.group.position.set(-15,2.4,20)
        this.car.group.scale.set(0.2, 0.2, 0.2)

        /**
         * Expo
         */
        this.scene.add(this.expo.group)
        this.expo.group.position.set(-28,2.4,68)


        /**
         * Street
         */
        this.scene.add(this.street.group)


         /**
         * walls
         */
        this.scene.add(this.walls.group)

        /**
         * Sky
         */
        this.scene.add(this.sky.group)

        /**
         * Rym
         */
        this.scene.add(this.rym.group)

        /**
         * Gallery
         */
        this.scene.add(this.gallery.group)

        /**
         * Video
         */
        this.scene.add(this.video.group)

        /**
         * Canvas
         */
        this.scene.add(this.canvas.group)

        /**
         * click box
         */
        this.scene.add(this.clickMeBox.group)
        this.scene.add(this.clickmonkey.group)
        this.scene.add(this.clickcow.group)

        /**
         * SongInit
         */
        const _sence = this.scene
        const _camera = this.camera
        this.songMuseum.speakerAudio(_sence, _camera)
        this.songMuseum.play()

        /**
         * Renderer
         */
		this.renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true} )
		this.renderer.setPixelRatio( window.devicePixelRatio )
        this.renderer.setSize( window.innerWidth, window.innerHeight )
        this.renderer.setClearAlpha(0)
		this.renderer.shadowMap.enabled = true
        this.container.appendChild( this.renderer.domElement )

        window.addEventListener( 'resize', () => this.onWindowResize() , false )

        /**
         * Click on the box
         */

        document.addEventListener('click', () =>
        {
            if(this.hoverbox) this.scene.add(this.explication.group)
            if(this.hoverboxcow) this.scene.add(this.cowboy.group)
            if(this.hoverboxmonkey) this.scene.add(this.monkey.group)
            if(this.hoverbox2) this.video.soundPlay()

            if (this.hoverBoxCanvas)
            {
                this.canvas.creatCanvas()
                if(this.canvas.load === true) this.canvas.cursourMove()
            }
        })
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
        window.requestAnimationFrame(this.loop)

    this.model.loop()
    // controls.update

    // console.log(model.animations)

    // Render
    this.renderer.render(scene, camera)
    }
}

document.addEventListener("DOMContentLoaded", function(){
    const museum = new Museum()
})
