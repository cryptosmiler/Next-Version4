import { useState, useEffect } from "react";
import Item from "./portfolio/Item";
import Link from "next/link";

import {gsap} from 'gsap'

const Content04 = (props:any) => {
  const [focusItem, setFocusItem] = useState({
      'title':'3D NFT Web', 
      'url':'assets/images/portfolio/desolate.png',
      'link':'https://www.desolate.space/',
      'details':'React, Next.js, TypeScript, Three.js, Tailwind CSS, Solana, Web3.js',
      'id':0
  })

  const changeItem = (value:any) =>{
    const focusContainer = document.getElementById('focus-item')
    gsap.fromTo(focusContainer, 0.3, {x:0}, {x:-1500})
    gsap.fromTo(focusContainer, 0.3, {x:1500}, {x:0, delay:0.4, ease:"expo.out"})
    setTimeout(()=>{
      setFocusItem(value)
    },300)
  }

  return (
    <div id="content04" 
      className="absolute -z-10 top-0 left-0 w-screen h-screen pointer-events-auto opacity-0 text-[#FFFAFA]
        bg-gradient-to-b from-indigo-500 to-[#52ddf5] bg-fixed"
      style={{backgroundImage:"url('assets/images/back4.jpg')", backgroundRepeat: 'no-repeat'}}
    >
      <div className="w-screen h-screen overflow-hidden bg-gray-900 bg-opacity-80 p-8">
        <div className="h-[10%] md:h-[15%] flex justify-center items-end">
          <div className="text-center text-[35px] md:text-[50px] text-light-shadow mb-4 md:mb-0">MY Portfolio</div>
        </div>

        <div className="h-[90%] flex justify-center items-center">
          <div className="main_box ">
              <div className="img img1">
                <div className="alink">
                  <Link href={'https://www.desolate.space/'}>
                    <a target={'_blank'}>
                      <p className="text-[30px]">3D Metaverse</p>
                      React, Next.js, TypeScript, Three.js, Tailwind CSS, Solana, Web3.js<br/>
                      https://www.desolate.space
                    </a>
                  </Link>
                </div>
              </div>

              <div className="img img2">
                <div className="alink">
                  <Link href={'https://bluejestic.com'}>
                    <a target={'_blank'}>
                      <p className="text-[30px]">Social Marketing</p>
                      Next.js, Three.js, GreenSock, Tailwind CSS, TypeScript<br/>
                      https://bluejestic.com
                    </a>
                  </Link>
                </div>
              </div>

              <div className="img img3">
                <div className="alink">
                  <Link href={'https://campoallecomete.vercel.app'}>
                    <a target={'_blank'}>
                      <p className="text-[30px]">Web 3D</p>
                      Next.js, Three.js, GreenSock, Tailwind CSS, TypeScript<br/>
                      https://campoallecomete.vercel.app
                    </a>
                  </Link>
                </div>
              </div>

              <div className="img img4">
                <div className="alink">
                  <Link href={'https://webvr-showroom.vercel.app'}>
                    <a target={'_blank'}>
                      <p className="text-[30px]">WebVR</p>
                      React, Next.js, Tailwind CSS, WebGL, Three.js<br/>
                      https://webvr-showroom.vercel.app
                    </a>
                  </Link>
                </div>
              </div>

              <div className="img img6">
                <div className="alink">
                  <Link href={'https://dex.leonicornswap.com/'}>
                    <a target={'_blank'}>
                      <p className="text-[30px]">Blockchain</p>
                      React, Solidity, Web3.js, NFT<br/>
                      https://dex.leonicornswap.com
                    </a>
                  </Link>
                </div>
              </div>

              <div className="img img7">
                <div className="alink">
                  <Link href={'https://www.oppo.com/en/events/innoday2021/'}>
                    <a target={'_blank'}>
                      <p className="text-[30px]">360 degree Viewer</p>
                      React, Three.js, GreenSock, Tailwind CSS<br/>
                      https://www.oppo.com/en/events/innoday2021/                    </a>
                  </Link>
                </div>
              </div>

              <div className="img img8">
                <div className="alink">
                  <Link href={'https://test.momnpophub.com/'}>
                    <a target={'_blank'}>
                      <p className="text-[30px]">MERN Stack</p>
                      React, Redux, Express.js, MongoDB<br/>
                      https://test.momnpophub.com
                    </a>
                  </Link>
                </div>
              </div>

              <div className="img img10">
                <div className="alink">
                  <Link href={'https://jin-redmi-showroom.vercel.app/'}>
                    <a target={'_blank'}>
                      <p className="text-[30px]">Web Showroom</p>
                      WebGL, Three.js, WebSocket, React, GraphQL<br/>
                      https://jin-redmi-showroom.vercel.app/
                    </a>
                  </Link>
                </div>
              </div>

              <div className="img img11">
                <div className="alink">
                  <Link href={'https://exante.eu/'}>
                    <a target={'_blank'}>
                      <p className="text-[30px]">Backend API</p>
                      Python Django<br/>
                      https://exante.eu
                    </a>
                  </Link>
                </div>
              </div>

              <div className="img img12">
                <div className="alink">
                  <Link href={'https://www.journalflow.com/'}>
                    <a target={'_blank'}>
                      <p className="text-[30px]">Frontend UI</p>
                      Vue.js, Nuxt.js, SCSS<br/>
                      https://www.journalflow.com
                    </a>
                  </Link>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Content04