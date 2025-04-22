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

const Home = () => {
  const {newsData} = useContext(WeatherContext);
  const sampleData = newsData?.slice(12,16);

  return (
    <div className="body text-[rgba(255,255,255,0.94)] h-screen overflow-y-scroll" style={{ scrollbarWidth: 'none' }}>
      <div className='w-[82%] mx-auto' style={{ fontFamily: "'Segoe UI', sans-serif" }}>
        <SearchArea />
        <div className="mainContents flex w-full gap-x-5">
          <div className="main w-4/5">
            <Summery />
            <ForecastSlider />
            <WeatherDetails />
            <WeatherMap/>
            <LastMonthCal/>
            <LastYearChart/>
            <NewsSec/>
          </div>
          <div className="sidebar w-1/5 flex flex-col gap-y-4 pt-18">
            {
              sampleData?.map(article => <NewsCard article={article}/>)
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home