import { useState, useEffect } from "react";
import Image from "next/image";
const Content00 = (props:any) => {
  return (
    <div id="content00" className="absolute z-10 top-0 left-0 w-screen h-screen pointer-events-none opacity-0">
      <div className="w-full max-w-[1440px] mx-auto h-screen flex justify-center items-center">
        <div className="text-[30px] md:text-[60px] xl:text-[120px] font-medium text-[#FFFAFA] text-shadow1 text-center">
          
            Welcome to my portfolio
          
        </div>
      </div>
      <div className='absolute left-0 w-full -bottom-2 '>
        <div className="mx-auto w-[140px]">
          <Image src="/assets/images/scroll.gif" width="140" height="140" alt="gif"/>
        </div>
        <div className="text-center text-[#FFFAFA] text-shadow1 -mt-10 pb-8">Scroll Down</div>
      </div>
    </div>
  )
}

export default Content00