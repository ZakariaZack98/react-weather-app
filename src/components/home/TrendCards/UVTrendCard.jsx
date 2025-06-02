import React, { useContext } from 'react'
import { SemiCircularProgressBar, TwoThirdsCircularProgressBar }from '../../common/SemiCircularProgressbar'
import { WeatherContext } from '../../../contexts/WeatherContext'

const UVTrendCard = () => {
  const {uvData} = useContext(WeatherContext);
  const uvIndex = uvData?.value;

  //* HELPER FUNCTION TO GET UV DETAILS 
  const getUVDetails = (uvi) => {
    if (uvi <= 2) return {
      level: 'Low',
      color: '#4CAF50',
      advice: 'Safe - No protection needed',
      gradientStop: '15%'
    };
    if (uvi <= 5) return {
      level: 'Moderate',
      color: '#FFC107',
      advice: 'Moderate - Wear sunscreen',
      gradientStop: '35%'
    };
    if (uvi <= 7) return {
      level: 'High',
      color: '#FF9800',
      advice: 'High - Protection required',
      gradientStop: '60%'
    };
    if (uvi <= 10) return {
      level: 'Very High',
      color: '#F44336',
      advice: 'Very High - Extra precautions',
      gradientStop: '85%'
    };
    return {
      level: 'Extreme',
      color: '#9C27B0',
      advice: 'Extreme - Avoid sun exposure',
      gradientStop: '100%'
    };
  };

  const uvDetails = getUVDetails(uvIndex)

  return (
    <div className='min-h-75 p-4 flex flex-col gap-y-3 justify-between rounded-xl surface-card'>
      <h1 className='font-semibold'>UV</h1>
      <div className="div flex justify-center items-center h-25 relative">
        <TwoThirdsCircularProgressBar value={uvIndex} max={14} size={150}/>
        <div className="absolute flex flex-col items-center gap-y-1">
          <h1 className='text-3xl font-semibold'>{uvIndex}</h1>
          <div style={{backgroundColor: uvDetails.color}} className={`px-2 py-1 text-sm rounded-xl`}>{uvDetails.level}</div>
        </div>
      </div>
      <div className="textSec">
        <div className="flex items-center gap-x-2">
          <p className='font-semibold'>{uvDetails.advice}</p>
        </div>
        <p className='text-[13px] mt-2'>UV likely to hit peak today at <strong>late-noon.</strong> Don't forget to wear sunscreen & stay in shade.</p>
      </div>
    </div>
  )
}

export default UVTrendCard