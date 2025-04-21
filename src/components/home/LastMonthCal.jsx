import React, { useContext, useEffect, useState } from 'react'
import { WeatherContext } from '../../contexts/WeatherContext'
import { DateFormatter, FetchLast30DaysData, GetRandomWeatherbitIconCode } from '../../utils/utils';

const LastMonthCal = () => {
  const {coord, weatherDataNow} = useContext(WeatherContext);
  const [last30daysData, setLast30daysData] = useState([]);

  useEffect(() => {
    FetchLast30DaysData(coord[0], coord[1])
    .then(data => setLast30daysData(data?.data))
  }, [coord])

  if(last30daysData && last30daysData.length > 0) return (
    <div className='py-2'>
      <h3 className="text-xl font-semibold mb-3">LAST 30 DAYS <span className='text-sm'>(icons are placeholders)</span></h3>
      <div className="flex flex-wrap justify-start gap-1 items-start rounded-xl bg-[rgba(255,255,255,0.1)] p-10">
      {
        last30daysData?.map(dayData => (
          <div key={dayData?.datetime} className='w-[14%] h-28 rounded-xl border border-[rgba(255,255,255,0.22)] p-2'>
            <p>{DateFormatter(dayData?.datetime)}</p>
            <div className="flex gap-x-3">
              <picture>
                <img src={`https://www.weatherbit.io/static/img/icons/${GetRandomWeatherbitIconCode()}.png`} className='w-15'/>
              </picture>
              <div className="flex flex-col">
                <p className='text-2xl font-semibold'>{Math.round(dayData?.max_temp)}°c</p>
                <p className='text-2xl font-semibold opacity-75'>{Math.round(dayData?.min_temp)}°c</p>
              </div>
            </div>
          </div>
        ))
      }
      </div>
    </div>
  )
}

export default LastMonthCal