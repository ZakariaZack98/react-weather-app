import React, { useContext, useState, useEffect } from 'react';
import { imagePreloader } from '../../utils/ImagePreloader';
import useProgressiveImage from '../../hooks/useProgressiveImage';
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
import { weatherImageUrls, weatherImageThumbnails } from "../../lib/backgrounds"

const Home = () => {
  const {newsData, weatherDataNow} = useContext(WeatherContext);
  const sampleData = newsData?.slice(12,16);
  const currentWeather = weatherDataNow?.weather?.[0]?.main;
  const [isChanging, setIsChanging] = useState(false);
  const [currentBg, setCurrentBg] = useState(weatherImageUrls.Clear);
  
  //TODO: Preload all weather background images when component mounts
  useEffect(() => {
    console.log('Preloading weather background images...');
    imagePreloader.preloadAll().then((results) => {
      results.forEach((result, index) => {
        if (result.status === 'rejected') {
          console.warn(`Failed to preload image ${index}:`, result.reason);
        }
      });
    });
  }, []);

  const weatherCondition = currentWeather || 'Clear';
  const thumbnailUrl = weatherImageThumbnails[weatherCondition] || weatherImageThumbnails.Clear;
  const fullSizeUrl = weatherImageUrls[weatherCondition] || weatherImageUrls.Clear;
  const loadedBackground = useProgressiveImage(thumbnailUrl, fullSizeUrl);

  //TODO: Handle background image transitions
  useEffect(() => {
    if (currentWeather) {
      const newBg = weatherImageUrls[currentWeather];
      if (newBg !== currentBg) {
        setIsChanging(true);
        
        //? Try to preload the new image
        imagePreloader.preload(newBg)
          .then(() => {
            setTimeout(() => {
              setCurrentBg(newBg);
              setTimeout(() => setIsChanging(false), 500);
            }, 500);
          })
          .catch((error) => {
            console.error('Failed to load new background:', error);
            //? Keep the current background if loading fails
            setIsChanging(false);
          });
      }
    }
  }, [currentWeather, currentBg]);

  return (
    <div 
      className={`backdrop w-full h-screen bg-cover bg-center bg-no-repeat overflow-y-scroll ${isChanging ? 'changing' : ''}`}
      style={{ 
        scrollbarWidth: 'none',
        backgroundImage: `url(${loadedBackground})`,
        transition: 'background-image 0.5s ease-in-out',
      }}
    >
      <div className="body bg-[rgba(0,0,0,0.36)] text-[rgba(255,255,255,0.94)] min-h-screen w-full pointer-events-auto overflow-x-hidden">
        <div className='lg:w-[82%] w-[95%] mx-auto pb-10' style={{ fontFamily: "'Segoe UI', sans-serif" }}>
          <SearchArea />
          <div className="mainContents flex xl:flex-nowrap flex-wrap w-full 2xl:gap-x-5 gap-x-0 overflow-x-hidden">
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
            <div className="sidebar 2xl:w-1/5 w-full hidden 2xl:flex flex-col gap-y-4 mt-10">
              {sampleData?.map(article => <NewsCard key={article.url} article={article}/>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home