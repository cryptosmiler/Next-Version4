import React, {useState, useEffect} from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import {isMobile} from 'react-device-detect'

import { TweenLite, gsap } from 'gsap'

import * as THREE from "three"
import Stats from 'three/examples/jsm/libs/stats.module'
import Planet from '../webgl/Planet'
import Camera from '../webgl/Camera'
import Bitcoin from '../webgl/Bitcoin'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {MMDLoader} from 'three/examples/jsm/loaders/MMDLoader'
import {MMDAnimationHelper} from 'three/examples/jsm/animation/MMDAnimationHelper'
import {OutlineEffect} from 'three/examples/jsm/effects/OutlineEffect'
import { MMDPhysics } from 'three/examples/jsm/animation/MMDPhysics'
import Character from '../webgl/Character'
import PortfolioText from '../webgl/PortfolioText'
import Content04 from '../components/Content04'

const Home: NextPage = () => {  
  const [webglFlag, setWebglFlag] = useState({'flag':false})

  const webGLRender = () => {
    let camera:any, light:any
    const scene = new THREE.Scene()
    let container: any, stats:any, character:Character, planet:Planet
    const clock = new THREE.Clock()
    let text: PortfolioText | THREE.Object3D<THREE.Event>
    let portfolio


    stats = Stats()
    document.body.appendChild(stats.dom)

    container = document.getElementById('webgl-canvas')
    const renderer = new THREE.WebGLRenderer({antialias: true, canvas: container, })
    renderer.outputEncoding = THREE.sRGBEncoding //LinearEncoding //THREE.sRGBEncoding
    // renderer.shadowMap.enabled = true
    // renderer.shadowMap.type = THREE.PCFSoftShadowMap  //PCFSoftShadowMap //VSMShadowMap//PCFShadowMap //BasicShadowMap
    renderer.setClearColor('#222222', 1)
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)

    const viewport = {
      width : container.clientWidth,
      height : container.clientHeight,
      aspectRatio : window.innerWidth / window.innerHeight
    }
    
    camera = new THREE.PerspectiveCamera( 50, container.clientWidth/container.clientHeight, 0.1, 5000 )
    camera.position.set(0, 0.6, 3)
    camera.lookAt(0, 0, 0)
    camera.updateProjectionMatrix()

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.enableRotate = true;
    // controls.maxDistance = 50
    controls.minDistance = 0
    controls.listenToKeyEvents( document.body)
    controls.keyPanSpeed = 50
    controls.keys = {
      LEFT: 'ArrowLeft', //left arrow
      RIGHT: 'ArrowRight', // right arrow
      UP: 'ArrowUp', // up arrow
      BOTTOM: 'ArrowDown' // down arrow
    }
    controls.target.set(0, 0, 0)
    controls.update();
    
    const viewSize = {
      distance : camera.position.z,
      vFov : (camera.fov * Math.PI) / 180,
      height : 2 * Math.tan((camera.fov * Math.PI) / 180 / 2) * camera.position.z,
      width : 2 * Math.tan((camera.fov * Math.PI) / 180 / 2) * camera.position.z * viewport.aspectRatio,
    }

    loadingAssets()

    function loadingAssets(){
      const loadManager = new THREE.LoadingManager();  

      planet = new Planet(loadManager)
      planet.scale.setScalar(0.3)
      // planet.position.y=0.5
      // planet.rotateY(2)
      scene.add(planet)

      text = new PortfolioText(loadManager)
      text.scale.setScalar(0.2)
      text.position.y = 1.1
      // scene.add(text)

      loadManager.onProgress = (urlOfLastItemLoaded, itemsLoaded, itemsTotal) => {
        const progress = itemsLoaded / itemsTotal
        console.log(itemsLoaded, itemsTotal, urlOfLastItemLoaded)
        console.log('------')        
        if (progress === 1.0){
          init()
        }
      };
    }

    function init(){

      const axesHelper = new THREE.AxesHelper(1);
      // scene.add( axesHelper );      

      // const ambient = new THREE.AmbientLight( 0xffffff, 0.3 );
      // scene.add( ambient );

      // const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
      // directionalLight.position.set( - 1, 1, 1 ).normalize();
      // scene.add( directionalLight );
    
      animate();
    }

    function animate() {
      requestAnimationFrame( animate );
      renderer.render( scene, camera )
      const time = performance.now() * 0.002
      planet.update && planet.update(time)
      stats.update()
    }
    
    window.addEventListener( 'resize', onWindowResize )
    function onWindowResize() {
      const container_wrapper = document.getElementById('canvas-wrapper')
      if (container_wrapper){          
        const viewport = {
          width : container.clientWidth, height : container.clientHeight,
          aspectRatio : window.innerWidth / window.innerHeight
        }

        camera.aspect = container_wrapper.clientWidth / container_wrapper.clientHeight;
        camera.updateProjectionMatrix()

        const viewSize = {
          distance : camera.position.z,
          vFov : (camera.fov * Math.PI) / 180,
          height : 2 * Math.tan((camera.fov * Math.PI) / 180 / 2) * camera.position.z,
          width : 2 * Math.tan((camera.fov * Math.PI) / 180 / 2) * camera.position.z * viewport.aspectRatio,
        }
        renderer.setSize( container_wrapper.clientWidth, container_wrapper.clientHeight );
      }
    }
  }

  useEffect(() => {
    if(typeof document !== "undefined"){
      if (webglFlag.flag === false){
        webglFlag.flag = true
        webGLRender()
      }
    }
  }, [])

  return (
    <div className='w-screen min-h-screen '>
      <Head>
        <title>My Portfolio</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div id='canvas-wrapper'
        className='relative top-0 left-0 w-screen h-screen pointer-events-auto'
      >
          <canvas id='webgl-canvas' className='w-screen h-screen'/>
      </div>
      <Content04/>
    </div>
  )
}

export default Home
