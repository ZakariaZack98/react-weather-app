import React, { createContext, useState } from 'react'
import { FetchAqiData, FetchCurrentWeatherByMap, FetchHourlyForeCast, FetchUVdata } from '../utils/utils';
import axios from 'axios';

const WeatherContext = createContext();

const WeatherProvider = ({ children }) => {
  const apiKey = import.meta.env.VITE_OW_APIKey;
  const [recentSearchLoc, setRecentSearchLoc] = useState([])
  const [locationName, setLocationName] = useState('Bosila, Dhaka');
  const [coord, setCoord] = useState([23.8103, 90.4125]);
  const [weatherDataNow, setWeatherDataNow] = useState({})
  const [aqiData, setAqiData] = useState([]);
  const [hourlyForecastData, setHourlyForeCastData] = useState([]);
  const [uvData, setUvData] = useState(null);
  const [weatherMapMode, setWeatherMapMode] = useState('');

  const fetchAllWeatherData = async (lat, lng) => {
    setCoord([lat, lng])
    Promise.allSettled([
      FetchCurrentWeatherByMap(lat, lng),
      axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`),
      FetchAqiData(lat, lng),
      FetchHourlyForeCast(lat, lng),
      FetchUVdata(lat, lng),
    ]).then((results) => {
      // Handle each result
      const [weatherResult, locationResult, aqiResult, hourlyForecastResult, uvResult] = results;

      if (weatherResult.status === 'fulfilled') {
        setWeatherDataNow(weatherResult.value);
      }

      if (locationResult.status === 'fulfilled') {
        const address = locationResult.value.data.address;
        setLocationName(`${address.town || address.suburb || address.county || ''}, ${address.state_district || ''}, ${address.state || ''}, ${address.country}`);
      }

      if (aqiResult.status === 'fulfilled') {
        setAqiData(aqiResult.value?.list[0]);
      }

      if (hourlyForecastResult.status === 'fulfilled') {
        setHourlyForeCastData(hourlyForecastResult.value.list);
      }

      if (uvResult.status === 'fulfilled') {
        setUvData(uvResult.value);
      }

    });
  }

  return (
    <WeatherContext.Provider value={{
      apiKey,
      fetchAllWeatherData,
      recentSearchLoc,
      setRecentSearchLoc,
      locationName,
      setLocationName,
      coord,
      setCoord,
      weatherDataNow,
      setWeatherDataNow,
      aqiData,
      setAqiData,
      hourlyForecastData,
      setHourlyForeCastData,
      uvData,
      setUvData,
      weatherMapMode,
      setWeatherMapMode
    }}>
      {children}
    </WeatherContext.Provider>
  )
}

export { WeatherContext, WeatherProvider }