import { Group } from 'three'

import * as THREE from "three"
import {TextGeometry} from './js/TextGeometry'
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader'

export default class PortfolioText extends Group {
  constructor(...arg:any) {
    super();

    this.name = 'portfolio'

    const fontLoader = new FontLoader( arg[0]);							// see function createText( loadedFont )
    fontLoader.load('assets/fonts/helvetiker_regular.typeface.json',  ( loadedFont: any ) => {
      const textMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x444444, shininess: 30 } );
      const textGeometry = new TextGeometry( 'Portfolio', {
        font: loadedFont,
        size: 1,
        height: 0.04,
        curveSegments: 10,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.05,
        bevelSegments: 5
      });
      textGeometry.center(); // otherwise position left side    
      const tMesh = new THREE.Mesh( textGeometry, textMaterial );    
      this.add(tMesh)
    } )
  }
  
}