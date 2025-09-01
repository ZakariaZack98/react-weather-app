import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import React from 'react'
import { useSelector } from 'react-redux';

const PrecipitationTrendCard = () => {
  const { hourlyForecastData } = useSelector(state => state.weather);
  const next24hrsForecast = hourlyForecastData?.slice(2, 10);
  const forecastWithRains = next24hrsForecast?.map(hourlyData => hourlyData.rain).filter(item => Boolean(item));
  const maxRainChance = Math.max(...next24hrsForecast?.map(hourlyData => hourlyData.pop)) * 100;
  const getTotalRainfall = () => {
    if (forecastWithRains?.length === 0) return 0;
    return (forecastWithRains?.map(obj => Object.values(obj)[0])?.reduce((a, b) => a + b)).toFixed(2)
  }

  return (
    <div className='min-h-75 p-4 flex flex-col gap-y-3 justify-between rounded-xl surface-card'>
      <h1 className='font-semibold'>Precipitation</h1>
      <div className="flex w-full h-full justify-center items-center">
        <div className="h-30 aspect-square border border-[rgba(255,255,255,0.23)] rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden relative flex justify-center items-center">
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
          <p className='font-semibold'>{maxRainChance}% chance of rain in 24 hours.</p>
        </div>
        <p className='text-[13px] mt-2'>{
          maxRainChance === 0
          ? 'No chances of rain in the next 24 hours'
          : maxRainChance <= 70 && maxRainChance >= 50
          ? `Consider taking an umbrella while going out.`
          : maxRainChance > 70
          ? `Prominant rain probability. Remember to take your umbrella while going out.`
          : `Slight chance of rain, taking an umbrella with you is a good idea!`
          }</p>
      </div>
    </div>
  )
}

export default PrecipitationTrendCard