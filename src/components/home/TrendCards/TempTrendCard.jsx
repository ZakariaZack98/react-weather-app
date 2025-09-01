import React from 'react'
import TrendCurve from '../../common/TrendCurve';
import { useSelector } from 'react-redux';

const TempTrendCard = () => {
  const { hourlyForecastData, weatherDataNow } = useSelector(state => state.weather);
  const sampleData = hourlyForecastData?.slice(0, 5);
  const dataForCurve = {
    labels: sampleData?.map(hourlyData => hourlyData?.dt_txt?.split(' ')[1]),
    data: sampleData?.map(hourlyData => hourlyData?.main?.temp),
  }
  const currentTemp = Math.round(weatherDataNow?.main?.temp);

  //TODO: GET A TEMP TREND BASED ON FUTURE TEMPERATURE DATA
  const getTempTrend = () => {
    if(Math.round(sampleData[sampleData.length - 2]?.main?.temp) > currentTemp) {
      return 'will be rising'
    } else if (Math.round(sampleData[sampleData.length - 2]?.main?.temp) === currentTemp) {
      return 'will be steady'
    } else return 'will be declining'
  }


  return (
    <div className='min-h-75 p-4 flex flex-col gap-y-3 justify-between rounded-xl surface-card'>
      <h1 className='font-semibold'>Temperature</h1>
      <TrendCurve data={dataForCurve} curveColor={'#d4ff17'} min={0} max={45} fill={true} maintainAspectRatio={true}/>
      <div className="textSec">
        <div className="flex items-center gap-x-2">
          <p className='font-semibold'>{currentTemp}° Celcius</p>
          <span className={`h-5 w-5 rounded-full ${currentTemp < 10 ? 'bg-blue-400' : currentTemp < 34 ? 'bg-green-700' : currentTemp < 42 ? 'bg-yellow-500' : 'bg-red-500'}`}></span>
        </div>
        <p className='text-[13px] mt-2'>Current temperature is <strong>{currentTemp}°</strong> Celcius. Temperature <strong>{getTempTrend()}</strong> for next few hours.</p>
      </div>
    </div>
  )
}

export default TempTrendCard