import React, { useContext, useEffect, useState } from 'react'
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import { WeatherContext } from '../../contexts/WeatherContext'
import L from 'leaflet'
import _ from '../../lib/componentsData'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
})

const weatherLayers = _.weatherLayers;

const LocationMarker = () => {
  const map = useMap();

  useEffect(() => {
    map.setView([23.8103, 90.4125], map.getZoom());
  }, [map]);

  return <Marker position={[23.8103, 90.4125]} />;
};

const WeatherMap = () => {
  const { apiKey } = useContext(WeatherContext);
  const [selectedLayer, setSelectedLayer] = useState(weatherLayers[0]); // Default to first layer

  return (
    <div className="mapSection py-10">
      <h1 className="heading text-2xl font-semibold pb-4">GLOBAL WEATHER MAP</h1>
      <div className="relative h-120 w-full rounded-xl overflow-hidden">
        <div
          className="absolute top-3 right-3 z-[1000] flex flex-col gap-y-2 border border-[rgba(0,0,0,0.3)] bg-white p-2 rounded-lg shadow"
        >
          {weatherLayers.map(layer => (
            <button
              key={layer.modeName}
              className={`w-10 h-10 rounded flex justify-center items-center text-4xl duration-300 cursor-pointer
                ${selectedLayer.modeName === layer.modeName
                  ? 'text-white bg-blue-700'
                  : 'hover:bg-[rgba(0,0,0,0.10)] text-black'
                }`}
              title={layer.modeName}
              onClick={() => setSelectedLayer(layer)}
              type="button"
            >
              {React.createElement(layer.icon)}
            </button>
          ))}
        </div>
        <MapContainer
          center={[23.8103, 90.4125]}
          zoom={5}
          scrollWheelZoom={false}
          className="w-full h-full"
          style={{ position: 'relative', zIndex: 0 }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {selectedLayer && (
            <TileLayer
              url={`https://tile.openweathermap.org/map/${selectedLayer.keyword}/{z}/{x}/{y}.png?appid=${apiKey}`}
              opacity={1}
            />
          )}
          <LocationMarker />
        </MapContainer>
      </div>
      <div className="legends p-3 flex lg:justify-end justify-between md:gap-x-5 2xl:flex-nowrap flex-wrap gap-3 surface-card rounded-xl text-sm">
        {
          selectedLayer?.colors?.map( color => (
            <div key={color.color} className='flex gap-x-2'>
              <div style={{backgroundColor: color.color}} className={`h-5 w-5 rounded-full`}></div>
              <p>{color.range}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default WeatherMap