import React from 'react'

const Chart = ({ data, activeMode }) => {
  const tempRange = [0, 10, 20, 30, 40, 50];
  return (
    <div className="chartSec p-4 rounded-xl bg-[#3e5063] w-full h-[50dvh] -translate-y-3">
      <p className='font-semibold mb-3'>{activeMode}</p>
      {
        activeMode === 'Overview' && (
          <div className="mainChart h-[85%] w-full flex">
            <div className="yValue flex flex-col  font-light w-[5%] border border-[rgba(255,255,255,0.17)] rounded-s-xl">
              <div className="unitDetails h-[25%] flex justify-center items-center text-center">
                <p>Temp (°c)</p>
              </div>
              <div className="units flex flex-col justify-between items-center h-[75%]">
              {
                tempRange?.reverse().map(temp => <p key={temp}>{temp}</p>)
              }
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