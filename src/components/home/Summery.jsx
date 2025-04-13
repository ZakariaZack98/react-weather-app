import React from 'react'
import { FaHome } from 'react-icons/fa'
import { FaInfo } from 'react-icons/fa6'

const Summery = ({ selectedLocation, currentWeatherData }) => {
  const othersData = [
    {
      name: 'Air Quality',
      data: 100
    },
    {
      name: 'Wind',
      data: '2km/h NNE'
    },
    {
      name: 'Humidity',
      data: '66%'
    },
    {
      name: 'Visibility',
      data: '2km'
    },
    {
      name: 'Pressure',
      data: '1001mb'
    },
    {
      name: 'Dew Point',
      data: '18°c'
    },
  ]
  return (
    <div className='summery pb-5'>
      <div className="locationHeading flex items-center gap-x-10 py-5">
        {/* selected location wil go here */}
        <p>Dhaka, Bangladesh</p>
        <span className='w-8 h-8 flex justify-center items-center rounded-full border-[1px] border-white'>
          <FaHome />
        </span>
      </div>
      <div className="mainContent w-full flex gap-5 items-stretch">
        <div className="currentWeather w-1/2 p-5 bg-[rgba(255,255,255,0.14)] rounded-lg flex flex-col gap-y-10">
          <div className="heading">
            <div className="text-sm font-semibold">Current Weather</div>
            <div className="time text-sm">12:53 PM</div>
          </div>
          <div className="tempPart flex items-center">
            <div className="temp flex items-center gap-x-3">
              <picture>
                <img src="/05-s.png" alt="" className='w-30 object-fit-cover -translate-x-5'/>
              </picture>
              <h1 className='text-[55px] -translate-x-12'>32°c</h1>
            </div>
            <div className="condition">
              <h2 className='text-lg font-semibold'>Haze</h2>
              <p className="">Feels Like  36°c</p>
            </div>
          </div>
          <div className="suggestion">
            <p>Expect Sunny Skies, The High will be 40°c.</p>
          </div>
          <div className="othersUpdate w-full flex justify-between">
            {
              othersData?.map(item => (
                <div key={item.name}>
                  <div className="flex opacity-70"><p className='text-[12px]'>{item.name}</p><span className='text-[8px] '><FaInfo/></span></div>
                  <p>{item.data}</p>
                </div>
                
              ))
            }
          </div>
        </div>
        <div className="map w-1/2">
        </div>
      </div>
    </div>
  )
}

export default Summery