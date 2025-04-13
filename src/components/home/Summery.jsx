import React, { useState, useEffect } from 'react'
import { FaHome } from 'react-icons/fa'
import { FaInfo } from 'react-icons/fa6'
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import axios from 'axios'

// Fix for default marker icon in Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
})

const Summery = ({ selectedLocation, currentWeatherData }) => {
  const [position, setPosition] = useState([23.8103, 90.4125]) // Default: Dhaka, Bangladesh
  const [positionName, setPositionName] = useState('Dhaka, Bangladesh')

  /**
   * TODO: GET THE USERS POSITION USING GEOLOCATION API=======================================
   * */
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          const { latitude, longitude } = location.coords
          setPosition([latitude, longitude])
          axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
            .then(response => {
              const address = response.data.address;
              setPositionName(`${address.town || address.suburb || address.county}, ${address.state_district}, ${address.state}, ${address.country}`);
            })
        },
        (error) => {
          console.error('Error getting location:', error)
        }
      )

    } else {
      console.error('Geolocation is not supported by this browser.')
    }
  }, [])

  // TODO: Component to handle map click events and center the map=============================
  const LocationMarker = () => {
    const map = useMap()

    useEffect(() => {
      map.setView(position, map.getZoom()) // Center the map on the current position
    }, [position, map])

    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]) // Update position on map click
        console.log([e.latlng.lat, e.latlng.lng]) // Update position on map click
        axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}`)
          .then(response => {
            const address = response.data.address;
            setPositionName(`${address.town || address.suburb || address.county}, ${address.state_district}, ${address.state}, ${address.country}`);
          })
      },
    })

    return position ? <Marker position={position}></Marker> : null
  }

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
    },
    {
      name: 'Dew Point',
      data: '18°c',
    },
  ]

  return (
    <div className="summery pb-5">
      <div className="locationHeading flex items-center gap-x-10 py-5">
        {/* selected location will go here */}
        <p>{positionName}</p>
        <span className="w-8 h-8 flex justify-center items-center rounded-full border-[1px] border-white">
          <FaHome />
        </span>
      </div>
      <div className="mainContent w-full flex gap-5 items-stretch">
        <div className="currentWeather w-1/2 h-90 p-5 bg-[rgba(255,255,255,0.14)] rounded-lg flex flex-col justify-between">
          <div className="heading">
            <div className="text-sm font-semibold">Current Weather</div>
            <div className="time text-sm">12:53 PM</div>
          </div>
          <div className="tempPart flex items-center">
            <div className="temp flex items-center gap-x-3">
              <picture>
                <img
                  src="/05-s.png"
                  alt=""
                  className="w-30 object-fit-cover -translate-x-5"
                />
              </picture>
              <h1 className="text-[55px] -translate-x-12">32°c</h1>
            </div>
            <div className="condition">
              <h2 className="text-lg font-semibold">Haze</h2>
              <p className="">Feels Like 36°c</p>
            </div>
          </div>
          <div className="suggestion">
            <p>Expect Sunny Skies, The High will be 40°c.</p>
          </div>
          <div className="othersUpdate w-full flex justify-between">
            {othersData?.map((item) => (
              <div key={item.name}>
                <div className="flex opacity-70">
                  <p className="text-[12px]">{item.name}</p>
                  <span className="text-[8px] ">
                    <FaInfo />
                  </span>
                </div>
                <p>{item.data}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="map w-1/2 h-90 rounded-lg relative z-50 overflow-hidden">
          <MapContainer
            center={position}
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