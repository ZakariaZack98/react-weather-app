import React from 'react'

const Chart = ({ data, activeMode }) => {
  return (
    <div className="chartSec p-4 rounded-xl bg-[#3e5063] w-full h-[50dvh] -translate-y-3">
      <p className='font-semibold'>{activeMode}</p>
      {
        activeMode === 'Overview' && (
          <div className="mainChart h-[90%] w-full flex">
            <div className="yValue flex flex-col  font-light w-[5%] border border-[rgba(255,255,255,0.17)] rounded-s-xl">
              <div className="unitDetails h-[25%] flex justify-center items-center text-center">
                <p>Temp (°c)</p>
              </div>
              <div className="units flex flex-col justify-between items-center h-[75%]">
              <p>50°c</p>
              <p>40°c</p>
              <p>30°c</p>
              <p>20°c</p>
              <p>10°c</p>
              <p>0°c</p>
              </div>
            </div>
            <div className="visualizer w-[95%] h-full border border-[rgba(255,255,255,0.17)] rounded-e-xl">

            </div>
          </div>
        )
      }
    </div>
  )
}

export default Chart