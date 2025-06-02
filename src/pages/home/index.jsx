import React, { useContext } from 'react'
import SearchArea from '../../components/home/SearchArea'
import Summery from '../../components/home/Summery'
import ForecastSlider from '../../components/home/ForecastSlider'
import WeatherDetails from '../../components/home/WeatherDetails'
import LastMonthCal from '../../components/home/LastMonthCal'
import { WeatherContext } from '../../contexts/WeatherContext'
import NewsCard from '../../components/common/NewsCard'
import NewsSec from '../../components/home/NewsSec'
import LastYearChart from '../../components/home/LastYearChart'
import WeatherMap from '../../components/home/WeatherMap'
import TrendInfo from '../../components/home/TrendInfo'

const Home = () => {
  const {newsData} = useContext(WeatherContext);
  const sampleData = newsData?.slice(12,16);

  return (
    <div className="backdrop w-full h-full">
      <div className="body  bg-[rgba(0,0,0,0.25)] text-[rgba(255,255,255,0.94)] h-screen overflow-y-scroll overflow-x-hidden]" style={{ scrollbarWidth: 'none' }}>
      <div className='lg:w-[82%] w-[95%] mx-auto' style={{ fontFamily: "'Segoe UI', sans-serif" }}>
        <SearchArea />
        <div className="mainContents flex xl:flex-nowrap flex-wrap w-full 2xl:gap-x-5 gap-x-0">
          <div className="main 2xl:w-4/5 w-full">
            <Summery />
            <ForecastSlider />
            <WeatherDetails />
            <WeatherMap/>
            <LastMonthCal/>
            <LastYearChart/>
            <TrendInfo/>
            <NewsSec/>
          </div>
          <div className="sidebar 2xl:w-1/5 w-full hidden 2xl:flex flex-col gap-y-4 pt-18">
            {
              sampleData?.map(article => <NewsCard article={article}/>)
            }
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Home