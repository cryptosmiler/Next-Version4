import { Group } from 'three'
import * as THREE from "three"

export default class Sun extends Group {
  sun;
  solarflare
  starHalo
  starGlow

  sunUniforms
  haloUniforms
  solarflareUniforms
  coronaUniforms
  constructor(...arg:any) {
    super();

    this.name = 'sun'
    this.sun = new THREE.Object3D()

    let textureLoader = new THREE.TextureLoader(arg[0])

    //-----------------surface-------------------
    let sunTexture = textureLoader.load('assets/models/planet/sun/sun_surface.png')
    sunTexture.anisotropy = 8;
    sunTexture.wrapS = sunTexture.wrapT = THREE.RepeatWrapping;

    let sunColorLookupTexture = textureLoader.load('assets/models/planet/sun/star_colorshift.png')

    let starColorGraph = textureLoader.load('assets/models/planet/sun/star_color_modified.png')
    this.sunUniforms = {
      texturePrimary:   { type: "t", value: sunTexture },
      textureColor:   { type: "t", value: sunColorLookupTexture },
      textureSpectral: { type: "t", value: starColorGraph },
      time: 			{ type: "f", value: 0 },
      spectralLookup: { type: "f", value: 0 },		
    };

    var sunShaderMaterial = new THREE.ShaderMaterial( {
      uniforms: 		this.sunUniforms,
      vertexShader:   `varying vec2 vUv;
                        varying vec3 vNormal;
                        void main() {
                          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
                          vNormal = normalize( normalMatrix * normal );
                          vUv = uv;
                        }`,
      fragmentShader: `varying vec2 vUv;
                      varying vec3 vNormal;
                      uniform sampler2D texturePrimary;
                      uniform sampler2D textureColor;
                      uniform sampler2D textureSpectral;
                      uniform float time;
                      uniform float spectralLookup;
                      
                      void main() {
                        float uvMag = 2.0;
                        float paletteSpeed = 0.2;
                        float minLookup = 0.2;
                        float maxLookup = 0.98;
                      
                        //	let's double up on the texture to make the sun look more detailed
                        vec2 uv = vUv * uvMag;
                      
                        //	do a lookup for the texture now, but hold on to its gray value
                        vec3 colorIndex = texture2D( texturePrimary, uv ).xyz;
                        float lookupColor = colorIndex.x;
                      
                        //	now cycle the value, and clamp it, we're going to use this for a second lookup
                        lookupColor = fract( lookupColor - time * paletteSpeed );
                        lookupColor = clamp(lookupColor, minLookup, maxLookup );
                      
                        //	use the value found and find what color to use in a palette texture
                        vec2 lookupUV = vec2( lookupColor, 0. );
                        vec3 foundColor = texture2D( textureColor, lookupUV ).xyz;
                      
                        //	now do some color grading
                        foundColor.xyz *= 0.6;
                        foundColor.x = pow(foundColor.x, 2.);
                        foundColor.y = pow(foundColor.y, 2.);
                        foundColor.z = pow(foundColor.z, 2.);
                      
                        foundColor.xyz += vec3( 0.6, 0.6, 0.6 ) * 1.4;
                        //foundColor.xyz += vec3(0.6,0.35,0.21) * 2.2;
                      
                        float spectralLookupClamped = clamp( spectralLookup, 0., 1. );
                        vec2 spectralLookupUV = vec2( 0., spectralLookupClamped );
                        vec4 spectralColor = texture2D( textureSpectral, spectralLookupUV );	
                      
                        spectralColor.x = pow( spectralColor.x, 2. );
                        spectralColor.y = pow( spectralColor.y, 2. );
                        spectralColor.z = pow( spectralColor.z, 2. );
                      
                        foundColor.xyz *= spectralColor.xyz;	
                        
                      
                        //	apply a secondary, subtractive pass to give it more detail
                        //	first we get the uv and apply some warping
                        vec2 uv2 = vec2( vUv.x + cos(time) * 0.001, vUv.y + sin(time) * 0.001 );
                        vec3 secondaryColor = texture2D( texturePrimary, uv2 ).xyz;
                      
                        //	finally give it an outer rim to blow out the edges
                        float intensity = 1.15 - dot( vNormal, vec3( 0.0, 0.0, 0.3 ) );
                        vec3 outerGlow = vec3( 1.0, 0.8, 0.6 ) * pow( intensity, 6.0 );
                      
                        vec3 desiredColor = foundColor + outerGlow - secondaryColor;
                        float darkness = 1.0 - clamp( length( desiredColor ), 0., 1. );
                        vec3 colorCorrection = vec3(0.7, 0.4, 0.01) * pow(darkness,2.0) * secondaryColor;
                        desiredColor += colorCorrection;
                      
                        //	the final composite color
                        gl_FragColor = vec4( desiredColor, 1.0 );
                      }`,
    });

    const sunSurface = new THREE.Mesh(new THREE.SphereGeometry(1.0, 32, 32),  sunShaderMaterial)
    
    this.sun.add(sunSurface)

    //-----------------surflare-------------------
    let solarflareTexture = textureLoader.load('assets/models/planet/sun/solarflare.png')

    this.solarflareUniforms = {
      texturePrimary:   { type: "t", value: solarflareTexture },
      time: 			{ type: "f", value: 0 },
      textureSpectral: { type: "t", value: starColorGraph },
      spectralLookup: { type: "f", value: 0 },	
    };

    function makeSolarflare( uniforms:any ){
      var solarflareGeometry = new THREE.TorusGeometry( 1.02, .01, 60, 90, 0.15 + Math.PI  );
      var solarflareMaterial = new THREE.ShaderMaterial(
        {
          uniforms: 		uniforms,
          vertexShader:   `varying vec2 vUv;
                          varying vec3 vNormal;
                          uniform float time;
                          varying vec4 screenPosition;
                          
                          //
                          // Description : Array and textureless GLSL 2D simplex noise function.
                          //      Author : Ian McEwan, Ashima Arts.
                          //  Maintainer : ijm
                          //     Lastmod : 20110822 (ijm)
                          //     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
                          //               Distributed under the MIT License. See LICENSE file.
                          //               https://github.com/ashima/webgl-noise
                          //
                          
                          vec3 mod289(vec3 x) {
                            return x - floor(x * (1.0 / 289.0)) * 289.0;
                          }
                          
                          vec2 mod289(vec2 x) {
                            return x - floor(x * (1.0 / 289.0)) * 289.0;
                          }
                          
                          vec3 permute(vec3 x) {
                            return mod289(((x*34.0)+1.0)*x);
                          }
                          
                          float snoise(vec2 v)
                          {
                            const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                                                0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                                              -0.577350269189626,  // -1.0 + 2.0 * C.x
                                                0.024390243902439); // 1.0 / 41.0
                          // First corner
                            vec2 i  = floor(v + dot(v, C.yy) );
                            vec2 x0 = v -   i + dot(i, C.xx);
                          
                          // Other corners
                            vec2 i1;
                            //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0
                            //i1.y = 1.0 - i1.x;
                            i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
                            // x0 = x0 - 0.0 + 0.0 * C.xx ;
                            // x1 = x0 - i1 + 1.0 * C.xx ;
                            // x2 = x0 - 1.0 + 2.0 * C.xx ;
                            vec4 x12 = x0.xyxy + C.xxzz;
                            x12.xy -= i1;
                          
                          // Permutations
                            i = mod289(i); // Avoid truncation effects in permutation
                            vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                              + i.x + vec3(0.0, i1.x, 1.0 ));
                          
                            vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
                            m = m*m ;
                            m = m*m ;
                          
                          // Gradients: 41 points uniformly over a line, mapped onto a diamond.
                          // The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)
                          
                            vec3 x = 2.0 * fract(p * C.www) - 1.0;
                            vec3 h = abs(x) - 0.5;
                            vec3 ox = floor(x + 0.5);
                            vec3 a0 = x - ox;
                          
                          // Normalise gradients implicitly by scaling m
                          // Approximation of: m *= inversesqrt( a0*a0 + h*h );
                            m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
                          
                          // Compute final noise value at P
                            vec3 g;
                            g.x  = a0.x  * x0.x  + h.x  * x0.y;
                            g.yz = a0.yz * x12.xz + h.yz * x12.yw;
                            return 130.0 * dot(m, g);
                          }
                          
                          void main() {
                            float timeSample = time * 0.4;
                            vec3 heightOff = vec3( 	snoise( vec2(position.x * 60000000., timeSample) ),
                                        snoise( vec2(position.y * 60000000., timeSample) ),
                                        snoise( vec2(position.z * 60000000., timeSample) ) );
                            vec3 finalPosition = position + heightOff * 0.0000000015;
                            gl_Position = projectionMatrix * modelViewMatrix * vec4( finalPosition, 1.0 );
                            vUv = uv;
                            vNormal = normalize( normalMatrix * normal );
                            screenPosition = gl_Position;
                          }`,
          fragmentShader: `varying vec2 vUv;
                          varying vec3 vNormal;
                          uniform sampler2D texturePrimary;
                          varying vec4 screenPosition;
                          
                          uniform float spectralLookup;
                          uniform sampler2D textureSpectral;
                          
                          void main() {
                            vec2 uv = vUv;
                            // uv.y *= 2.;
                            uv.y -= 0.5;
                            uv.y = abs(uv.y);
                            // uv.x = 0.2 + uv.x * 0.4;
                            // uv.x = fract(uv.x * 2.);
                            vec3 colorIndex = texture2D( texturePrimary, uv ).xyz;
                          
                            float intensity = 1.45 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) ) * 2.0;
                            vec3 outerGlow = vec3( 1., 1., 1. ) * pow( intensity, 2.0 );
                          
                            float distanceToCenter = clamp(length( screenPosition.xyz ) - 0.45 ,0., 1.0);
                          
                            float spectralLookupClamped = clamp( spectralLookup, 0., 1. );
                            vec2 spectralLookupUV = vec2( 0., spectralLookupClamped );
                            vec4 spectralColor = texture2D( textureSpectral, spectralLookupUV );	
                          
                            spectralColor.x = pow( spectralColor.x, 3. );
                            spectralColor.y = pow( spectralColor.y, 3. );
                            spectralColor.z = pow( spectralColor.z, 3. );
                          
                            spectralColor.xyz *= 10.0;
                          
                            // gl_FragColor = vec4( distanceToCenter, 0., 0., 1.0 );
                            gl_FragColor = vec4( (colorIndex - pow(intensity,2.) * 0.1) * pow(distanceToCenter,3.) * spectralColor.xyz, 1.0 );
                          
                          }`,
          blending: THREE.AdditiveBlending,
          // color: 0xffffff,
          transparent: true,
          depthTest: true,
          depthWrite: false,
          polygonOffset: true,
          polygonOffsetFactor: -100,
          polygonOffsetUnits: 1000,
        }
      );
    
      let solarflareMesh = new THREE.Object3D();
    
      for( var i=0; i< 6; i++ ){
        var solarflare:any = new THREE.Mesh(solarflareGeometry, solarflareMaterial );
        solarflare.rotation.y = Math.PI/2;
        solarflare.speed = Math.random() * 0.01 + 0.005;
        solarflare.rotation.z = Math.PI * Math.random() * 2;
        solarflare.rotation.x = -Math.PI + Math.PI * 2;
        solarflare.update = function(){
          this.rotation.z += this.speed;
        }
        var solarflareContainer = new THREE.Object3D();
        solarflareContainer.position.x = -1 + Math.random() * 2;
        solarflareContainer.position.y = -1 + Math.random() * 2;
        solarflareContainer.position.z = -1 + Math.random() * 2;
        solarflareContainer.position.multiplyScalar( 7.35144e-8 * 0.8 );
        solarflareContainer.lookAt( new THREE.Vector3(0,0,0) );
        solarflareContainer.add( solarflare );
    
        solarflareMesh.add( solarflareContainer );
      }
    
      return solarflareMesh;
    }

    this.solarflare = makeSolarflare( this.solarflareUniforms )
    this.sun.add(this.solarflare)

    //------------------------------------
    let sunHaloTexture = textureLoader.load('assets/models/planet/sun/sun_halo.png')

    let sunHaloColorTexture = textureLoader.load('assets/models/planet/sun/halo_colorshift.png') 

    this.haloUniforms = {
      texturePrimary:   { type: "t", value: sunHaloTexture },
      textureColor:   { type: "t", value: sunHaloColorTexture },
      time: 			{ type: "f", value: 0 },
      textureSpectral: { type: "t", value: starColorGraph },
      spectralLookup: { type: "f", value: 0 },			
    };

    function makeStarHalo(uniforms: { texturePrimary: { type: string; value: THREE.Texture; }; textureColor: { type: string; value: THREE.Texture; }; time: { type: string; value: number; }; textureSpectral: { type: string; value: THREE.Texture; }; spectralLookup: { type: string; value: number; }; }){
      var sunHaloMaterial = new THREE.ShaderMaterial(
        {
          uniforms: 		uniforms,
          vertexShader:   `varying vec2 vUv;
                          void main() {
                            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
                            vUv = uv;
                          }`,
          fragmentShader: `varying vec2 vUv;
                          uniform sampler2D texturePrimary;
                          uniform sampler2D textureColor;
                          uniform float time;
                          
                          uniform float spectralLookup;
                          uniform sampler2D textureSpectral;
                          
                          void main() {
                            vec3 colorIndex = texture2D( texturePrimary, vUv ).xyz;
                            float lookupColor = colorIndex.x;
                            lookupColor = fract( lookupColor + time * 0.04 );
                            lookupColor = clamp(lookupColor,0.2,0.98);
                            vec2 lookupUV = vec2( lookupColor, 0. );
                            vec3 foundColor = texture2D( textureColor, lookupUV ).xyz;
                          
                            foundColor.xyz += 0.4;
                            foundColor *= 10.0;
                          
                            float spectralLookupClamped = clamp( spectralLookup, 0., 1. );
                            vec2 spectralLookupUV = vec2( 0., spectralLookupClamped );
                            vec4 spectralColor = texture2D( textureSpectral, spectralLookupUV );	
                          
                            spectralColor.x = pow( spectralColor.x, 3. );
                            spectralColor.y = pow( spectralColor.y, 3. );
                            spectralColor.z = pow( spectralColor.z, 3. );
                          
                            gl_FragColor = vec4( foundColor * colorIndex * spectralColor.xyz , 1.0 );
                          }`,
          blending: THREE.AdditiveBlending,
          depthTest: 		false,
          depthWrite: 	false,
          // color: 0xffffff,
          transparent: true,
          //	settings that prevent z fighting
          polygonOffset: true,
          polygonOffsetFactor: 1,
          polygonOffsetUnits: 100,
        }
      );

      var haloGeo = new THREE.PlaneGeometry( 1, 1);
      var sunHalo = new THREE.Mesh( haloGeo, sunHaloMaterial );
      // var sunHalo = new THREE.Sprite(  sunHaloMaterial );
      sunHalo.position.set( 0, 0, 0 );
      return sunHalo;
    }
    
    this.starHalo = makeStarHalo( this.haloUniforms )
    this.starHalo.scale.setScalar(2.9)
    this.sun.add(this.starHalo)

    //-------------------------------------
    let sunCoronaTexture = textureLoader.load('assets/models/planet/sun/corona.png') 

    this.coronaUniforms = {
      texturePrimary:   { type: "t", value: sunCoronaTexture },
      textureSpectral: { type: "t", value: starColorGraph },
      spectralLookup: { type: "f", value: 255 },			
    };
    
    function makeStarGlow(uniforms: { texturePrimary: { type: string; value: THREE.Texture; }; textureSpectral: { type: string; value: THREE.Texture; }; spectralLookup: { type: string; value: number; }; }){
      //	the bright glow surrounding everything
      var sunGlowMaterial = new THREE.ShaderMaterial(
        {
          //map: sunCoronaTexture,
          uniforms: 		uniforms,
          blending: THREE.AdditiveBlending,
          fragmentShader: `varying vec2 vUv;

                            uniform sampler2D texturePrimary;
                            
                            uniform float spectralLookup;
                            uniform sampler2D textureSpectral;
                            
                            void main() {
                              vec2 uv = vUv;
                              
                              vec4 foundColor = texture2D( texturePrimary, uv );
                              foundColor.x *= 1.4;
                              foundColor.y *= 1.2;
                              foundColor.z *= 0.7;
                              //foundColor.xyz *= 10.0;
                              foundColor = clamp( foundColor, 0., 1. );	
                            
                              float spectralLookupClamped = clamp( spectralLookup, 0., 1. );
                              vec2 spectralLookupUV = vec2( 0., spectralLookupClamped );
                              vec4 spectralColor = texture2D( textureSpectral, spectralLookupUV );	
                            
                              spectralColor.x = pow( spectralColor.x, 2. );
                              spectralColor.y = pow( spectralColor.y, 2. );
                              spectralColor.z = pow( spectralColor.z, 2. );
                            
                              spectralColor.xyz += 0.2;
                            
                              vec3 finalColor = clamp( foundColor.xyz * spectralColor.xyz * 1.4 , 0., 1.);
                            
                              gl_FragColor = vec4( finalColor, 1.0 );
                            
                            }`,
          vertexShader:   `varying vec2 vUv;
                            void main() {
                              gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
                              vUv = uv;
                            }`,
          // color: 0xffffff,
          transparent: true,
          //	settings that prevent z fighting
          polygonOffset: true,
          polygonOffsetFactor: -1,
          polygonOffsetUnits: 100,
          depthTest: true,
          depthWrite: true,
        }
      );
    
      var glowGeo = new THREE.PlaneGeometry( 1,1 );
      var sunGlow = new THREE.Mesh( glowGeo, sunGlowMaterial );
      // sunGlow.position.set( 0, 0, 0 );
      return sunGlow;
    }
    

    this.starGlow = makeStarGlow( this.coronaUniforms )
    this.starGlow.scale.setScalar(12)
    this.add(this.starGlow)

    this.add(this.sun)      

    const ambient = new THREE.AmbientLight( 0xffffff, 0.1 )
    this.sun.add(ambient)

    const light = new THREE.PointLight(0xffccaa, 3, 8, 2)
    this.sun.add(light)  

    this.setSpectralIndex(1.04)
  }
  setSpectralIndex( index: number ){
		var starColor = this.map( index, -0.3, 1.52, 0, 1);	
		starColor = this.constrain( starColor, 0.0, 1.0 );

		this.sunUniforms.spectralLookup.value = starColor;
		this.solarflareUniforms.spectralLookup.value = starColor;
		this.haloUniforms.spectralLookup.value = starColor;		
		this.coronaUniforms.spectralLookup.value = starColor;	
	}

  randomizeSolarFlare(){
		this.solarflare.rotation.x = Math.random() * Math.PI * 2;
		this.solarflare.rotation.y = Math.random() * Math.PI * 2;
	}

  map(v: number, i1: number, i2: number, o1: number, o2: number) {
    return o1 + (o2 - o1) * (v - i1) / (i2 - i1);
  }

  constrain(v: number, min: number, max: number){
    if( v < min )
      v = min;
    else
    if( v > max )
      v = max;
    return v;
  }

  update(time: number){
    
		this.sunUniforms.time.value = time;
		this.haloUniforms.time.value = time + 0.01;
		this.solarflareUniforms.time.value = time;
    // this.solarflare.rotateY(0.01)
    // this.solarflare.rotateX(0.01)
    // this.randomizeSolarFlare()
    this.solarflare.rotation.x = time*0.1
		this.solarflare.rotation.y = time*0.1
  }
}

