import React, { useContext, useState, useEffect } from 'react'
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
import _ from "../../lib/componentsData"

const Home = () => {
  const {newsData, weatherDataNow} = useContext(WeatherContext);
  const sampleData = newsData?.slice(12,16);
  const currentWeather = weatherDataNow?.weather?.[0]?.main;
  const [isChanging, setIsChanging] = useState(false);
  const [currentBg, setCurrentBg] = useState(_.weatherImageUrls.Clear);

  useEffect(() => {
    if (currentWeather) {
      const newBg = _.weatherImageUrls[currentWeather];
      if (newBg !== currentBg) {
        setIsChanging(true);
        setTimeout(() => {
          setCurrentBg(newBg);
          setTimeout(() => {
            setIsChanging(false);
          }, 500);
        }, 500);
      }
    }
  }, [currentWeather]);

  return (
    <div 
      className={`backdrop w-full h-full ${isChanging ? 'changing' : ''}`}
      style={{ 
        scrollbarWidth: 'none',
        backgroundImage: `url(${currentBg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="body bg-[rgba(0,0,0,0.36)] text-[rgba(255,255,255,0.94)] h-screen overflow-y-scroll overflow-x-hidden]">
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
              {sampleData?.map(article => <NewsCard key={article.url} article={article}/>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home