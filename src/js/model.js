import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import Belly from '../model/SambaCharacter.fbx'
import Punch from '../model/Punching.fbx'
import LookingAround from '../model/looking.fbx'
import Test from '../model/test.fbx'


export default class Model
{
    constructor()
    {
        this.group = new THREE.Group()
        this.model
        this.mixer
        this.clock = new THREE.Clock()
        this.animationsArray = [Punch, LookingAround, Test]
        this.animations = {}
        this.root
        // this.action
        this.init()
        this.loop()
        // this.test()
    }

    init()
    {
        this.loader = new FBXLoader()

        this.loader.load(
            Belly,
            (_fbx) =>
            {
                this.model = _fbx
                this.model.scale.set(0.3,0.3,0.3)
                this.model.position.y = -20
                this.mixer = new THREE.AnimationMixer(this.model)
                this.animations.mixer = new THREE.AnimationMixer(this.model)
                this.root = this.mixer.getRoot()
                this.mixer.clipAction(this.model.animations[0], this.root).play()
                console.log(this.mixer)
                // console.log(this.model.animations)
                this.addAnimations(this.loader)
                this.group.add(this.model)
            }
        )

    }

    addAnimations(loader)
    {
        this.animation = this.animationsArray.pop()

        loader.load(
            this.animation,
            model =>
            {
                this.animations[this.animation] = model.animations[0]
                // console.log(model.animation[0].name)
                // this.mixer.stopAllAction()
                // this.mixer.clipAction(this.model.animations[this.animation]).play()

                if(this.animationsArray.length > 0)
                {
                    this.addAnimations(loader)
                }
                else
                {
                    delete this.animationsArray
                    // this.action = Punch
                }
            }
        )
        
    }

    set action(animation)
    {
        console.log(this.mixer)
        if(this.action === animation)
        {
            return
        }

        const animationSelection = this.animations[animation]
        const action = this.mixer.clipAction(animationSelection, this.root).play()
        this.mixer.stopAllAction()
        this.action = animation
        action.play()
    }

    test()
    {
        this.action = Punch
    }

    loop()
    {
        // console.log('ok')
        // let dt = this.clock.getDelta()
        if (this.mixer)
        {
            this.mixer.update(this.clock.getDelta())
        }
    }
}