import { useState, useEffect } from "react";
const Loading = (props:any) => {

  const [loaded, setLoaded] = useState(false)

  useEffect(()=>{
    if(props.value === 100){
      setTimeout(()=>{
        setLoaded(true)
      }, 1000)
    }
  },[props.value])

  

  return (
    <div className="absolute z-50 top-0 left-0 w-screen h-screen "  style={{display:loaded?'none':'block'}}>
      <div className="w-screen h-screen bg-black flex justify-center items-center">
        <div className="w-[320px] overflow-hidden container3">
          <span id="loading" className="-ml-[90px]">
            <ul>
              <li>L</li>
              <li>O</li>
              <li>A</li>
              <li>D</li>
              <li>I</li>
              <li>N</li>
              <li>G</li>
            </ul>
            <span id="loadingMask" ></span>
          </span>

          <div className="bg-gray-200 rounded-full h-2.5 mt-8" id="loadingbar">
            <div className="bg-[#fff900] h-2.5 rounded-full" style={{width:`${props.value}%`, marginTop:"100px" }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading