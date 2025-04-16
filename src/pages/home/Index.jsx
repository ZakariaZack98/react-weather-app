import React from 'react'
import SearchArea from '../../components/home/SearchArea'
import Summery from '../../components/home/Summery'
import ForecastSlider from '../../components/home/ForecastSlider'

const Home = () => {

  return (
    <div className="body text-[rgba(255,255,255,0.94)] h-screen overflow-y-scroll" style={{scrollbarWidth: 'none'}}>
      <div className='container mx-auto' style={{ fontFamily: "'Segoe UI', sans-serif" }}>
        <SearchArea/>
        <div className="mainContents w-full">
          <div className="main w-5/6">
            <Summery/>
            <ForecastSlider/>
          </div>
          <div className="sidebar w-1/6">

          </div>
        </div>
      </div>
    </div>
  )
}

export default Home