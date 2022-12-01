import { Group } from 'three'

import * as THREE from "three"

import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

export default class Scene3Light extends Group {
  constructor(...arg:any) {
    super();

    this.name = 'scene3Light'

    const ambient = new THREE.AmbientLight(0xffee88, 0.5)
    this.add(ambient)

    const directLight = new THREE.DirectionalLight(0xffee88, 10,)
    this.add(directLight)
    directLight.position.set(1, 1, 5)
  }
}
