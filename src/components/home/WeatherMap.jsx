import React, { useContext, useEffect, useState } from 'react'
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import { WeatherContext } from '../../contexts/WeatherContext'
import L from 'leaflet'
import { WiCloudy, WiRaindrops, WiThermometer, WiStrongWind, WiBarometer } from 'react-icons/wi'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
})

const weatherLayers = [
  {
    modeName: 'Temperature',
    keyword: 'temp_new',
    icon: WiThermometer,
    colors: [
      { range: '< -20°C', color: '#00008B' },     // deep blue
      { range: '-20°C to 0°C', color: '#0000FF' }, // blue
      { range: '0°C to 10°C', color: '#00FFFF' },  // cyan
      { range: '10°C to 20°C', color: '#00FF00' }, // green
      { range: '20°C to 30°C', color: '#FFFF00' }, // yellow
      { range: '30°C to 40°C', color: '#FFA500' }, // orange
      { range: '> 40°C', color: '#FF0000' },       // red
    ]
  },
  {
    modeName: 'Precipitation',
    keyword: 'precipitation_new',
    icon: WiRaindrops,
    colors: [
      { range: '0 mm/h', color: '#FFFFFF' },        // white = no rain
      { range: '0.1–1 mm/h', color: '#87CEFA' },    // light blue
      { range: '1–5 mm/h', color: '#4682B4' },      // steel blue
      { range: '5–20 mm/h', color: '#0000CD' },     // medium blue
      { range: '> 20 mm/h', color: '#00008B' },     // dark blue
    ]
  },
  {
    modeName: 'Clouds',
    keyword: 'clouds_new',
    icon: WiCloudy,
    colors: [
      { range: '0–20%', color: '#FFFFFF' },         // clear (white)
      { range: '20–50%', color: '#D3D3D3' },        // light gray
      { range: '50–80%', color: '#A9A9A9' },        // gray
      { range: '80–100%', color: '#696969' },       // dark gray
    ]
  },
  {
    modeName: 'Wind',
    keyword: 'wind_new',
    icon: WiStrongWind,
    colors: [
      { range: '0–2 m/s', color: '#E0FFFF' },       // light cyan
      { range: '2–5 m/s', color: '#ADD8E6' },       // light blue
      { range: '5–10 m/s', color: '#1E90FF' },      // dodger blue
      { range: '10–20 m/s', color: '#0000CD' },     // medium blue
      { range: '> 20 m/s', color: '#00008B' },      // dark blue
    ]
  },
  {
    modeName: 'Pressure',
    keyword: 'pressure_new',
    icon: WiBarometer,
    colors: [
      { range: '< 980 hPa', color: '#800000' },     // dark red
      { range: '980–1000 hPa', color: '#FFA07A' },  // light salmon
      { range: '1000–1020 hPa', color: '#F0E68C' }, // khaki
      { range: '1020–1040 hPa', color: '#ADFF2F' }, // green yellow
      { range: '> 1040 hPa', color: '#00FF7F' },    // spring green
    ]
  },
];

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
      <div className="legends p-3 flex justify-end gap-x-5 bg-[#ffffff42] rounded-xl text-sm">
        {
          selectedLayer?.colors?.map( color => (
            <div className='flex gap-x-2'>
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