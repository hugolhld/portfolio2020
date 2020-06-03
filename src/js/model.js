import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import Character from '../model/character.fbx'
import Belly from '../model/Bellydancing.fbx'
import Salsa from '../model/Salsa.fbx'
import LookingAround from '../model/looking.fbx'
import Backflip from '../model/Backflip.fbx'



export default class Model
{
    constructor()
    {
        this.group = new THREE.Group()
        this.model= {}
        this.duration
        this.person
        this.clock = new THREE.Clock()
        this.animationsArray = [Salsa, LookingAround, Backflip, Belly]
        this.init()
    }

    init()
    {
        this.manager = new THREE.LoadingManager()

        this.loader = new FBXLoader(this.manager)

        this.loader.load(
            Character,
            (_fbx) =>
            {

                this.model.object = _fbx

                this.model.mixer = new THREE.AnimationMixer(this.model.object)

                this.model.root = this.model.mixer.getRoot()

                _fbx.traverse( child => {
                    if (child.isMesh) {
                        child.castShadow = true
                        child.receiveShadow = true
                    }
                } )

                this.model.object.scale.set(0.05,0.05,0.05)
                this.model.object.position.y = -7

                this.model.dance = this.model.object.animations[0]

                this.addAnimations(this.loader)
                this.group.add(this.model.object)
            }
        )

    }

    addAnimations(loader)
    {
        let animation = this.animationsArray.pop()

        loader.load(
            animation,
            model =>
            {
                this.model[animation] = model.animations[0]
                
                if(this.animationsArray.length > 0) this.addAnimations(loader)
                else
                {
                    delete this.animationsArray
                    this.action = LookingAround
                }
            }
        )

    }

    set action(animation)
    {
        if(this.model.action === animation) return

        const animationSelection = this.model[animation]
        this.model.duration = animationSelection.duration
        const action = this.model.mixer.clipAction(animationSelection, this.model.root)

        this.model.mixer.stopAllAction()
        this.model.action = animation

        action.time = 0
        action.fadeIn(0.5)
        action.play()
    }

    changeAnimation(animation)
    {
        if(animation == 'back')
        {
            this.action = Backflip
        }
        
        if(animation == 'dance')
        {
            this.action = 'dance'
        }
        
        if(animation == 'salsa')
        {
            this.action = Salsa
        }

        if(animation == 'belly')
        {
            this.action = Belly
        }

        setTimeout(() =>
            this.action = LookingAround
        ,this.model.duration * 1000)
    }

    loop()
    {
        const dt = this.clock.getDelta()

        if (this.model.mixer!=undefined) this.model.mixer.update(dt)

    }
}