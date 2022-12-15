import { useState, useEffect } from "react";
import Image from "next/image";
const Content01 = (props:any) => {
  return (
    <div id="content01" className="absolute z-10 top-0 left-0 w-screen h-screen pointer-events-none opacity-0">
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="text-[25px] leading-[30px] md:text-[30px] md:leading-[45px] xl:text-[50px] xl:leading-[60px]
           font-medium text-[#f5dc8b] text-shadow1 text-left px-4 pointer-events-auto">
            <div id='container '>
              <Image src="/assets/images/hi (2).gif" width="140" height="140" alt="gif" />
            </div>
          <div className="mt-80 md:mt-20 w-fit mx-auto">
            <p>
              <span className="text-[50px] md:text-[70px] xl:text-[90px] font-bold text-[#f5dc8b]"> Brilliant Developer</span>
            </p>
              <div className="flowtext mt-24 text-[#f5dc8b]">
              <div className="flowtext__container">
                <p className="flowtext__container__text">
                  Specialized in
                </p>
                
                <ul className="flowtext__container__list">
                  <li className="flowtext__container__list__item">MERN | MEAN</li>
                  <li className="flowtext__container__list__item">Solidity | Smart Contract</li>
                  <li className="flowtext__container__list__item">React Native | Flutter</li>
                </ul>
              </div>

            </div>
          </div>
          
          {/* <div className="mt-12 text-[#f5dc8b]">
           <br className="md:hidden"/>
          </div> */}

        </div>
      </div>
    </div>
  )
}

export default Content01