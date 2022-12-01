import { useState, useEffect } from "react";

const Item = (props:any) => {
  return (
    <div className="mx-1 p-0.5 rounded-full md:rounded-none bg-gradient-to-r from-[#9f05ff] to-[#05eeff] flex items-center">
      <button onClick={()=>{props.changeItem(props.content)}}>
        <img src={props.content.url} className='hidden md:block' />
        <div className={props.select===props.content.id?"md:hidden w-4 h-4 rounded-full bg-slate-500":"md:hidden w-4 h-4 rounded-full bg-white"}/>
      </button>
    </div>
  )
}

export default Item