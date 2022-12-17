import React, {useState, useEffect} from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import {isMobile} from 'react-device-detect'

import Loading from '../components/Loading'
import Content00 from '../components/Content00'
import Content01 from '../components/Content01'
import Content02 from '../components/Content02'
import Content03 from '../components/Content03'
import Content04 from '../components/Content04'
import Content07 from '../components/Content07'
import StepProgress from '../components/StepProgress'

import { TweenLite, gsap } from 'gsap'

import * as THREE from "three"
import Stats from 'three/examples/jsm/libs/stats.module'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Cloud from '../webgl/Cloud'
import Camera from '../webgl/Camera'
import Water from '../webgl/Water'
import Sky from '../webgl/Sky'
import Planet from '../webgl/Planet'
import Sky360 from '../webgl/Sky360'
import Character from '../webgl/Character'

const Home: NextPage = () => {
  const contents = ['content00', 'content01', 'content02', 'content03', 'content04', 'content07']

  const [loadingProcess, setLoadingProcess] = useState(0)
  const [sceneData, setSceneData] = useState({'scene':1, 'order':0, 'preorder':-1})
  const [webglFlag, setWebglFlag] = useState({'flag':false})
  const [eventFlag, setEventFlag] = useState({'eventFlag':false})

  const webGLRender = () => {
    let camera:any, light:any, sound: THREE.Audio<GainNode>
    const scene1 = new THREE.Scene(), 
          scene2 = new THREE.Scene(), 
          scene3 = new THREE.Scene(), 
          scene4 = new THREE.Scene()
    let container: any, stats: Stats, cloud:Cloud, water:Water, sky:any, planet:Planet, character:Character, playButton:any;    
    // const elements: any[]=[]
    const raycaster = new THREE.Raycaster();
    // const pointer = new THREE.Vector2();
    let touchStartValue : any, playflag = false
    let pmremGenerator:any, sunPos:number
    const audioLoader = new THREE.AudioLoader()

    const parameters = {
      elevation: -3.5,
      azimuth: 180
    };
    sunPos = parameters.elevation

    container = document.getElementById('webgl-canvas')
    const renderer = new THREE.WebGLRenderer({antialias: true, canvas: container, alpha:false})
    renderer.setClearColor('#00BFFF', 1)
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)

    scene2.background = new THREE.Color( 0x0066ff )
    scene2.fog = new THREE.Fog( 0x0066ff, 2000, 4500 )

    const viewport = {
      width : container.clientWidth,
      height : container.clientHeight,
      aspectRatio : window.innerWidth / window.innerHeight
    }
    
    camera = new Camera(renderer)
    
    const viewSize = {
      distance : 3,
      vFov : (camera.camera.fov * Math.PI) / 180,
      height : 2 * Math.tan((camera.camera.fov * Math.PI) / 180 / 2) * 3,
      width : 2 * Math.tan((camera.camera.fov * Math.PI) / 180 / 2) * 3 * viewport.aspectRatio,
    }

    const axesHelper = new THREE.AxesHelper(5);
    scene3.add( axesHelper );
    loadingAssets()

    function loadingAssets(){
      const loadManager = new THREE.LoadingManager();

      let textureLoader = new THREE.TextureLoader(loadManager)

      //-------scene1------
      sky = new Sky();
      sky.scale.setScalar( 3000 );
      scene1.add( sky );

      pmremGenerator = new THREE.PMREMGenerator( renderer );

      cloud = new Cloud(loadManager)
      scene1.add(cloud)

      const light = new THREE.HemisphereLight(0x8888aa, 0x554a33, 3)      
      scene1.add(light)
      //-------scene2------

      const s2bk = textureLoader.load('assets/images/back.jpg')
      scene2.background = s2bk;

      planet = new Planet(loadManager)
      planet.scale.setScalar(0.3)
      planet.rotateX(0.4)
      
      planet.position.set(0, 0, 0)
      scene2.add(planet)
      //-------scene5-------
      scene3.background = new THREE.Color(0x008888)  

      const ambient = new THREE.AmbientLight( 0xffffff, 0.3 );
      scene3.add( ambient );

      const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
      directionalLight.position.set( - 0.3, 2, 1 )
      scene3.add( directionalLight );
      //-------scene4-------
      const sc4light = new THREE.AmbientLight(0x999999, 1)
      scene4.add(sc4light)
      const sc4light1 = new THREE.DirectionalLight(0xffffff, 1.2)
      sc4light1.position.set(1,3,1)
      const target = new THREE.Object3D()
      target.position.set(0,0,0)
      sc4light1.target = target
      scene4.add(sc4light1)
      scene4.add(target)

      const sky360 = new Sky360(loadManager)
      scene4.add(sky360)

      const waterGeometry = new THREE.PlaneGeometry(5000, 5000);
      water = new Water(
        waterGeometry,
        {
          textureWidth: 512,
          textureHeight: 512,
          waterNormals: new THREE.TextureLoader(loadManager).load('assets/textures/waternormals.jpg', function (texture) {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
          }),
          sunDirection: new THREE.Vector3(),
          sunColor: 0xffffff,
          waterColor: 0x001e0f,
          distortionScale: 3.7,
          fog: scene2.fog !== undefined
        }
      );
      
      water.rotation.x = - Math.PI / 2;
      water.position.y = -0.25
      scene4.add(water);

      character = new Character(loadManager)
      character.scale.setScalar(0.8)
      // character.rotateY(isMobile?0:0.3)
      // const position= isMobile?
      //   new THREE.Vector3 (0, (-0.5 * 2 + 1) * viewSize.height/2, 0)
      //   :
      //   new THREE.Vector3 ((0.28 * 2 - 1) * viewSize.width/2, -0.2, 0) 
      const position = new THREE.Vector3(0,-0.20,0)
      character.position.copy(position)      
      scene4.add(character)
      

      const gltfLoader = new GLTFLoader(loadManager)
      gltfLoader.load(
        'assets/models/youtube_button/scene.gltf',
        ( gltf:any ) => {
          playButton = gltf.scene
          playButton.scale.setScalar(0.1)
          playButton.position.set(0, 0.1, .8)
          scene4.add(playButton);
        },
      );
      
      loadManager.onProgress = (urlOfLastItemLoaded, itemsLoaded, itemsTotal) => {
        const progress = itemsLoaded / itemsTotal
        setLoadingProcess(progress * 100)
        if (progress === 1.0){
          init()
        }
      };
    }

    function init(){

      // stats = Stats()
      // document.body.appendChild(stats.dom)

      animate();

      eventFlag.eventFlag = true
      sunPos = -2
      gsap.fromTo(camera.camera.position, 2, {z:3000}, {z:0, delay:1})
      gsap.fromTo(document.getElementById(contents[0]), 1, {opacity:0, scale:0.5}, {opacity:1, scale:1, delay:2})
      setTimeout(()=>{
        eventFlag.eventFlag = false
      }, 3000)
    }

    function updateSun() {
      let sun = new THREE.Vector3()
      const phi = THREE.MathUtils.degToRad( 90 - parameters.elevation );
      const theta = THREE.MathUtils.degToRad( parameters.azimuth );
      sun.setFromSphericalCoords( 1, phi, theta );
      sky.material.uniforms[ 'sunPosition' ].value.copy( sun );
      scene1.environment = pmremGenerator.fromScene( sky ).texture;
    }

    function animate() {
      requestAnimationFrame( animate );
      renderer.render(
          sceneData.scene===1?scene1:
          sceneData.scene===2?scene2:
          sceneData.scene===3?scene3:scene4, 
          camera.camera 
      )
      const time = performance.now() * 0.002

      if(sceneData.scene === 1){
        if(parameters.elevation<sunPos){
          parameters.elevation+=0.01
          updateSun()
        }else if(parameters.elevation>sunPos){
          parameters.elevation-=0.01
          updateSun()
        }
        // cloud.update && cloud.update(time*0.2, 1)
      }else if(sceneData.scene === 2){
        planet.update && planet.update(time)
      }else if(sceneData.scene === 3){
      }else if(sceneData.scene === 4){        
        let waterMaterial: any = water.material;
        waterMaterial.uniforms['time'].value += 0.01
        camera.camera.position.y = Math.sin(time) * 0.03
        if(playflag)
          character.update && character.update()
      }      
    }

    function executeAction(){
      const tempTime = 0.3
      if(sceneData.order === 5){
        gsap.fromTo(document.getElementById('scene-mask'), tempTime, {opacity:0}, {opacity:1, })
        gsap.fromTo(document.getElementById('scene-mask'), 2*tempTime, {opacity:1}, {opacity:0, delay:tempTime+0.1})
        gsap.to(document.getElementById(contents[sceneData.preorder]), tempTime, {opacity:0, zIndex:-10})
        gsap.to(document.getElementById(contents[sceneData.order]), tempTime, {opacity:1, zIndex:100, delay:tempTime+0.1})
        setTimeout(()=>{
          sceneData.scene = 4;
          camera.camera.position.set(0,0.4,3)
          camera.camera.lookAt(0, 0, 0)
          camera.camera.updateProjectionMatrix()
          if(playflag)
            sound.setVolume( 0.5 );
        },tempTime*1000)
      }else if(sceneData.order === 4){
        gsap.fromTo(document.getElementById('scene-mask'), tempTime, {opacity:0}, {opacity:1, })
        gsap.fromTo(document.getElementById('scene-mask'), 2*tempTime, {opacity:1}, {opacity:0, delay:tempTime+0.1})
        gsap.to(document.getElementById(contents[sceneData.preorder]), tempTime, {opacity:0, zIndex:-10})
        gsap.to(document.getElementById(contents[sceneData.order]), tempTime, {opacity:1, zIndex:100, delay:tempTime+0.1})
        setTimeout(()=>{
          sceneData.scene = 3;
          camera.camera.position.set(0,0,3)
          camera.camera.lookAt(0, 0, 0)
          camera.camera.updateProjectionMatrix()
          if(playflag)
            sound.setVolume( 0.0 );
        },tempTime*1000)
      }else if(sceneData.order===3){
          gsap.fromTo(document.getElementById('scene-mask'), tempTime, {opacity:0}, {opacity:1, })
          gsap.fromTo(document.getElementById('scene-mask'), 2*tempTime, {opacity:1}, {opacity:0, delay:tempTime+0.1})
          gsap.to(document.getElementById(contents[sceneData.preorder]), tempTime, {opacity:0, zIndex:-10})
          gsap.to(document.getElementById(contents[sceneData.order]), tempTime, {opacity:1, zIndex:100, delay:tempTime+0.1})
          setTimeout(()=>{
            sceneData.scene = 2; 
            camera.camera.position.set(0,0,3)
            camera.camera.lookAt(0, 0, 0)
            camera.camera.updateProjectionMatrix()
          },tempTime*1000)
      }else if(sceneData.order<=2){
        if(sceneData.scene === 2){
          gsap.fromTo(document.getElementById('scene-mask'), tempTime, {opacity:0}, {opacity:1, })
          gsap.fromTo(document.getElementById('scene-mask'), 2*tempTime, {opacity:1}, {opacity:0,  delay:tempTime+0.1})
          setTimeout(()=>{
            sceneData.scene = 1; 
            camera.camera.position.set(0, 100, -900)
            camera.camera.lookAt(0, 100, -903)
            camera.camera.updateProjectionMatrix()
          },tempTime*1000)
        }
        
        const showContainer = document.getElementById(contents[sceneData.order])

        if(sceneData.order>sceneData.preorder){
          gsap.fromTo(showContainer, 1, {opacity:0, scale:0.5}, {opacity:1, zIndex:100, scale:1, delay:0.8})
          if(sceneData.preorder>-1){
            const preContainer = document.getElementById(contents[sceneData.preorder])
            gsap.fromTo(preContainer, 1, {opacity:1, scale:1}, {opacity:0, scale:2})
          }
        }else{
          gsap.fromTo(showContainer, 1, {opacity:0, scale:2}, {opacity:1, zIndex:100, scale:1, delay:0.8})
          if(sceneData.preorder>-1){
            const preContainer = document.getElementById(contents[sceneData.preorder])
            gsap.fromTo(preContainer, 1, {opacity:1, scale:1}, {opacity:0, scale:sceneData.preorder===3?1:0.5})
          }
        }

        sunPos = -2 + (sceneData.order ) * 1

        gsap.fromTo(camera.camera.position, 2, {z:-(sceneData.preorder+1) * 300}, {z: - (sceneData.order+1) * 300 })
      }

      setTimeout(()=>{
        eventFlag.eventFlag = false
      }, 3000)
      gsap.to(document.getElementById('step-progress'), 0.5, {x:(window.innerWidth * sceneData.order/5)})
    }

    window.addEventListener("wheel", function (event: { deltaY: number }) {
      if (eventFlag.eventFlag) return

      const nextStep = event.deltaY>0?sceneData.order+1:sceneData.order-1

      if(nextStep<0 || nextStep>contents.length-1) return
      sceneData.preorder = sceneData.order
      sceneData.order = nextStep

      eventFlag.eventFlag = true
      executeAction()
    })
        
    container.addEventListener( 'pointermove', onPointerMove )
    function onPointerMove( event: { clientX: number; clientY: number } ) {
    }
    
    window.addEventListener( 'mousedown', onMouseDown )
    function onMouseDown( event: { clientX: number; clientY: number } ) {
      let pointer=({x:0, y:0})
      pointer.x = ( event.clientX / container.clientWidth ) * 2 - 1;
      pointer.y = - ( event.clientY / container.clientHeight ) * 2 + 1 ;
      
      raycaster.setFromCamera( pointer, camera.camera )
      const intersects = raycaster.intersectObject( playButton )
      if ( intersects.length > 0 ) {
        playButton.visible = false
        playflag = true
        
        const listener = new THREE.AudioListener();  
        camera.camera.add( listener );
        sound = new THREE.Audio( listener );
        const audioLoader = new THREE.AudioLoader();
        setTimeout(()=>{
          audioLoader.load( 'assets/sounds/wavefile_short.mp3', function( buffer ) {
            sound.setBuffer( buffer )
            sound.setLoop( true );
            sound.setVolume( 0.5 );
            sound.play()
          });
        }, 1000)
      } 
    }    

    window.addEventListener("touchstart", function (touchEvent) {
      if (eventFlag.eventFlag) return
      touchStartValue = touchEvent.changedTouches[0].pageY      
    }, false);

    // window.addEventListener("touchmove", function (touchEvent) {
    // }, false);

    window.addEventListener("touchend", function (touchEvent) {
      if (eventFlag.eventFlag) return
      let nextStep;
      if(touchStartValue + 10 < touchEvent.changedTouches[0].pageY)
        nextStep = sceneData.order+1
      else if(touchStartValue - 10 > touchEvent.changedTouches[0].pageY)
        nextStep = sceneData.order-1
      else
        return

      if(nextStep<0 || nextStep>contents.length-1) return
      sceneData.preorder = sceneData.order
      sceneData.order = nextStep

      eventFlag.eventFlag = true
      executeAction()
    }, false);

    window.addEventListener( 'resize', onWindowResize )
    function onWindowResize() {
      const container_wrapper = document.getElementById('canvas-wrapper')
      if (container_wrapper){          
        const viewport = {
          width : container.clientWidth, height : container.clientHeight,
          aspectRatio : window.innerWidth / window.innerHeight
        }

        camera.camera.aspect = container_wrapper.clientWidth / container_wrapper.clientHeight;
        camera.camera.updateProjectionMatrix()

        const viewSize = {
          distance : camera.camera.position.z,
          vFov : (camera.camera.fov * Math.PI) / 180,
          height : 2 * Math.tan((camera.camera.fov * Math.PI) / 180 / 2) * camera.camera.position.z,
          width : 2 * Math.tan((camera.camera.fov * Math.PI) / 180 / 2) * camera.camera.position.z * viewport.aspectRatio,
        }
        renderer.setSize( container_wrapper.clientWidth, container_wrapper.clientHeight );
      }
    }
  }

  useEffect(() => {
    if(typeof document !== "undefined"){
      if (webglFlag.flag === false){
        
          webglFlag.flag = true
        setTimeout(()=>{
          webGLRender()
        },500)
      }
    }
  }, [])

  return (
    <div className='min-w-screen min-h-screen'>
      <Head>
        <title>Dmytro | Portfolio</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo.png" />
      </Head>

      <Loading value={loadingProcess}/>
      
      <div id='canvas-wrapper'
        className='relative top-0 left-0 w-screen h-screen pointer-events-auto'
      >
          <canvas id='webgl-canvas' className='w-screen h-screen'/>
          <div id='scene-mask' className='absolute z-20 top-0 left-0 w-screen h-screen opacity-0 bg-white pointer-events-none'>
            <div className='relative w-screen h-screen'>
              <img src='assets/images/Nlvo6c.jpg' className='w-full h-full'/>
              {/* <div className='w-full h-full absolute top-0 left-0' 
                style={{backgroundImage:'linear-gradient(89.78deg, rgba(38, 38, 40, 0.4) 0.2%, rgba(85, 110, 230, 0.8) 99.05%)'}}
              /> */}
            </div>
          </div>
      </div>

      <div className='dom-elements w-screen h-screen overflow-hidden top-0 left-0 absolute pointer-events-none'>
        <div className='w-screen h-screen overflow-hidden'>
          <Content00/>
          <Content01/>
          <Content02/>
          <Content03/>
          <Content04/>
          <Content07/>
          <StepProgress data={sceneData}/>
        </div>
      </div>
    </div>
  )
}

export default Home
