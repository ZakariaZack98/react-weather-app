import React, { useContext } from 'react'
import { WeatherContext } from '../../../contexts/WeatherContext';
import TrendCurve from '../../common/TrendCurve';

const FeelsLikeTrendCard = () => {
  const { hourlyForecastData, weatherDataNow } = useContext(WeatherContext);
  const sampleData = hourlyForecastData?.slice(0, 5);
  const dataForCurve = {
    labels: sampleData?.map(hourlyData => hourlyData?.dt_txt?.split(' ')[1]),
    data: sampleData?.map(hourlyData => hourlyData?.main?.feels_like),
  }
  const currentFeelTemp = Math.round(weatherDataNow?.main?.feels_like);
  const currentRealTemp = Math.round(weatherDataNow?.main?.temp)

  const getFeelTrend = () => {
    if(currentFeelTemp > currentRealTemp) {
      return 'Warmer than'
    } else if (currentFeelTemp < currentRealTemp) {
      return 'Cooler than'
    } else return 'Similiar as'
  }

  return (
    <div className='min-h-75 p-4 flex flex-col gap-y-3 justify-between rounded-xl surface-card'>
      <h1 className='font-semibold'>Feels Like</h1>
      <div className='h-25 w-full'>
      <TrendCurve data={dataForCurve} curveColor={'#fcba03'} min={Math.min(...sampleData.map(hourlyData => hourlyData?.main?.feels_like)) - 5} max={Math.max(...sampleData.map(hourlyData => hourlyData?.main?.feels_like)) + 5} ascpectMaintain={false}/>
      </div>
      <div className="textSec">
        <div className="flex items-center gap-x-2">
          <p className='font-semibold'>Feels like <span className='2xl:text-3xl lg:text-sm'>{currentFeelTemp}°</span> celcius</p>
          <span className={`h-5 w-5 rounded-full ${currentFeelTemp < 10 ? 'bg-blue-400' : currentFeelTemp < 32 ? 'bg-green-700' : currentFeelTemp < 42 ? 'bg-yellow-500' : 'bg-red-500'}`}></span>
        </div>
        <p className='font-semibold'>Actual temperature <span className='2xl:text-3xl lg:text-sm'>{currentRealTemp}°</span> celcius</p>
        <p className='text-[13px] mt-2'>Feels {getFeelTrend().toLowerCase()} the actual temperature due to the {getFeelTrend().includes('Cooler') ? 'wind' : 'humidity'}.</p>
      </div>
    </div>
  )
}

export default FeelsLikeTrendCard