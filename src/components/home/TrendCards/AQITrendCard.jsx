import React, { useContext } from 'react'
import { WeatherContext } from '../../../contexts/WeatherContext'
import { GetAQICategory } from '../../../utils/utils';
import { TwoThirdsCircularProgressBar } from '../../common/SemiCircularProgressbar';

const AQITrendCard = () => {
  const { aqiData } = useContext(WeatherContext);
  const AQIndex = aqiData?.main?.aqi;
  const AQDetails = GetAQICategory(AQIndex);

  return (
    <div className='min-h-75 p-4 flex flex-col gap-y-3 justify-between rounded-xl glass-effect'>
      <h1 className='font-semibold'>Air Quality</h1>
      <div className="div flex justify-center items-center h-1/2 relative">
        <div className="h-35">
          <TwoThirdsCircularProgressBar value={AQIndex} max={5} size={150} />
        </div>
        <div className="absolute flex flex-col items-center gap-y-1">
          <h1 className='text-3xl font-semibold'>{AQIndex}</h1>
          <div style={{ backgroundColor: AQDetails.color }} className={`px-2 py-1 text-sm rounded-xl ${AQIndex === 2 ? 'text-black' : 'text-white'}`}>{AQDetails.level}</div>
        </div>
      </div>
      <div className="textSec">
        <div className="flex items-center gap-x-2">
          <p className='font-semibold'>{AQDetails.level}</p>
          <span className='h-5 w-5 rounded-full' style={{ backgroundColor: AQDetails.color }}></span>
        </div>
        <p className='text-[13px] mt-2'>{AQDetails.advice}</p>
      </div>
    </div>
  )
}

export default AQITrendCard