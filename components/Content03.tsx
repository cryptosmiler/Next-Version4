import { useState, useEffect } from "react";
import {gsap} from 'gsap'

const Content03 = (props:any) => {

  return (
    <div id="content03" className="absolute -z-10 top-0 left-0 w-screen h-screen pointer-events-auto opacity-0 text-[#FFFAFA]">
      <div className="w-screen h-screen flex justify-center items-center bg-black bg-opacity-20">
        <div className="text-shadow1 px-4">
            <div className="mb-16 text-[30px] md:text-[50px] md:leading-[30px] text-center">
              My Skills
            </div>
            <div className="text-[16px] leading-[20px] md:text-[24px] md:leading-[30px]">
              <div className='py-2'>JavaScript, TypeScript, Python, C++, PHP</div>
              <div className='py-2'>HTML/HTML5, CSS/SCSS, TailwindCSS</div>
              <div className='py-2'>React, Next.js, Vue.js, Nuxt.js</div>
              <div className='py-2'>Graphics : Canvas, SVG, WebGL, GLSL, Three.js, Chart.js</div>
              <div className='py-2'>Web Animation : Greensock(GSAP), React Motion</div>
              <div className='py-2'>Backend : Express, Django, Flask, Laravel</div>
              <div className='py-2'>DataBase : MySQL, MongoDB, PostgreSQL, FireBase</div>
              <div className='py-2'>
                BlockChain : <br/>Tokenomics(Minting, Presale, Public Sale, Staking, Loan),<br/>
                NFT(Minting, Presale, Public Sale, Royalty, Rarity, Metaverse),<br/>
                Smart Contract(Solidty, Rust, C++, Golang),<br/>
                Frontend(Web3.js), Marketplace, Dex</div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Content03