import React, { useContext, useEffect, useState } from 'react'
import { WeatherContext } from '../../contexts/WeatherContext'
import { DateFormatter, FetchLast30DaysData, GetRandomWeatherbitIconCode } from '../../utils/utils';
import AltLineChart from '../common/AltLineChart';
import mock30daysData from '../../lib/Data30days.json'

const LastMonthCal = () => {
  const { coord, weatherDataNow } = useContext(WeatherContext);
  
  const [last30daysData, setLast30daysData] = useState(mock30daysData.data);
  const chartModes = ['Temperature', 'Precipitation', 'Wind']
  const [chartMode, setChartMode] = useState('Temperature');

  //* DATA CALCULATIONS ======================================================================
  const tempChartData = {
    maxTempLabels: last30daysData?.map(dayData => dayData.datetime),
    maxTempData: last30daysData?.map(dayData => dayData.max_temp),
    minTempLabels: last30daysData?.map(dayData => dayData.datetime),
    minTempData: last30daysData?.map(dayData => dayData.min_temp),
    borderColors: ['rgba(245, 166, 39, 0.8)','rgba(39, 106, 245, 0.8)'],
    backgroundColors: ['rgba(245, 166, 39, 0.8)','rgba(39, 106, 245, 0.8)'],
  }
  //* DATA CALCULATIONS ======================================================================

  // useEffect(() => {
  //   FetchLast30DaysData(coord[0], coord[1])
  //     .then(data => setLast30daysData(data?.data))
  //     .then(console.log('30days api called'))
  // }, [coord])

  if (last30daysData && last30daysData.length > 0) return (
    <div className='py-2 w-full'>
      {/* ==========================================Calender Markup===================================================== */}
      <h3 className="text-xl font-semibold mb-3">LAST 30 DAYS <span className='text-sm'>(icons are placeholders)</span></h3>
      <div className="flex flex-wrap md:justify-start justify-around xl:gap-1 gap-3 items-start rounded-xl bg-[rgba(255,255,255,0.1)] p-10">
        {
          last30daysData?.map(dayData => (
            <div key={dayData?.datetime} className='md:w-[13.8%] w-3/10 min-w-20 xl:h-28 h-23 rounded-xl border border-[rgba(255,255,255,0.22)] p-2'>
              <p>{DateFormatter(dayData?.datetime)}</p>
              <div className="flex gap-x-3">
                <picture>
                  {/* !FIX THE ICON RE-RENDER BUG */}
                  <img src={`https://www.weatherbit.io/static/img/icons/${GetRandomWeatherbitIconCode()}.png`} className='xl:w-15 md:w-10 w-7' />
                </picture>
                <div className="flex flex-col">
                  <p className='xl:text-2xl lg:text-xl md:text-[1rem] text-sm font-semibold'>{Math.round(dayData?.max_temp)}°c</p>
                  <p className='xl:text-2xl lg:text-xl md:text-[1rem] text-sm font-semibold opacity-75'>{Math.round(dayData?.min_temp)}°c</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      {/* ==========================================Calender Markup===================================================== */}

      {/* ==========================================Charts Markup===================================================== */}
      {/* <div className="w-full flex justify-between items-stretch gap-x-2 my-5">
        <div className="w-2/3 rounded-xl bg-[rgba(255,255,255,0.09)]">
          <div className="flex p-5 gap-x-3">
            {
              chartModes?.map(mode => (
                <p key={mode} className={`${chartMode === mode ? 'bg-yellow-500 text-black font-semibold' : ''} rounded-2xl px-4 py-1 cursor-pointer hover:bg-[rgba(255,255,255,0.17)] duration-300`} onClick={() => setChartMode(mode)}>
                  {mode}
                </p>
              ))
            }
          </div>
          <div className="px-5">
            <AltLineChart />
          </div>
        </div>
        <div className="w-1/3"></div>
      </div> */}
      {/* ==========================================Charts Markup===================================================== */}
    </div>
  )
}

export default LastMonthCal