import React from 'react'

const Chart = ({data, activeMode}) => {
  return (
    <div className="chart p-4 rounded-xl bg-[#3e5063] w-full h-[50dvh] -translate-y-3">
      <p className='font-semibold'>{activeMode}</p>
    </div>
  )
}

export default Chart