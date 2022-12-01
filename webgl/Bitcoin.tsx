import {  Group } from 'three'

import * as THREE from "three"

import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

export default class Bitcoin extends Group {
  constructor(...arg:any) {
    super();

    this.name = 'Bitcoin'
    
    const gltfLoader = new GLTFLoader(arg[0])
    gltfLoader.load(
      'assets/models/bitcoins/bitcoin/scene.gltf',
      ( gltf:any ) => {
        const model = gltf.scene
        model.position.set(2.5, -36, 14)
        this.add(model);
      },
    );
  }
}
