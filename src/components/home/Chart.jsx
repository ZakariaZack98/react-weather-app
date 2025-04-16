import React from 'react'
import { ConvertTo12Hour } from '../../utils/utils';

const Chart = ({ data, activeMode }) => {
  const tempRange = [0, 10, 20, 30, 40, 50];
  return (
    <div className="chartSec p-4 rounded-xl bg-[#3e5063] w-full h-[50dvh] -translate-y-3">
      <p className='font-semibold mb-3'>{activeMode}</p>
      {
        activeMode === 'Overview' && (
          <div className="mainChart h-[85%] w-full flex">
            <div className="yValue flex flex-col  font-light w-[5%] border border-[rgba(255,255,255,0.17)] rounded-s-xl">
              <div className="unitDetails h-1/4 flex justify-center items-center text-center">
                <p>Temp (°c)</p>
              </div>
              <div className="units flex flex-col justify-between items-center h-3/4">
              {
                tempRange?.reverse().map(temp => <p key={temp}>{temp}</p>)
              }
              </div>
            </div>
            <div className="visualizer w-[95%] h-full border border-[rgba(255,255,255,0.17)] rounded-e-xl">
              <div className="hourlyIcons h-1/4 flex justify-around items-center">
                {
                  data?.data?.map(hourlyData => (
                    <div key={hourlyData?.dt} className='flex flex-col justify-center items-center'>
                      <p className="text-sm">{ConvertTo12Hour(hourlyData?.dt_txt?.split(' ')[1])}</p>
                      <img src={`https://openweathermap.org/img/wn/${hourlyData?.weather[0]?.icon}@2x.png`} alt="" className='h-10 scale-150'/>
                      <p className="text-sm">{Math.round(hourlyData?.main?.temp)}°c</p>
                    </div>
                  ))
                }
              </div>
              <div className="h-3/4"></div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Chart