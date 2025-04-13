import React, { useContext } from 'react'
import { FaSearch } from 'react-icons/fa'
import { WeatherContext } from '../../contexts/WeatherContext'

const SearchArea = ({searchHandlers}) => {
  const {recentSearchLoc, fetchAllWeatherData} = useContext(WeatherContext);
  return (
    <div className='flex py-4 gap-x-10'>
      <div className="searchBar w-1/6 relative">
        <input type="text" className='w-full px-4 py-1 border-[1px] border-[#ffffff3f] rounded-xl bg-[#ffffff28] focus:outline-none' placeholder='Search for locations'/>
        <span className="absolute top-2 right-3">
          <FaSearch/>
        </span>
      </div>
      <div className="recentSearchedLocations flex gap-x-4">
        {
          recentSearchLoc?.map(location => (
            <div key={location.name} className='px-10 py-1 border-[1px] border-[#ffffff3d] rounded-xl bg-[#ffffff28] cursor-pointer hover:bg-[#ffffff4d] duration-300' onClick={() => {
              fetchAllWeatherData(location.coord[0], location.coord[1])
              .then(() => console.log('data fetch successfull'))
            }}>
              <p className='opacity-70'>{location.name}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default SearchArea