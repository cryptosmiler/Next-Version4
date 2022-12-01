import { Group } from 'three'

import * as THREE from "three"

import {MMDLoader} from 'three/examples/jsm/loaders/MMDLoader'
import {MMDAnimationHelper} from 'three/examples/jsm/animation/MMDAnimationHelper'
import {OutlineEffect} from 'three/examples/jsm/effects/OutlineEffect'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default class Character extends Group {
  character:any
  mixer: any
  clock
  helper
  constructor(...arg:any) {
    super();

    this.name = 'Character'

    this.clock = new THREE.Clock()
    
    const loader = new MMDLoader(arg[0])

    const modelFile = 'assets/models/miku/miku_v2.pmd';
    const vmdFiles = [ 'assets/models/miku/wavefile_v2.vmd' ];

    this.helper = new MMDAnimationHelper( {
      afterglow: 2.0
    } );

    loader.loadWithAnimation( modelFile, vmdFiles,  ( mmd ) => {
      const mesh = mmd.mesh;
      mesh.scale.setScalar(0.05)      
      this.add( mesh );

      this.helper.add( mesh, {
        animation: mmd.animation,
        physics: false
      } );
    });
    
    const gltfLoader = new GLTFLoader(arg[0])
    gltfLoader.load(
      'assets/models/stage/scene.gltf',
      ( gltf:any ) => {
        const model = gltf.scene
        model.scale.setScalar(0.3)
        model.position.set(0, -0.72, 0)
        this.add(model);
      },
    );
  }
  update(){
    const delta = this.clock.getDelta()
    this.helper.update(delta)
  }
}
