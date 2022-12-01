import { useState, useEffect } from "react";
const Loading = (props:any) => {

  const [loaded, setLoaded] = useState(false)

  useEffect(()=>{
    if(props.value === 100){
      setTimeout(()=>{
        setLoaded(true)
      }, 500)
    }
  },[props.value])

  const styles  = {
    loading:{
      display:'flex',      
      width:'500px',
      position:'relative',
      alignItemm:'center'
    },
    p: {
      padding:'0',
      margin:'0 auto',
      resize:'none',
      overflow: 'hidden',
      fontFamily:'tahoma, serif',
      backgroundColor: 'transparent',
      border:'0',
      fontWeight:'700',
      color:'#e09d44',
      fontSize:'50px',
      textAlign:'center',
      // textShadow: '-2px -2px 1px #222, -1px -1px 1px #222, 1px 1px 1px #444, 2px 2px 0 #444, 3px 3px 0 #444, 4px 4px 0 #444, 5px 5px 0 #444'
    },
    loadingMask:{
      display:'block',
      position:'absolute',
      top:0, 
      width:'100px',
      height:'100%',
      backgroundColor:'#000',
      WebkitTransform: 'skew(-20deg)',
      MozTransform: 'skew(-20deg)',
      OTransform: 'skew(-20deg)',
      msTransform: 'skew(-20deg)',
      margin:'0 0 0 0px',
      transform:'skew(-20deg)',

      WebkitAnimation: 'maskMove 1s ease-out 0s infinite',
      MozAnimation:  'maskMove 1s ease-out 0s infinite',
      OAnimation: 'maskMove 1s ease-out 0s infinite',
      msAnimation:  'maskMove 1s ease-out 0s infinite',
      animation:  'maskMove 1s ease-out 0s infinite',
    },
  } as const;

  return (
    <div className="absolute z-50 top-0 left-0 w-screen h-screen "  style={{display:loaded?'none':'block'}}>
      <div className="w-screen h-screen bg-black flex justify-center items-center">
        <div className="w-[320px] overflow-hidden">
          <span id="loading" className="-ml-[90px]" style={styles.loading}>
            <p style = {styles.p}>Portfolio</p>
            <span id="loadingMask" style = {styles.loadingMask}></span>
          </span>

          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-8">
            <div className="bg-[#e09d44] h-2.5 rounded-full" style={{width:`${props.value}%`}}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading