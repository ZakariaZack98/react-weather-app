import React, { createContext, useState } from 'react'
const WeatherContext = createContext();
const WeatherProvider = ({children}) => {
  const apiKey = import.meta.env.VITE_OW_APIKey;
  const [recentSearchLoc, setRecentSearchLoc] = useState(['Dhaka', 'Khulna', 'Chittagong', 'Sylhet'])
  const [locationName, setLocationName] = useState('Dhaka, Bangladesh');
  const [coord, setCoord] = useState([23.8103, 90.4125]); //default dhaka coord
  const [weatherDataNow, setWeatherDataNow] = useState({})
  const [aqiData, setAqiData] = useState([]);
  const [hourlyForecastData, setHourlyForeCastData] = useState([]);
  const [dailyForecastData, setDailyForecastData] = useState([]);
  return (
    <WeatherContext.Provider value={{apiKey, recentSearchLoc, setRecentSearchLoc, locationName, setLocationName, coord, setCoord, weatherDataNow, setWeatherDataNow, aqiData, setAqiData, dailyForecastData, setDailyForecastData, hourlyForecastData, setHourlyForeCastData}}>
      {children}
    </WeatherContext.Provider>
  )
}

export { WeatherContext, WeatherProvider }