import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import Belly from '../model/SambaCharacter.fbx'
import Punch from '../model/Punching.fbx'
import LookingAround from '../model/looking.fbx'
import Test from '../model/test.fbx'
import Backflip from '../model/Backflip.fbx'



export default class Model
{
    constructor()
    {
        this.group = new THREE.Group()
        this.model= {}
        this.duration
        this.clock = new THREE.Clock()
        this.animationsArray = [Punch, LookingAround, Backflip]
        this.init()
    }

    init()
    {
        this.loader = new FBXLoader()

        this.loader.load(
            Belly,
            (_fbx) =>
            {

                this.model.object = _fbx

                this.model.mixer = new THREE.AnimationMixer(this.model.object)
                // console.log(this.model.mixer);

                this.model.root = this.model.mixer.getRoot()

                this.model.object.scale.set(0.3,0.3,0.3)
                this.model.object.position.y = -20

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
                console.log(model)
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