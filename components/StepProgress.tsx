const StepProgress = (props:any) => {

  return (
    <div className="absolute bottom-0 left-0 w-screen" style={{zIndex:3000}}>
      <div className="w-full bg-purple-600 h-2.5">
        <div id="step-progress" className="bg-gray-200 h-2.5 w-full"></div>
      </div>
    </div>
  )
}

export default StepProgress