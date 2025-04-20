import React, { useContext } from 'react'
import { FaAngleRight } from 'react-icons/fa'
import TempTrendCard from './TrendCards/TempTrendCard'
import { WeatherContext } from '../../contexts/WeatherContext'
import FeelsLikeTrendCard from './TrendCards/FeelsLikeTrendCard'
import CloudCoverCard from './TrendCards/CloudCoverCard'
import PrecipitationTrendCard from './TrendCards/PrecipitationTrendCard'
import WindTrendCard from './TrendCards/WindTrendCard'
import HumidityTrendCard from './TrendCards/HumidityTrendCard'
import UVTrendCard from './TrendCards/UVTrendCard'

const WeatherDetails = () => {
  const { hourlyForecastData } = useContext(WeatherContext);
  return (
    <div className='w-full mt-10 mb-7'>
      {
        hourlyForecastData && hourlyForecastData?.length > 0 && (
          <div className="w-full">
            <div className="heading flex justify-between items-center ">
              <h3 className='text-xl font-semibold'>Current Weather Trends</h3>
              <div className="flex items-center gap-x-1 opacity-60">
                <p className='font-semibold'>SUGGESTION FOR YOUR DAY</p>
                <span>
                  <FaAngleRight />
                </span>
              </div>
            </div>
            <div className="w-full flex flex-wrap justify-between items-start my-5 gap-3">
              <TempTrendCard />
              <FeelsLikeTrendCard/>
              <CloudCoverCard/>
              <PrecipitationTrendCard/>
              <WindTrendCard/>
              <HumidityTrendCard/>
              <UVTrendCard/>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default WeatherDetails