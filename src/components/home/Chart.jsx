import React from 'react'
import LineChart from '../common/LineChart';

const Chart = ({ data, activeMode }) => {
  return (
    <div className="chartSec p-4 rounded-xl bg-[#3e5063] w-full h-[50dvh] -translate-y-3">
      <p className='font-semibold mb-3 h-[5%]'>{activeMode}</p>
      <div className="w-full h-[95%] px-5">
      <LineChart hourlyDataset={data.data} activeMode={activeMode}/>
      </div>
    </div>
  )
}

export default Chart