import React, { createContext, useState } from 'react'
import { FetchAqiData, FetchCurrentWeatherByMap, FetchHourlyForeCast } from '../utils/utils';
import axios from 'axios';
const WeatherContext = createContext();
const WeatherProvider = ({children}) => {
  const apiKey = import.meta.env.VITE_OW_APIKey;
  const [recentSearchLoc, setRecentSearchLoc] = useState([])
  const [locationName, setLocationName] = useState('Bosila, Dhaka');
  const [coord, setCoord] = useState([23.8103, 90.4125]);
  const [weatherDataNow, setWeatherDataNow] = useState({})
  const [aqiData, setAqiData] = useState([]);
  const [hourlyForecastData, setHourlyForeCastData] = useState([]);

  const fetchAllWeatherData = async (lat, lng) => {
    Promise.allSettled([
      FetchCurrentWeatherByMap(lat, lng),
      axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`),
      FetchAqiData(lat, lng),
      FetchHourlyForeCast(lat, lng),
    ]).then((results) => {
      // Handle each result
      const [weatherResult, locationResult, aqiResult, hourlyForecastResult] = results;

      if (weatherResult.status === 'fulfilled') {
        setWeatherDataNow(weatherResult.value);
      }

      if (locationResult.status === 'fulfilled') {
        const address = locationResult.value.data.address;
        setLocationName(`${address.town || address.suburb || address.county || ''}, ${address.state_district}, ${address.state}, ${address.country}`);
      }

      if (aqiResult.status === 'fulfilled') {
        setAqiData(aqiResult.value?.list[0]);
      }

      if (hourlyForecastResult.status === 'fulfilled') {
        setHourlyForeCastData(hourlyForecastResult.value);
      }
      setCoord([lat, lng])
    });
  }
  
  return (
    <WeatherContext.Provider value={{apiKey, fetchAllWeatherData, recentSearchLoc, setRecentSearchLoc, locationName, setLocationName, coord, setCoord, weatherDataNow, setWeatherDataNow, aqiData, setAqiData, hourlyForecastData, setHourlyForeCastData}}>
      {children}
    </WeatherContext.Provider>
  )
}

export { WeatherContext, WeatherProvider }