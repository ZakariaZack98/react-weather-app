import React from 'react'
import SearchArea from '../../components/home/SearchArea'
import Summery from '../../components/home/Summery'

const Home = () => {
  
  return (
    <div className="body text-[rgba(255,255,255,0.94)]">
      <div className='container mx-auto' style={{ fontFamily: "'Segoe UI', sans-serif" }}>
        <SearchArea/>
        <div className="mainContents w-full">
          <div className="main w-5/6">
            <Summery/>
          </div>
          <div className="sidebar w-1/6">

          </div>
        </div>
      </div>
    </div>
  )
}

export default Home