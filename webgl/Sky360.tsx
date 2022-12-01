import { Group } from 'three'

import * as THREE from "three"

export default class Sky360 extends Group {
  constructor(...arg:any) {
    super();

    this.name = 'Sky360'

    let textureLoader = new THREE.TextureLoader(arg[0])
    const texture = textureLoader.load('assets/images/sea1.jpg')
    
    const geometry = new THREE.SphereBufferGeometry(2000,64,64)
    const material = new THREE.MeshPhongMaterial({map:texture, side:THREE.BackSide})
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.y = 450
    mesh.rotateY(-1.3)

    this.add(mesh)
  }
}
