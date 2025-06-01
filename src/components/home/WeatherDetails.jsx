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
import AQITrendCard from './TrendCards/AQITrendCard'
import VisibilityTrendCard from './TrendCards/VisibilityTrendCard'
import PressureTrendCard from './TrendCards/PressureTrendCard'
import MoonPhaseCard from './TrendCards/MoonPhaseCard'
import SunDetailsCard from './TrendCards/SunDetailsCard'

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
            <div className="w-full flex flex-wrap justify-between items-stretch my-5 gap-y-3 sm:gap-y-10 md:gap-6 xl:gap-3 ">
              <div className="xl:w-[24%] md:w-[30%] sm:w-[47%] w-full h-full"><TempTrendCard /></div>
              <div className="xl:w-[24%] md:w-[30%] sm:w-[47%] w-full h-full"><FeelsLikeTrendCard/></div>
              <div className="xl:w-[24%] md:w-[30%] sm:w-[47%] w-full h-full"><CloudCoverCard/></div>
              <div className="xl:w-[24%] md:w-[30%] sm:w-[47%] w-full h-full"><PrecipitationTrendCard/></div>
              <div className="xl:w-[24%] md:w-[30%] sm:w-[47%] w-full h-full"><WindTrendCard/></div>
              <div className="xl:w-[24%] md:w-[30%] sm:w-[47%] w-full h-full"><HumidityTrendCard/></div>
              <div className="xl:w-[24%] md:w-[30%] sm:w-[47%] w-full h-full"><UVTrendCard/></div>
              <div className="xl:w-[24%] md:w-[30%] sm:w-[47%] w-full h-full"><AQITrendCard/></div>
              <div className="xl:w-[24%] md:w-[30%] sm:w-[47%] w-full h-full"><VisibilityTrendCard/></div>
              <div className="xl:w-[24%] md:w-[30%] sm:w-[47%] w-full h-full"><PressureTrendCard/></div>
              <div className="xl:w-[24%] md:w-[30%] sm:w-[47%] w-full h-full"><SunDetailsCard/></div>
              <div className="xl:w-[24%] md:w-[30%] sm:w-[47%] w-full h-full"><MoonPhaseCard/></div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default WeatherDetails