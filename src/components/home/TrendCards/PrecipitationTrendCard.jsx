import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import React, { useContext } from 'react'
import { WeatherContext } from '../../../contexts/WeatherContext';

const PrecipitationTrendCard = () => {
  const { hourlyForecastData } = useContext(WeatherContext);
  const next24hrsForecast = hourlyForecastData?.slice(2, 10);
  const forecastWithRains = next24hrsForecast?.map(hourlyData => hourlyData.rain).filter(item => Boolean(item));
  const getTotalRainfall = () => {
    if (forecastWithRains?.length === 0) return 0;
    return (forecastWithRains?.map(obj => Object.values(obj)[0])?.reduce((a, b) => a + b)).toFixed(2)
  }
  const getMaxRainChance = () => Math.max(...next24hrsForecast?.map(hourlyData => hourlyData.pop)) * 100;

  return (
    <div className='w-[24%] h-75 p-4 flex flex-col gap-y-3 justify-between rounded-xl bg-[rgba(255,255,255,0.06)]'>
      <h1 className='font-semibold'>Precipitation</h1>
      <div className="flex w-full justify-center items-center">
        <div className="w-35 h-35 border border-[rgba(255,255,255,0.23)] rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden relative flex justify-center items-center">
          {
            getTotalRainfall() > 0 && (
              <div style={{ filter: 'hue-rotate(220deg) saturate(2)' }}>
                <DotLottieReact
                  src="https://lottie.host/861ac77d-dd6d-4cb1-ac62-1302547c6de0/2gTndkdbgq.lottie"
                  style={{ width: 140, height: 140, transform: 'translateX(10px) scale(1.6)', }}
                  loop
                  autoplay
                />
              </div>
            )
          }
          <div className="absolute flex flex-col justify-center items-center">
            <p className="text-3xl font-semibold">{getTotalRainfall()} <span className='text-sm font-medium'>mm</span></p>
            <p className="text-[12px]">in next 24 hours</p>
          </div>
        </div>
      </div>
      <div className="textSec">
        <div className="flex items-center gap-x-2">
          <p className='font-semibold'>{getMaxRainChance()}% chance of rain</p>
        </div>
        <p className='text-[13px] mt-2'>{
          getMaxRainChance() === 0
          ? 'No chances of rain in the next 24 hours'
          : getMaxRainChance() <= 70 && getMaxRainChance() >= 50
          ? `Consider taking an umbrella while going out.`
          : getMaxRainChance() > 70
          ? `Prominant rain probability. remember to take your umbrella while going out.`
          : `${getMaxRainChance()}% chances of rain in the next 24 hours.`
          }</p>
      </div>
    </div>
  )
}

export default PrecipitationTrendCard