import React from 'react'

const DayCard = ({foreCastData}) => {
  return (
    <div className='w-1/5 bg-[#495867] py-5 px-7 rounded-xl flex flex-col gap-y-4 cursor-pointer'>
      <div className="date flex justify-between items-center">
        <p className="date text-2xl font-semibold">14</p>
        <p>Sunday</p>
      </div>
      <div className="iconAndDate flex justify-between items-stretch">
        <picture>
          <img src={`https://openweathermap.org/img/wn/04n@2x.png`} alt="" className='h-20 scale-125'/>
        </picture>
        <div className="temp flex flex-col">
          <p className='text-2xl font-semibold'>40°c</p>
          <p className='text-2xl font-semibold opacity-70'>33°c</p>
        </div>
      </div>
    </div>
  )
}

export default DayCard