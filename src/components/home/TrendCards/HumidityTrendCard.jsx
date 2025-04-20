import React, { useContext } from 'react'
import ProgressBar from '../../common/ProgressBar'
import { WeatherContext } from '../../../contexts/WeatherContext'
import { ConvertTo12Hour } from '../../../utils/utils';

const HumidityTrendCard = () => {
  const { hourlyForecastData, weatherDataNow } = useContext(WeatherContext);
  const sampleData = hourlyForecastData?.slice(2, 10);
  const humidityData = sampleData?.map(hourlyData => hourlyData?.main?.humidity);
  const currentHumidity = weatherDataNow?.main?.humidity;
  const maxHumidity = Math.max(...humidityData);
  const maxHumidTime = ConvertTo12Hour(sampleData?.find(hourlyData => hourlyData?.main?.humidity === maxHumidity).dt_txt.split(' ')[1]);

  return (
    <div className='w-[24%] h-75 p-4 flex flex-col gap-y-3 justify-between rounded-xl bg-[rgba(255,255,255,0.06)] text-sm'>
      <h1 className='font-semibold text-lg'>Humidity</h1>
      <div className="chartSec flex items-center gap-x-6 h-3/5">
        <div className="w-[50%] flex h-3/4 gap-x-2">
          {
            humidityData?.map((humidity, idx) => <ProgressBar key={idx} maxValue={100} inputValue={humidity} color='rgb(24, 194, 201)' />)
          }
        </div>
        <div className="chartTexts w-1/2 flex flex-col gap-y-2">
          <div className="flex flex-col">
            <h1 className="text-3xl">{currentHumidity}%</h1>
            <p className="text-sm">Current humidity</p>
          </div>
          <div className="flex flex-col">
            <h1 className="text-3xl">{maxHumidity}%</h1>
            <p className="text-sm">Max humidity</p>
          </div>
        </div>
      </div>
      <div className="bottomTexts flex flex-col gap-y-2">
        <div className="flex items-center gap-x-2">
          <p className='font-semibold'>{
            currentHumidity >= 70 ? 'Very Humid' : currentHumidity >= 40 ? 'Humid' : 'Normal'
          }</p>
          <span className={`h-5 w-5 rounded-full ${currentHumidity >= 70 ? 'bg-orange-500' : currentHumidity >= 40 ? 'bg-yellow-500' : 'bg-green-500'}`}></span>
        </div>
        <p className="text-sm">Humidity likely to peak at <strong>{maxHumidTime} by {maxHumidity}%</strong>, take necessary precautions.</p>
      </div>
    </div>
  )
}

export default HumidityTrendCard