import React from 'react'
import { FaWind } from 'react-icons/fa'
import WindDirectionIcon from './WindDirectionIcon'
import { ConvertTo12Hour } from '../../utils/utils'
import { FaDroplet } from 'react-icons/fa6'
import { CiTempHigh } from 'react-icons/ci'

const HourForecastCard = ({ displayData }) => {
  return (
    <div className='w-[12.5%] h-[260px] p-4 flex flex-col justify-between rounded-xl bg-[#4e647c]'>
      <p>{ConvertTo12Hour(displayData?.dt_txt?.split(' ')[1])}</p>
      <div className="iconSec flex flex-col">
        <img
          src={`https://openweathermap.org/img/wn/${displayData?.weather[0]?.icon}@2x.png`}
          alt=""
          className="w-10 scale-150 -translate-x-1"
        />
        <p className='text-xl font-semibold'>{Math.round(displayData?.main?.temp)}°c</p>
        <p className=''>{displayData?.weather[0]?.description}</p>
      </div>
      <div className="tempWindSec flex flex-col">
        <div className="feelTempSec flex items-center gap-x-1">
          <span>
            <CiTempHigh size={18} />
          </span>
          <span>{Math.round(displayData?.main?.feels_like)}°c</span>
        </div>
        <div className="PrecipSec flex items-center gap-x-1">
          <span>
            <FaDroplet size={18} />
          </span>
          <span>{Math.round(displayData?.pop * 100)}%</span>
        </div>
        <div className="feelTempSec flex items-center gap-x-1">
          <span>
            <FaWind size={18} />
          </span>
          <span className='me-2'>{displayData?.wind?.speed}mph</span>
          <WindDirectionIcon deg={displayData?.wind?.deg} size={15}/>
        </div>
      </div>
    </div>
  )
}

export default HourForecastCard