import './style/main.styl'
import * as THREE from 'three'
import Model from './js/model.js'
import hugoIoPhoto from './images/test.png'
import cannellePhoto from './images/cannelle.png'
import catacombPhoto from './images/catacomb.png'
import ecosurfPhoto from './images/ecosurf.png'
import hlDetaillingPhoto from './images/hl-detailling.png'
import matrixPhoto from './images/matrix.png'
import pokedexPhoto from './images/pokedex.png'
import hugoPhoto from './images/hugo.jpeg'

class Portfolio {
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
        this.loadingDiv
        this.instructionDiv = document.querySelector('.instruction')
        this.instructionContent = document.querySelector('.instruction__content')
        this.instructionButton = document.querySelector('.instruction__content button')

        this.loading()
        this.init()
        this.loop()
        this.menuHamburger()
        this.openDiv(document.querySelectorAll('.js-projects'), 'q', document.querySelector('.js-projects-content'), 'back', this.model.duration, 'block')
        this.openDiv(document.querySelectorAll('.js-about'), 's', document.querySelector('.js-about-content'), 'salsa', this.model.duration, 'block')
        this.openDiv(document.querySelectorAll('.js-contact'), 'd', document.querySelector('.js-contact-content'), 'belly', this.model.duration, 'flex')
        this.openDiv(document.querySelectorAll('.js-home'), 'z', false, 'back', this.model.duration, false)
        this.openDiv(document.querySelectorAll('.nav__home'), 'z', false, 'back', this.model.duration, false)
        this.addImage()

    }

    loading()
    {
        this.loadingDiv = document.createElement('div')
        this.loadingDiv.classList.add('preloader')
        
        const loadingText = document.createElement('p')
        loadingText.innerText = 'Chargement'

        const loadingPoint0 = document.createElement('span')
        loadingPoint0.innerText = '.'
        loadingPoint0.classList.add('point__first')
        
        const loadingPoint1 = document.createElement('span')
        loadingPoint1.innerText = '.'
        loadingPoint1.classList.add('point__second')

        
        const loadingPoint2 = document.createElement('span')
        loadingPoint2.innerText = '.'
        loadingPoint2.classList.add('point__three')


        document.querySelector('main').appendChild(this.loadingDiv)
        this.loadingDiv.appendChild(loadingText)
        loadingText.appendChild(loadingPoint0)
        loadingText.appendChild(loadingPoint1)
        loadingText.appendChild(loadingPoint2)
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
         *  Loader
        */
        this.model.manager.onLoad = () => {document.querySelector('.loader').style.display = 'none'}
        this.model.manager.onProgress = (url, itemsLoaded, itemsTotal) => 
        {
            this.loadingDiv.style.display = 'none'
            document.querySelector('.loader .js-pourcent').innerText = itemsLoaded + ' sur ' + itemsTotal + ' fichiers chargé' +( itemsLoaded > 1 ? 's.' : '.')
            document.querySelector('.loader .js-pourcent-bar').style.transform = `scaleX(${itemsLoaded / 10})`
        }

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

        this.renderer.render(this.scene, this.camera)
    }

    openDiv(buttons, key, divToOpen, animation, duration, display)
    {
        const closeActiveContent = (divOpen) => 
        {

            let activeContent = document.querySelectorAll('.active')
            for(const active of activeContent)
            {
                if(divOpen != active)
                {
                    active.classList.remove('active')
                    active.style.display = 'none'
                }
            }
        }

        for(const button of buttons)
        {
            button.addEventListener('click', () =>
            {
                if(divToOpen != false)
                {
                    divToOpen.classList.add('active')
                    divToOpen.style.display = display
                }
                // console.log(duration)
                closeActiveContent(divToOpen)
            })
        }

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
                closeActiveContent(divToOpen)
            }
        })
    }

    addImage()
    {
        const hugo = new Image()
        hugo.src = hugoPhoto
        document.querySelector('.js-about-content .about__content .content__left').appendChild(hugo)

        const hugoIO = new Image()
        hugoIO.src = hugoIoPhoto
        document.querySelector('#hugoio .projects__content .content__left').appendChild(hugoIO)
        
        const cannelle = new Image()
        cannelle.src = cannellePhoto
        document.querySelector('#portfolio .projects__content .content__left').appendChild(cannelle)
      
        const catacomb = new Image()
        catacomb.src = catacombPhoto
        document.querySelector('#catacomb .projects__content .content__left').appendChild(catacomb)
        
        const ecosurf = new Image()
        ecosurf.src = ecosurfPhoto
        document.querySelector('#ecosurf .projects__content .content__left').appendChild(ecosurf)
        
        const hlDetailling = new Image()
        hlDetailling.src = hlDetaillingPhoto
        document.querySelector('#hl-detailling .projects__content .content__left').appendChild(hlDetailling)
        
        const matrix = new Image()
        matrix.src = matrixPhoto
        document.querySelector('#matrix .projects__content .content__left').appendChild(matrix)
        
        const pokedex = new Image()
        pokedex.src = pokedexPhoto
        document.querySelector('#pokedex .projects__content .content__left').appendChild(pokedex)
    }

    menuHamburger()
    {
        const overlay = document.querySelector('.header__overlay')
        const hamburgerButton = document.querySelector('.hamburger')
        const overlayContent = document.querySelector('.overlay__content ul')
        const headerContent = document.querySelector('header nav .nav__right ul')

        overlayContent.innerHTML = headerContent.innerHTML

        hamburgerButton.addEventListener('click', () =>
        {
            hamburgerButton.classList.toggle('is-active')

            if(overlay.classList.contains('overlay-on'))
            {
                overlay.classList.remove('overlay-on')
            }
            else
            {
                overlay.classList.add('overlay-on')
            }
        })
    }
}

document.addEventListener("DOMContentLoaded", function(){
    const portfolio = new Portfolio()
})


