import React from 'react'
import LineChart from '../common/LineChart';
import BarChart from '../common/BarChart';
import WindDirectionIcon from '../common/WindDirectionIcon';

const Chart = ({ data, activeMode }) => {
  return (
    <div className="chartSec p-4 rounded-xl bg-[#3e5063] w-full h-fit -translate-y-3">
      <p className='font-semibold mb-3 h-[5%]'>{activeMode}</p>
      <div className="iconLine h-[10%] flex justify-between items-center px-6 border border-[rgba(255,255,255,0.14)] pb-2 pt-4 rounded-t-xl">
        {
          data?.data?.map(hourlyData => (
            <div key={hourlyData.dt} className='flex flex-col justify-center items-center'>
              {
                activeMode === 'Wind' ? (<WindDirectionIcon size={25} deg={hourlyData?.wind?.deg}/>) : (
                  <picture>
                    <img src={`https://openweathermap.org/img/wn/${hourlyData?.weather[0]?.icon}@2x.png`} alt="" className='h-10 scale-200' />
                  </picture>
                )
              }
              {
                activeMode === 'Wind' ? <p className='text-sm pt-3'>{hourlyData?.wind?.speed}km/h</p> : <p className='text-sm'>{Math.round(hourlyData.main.temp)}°c</p>
              }
            </div>
          ))
        }
      </div>
      <div className="w-full h-[40dvh] px-5 border border-[rgba(255,255,255,0.14)] p-2 rounded-b-xl">
        {
          activeMode === 'Precipitation' || activeMode === 'Cloud Cover' ? <BarChart hourlyDataset={data?.data} activeMode={activeMode} /> : <LineChart hourlyDataset={data?.data} activeMode={activeMode} />
        }
      </div>
    </div>
  )
}

export default Chart