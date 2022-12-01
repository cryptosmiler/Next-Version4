import { useState, useEffect } from "react";

const Content02 = (props:any) => {
  return (
    <div id="content02" className="absolute z-10 top-0 left-0 w-screen h-screen pointer-events-none opacity-0">
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="text-[32px] leading-[35px] md:text-[40px] md:leading-[50px] xl:text-[75px] xl:leading-[70px]
          font-medium text-[#FFFEFE] text-shadow1 w-fit mx-auto px-8 max-w-[390px] md:max-w-[768px] xl:max-w-[1200px]"
        >
          <div className="mt-20 w-fit mx-auto text-[#f5dc8b]">
            Full Stack Developer
          </div>

          <div className="mt-8 md:mt-20 w-fit mx-auto text-[22px] leading-[30px] md:text-[40px] md:leading-[50px]">
            My projects include Blog, Web App, WebVR, WebAR, 360 degree Viewer, Game, API Development, BlockChain, etc.
          </div>

          <div className="mt-6 md:mt-8 grid grid-cols-2 md:grid-cols-4 text-[20px]">
        
            <div className="green mx-1 sm:mx-auto">
              <div className="text-center mb-2">Frontend</div>     
              <div className="progress">
                <div className="inner">
                  <div className="percent">95%</div>
                  <div className="water top-[15px]"></div>
                  <div className="glare"></div>
                </div>
              </div>
            </div>
            
            <div className="red mx-1 sm:mx-auto">
              <div className="text-center mb-2">Backend</div>     
              <div className="progress">
                <div className="inner">
                  <div className="percent">80%</div>
                  <div className="water top-[35px]"></div>
                  <div className="glare"></div>
                </div>
              </div>
            </div>
            
            <div className="orange mx-1 sm:mx-auto">       
              <div className="text-center mb-2">BlockChain</div>     
              <div className="progress">
                <div className="inner">
                  <div className="percent">90%</div>
                  <div className="water top-[20px]"></div>
                  <div className="glare"></div>
                </div>
              </div>
            </div>
            
            <div className="blue mx-1 sm:mx-auto">       
              <div className="text-center mb-2">Graphic</div>     
              <div className="progress">
                <div className="inner">
                  <div className="percent">95%</div>
                  <div className="water top-[15px]"></div>
                  <div className="glare"></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Content02