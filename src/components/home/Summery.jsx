import React, { useState, useEffect, useContext } from 'react'
import { FaHome } from 'react-icons/fa'
import { FaInfo } from 'react-icons/fa6'
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { WeatherContext } from '../../contexts/WeatherContext'
import { ConvertToLocalISOString } from '../../utils/utils'

// Fix for default marker icon in Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
})

const Summery = () => {
  const { fetchAllWeatherData, recentSearchLoc, setRecentSearchLoc, locationName, coord, weatherDataNow, aqiData, hourlyForecastData} = useContext(WeatherContext);

  const [currentTime, setCurrentTime] = useState('');


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

  /**
   * TODO: GET THE USERS POSITION USING GEOLOCATION API & UPDATE WEATHER DATA ========================================
   * */
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          const { latitude, longitude } = location.coords;
          fetchAllWeatherData(latitude, longitude)
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  // TODO: Component to handle map click events and center the map & UPDATE WEATHER DATA =============================
  const LocationMarker = () => {
    const map = useMap();

    useEffect(() => {
      // Center the map on the current position
      map.setView(coord, map.getZoom()); 
    }, [coord, map]);

    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        fetchAllWeatherData(lat, lng)
          .then(() => {
            const newRecentLocation = {
              name: `${locationName.split(',')[0]}, ${locationName.split(',')[1]}`,
              coord: coord
            }
            const updatedRecentSearchLoc = [...recentSearchLoc];
            if(!updatedRecentSearchLoc.find(item => item.name === newRecentLocation.name))updatedRecentSearchLoc.splice(0, 0, newRecentLocation);
            if (updatedRecentSearchLoc.length > 4) updatedRecentSearchLoc.pop();
            setRecentSearchLoc(updatedRecentSearchLoc);
          })
      },
    });

    return coord ? <Marker position={coord}></Marker> : null;
  };

  const othersData = [
    {
      name: 'Air Quality',
      data: 100,
    },
    {
      name: 'Wind',
      data: '2km/h NNE',
    },
    {
      name: 'Humidity',
      data: '66%',
    },
    {
      name: 'Visibility',
      data: '2km',
    },
    {
      name: 'Pressure',
      data: '1001mb',
    }
  ]

  // TODO: DETERMINE IF IT'S NIGHT OR DAY===============================================================
  const isDayTime = () => {
    const currentHour = new Date().getHours();
    return currentHour >= 6 && currentHour < 18;
  }


  // TODO: GET TODAYS HIGHEST & LOWEST TEMPERATURE=======================================================
  const getTodaysHighestTemp = () => {
    if(!hourlyForecastData || hourlyForecastData.length === 0) return null;
    const today = ConvertToLocalISOString(new Date()).split('T')[0];
    const todaysData = hourlyForecastData.filter(forecast => forecast.dt_txt.split(' ')[0] === today)
    if (todaysData.length === 0) return null;
    const highestTemp = Math.max(...todaysData.map(data => data.main.temp));
    return Math.round(highestTemp);
  }
  const getTodaysLowestTemp = () => {
    if(!hourlyForecastData || hourlyForecastData.length === 0) return null;
    const today = ConvertToLocalISOString(new Date()).split('T')[0];
    const todaysData = hourlyForecastData.filter(forecast => forecast.dt_txt.split(' ')[0] === today)
    if (todaysData.length === 0) return null;
    const highestTemp = Math.min(...todaysData.map(data => data.main.temp));
    return Math.round(highestTemp);
  }


  return (
    <div className="summery pb-5">
      <div className="locationHeading flex items-center gap-x-10 py-5">
        <p>{locationName}</p>
        <span className="w-8 h-8 flex justify-center items-center rounded-full border-[1px] border-white">
          <FaHome />
        </span>
      </div>
      <div className="mainContent w-full flex gap-5 items-stretch">
        <div className="currentWeather w-1/2 h-90 p-7 bg-[rgba(255,255,255,0.14)] rounded-lg flex flex-col justify-between">
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
                <p className="suggestion">
                Expect {weatherDataNow?.weather[0]?.description}, The {isDayTime() ? 'High' : 'Low'} will be{' '}
                {isDayTime() ? `${getTodaysHighestTemp() ? `${getTodaysHighestTemp()}°c` : 'N/A'}` : `${getTodaysLowestTemp() ? `${getTodaysLowestTemp()}°c` : 'N/A'}`}.
                </p>
                <div className="othersUpdate w-full flex justify-between">
                  {othersData?.map((item) => (
                    <div key={item.name}>
                      <div className="flex opacity-70">
                        <p className="text-[12px]">{item.name}</p>
                        <span className="text-[8px] ">
                          <FaInfo />
                        </span>
                      </div>
                      <p className=''>{
                        item.name === 'Humidity'
                          ? weatherDataNow?.main?.humidity + '%'
                          : item.name === 'Air Quality'
                            ? aqiData.main.aqi
                            : item.name === 'Pressure'
                              ? weatherDataNow?.main?.pressure + 'mbr'
                              : item.name === 'Wind'
                                ? Math.round(weatherDataNow?.wind?.speed) + 'km/h' + ' NNE' // !!direction calculation should be applied here
                                : item.name === 'Visibility'
                                  ? weatherDataNow?.visibility / 1000 + 'km'
                                  : null
                      }</p>
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
        <div className="map w-1/2 h-90 rounded-lg relative z-50 overflow-hidden">
          <MapContainer
            center={coord}
            zoom={13}
            scrollWheelZoom={false}
            className="w-full h-full"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker />
          </MapContainer>
        </div>
      </div>
    </div>
  )
}

export default Summery