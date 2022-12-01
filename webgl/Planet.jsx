import { Group } from 'three'
import * as THREE from "three"
import Sun from './Sun';

export default class Planet extends Group {
  r=[2,3,4,6,8,10,12,14,20]
  planet;
  sun;
  mercury;
  venus;
  earth;  moon;
  mars;
  jupiter;
  saturn;
  uranus;
  neptune;
  pluto;
  constructor(...arg) {
    super();

    this.name = 'planet'
    this.planet = new THREE.Object3D()

    for(let i = 0; i<9; i++){
      const points = []
      const twopi = 2 * Math.PI;
      let geometry
      for (let angle = 0; angle <= 100; angle++) {
        let x = this.r[i] * Math.cos(angle / 100 * twopi)
        let z = this.r[i] * Math.sin(angle / 100 * twopi);
        points.push(new THREE.Vector3(x, 0, z));
        geometry = new THREE.BufferGeometry().setFromPoints( points )
      }
      let material = new THREE.LineBasicMaterial({
          color: 0x66ffff,
          opacity: .15,
          linewidth: .2,
          transparent:true
        })
      const line = new THREE.Line(geometry, material);
      this.planet.add(line)
    }
    let textureLoader = new THREE.TextureLoader(arg[0])

    let planetProto = {
      sphere: function (size) {
        let sphere = new THREE.SphereGeometry(size, 32, 32);    
        return sphere;
      },
      material: function (options) {
        let material = new THREE.MeshPhongMaterial();
        if (options) {
          for (var property in options) {
            material[property] = options[property];
          }
        }
    
        return material;
      },
      glowMaterial: function (intensity, fade, color) {
        // Custom glow shader from https://github.com/stemkoski/stemkoski.github.com/tree/master/Three.js
        let glowMaterial = new THREE.ShaderMaterial({
          uniforms: {
            'c': {
              type: 'f',
              value: intensity },
    
            'p': {
              type: 'f',
              value: fade },
    
            glowColor: {
              type: 'c',
              value: new THREE.Color(color) },
    
            viewVector: {
              type: 'v3',
              value: {x:0, y:0, z:3} } },
    
          vertexShader: `
            uniform vec3 viewVector;
            uniform float c;
            uniform float p;
            varying float intensity;
            void main() {
              vec3 vNormal = normalize( normalMatrix * normal );
              vec3 vNormel = normalize( normalMatrix * viewVector );
              intensity = pow( c - dot(vNormal, vNormel), p );
              gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
            }`,
    
          fragmentShader: `
            uniform vec3 glowColor;
            varying float intensity;
            void main() 
            {
              vec3 glow = glowColor * intensity;
              gl_FragColor = vec4( glow, 1.0 );
            }`,
    
          side: THREE.BackSide,
          blending: THREE.AdditiveBlending,
          transparent: true });
    
        return glowMaterial;
      },
    }

    const surface = new THREE.Mesh(
        planetProto.sphere(1), 
        planetProto.material({
          bumpScale:0.03, shininess:3, specular: new THREE.Color('grey'), 
          map:textureLoader.load('assets/models/planet/earthmap1k.jpg'),
          // map:textureLoader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthmap1k.jpg'),
          bumpMap: textureLoader.load('assets/models/planet/earthbump1k.jpg'),
          specularMap: textureLoader.load('assets/models/planet/earthspec1k.jpg')
        })
    )

    const atmosphere = new THREE.Mesh(
        new THREE.SphereGeometry(1.03, 32, 32), 
        planetProto.material({
          bumpScale:0.005, shininess:15, side:THREE.DoubleSide, transparent:true, opacity:0.5,
          map: textureLoader.load('assets/models/planet/earthcloudmap.jpg'),
          alphaMap: textureLoader.load('assets/models/planet/earthcloudmaptrans.jpg')
        })
    )

    const atmosphericGlow = new THREE.Mesh(
        planetProto.sphere(1+0.05), 
        planetProto.glowMaterial(0.7, 2.8, 0x93cfef)
    )

    this.earth = new THREE.Object3D()
    surface.name = 'surface';
    atmosphere.name = 'atmosphere';
    atmosphericGlow.name = 'atmosphericGlow';
    this.earth.add(surface);
    this.earth.add(atmosphere);
    // this.earth.add(atmosphericGlow);

    this.moon = new THREE.Mesh(
      new THREE.SphereGeometry(0.25, 32, 32), 
      new THREE.MeshPhongMaterial({
        bumpScale:0.005, shininess:3, side:THREE.FrontSide,
        map: textureLoader.load('assets/models/planet/moonmap1k.jpg'),
        bumpMap: textureLoader.load('assets/models/planet/moonbump1k.jpg')
      })
    )
    this.moon.position.set(2,0,0)

    this.mercury = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 32, 32), 
      new THREE.MeshPhongMaterial({
        bumpScale:0.005, shininess:3, side:THREE.FrontSide,
        map: textureLoader.load('assets/models/planet/mercurySurfaceMaterial.jpg'),
      })
    )
    this.planet.add(this.mercury)

    this.venus = new THREE.Mesh(
      new THREE.SphereGeometry(0.23, 32, 32), 
      new THREE.MeshPhongMaterial({
        bumpScale:0.005, shininess:3, side:THREE.FrontSide,
        map: textureLoader.load('assets/models/planet/venusSurfaceMaterial.jpg'),
      })
    )
    this.planet.add(this.venus)

    this.mars = new THREE.Mesh(
      new THREE.SphereGeometry(0.105, 32, 32), 
      new THREE.MeshPhongMaterial({
        bumpScale:0.005, shininess:3, side:THREE.FrontSide,
        map: textureLoader.load('assets/models/planet/marsSurfaceMaterial.png'),
      })
    )
    this.planet.add(this.mars)

    this.jupiter = new THREE.Mesh(
      new THREE.SphereGeometry(0.45, 32, 32), 
      new THREE.MeshPhongMaterial({
        bumpScale:0.005, shininess:3, side:THREE.FrontSide,
        map: textureLoader.load('assets/models/planet/jupiterSurfaceMaterial.jpg'),
      })
    )
    this.planet.add(this.jupiter)

    this.saturn = new THREE.Mesh(
      new THREE.SphereGeometry(0.4, 32, 32), 
      new THREE.MeshPhongMaterial({
        bumpScale:0.005, shininess:3, side:THREE.FrontSide,
        map: textureLoader.load('assets/models/planet/saturnSurface.jpg'),
      })
    )
    this.planet.add(this.saturn)
    const ringSaturn = new THREE.Mesh(
      new THREE.RingGeometry(0.49, 0.7, 32), 
      new THREE.MeshLambertMaterial({
        side:THREE.DoubleSide,
        transparent: false,
        map: textureLoader.load('assets/models/planet/saturnRings.png'),
      })
    )    
    this.saturn.add(ringSaturn)
    ringSaturn.rotateX(-1.3)
    ringSaturn.rotateY(0.5)  
    ringSaturn.rotateZ(1.5)    

    this.uranus = new THREE.Mesh(
      new THREE.SphereGeometry(0.3, 32, 32), 
      new THREE.MeshPhongMaterial({
        bumpScale:0.005, shininess:3, side:THREE.FrontSide,
        map: textureLoader.load('assets/models/planet/uranusSurfaceMaterial.jpg'),
      })
    )
    this.planet.add(this.uranus)

    this.neptune = new THREE.Mesh(
      new THREE.SphereGeometry(0.25, 32, 32), 
      new THREE.MeshPhongMaterial({
        bumpScale:0.005, shininess:3, side:THREE.FrontSide,
        map: textureLoader.load('assets/models/planet/neptuneSurfaceMaterial.jpg'),
      })
    )
    this.planet.add(this.neptune)

    this.pluto = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 32, 32), 
      new THREE.MeshPhongMaterial({
        bumpScale:0.005, shininess:3, side:THREE.FrontSide,
        map: textureLoader.load('assets/models/planet/plutoSurfaceMaterial.jpg'),
      })
    )
    this.planet.add(this.pluto)
    
    this.earth.add(this.moon)
    this.earth.scale.setScalar(0.2)
    this.earth.position.set(6, 0, 0)

    this.sun = new Sun(arg[0])
    this.sun.scale.setScalar(0.5)
    this.sun.rotateY(-2.3)
    this.planet.add(this.earth)

    this.planet.add(this.sun)
    this.planet.rotateY(2.3)

    this.add(this.planet)
    
  }

  update(time){
    const cycle = time * 0.5
    this.moon.rotateY(0.05)
    this.earth.rotateY(0.1)
    this.mars.rotateY(0.09)
    this.jupiter.rotateY(0.24)
    // this.saturn.rotateY(0.23)
    this.uranus.rotateY(0.14)
    this.neptune.rotateY(0.149)
    this.pluto.rotateY(0.0156)

    
    this.mercury.position.set(this.r[0] * Math.sin(cycle*4.14), 0, this.r[0] * Math.cos(cycle*4.14))
    
    this.venus.position.set(this.r[1] * Math.sin(cycle*1.63), 0, this.r[1] * Math.cos(cycle*1.63))
    
    this.earth.position.set(this.r[2] * Math.sin(cycle), 0, this.r[2] * Math.cos(cycle))

    this.mars.position.set(this.r[3] * Math.sin(cycle*0.53), 0, this.r[3] * Math.cos(cycle*0.53))

    this.jupiter.position.set(this.r[4] * Math.sin(cycle*0.084), 0, this.r[4] * Math.cos(cycle*0.084))

    this.saturn.position.set(this.r[5] * Math.sin(cycle*0.034), 0, this.r[5] * Math.cos(cycle*0.034))

    this.uranus.position.set(this.r[6] * Math.sin(cycle*0.012), 0, this.r[6] * Math.cos(cycle*0.012))

    this.neptune.position.set(this.r[7] * Math.sin(cycle*0.006), 0, this.r[7] * Math.cos(cycle*0.006))

    this.pluto.position.set(this.r[8] * Math.sin(cycle*0.004), 0, this.r[8] * Math.cos(cycle*0.004))
    
    this.sun.update && this.sun.update(time)
  }
}
