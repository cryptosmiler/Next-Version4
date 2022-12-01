import { useState, useEffect } from "react";

const Content01 = (props:any) => {
  return (
    <div id="content01" className="absolute z-10 top-0 left-0 w-screen h-screen pointer-events-none opacity-0">
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="text-[25px] leading-[30px] md:text-[30px] md:leading-[45px] xl:text-[50px] xl:leading-[60px]
           font-medium text-[#f5dc8b] text-shadow1 text-center px-4">
          <div className="mt-80 md:mt-20 w-fit mx-auto">
            <span className="text-[40px] md:text-[50px] xl:text-[70px] font-bold text-[#f5dc8b]">I’m</span>
            <span className="text-[50px] md:text-[70px] xl:text-[90px] font-bold text-[#FFFFFF]"> Jason Lee</span>
          </div>
          <div className="mt-12 text-[#f5dc8b]">
          Singapore University <br className="md:hidden"/> of Technology & Design
          </div>
          <div className="pl-4 text-[#FFFEFE]">2007 ~ 2011</div>
          <div className="text-[#FFFEFE] mt-6">
            Studied mathematics and computer science.<br/>
            Have been awarded Bachelor’s degree
          </div>
        </div>
      </div>
    </div>
  )
}

export default Content01