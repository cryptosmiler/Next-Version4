import { Group } from 'three'

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import * as THREE from "three"

import { isMobile } from 'react-device-detect'

export default class Camera extends Group {
  camera: any
  controls: any
  
  constructor(...args:any) {
    super();
    if(typeof document !== 'undefined' && args[0]!=null){
      const container = document.getElementById('webgl-canvas')
      if(container){
        this.camera = new THREE.PerspectiveCamera( isMobile?80:50, container.clientWidth/container.clientHeight, 0.1, 5000 )
        this.camera.position.set(0, 100, 1000)
        this.camera.lookAt(0, 100, 997)
        this.camera.updateProjectionMatrix()

        // this.controls = new OrbitControls( this.camera, args[0].domElement );
        // this.controls.enableRotate = true;
        // // this.controls.maxDistance = 50
        // this.controls.minDistance = 0
        // this.controls.listenToKeyEvents( document.body)
        // this.controls.keyPanSpeed = 50
        // this.controls.keys = {
        //   LEFT: 'ArrowLeft', //left arrow
        //   RIGHT: 'ArrowRight', // right arrow
        //   UP: 'ArrowUp', // up arrow
        //   BOTTOM: 'ArrowDown' // down arrow
        // }
        // this.controls.target.set(0, 0, 0)
        // this.controls.update();
      }
    }
  }

  update(cameraPos:any, cameraTarget:any) {
    // this.controls.target.set(cameraTarget.x, cameraTarget.y, cameraTarget.z)
    // this.controls.update()
    this.camera.zoom = 1
    this.camera.position.set(cameraPos.x, cameraPos.y, cameraPos.z)
    this.camera.lookAt(cameraTarget.x, cameraTarget.y, cameraTarget.z)
    this.camera.updateProjectionMatrix()
  }
}
