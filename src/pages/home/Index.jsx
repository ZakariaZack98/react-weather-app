import React from 'react'
import SearchArea from '../../components/home/SearchArea'
import Summery from '../../components/home/Summery'
import ForecastSlider from '../../components/home/ForecastSlider'
import WeatherDetails from '../../components/home/WeatherDetails'
import LastMonthCal from '../../components/home/LastMonthCal'
import LastMonthCharts from '../../components/home/LastMonthCharts'
import AltLineChart from '../../components/common/AltLineChart'

const Home = () => {

  return (
    <div className="body text-[rgba(255,255,255,0.94)] h-screen overflow-y-scroll" style={{ scrollbarWidth: 'none' }}>
      <div className='container mx-auto' style={{ fontFamily: "'Segoe UI', sans-serif" }}>
        <SearchArea />
        <div className="mainContents flex w-full">
          <div className="main w-5/6">
            <Summery />
            <ForecastSlider />
            <WeatherDetails />
            <LastMonthCal/>
            <AltLineChart/>
          </div>
          <div className="sidebar w-1/6">
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home