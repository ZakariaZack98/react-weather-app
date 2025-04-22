import React, { useContext, useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { WeatherContext } from '../../contexts/WeatherContext'
import { GetCoordBySearch } from '../../utils/utils';

const SearchArea = () => {
  const [input, setInput] = useState('');
  const { recentSearchLoc, setRecentSearchLoc, fetchAllWeatherData, setLocationName, coord } = useContext(WeatherContext);
  useEffect(() => {
    setInput('')
  }, [coord])
  return (
    <div className='flex py-4 gap-x-10 pt-10'>
      <div className="searchBar w-2/8 relative">
        <input type="text" className='w-full px-4 py-2 border-[1px] border-[#ffffff3f] rounded-xl bg-[#ffffff28] focus:outline-none' value={input} placeholder='Search for locations' onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => {
          if (e.key === 'Enter') {
            GetCoordBySearch(input)
              .then(data => {
                fetchAllWeatherData(...data.coord);
                return data;
              })
              .then(data => {
                const adjustedNameArr = data.locationName.split(',');
                adjustedNameArr[0] = input;
                const adjustedName = adjustedNameArr.join();
                const newRecentLocation = {
                  name: adjustedName,
                  coord: data.coord
                }
                console.log(newRecentLocation.name);
                setLocationName(newRecentLocation.name)
                const updatedRecentSearchLoc = [...recentSearchLoc];
                if (!updatedRecentSearchLoc.find(item => item.name === newRecentLocation.name)) updatedRecentSearchLoc.splice(0, 0, newRecentLocation);
                if (updatedRecentSearchLoc.length > 4) updatedRecentSearchLoc.pop();
                setRecentSearchLoc(updatedRecentSearchLoc);
              })
          }
        }} />
        <span className="absolute top-3 right-3">
          <FaSearch />
        </span>
      </div>
      <div className="recentSearchedLocations flex gap-x-4">
        {
          recentSearchLoc?.map(location => (
            <div key={location.coord[1]} className='px-4 py-2 border-[1px] border-[#ffffff3d] rounded-xl bg-[#ffffff28] cursor-pointer hover:bg-[#ffffff4d] duration-300' onClick={() => {
              fetchAllWeatherData(location.coord[0], location.coord[1])
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