import React, { useContext } from 'react'
import { WeatherContext } from '../../contexts/WeatherContext'

const TrendCardTyp1 = ({title, curveData, curveType, displayData}) => {
  const {hourlyForecastData} = useContext(WeatherContext);
  return (
    <div className='w-[25%] h-[18%] p-4 rounded-xl bg-[rgba(255,255,255,0.06)]'>
      <h1 className='text-sm'>Temperature</h1>
      
    </div>
  )
}

export default TrendCardTyp1