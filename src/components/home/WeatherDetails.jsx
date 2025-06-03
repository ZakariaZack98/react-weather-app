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
    <div className='w-full mt-10 mb-7 overflow-x-hidden'>
      {
        hourlyForecastData && hourlyForecastData?.length > 0 && (
          <div className="w-full overflow-hidden">
            <div className="heading flex flex-col md:flex-row  justify-between items-center ">
              <h3 className='md:text-xl text-sm font-semibold'>Current Weather Trends</h3>
              <div className="flex items-center gap-x-1 opacity-60">
                <p className='md:text-[1rem] text-xs font-semibold'>SUGGESTION FOR YOUR DAY</p>
                <span>
                  <FaAngleRight />
                </span>
              </div>
            </div>
            <div className="w-full flex flex-wrap justify-between items-stretch my-5 gap-y-3 sm:gap-y-3 md:gap-0 xl:gap-0 ">
              <div className="xl:w-[24%] md:w-[32%] sm:w-[47%] w-full md:min-h-85 h-full"><TempTrendCard /></div>
              <div className="xl:w-[24%] md:w-[32%] sm:w-[47%] w-full md:min-h-85 h-full"><FeelsLikeTrendCard/></div>
              <div className="xl:w-[24%] md:w-[32%] sm:w-[47%] w-full md:min-h-85 h-full"><CloudCoverCard/></div>
              <div className="xl:w-[24%] md:w-[32%] sm:w-[47%] w-full md:min-h-85 h-full"><PrecipitationTrendCard/></div>
              <div className="xl:w-[24%] md:w-[32%] sm:w-[47%] w-full md:min-h-85 h-full"><WindTrendCard/></div>
              <div className="xl:w-[24%] md:w-[32%] sm:w-[47%] w-full md:min-h-85 h-full"><HumidityTrendCard/></div>
              <div className="xl:w-[24%] md:w-[32%] sm:w-[47%] w-full md:min-h-85 h-full"><UVTrendCard/></div>
              <div className="xl:w-[24%] md:w-[32%] sm:w-[47%] w-full md:min-h-85 h-full"><AQITrendCard/></div>
              <div className="xl:w-[24%] md:w-[32%] sm:w-[47%] w-full md:min-h-85 h-full"><VisibilityTrendCard/></div>
              <div className="xl:w-[24%] md:w-[32%] sm:w-[47%] w-full md:min-h-85 h-full"><PressureTrendCard/></div>
              <div className="xl:w-[24%] md:w-[32%] sm:w-[47%] w-full md:min-h-85 h-full"><SunDetailsCard/></div>
              <div className="xl:w-[24%] md:w-[32%] sm:w-[47%] w-full md:min-h-85 h-full"><MoonPhaseCard/></div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default WeatherDetails