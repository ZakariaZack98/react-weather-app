import React, { createContext, useEffect, useState } from 'react'
import { FetchAqiData, FetchCurrentWeatherByMap, FetchHourlyForeCast, FetchNews, FetchUVdata } from '../utils/utils';
import axios from 'axios';
import lookup from "country-code-lookup";

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
  const [newsData, setNewsData] = useState([])

  useEffect(() => {
    FetchNews()
    .then(data => setNewsData(data?.articles))
    .catch(console.error)
  }, [])

  /**
   * TODO: Fetch all weather data for the given latitude and longitude =========================================
   * @param {number} lat - The latitude of the location
   * @param {number} lng - The longitude of the location
   * @returns void
   */
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
        setLocationName(`${weatherResult.value.name}, ${lookup.byIso(weatherResult.value.sys.country).country}`)
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
    })
    .catch(error => {
      console.error('Error fetching weather data- ', error.message)
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
      setWeatherMapMode,
      newsData
    }}>
      {children}
    </WeatherContext.Provider>
  )
}

export { WeatherContext, WeatherProvider }