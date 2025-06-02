import { FaDroplet, FaTemperatureHigh, FaWind } from "react-icons/fa6";
import { WiCloudy, WiRaindrops, WiThermometer, WiStrongWind, WiBarometer } from 'react-icons/wi'

const _ = {};

_.weatherImageUrls = {
  Clear: "https://cdn.wallpapersafari.com/33/68/4lqsxp.jpg",
  Clouds: "https://images.pexels.com/photos/158827/field-corn-air-frisch-158827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  Rain: "https://plus.unsplash.com/premium_photo-1700131051396-307a36e3ef85?q=80&w=1569&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  Drizzle: "https://plus.unsplash.com/premium_photo-1675359389319-1ceefb06b9b5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZHJpenpsZXxlbnwwfHwwfHx8MA%3D%3D",
  Thunderstorm: "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  Snow: "https://images.unsplash.com/photo-1542601098-8fc114e148e2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  Mist: "https://images.wallpaperscraft.com/image/single/road_wood_fog_47232_2593x1729.jpg",
  Smoke: "https://plus.unsplash.com/premium_photo-1681079525383-f0b5bed4b343?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  Haze: "https://images.wallpaperscraft.com/image/single/road_wood_fog_47232_2593x1729.jpg",
  Dust: "https://images.unsplash.com/photo-1603695820889-f8a0a86b8712?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  Fog: "https://images.wallpaperscraft.com/image/single/road_wood_fog_47232_2593x1729.jpg",
  Sand: "https://images.unsplash.com/photo-1674109830348-3c9ce73f8abc?q=80&w=1520&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  Squall: "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  Tornado: "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
};

// SUMMERY ===========================================================
_.othersData = [
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
      name: 'UV Index',
    }
  ]

// FORECAST SLIDER ==================================================
_.forecastSliderModes = [
    "Overview",
    "Precipitation",
    "Wind",
    "Humidity",
    "Cloud Cover",
    "Pressure",
    "Visibility",
    "Feels Like",
  ]
_.cardLegends = [
    {
      name: 'Feels Like',
      icon: FaTemperatureHigh
    },
    {
      name: 'Precipitation',
      icon: FaDroplet
    },
    {
      name: 'Wind',
      icon: FaWind
    },
  ]

// GLOBAL WEATHER MAP ==============================================
_.weatherLayers = [
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
      { range: '2–5 m/s', color: '#f5d7f5' },       // light pink
      { range: '5–10 m/s', color: '#eb96eb' },      // dodger pink
      { range: '10–20 m/s', color: '#b81ab8' },     // medium pink
      { range: '> 20 m/s', color: '#8a0f8a' },      // dark pink
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
]
export default _;

