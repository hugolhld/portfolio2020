import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import Belly from '../model/SambaCharacter.fbx'
import Punch from '../model/Punching.fbx'
import LookingAround from '../model/looking.fbx'


export default class Model
{
    constructor()
    {
        this.group = new THREE.Group()
        this.model
        this.mixer
        this.clock = new THREE.Clock()
        this.animationsArray = [Punch, LookingAround]

        this.init()
        this.loop()
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
                this.root = this.mixer.getRoot()
                this.mixer.clipAction(this.model.animations[0], this.root).play()

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
                this.model[this.animation] = model.animations[0]
                console.log(this.model[this.animation])

                this.mixer.stopAllAction()
                this.mixer.clipAction(this.model.animations[this.animation]).play()

                if(this.animationsArray.length > 0)
                {
                    this.addAnimations(loader)
                }
                else
                {
                    delete this.animationsArray
                    this.action = Punch
                }
            }
        )
        
        console.log(this.model.animations)
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