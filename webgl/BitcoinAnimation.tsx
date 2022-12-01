import { BoxGeometry, Group } from 'three'

import * as THREE from "three"

import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {AmmoPhysics} from 'three/examples/jsm/physics/AmmoPhysics'

export default class BitcoinAnimation extends Group {
  physics:any
  floor:any
  constructor(...arg:any) {
    super();

    this.name = 'bitcoinAnimation'

    setTimeout(()=>{
      this.init(arg[0])
    }, 1000)
  }
  async init(loader: THREE.LoadingManager | undefined){
    // this.physics = await new AmmoPhysics()
    
    const gltfLoader = new GLTFLoader(loader)    

    gltfLoader.load(
      'assets/models/tables/coffee_table/scene.gltf',
      ( gltf:any ) => {
        this.floor = gltf.scene
        this.floor.scale.setScalar(150)
        this.floor.position.set(-50, -120, -20)
        this.add(this.floor);
        // this.physics.addMesh(this.floor,1)
      },
    );

    gltfLoader.load(
      'assets/models/bitcoins/bitcoin/scene.gltf',
      ( gltf:any ) => {
        const model = gltf.scene
        model.position.set(2.5, -36, 14)
        this.add(model);
        // this.physics.addMesh(model,1)
      },
    );
  }
}
