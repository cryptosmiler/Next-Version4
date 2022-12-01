import { Group, } from 'three'
import * as THREE from "three"

export default class Cloud extends Group {

  constructor(...arg) {
    super();

    this.name = 'cloud'

    const loaderTexture = new THREE.TextureLoader(arg[0])
    var texture = loaderTexture.load('assets/textures/cloud.png')
    // texture.magFilter = THREE.LinearMipMapLinearFilter;
    // texture.minFilter = THREE.LinearMipMapLinearFilter;

    this.geometry = new THREE.Object3D()

    const sfSpriteMaterial = new THREE.SpriteMaterial( { 
      map: texture, 
      color:0xeedddd,
    } );

    for ( var i = 0; i < 2000; i++ ) {
      var cloudPlane = new THREE.Sprite( sfSpriteMaterial );
      cloudPlane.scale.setScalar(200)
      cloudPlane.position.x = Math.random() * 4000 - 1900;
      cloudPlane.position.y = Math.random() * 300 - 250 ;
      cloudPlane.position.z = Math.random() * 6000 - 3500

      this.geometry.add(cloudPlane)
    }

    this.add(this.geometry)
  }
  
  update(timeStamp, opi) {
    for(let i = 0; i < this.geometry.children.length; i++){
      const z = this.geometry.children[i].position.z
      this.geometry.children[i].position.z = (z >= 2500)?-3500:z + 0.2
      this.geometry.children[i].material.opacity = opi
    }
  }
}
