import React, { useState, useEffect } from 'react'
import { FaHome } from 'react-icons/fa'
import { FaInfo } from 'react-icons/fa6'
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllWeatherData, setWeatherMapMode } from '../../features/weatherData/weatherSlice'
import { ConvertToLocalISOString, GetAQICategory, GetWindDirection, IsDayTime, WeatherLayers } from '../../utils/utils'
import _ from '../../lib/componentsData'
import SummerySkeleton from '../LoadingSkeletons/SummerySkeleton'

// Fix for default marker icon in Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
})

const Summery = () => {
  const dispatch = useDispatch()
  const { locationName, coord, weatherDataNow, aqiData, hourlyForecastData, uvData, weatherMapMode, apiKey } = useSelector(state => state.weather)
  const [currentTime, setCurrentTime] = useState('');
  const weatherLayers = WeatherLayers;
  const selectedLayer = weatherLayers.find(layer => layer.modeName === weatherMapMode);
  const othersData = _.othersData;

  // TODO: UPDATE TIME
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedTime = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
      setCurrentTime(formattedTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  //TODO: GET THE USERS POSITION USING GEOLOCATION API & UPDATE WEATHER DATA ========================================
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          const { latitude, longitude } = location.coords;
          dispatch(fetchAllWeatherData({ lat: latitude, lon: longitude }))
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, [dispatch]);

  // TODO: Component to handle map click events and center the map & UPDATE WEATHER DATA =============================
  const LocationMarker = () => {
    const map = useMap();

    useEffect(() => {
      //? Center the map on the current position
      map.setView(coord, map.getZoom());
    }, [coord, map]);

    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        dispatch(fetchAllWeatherData({ lat, lon: lng }))
      },
    });

    return coord ? <Marker position={coord}></Marker> : null;
  };

  // TODO: FETCH CURRENT LOCATION WEATHER DATA BY GPS =================================
  const fetchCurrentLocationData = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          const { latitude, longitude } = location.coords;
          dispatch(fetchAllWeatherData({ lat: latitude, lon: longitude }));
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  // TODO: GET TODAYS HIGHEST & LOWEST TEMPERATURE=======================================================
  const getTodaysHighestTemp = () => {
    if (!hourlyForecastData || hourlyForecastData.length === 0) return null;
    const today = ConvertToLocalISOString(new Date()).split('T')[0];
    const todaysData = hourlyForecastData.filter(forecast => forecast.dt_txt.split(' ')[0] === today)
    if (todaysData.length === 0) return null;
    const highestTemp = Math.max(...todaysData.map(data => data.main.temp));
    return Math.round(highestTemp);
  }
  const getTodaysLowestTemp = () => {
    if (!hourlyForecastData || hourlyForecastData.length === 0) return null;
    const today = ConvertToLocalISOString(new Date()).split('T')[0];
    const todaysData = hourlyForecastData.filter(forecast => forecast.dt_txt.split(' ')[0] === today)
    if (todaysData.length === 0) return null;
    const highestTemp = Math.min(...todaysData.map(data => data.main.temp));
    return Math.round(highestTemp);
  }

  if (!weatherDataNow || !aqiData || !hourlyForecastData ||
    Object.keys(weatherDataNow).length === 0 ||
    Object.keys(aqiData).length === 0 ||
    Object.keys(hourlyForecastData).length === 0) {
    return <SummerySkeleton />;
  }

  return (
    <div className="summery pb-2 text-shadow">
      <div className="locationHeading flex items-center gap-x-10 pb-2">
        <p>{locationName}</p>
        <span
          className="currentLoc w-8 h-8 flex justify-center items-center rounded-full border-[1px] border-white cursor-pointer"
          title="Go to my location"
          onClick={() => fetchCurrentLocationData()}
        >
          <FaHome />
        </span>
      </div>
      <div className="mainContent w-full flex lg:flex-nowrap flex-wrap gap-5 items-stretch">
        <div className="currentWeather lg:w-1/2 w-full h-100 md:h-90 p-7 surface-card rounded-lg flex flex-col justify-between">
          {
            weatherDataNow && aqiData && hourlyForecastData && Object.keys(weatherDataNow).length > 0 && Object.keys(aqiData).length > 0 && Object.keys(hourlyForecastData).length > 0 ? (
              <>
                <div className="heading">
                  <div className="text-sm font-semibold">Current Weather</div>
                  <div className="time text-sm">{currentTime}</div>
                </div>
                <div className="tempPart flex items-center">
                  <div className="temp flex items-center gap-x-3">
                    <picture>
                      <img
                        src={`https://openweathermap.org/img/wn/${weatherDataNow?.weather[0]?.icon}@2x.png`}
                        alt=""
                        className="w-30 object-fit-cover -translate-x-5"
                      />
                    </picture>
                    <h1 className="text-[55px] -translate-x-12">{Math.round(weatherDataNow?.main?.temp)}°c</h1>
                  </div>
                  <div className="condition">
                    <h2 className="text-lg font-semibold">{weatherDataNow?.weather[0]?.main}</h2>
                    <p className="">Feels Like {Math.round(weatherDataNow?.main?.feels_like)}°c</p>
                  </div>
                </div>
                <p className="suggestion mb-5">
                  Expect {weatherDataNow?.weather[0]?.description}, The {IsDayTime() ? 'High' : 'Low'} will be{' '}
                  {IsDayTime() ? `${getTodaysHighestTemp() ? `${getTodaysHighestTemp()}°c` : 'N/A'}` : `${getTodaysLowestTemp() ? `${getTodaysLowestTemp()}°c` : 'N/A'}`}.
                </p>
                <div className="othersUpdate w-full flex md:flex-nowrap flex-wrap md:gap-3 gap-10 justify-between">
                  {othersData?.map((item) => (
                    <div key={item.name}>
                      <div className="flex opacity-70">
                        <p className="text-[12px]">{item.name}</p>
                        <span className="text-[8px] ">
                          <FaInfo />
                        </span>
                      </div>
                      <div className='md:text-[1rem] text-sm'>{
                        item.name === 'Humidity'
                          ? weatherDataNow?.main?.humidity + '%'
                          : item.name === 'Air Quality'
                            ? GetAQICategory(aqiData.main.aqi).level
                            : item.name === 'Pressure'
                              ? weatherDataNow?.main?.pressure + 'mbr'
                              : item.name === 'Wind'
                                ? Math.round(weatherDataNow?.wind?.speed) + 'km/h' + " " + GetWindDirection(weatherDataNow?.wind?.deg) // !!direction calculation should be applied here
                                : item.name === 'Visibility'
                                  ? weatherDataNow?.visibility / 1000 + 'km'
                                  : uvData?.value
                      }</div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className='w-full h-full flex justify-center items-center'>
                Loading data...
              </div>
            )
          }
        </div>
        <div className="map lg:w-1/2 w-full md:h-90 h-70 rounded-lg relative z-0 overflow-hidden">
          <div
            className="mapMode absolute top-3 right-3 flex flex-col gap-y-2 border border-[rgba(0,0,0,0.3)] bg-white p-1.5"
            style={{
              zIndex: 1000,
              borderRadius: '8px',
              pointerEvents: 'auto',
            }}
          >
            {
              weatherLayers?.map(layer => (
                <span
                  key={layer.modeName}
                  className={`w-7 h-7 rounded flex justify-center items-center text-3xl duration-300 cursor-pointer ${weatherMapMode === layer.modeName ? 'text-white bg-[#000000a4]' : 'hover:bg-[rgba(0,0,0,0.18)] text-black'}`}
                  title={layer.modeName}
                  onClick={() => dispatch(setWeatherMapMode(layer.modeName))}
                >
                  {React.createElement(layer.icon)}
                </span>
              ))
            }
          </div>
          <MapContainer
            center={coord}
            zoom={7}
            scrollWheelZoom={false}
            className="w-full h-full"
            style={{ position: 'relative', zIndex: 0 }}
          >
            {/* Base OSM Layer */}
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* OpenWeatherMap Weather Layer */}
            {selectedLayer && (
              <TileLayer
                url={`https://tile.openweathermap.org/map/${selectedLayer.keyword}/{z}/{x}/{y}.png?appid=${apiKey}`}
                opacity={1}
              />
            )}
            <LocationMarker />
          </MapContainer>
        </div>
      </div>
    </div>
  )
}

export default Summery