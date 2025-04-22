import React, { useState } from 'react'
import AltLineChart from '../common/AltLineChart';
import mockLastYearData from '../../lib/YearlyData.json'
import AltBarChart from '../common/AltBarChart';
import { FaAngleRight } from 'react-icons/fa6';

const LastYearChart = () => {
  const chartModes = ['Temperature', 'Rainfall', 'Wind']
  const [chartMode, setChartMode] = useState('Temperature');
  const yearlyData = mockLastYearData.days;

  //* DATA CALCULATIONS ======================================================================
  const tempChartData = {
    labels: yearlyData?.map(dayData => dayData.datetime),
    maxTempData: yearlyData?.map(dayData => dayData.tempmax),
    minTempData: yearlyData?.map(dayData => dayData.tempmin),
    borderColors: ['rgba(39, 106, 245, 0.8)', 'rgba(245, 39, 39, 0.8)'],
    backgroundColors: ['rgba(39, 106, 245, 0.5)', 'rgba(245, 39, 39, 0.5)'],
  }
  const windChartData = {
    labels: yearlyData?.map(dayData => dayData.datetime),
    windSpdData: yearlyData?.map(dayData => dayData.windspeed),
    windGustData: yearlyData?.map(dayData => dayData.windgust),
    borderColors: ['rgba(39, 238, 245, 0.8)', 'rgba(203, 252, 254, 0.2)'],
    backgroundColors: ['rgba(39, 238, 245, 0.1)', 'rgba(203, 252, 254, 0)'],
  }

  const rainChartData = {
    labels: yearlyData?.map(dayData => dayData.datetime),
    precipData: yearlyData?.map(dayData => dayData.precip),
    borderColor: 'rgba(30, 123, 228, 1)',
    backgroundColor: 'rgba(30, 123, 228, 1)',
  }
  //* DATA CALCULATIONS ======================================================================

  return (
    <div className='py-7 w-full'>
      <div className="flex justify-between items-center">
      <h3 className="text-xl font-semibold">YEARLY WEATHER ANALYSIS (April 2024 - April 2025)</h3>
      <div className=" flex items-center text-lg font-semibold"><span>SEE MORE</span> <span><FaAngleRight/></span></div>
      </div>
      {/* ==========================================Charts Markup===================================================== */}
      <div className="w-full flex justify-between items-stretch gap-x-2 my-5">
        <div className="w-full rounded-xl bg-[rgba(255,255,255,0.09)]">
          <div className="flex p-5 gap-x-3">
            {
              chartModes?.map(mode => (
                <p key={mode} className={`${chartMode === mode ? 'bg-yellow-500 text-black font-semibold' : ''} rounded-2xl px-4 py-1 cursor-pointer hover:bg-[rgba(255,255,255,0.17)] duration-300`} onClick={() => setChartMode(mode)}>
                  {mode}
                </p>
              ))
            }
          </div>
          <div className="px-5 pb-7">
            {
              chartMode === 'Rainfall' ? (<AltBarChart 
              label='Rain accumulation (mm)'
              labels={rainChartData.labels}
              dataSet={rainChartData.precipData}
              borderColor={rainChartData.borderColor}
              backgroundColor={rainChartData.backgroundColor}
              />) : (
                <AltLineChart
                  label={`${chartMode === 'Temperature' ? 'Temperature Lowest (°c)' : 'Wind Speed (km/h)'}`}
                  labels={tempChartData.labels}
                  secondLabel={`${chartMode === 'Temperature' ? 'Temperature Highest (°c)' : 'Wind Gust (km/h)'}`}
                  dataSet={chartMode === 'Temperature' ? tempChartData.minTempData : windChartData.windSpdData}
                  secondDataSet={chartMode === 'Temperature' ? tempChartData.maxTempData : windChartData.windGustData}
                  borderColors={chartMode === 'Temperature' ? tempChartData.borderColors : windChartData.borderColors}
                  backgroundColors={chartMode === 'Temperature' ? tempChartData.backgroundColors : windChartData.backgroundColors} />
              )
            }
          </div>
        </div>
      </div>
      {/* ==========================================Charts Markup===================================================== */}
    </div>
  )
}

export default LastYearChart