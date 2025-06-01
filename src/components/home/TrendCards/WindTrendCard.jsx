import React, { useContext } from 'react'
import { WeatherContext } from '../../../contexts/WeatherContext'
import { GetWindDirection } from '../../../utils/utils';
import MovingArrow from '../../common/MovingArrow';

const WindTrendCard = () => {
  const { weatherDataNow, hourlyForecastData } = useContext(WeatherContext);
  const futureWindSpeed = hourlyForecastData[4]?.wind?.speed;
  const currentWindSpeed = weatherDataNow?.wind?.speed;
  const currentWindGust = weatherDataNow?.wind?.gust;

  const getWindTrend = () => {
    const speedMph = weatherDataNow?.wind?.speed * 0.6213;
    if (speedMph < 4) return "Calm";
    if (speedMph <= 7) return "Light";
    if (speedMph <= 12) return "Breezy";
    if (speedMph <= 20) return "Windy";
    if (speedMph <= 30) return "Very Windy";
    if (speedMph <= 40) return "Strong Wind";
    if (speedMph <= 55) return "Gale";
    return "Storm";
  }

  const windTrend = getWindTrend();

  return (
    <div className='min-h-75 p-4 flex flex-col gap-y-3 justify-between rounded-xl bg-[rgba(255,255,255,0.06)] text-sm'>
      <h1 className='font-semibold text-lg'>Wind</h1>
      <div className="compassSec flex justify-center items-stretch gap-x-5">
        <div className="min-w-27 h-27 relative border-4 border-[rgba(255,255,255,0.1)] rounded-full ">
          <span className='absolute left-[50%] -top-3 text-sm bg-[rgba(255,255,255,0.07)] -translate-x-[50%]'>N</span>
          <span className='absolute -left-2 top-[50%] text-sm bg-[rgba(255,255,255,0.07)] -translate-y-[50%]'>W</span>
          <span className='absolute -right-1.5 top-[50%]  bg-[rgba(255,255,255,0.07)] -translate-y-[50%]'>E</span>
          <span className='absolute left-[50%] -bottom-3 text-sm bg-[rgba(255,255,255,0.07)] -translate-x-[50%]'>S</span>
          <div className="windDirArrow absolute top-[50%] left-[50%] -translate-[50%]">
            <MovingArrow windDirDeg={weatherDataNow?.wind?.deg} />
          </div>
        </div>
        <div className="compassText flex flex-col justify-between">
          <p className='text-sm'>From {GetWindDirection(weatherDataNow?.wind?.deg)} ({weatherDataNow?.wind?.deg}°) </p>
          <div className="speed flex gap-x-1">
            <div className="2xl:text-3xl lg:text-xl">{currentWindSpeed}</div>
            <div className="flex flex-col text-[12px]">
              <span>km/h</span>
              <span>Speed</span>
            </div>
          </div>
          <div className="gust flex gap-x-1">
            <div className="2xl:text-3xl lg:text-xl">{currentWindGust}</div>
            <div className="flex flex-col text-[12px]">
              <span>km/h</span>
              <span className='text-nowrap'>Gust</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bottomTextSec">
        <div className="flex items-center gap-x-2">
          <p className='font-semibold'>Force: {windTrend}</p>
          <span className={`h-5 w-5 rounded-full ${windTrend === 'Calm' || windTrend === 'Windy' || windTrend === 'Breezy' || windTrend ==='Light' ? 'bg-green-700' : windTrend === 'Windy' || windTrend === 'Very Windy' || windTrend === 'Strong Wind' ? 'bg-yellow-500' : 'bg-red-500'}`}></span>
        </div>
        <p className='text-[13px] mt-2'>
          Current wind condition is <strong>{windTrend}</strong>. Wind gust can reach upto <strong>{currentWindGust} km/h</strong>. Wind speed is likely to <span className='font-semibold'>{
            futureWindSpeed > currentWindSpeed ? `increase by ${(futureWindSpeed - currentWindSpeed).toFixed(1)} km/h` : `decrease by ${(currentWindSpeed - futureWindSpeed).toFixed(1)} km/h`
          }</span> in next few hours.
        </p>
      </div>
    </div>
  )
}

export default WindTrendCard