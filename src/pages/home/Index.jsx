import React, { useState } from 'react'
import Navbar from '../../components/common/Navbar'
import SearchArea from '../../components/home/SearchArea'
import Summery from '../../components/home/Summery'

const Home = () => {
  const [recentSearchLoc, setRecentSearchLoc] = useState(['Dhaka', 'Khulna', 'Chittagong', 'Sylhet'])
  const [selectedLocation, setSelectedLocation] = useState('Dhaka');


  return (
    <div className="body text-[rgba(255,255,255,0.94)]">
      <div className='container mx-auto' style={{ fontFamily: "'Segoe UI', sans-serif" }}>
        <SearchArea recentLocations={recentSearchLoc}/>
        <div className="mainContents w-full">
          <div className="main w-5/6">
            <Summery selectedLocation={selectedLocation}/>
          </div>
          <div className="sidebar w-1/6">

          </div>
        </div>
      </div>
    </div>
  )
}

export default Home