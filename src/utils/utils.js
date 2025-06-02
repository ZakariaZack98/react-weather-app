import { WiThermometer, WiCloudy, WiStrongWind, WiBarometer, WiRaindrops } from "react-icons/wi";
import lookup from "country-code-lookup";

const apiKey = import.meta.env.VITE_OW_APIKey;
const vcApiKey = import.meta.env.VITE_VC_APIKey;
const wbApiKey = import.meta.env.VITE_WB_APIKey;
const newsApiKey = import.meta.env.VITE_NEWS_APIKey;
const WEATHER_PRIORITY = ["Thunderstorm", "Rain", "Snow", "Drizzle", "Clouds", "Clear", "Mist", "Fog"];

/**
 * TODO: Fetches data from the given URL ===========================================================
 * @param {string} url The URL to fetch the data from.
 * @returns {Promise<Object>} A promise that resolves to the fetched data.
 * @throws {Error} If the response status is not 200.
 */
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  const data = await response.json();
  return data;
}


// TODO: DETERMINE IF IT'S NIGHT OR DAY===============================================================
export const IsDayTime = () => {
  const currentHour = new Date().getHours();
  return currentHour >= 6 && currentHour < 18;
};


/**
 * TODO: Fetches current weather data for the given latitude and longitude =============================
 * @param {number} lat - The latitude of the location.
 * @param {number} lon - The longitude of the location.
 * @return {Promise<Object>} A promise that resolves to the current weather data.
 * @throws {Error} If there is an error fetching the weather data.
 */
export const FetchCurrentWeatherByMap = async (lat, lon) => {
  try {
    return await fetchData(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
  } catch (err) {
    console.error("Error fetching weather data", err.message);
  }
};


/**
 * TODO: FETCH CURRENT AIR QUALITY OF THE SELECTED LOCATION ==============================================
 * @param {number} lat - The latitude of the location.
 * @param {number} lon - The longitude of the location.
 * @return  {aqiData} object containing Air Quality data
 * @throws {Error} If there is an error fetching the weather data.
 * */
export const FetchAqiData = async (lat, lon) => {
  try {
    return await fetchData(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );
  } catch (error) {
    console.error("Error fetching AQI data", err.message);
  }
};


/**
 * TODO: FETCH CURRENT UV DATA OF THE SELECTED LOCATION ==============================================
 * @param {number} lat - The latitude of the location.
 * @param {number} lon - The longitude of the location.
 * @return  {UVdata} object containing Air Quality data
 * @throws {Error} If there is an error fetching the weather data.
 * */
export const FetchUVdata = async (lat, lon) => {
  try {
    return await fetchData(`https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`);
  } catch (error) {
    console.error("Error fetching AQI data", err.message);
  }
};


/**
 * TODO: FETCH LAST 30 DAYS WEATHER DATA=============================================================
 * @param {number} lat - The latitude of the location.
 * @param {number} lon - The longitude of the location.
 * @return  {array} containing last 30 days weather data
 * @throws {Error} If there is an error fetching the weather data.
 * */
export const FetchLast30DaysData = async (lat, lon) => {
  try {
    const today = new Date();
    const endDate = today.toISOString().split("T")[0]; // yyyy-mm-dd
    const startDate = new Date(today.setDate(today.getDate() - 30)).toISOString().split("T")[0];

    return await fetchData(`https://api.weatherbit.io/v2.0/history/daily?lat=${lat}&lon=${lon}&start_date=${startDate}&end_date=${endDate}&key=${wbApiKey}
`);
  } catch (error) {
    console.error("Error Fetching last 30 days data", error.message);
  }
};


/**
 * TODO: FETCH LAST 365 DAYS WEATHER DATA=============================================================
 * @param {number} lat - The latitude of the location.
 * @param {number} lon - The longitude of the location.
 * @return {array} containing last 365 days weather data
 * @throws {Error} If there is an error fetching the weather data.
 * */
export const FetchLast365DaysData = async (lat, lon) => {
  try {
    const today = new Date();
    const endDate = today.toISOString().split("T")[0]; // yyyy-mm-dd
    const startDate = new Date(today.setDate(today.getDate() - 365)).toISOString().split("T")[0];

    return await fetchData(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}/${startDate}/${endDate}?unitGroup=metric&include=days&key=${vcApiKey}&contentType=json

`);
  } catch (error) {
    console.error("Error Fetching last 30 days data", error.message);
  }
};



/**
 * TODO: FETCH FORECAST FOR 5 DAYS OF THE SELECTED POSITION ON THE MAP ==============================================
 * @param {number} lat - The latitude of the location.
 * @param {number} lon - The longitude of the location.
 * @return  {array}  containing 5 days of weather forecast data (3 hours step)
 * @throws {Error} If there is an error fetching the weather data.
 * */
export const FetchHourlyForeCast = async (lat, lon) => {
  try {
    return await fetchData(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
  } catch (error) {
    console.error("Error fetching hourly forecast data", err.message);
  }
};


/**
 * TODO: FETCH  FULL NAME & CO-ORDINATE THE SEARCHED LOCATION ==============================================
 * @param {cityName} string name of the city/place
 * @return {object} conatining co-ordinate & location name
 * @throws {Error} If there is an error fetching the weather data.
 * */
export async function GetCoordBySearch(cityName) {
  try {
    const weatherData = await fetchData(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
    );
    const lat = weatherData.coord.lat;
    const lon = weatherData.coord.lon;
    return {
      coord: [lat, lon],
      locationName: `${weatherData.name}, ${lookup.byIso(weatherData.sys.country).country}`,
    };
  } catch (error) {
    console.error("Error getting name & co-ordinate of the searched location- ", error.message);
  }
}


/**
 * TODO: Fetch weather related news articles from NewsAPI.org ======================================
 * @return {newsData} object containing weather related news articles
 * @throws {Error} if there is an error fetching news
 */
export const FetchNews = async () => {
  try {
    return await fetchData(`https://newsapi.org/v2/everything?q=weather&apiKey=${newsApiKey}`);
  } catch (error) {
    console.error("Error fetching news", error);
  }
};


//* Formate ISO Date String to Readable date ie. 15 Apr
export const DateFormatter = (dateStr) => {
  const date = new Date(dateStr);
  const formatter = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
  });
  return formatter.format(date);
};


/**
 * TODO: Convert ISO 8601 date string to local ISO date string=======================================
 * @param {string} dateTimeString ISO 8601 date string
 * @returns {string} local ISO date string
 */
export function ConvertToLocalISOString(dateTimeString) {
  const date = new Date(dateTimeString);
  const pad = (num) => num.toString().padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(
    date.getMinutes()
  )}:${pad(date.getSeconds())}`;
}

const isDaytime = (entry) => entry.sys.pod === "d";

// * CONVERT ISO TIME STRING TO LOCAL AM/PM TIME
export const ConvertTo12Hour = (time24) => {
  const [hours, minutes, seconds] = time24?.split(":");
  const hour = parseInt(hours);

  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;

  return `${hour12} ${period}`;
};

/**
 * TODO: GET DAY & NIGHT DOMINANT WEATHER ICON====================================================
 * @param {array} dailyData - array of daily forecast data/ 3hours step
 * @return {object} object containing dominant day and night icon code
 * */
export const GetDailyIcon = (dailyData) => {
  if (dailyData && dailyData.length > 0) {
    const daytimeEntries = dailyData.filter(isDaytime);
    const nighttimeEntries = dailyData.filter((data) => !isDaytime(data));

    let dominantDayCondition = "Clear";
    for (const condition of WEATHER_PRIORITY) {
      if (daytimeEntries.some((entry) => entry.weather[0].main === condition)) {
        dominantDayCondition = condition;
        break;
      }
    }
    const dominantDayEntry =
      daytimeEntries.find((entry) => entry.weather[0].main === dominantDayCondition) || daytimeEntries[0];

    //for nighttime icon
    let dominantNightCondition = "Clear";
    for (const condition of WEATHER_PRIORITY) {
      if (nighttimeEntries.some((entry) => entry.weather[0].main === condition)) {
        dominantNightCondition = condition;
        break;
      }
    }
    const dominantNightEntry =
      nighttimeEntries.find((entry) => entry.weather[0].main === dominantNightCondition) || nighttimeEntries[0];

    return {
      dayIcon: dominantDayEntry?.weather[0]?.icon || "01d",
      nightIcon: dominantNightEntry?.weather[0]?.icon || "01n",
    };
  }
};

/**
 * TODO: GET MAX & MIN TEMP BASED ON HOURLY FORECAST DATA ============================================
 * @param {array}  of daily forecast data/ 3hours step
 * @return {object} object containing min & max temp
 * */
export const GetTempSummery = (dailyData) => {
  if (dailyData && dailyData.length > 0) {
    const max = Math.round(Math.max(...dailyData.map((data) => data.main.temp)));
    const min = Math.round(Math.min(...dailyData.map((data) => data.main.temp)));
    return {
      min,
      max,
    };
  }
};

/**
 * TODO: RETURN THE CLOSEST TIMESTRING TO CURRENT LOCAL TIME FROM AN ARRAY OF TIMESTRINGS===============================
 * @param {array} timeArray - times from forecast data
 * @returns {string} closest time
 */
export const GetClosestTime = (timeArray) => {
  const timeToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const timeArrayInMinutes = timeArray.map(timeToMinutes);

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const closestTimeInMinutes = timeArrayInMinutes.reduce(
    (closest, time) => {
      const timeDiff = Math.abs(time - currentMinutes);
      const wrapAroundDiff = Math.abs(time + 1440 - currentMinutes);
      const minDiff = Math.min(timeDiff, wrapAroundDiff);

      if (minDiff < closest.diff) {
        return { time, diff: minDiff };
      }
      return closest;
    },
    { time: null, diff: Infinity }
  ).time;

  return timeArray[timeArrayInMinutes.indexOf(closestTimeInMinutes)];
};


// *HELPER FUNCTION FOR GETTING WEATHER MAP MODES=====================================
export const WeatherLayers = [
  {
    modeName: "Temperature",
    icon: WiThermometer,
    keyword: "temp_new",
  },
  {
    modeName: "Precipitation",
    icon: WiRaindrops,
    keyword: "precipitation_new",
  },
  {
    modeName: "Clouds",
    icon: WiCloudy,
    keyword: "clouds_new",
  },
  {
    modeName: "Wind",
    icon: WiStrongWind,
    keyword: "wind_new",
  },
  {
    modeName: "Pressure",
    icon: WiBarometer,
    keyword: "pressure_new",
  },
];

// * HELPER FUNCTION FOR GENERATING RANDOM WEATHER ICON CODE FOR 30 DAYS WEATHER DATA ===
// ? (PLACEHOLDER ICON)
export function GetRandomWeatherbitIconCode() {
  const weatherbitIcons = [
    "c01d",
    "c01n", // clear sky
    "c02d",
    "c02n", // few clouds
    "c03d",
    "c03n", // scattered clouds
    "c04d",
    "c04n", // overcast clouds
    "r01d",
    "r01n", // light rain
    "r02d",
    "r02n", // moderate rain
    "r03d",
    "r03n", // heavy rain
    "t01d",
    "t01n", // thunderstorm
    "t02d",
    "t02n", // thunderstorm + rain
    "s01d",
    "s01n", // light snow
    "s02d",
    "s02n", // moderate snow
    "s03d",
    "s03n", // heavy snow
    "a01d",
    "a01n", // mist/fog
    "d01d",
    "d01n", // dust
    "f01d",
    "f01n", // freezing fog
    "u00d",
    "u00n", // unknown
  ];

  const randomIndex = Math.floor(Math.random() * weatherbitIcons.length);
  return weatherbitIcons[randomIndex];
}


/**
 * TODO: Determine the wind direction from degree value==========================================================
 * @param {number} deg - Wind direction in degrees (0-360)
 * @returns {string} Wind direction abbreviation
 */
export function GetWindDirection(deg) {
  if (typeof deg !== "number" || isNaN(deg)) return "";
  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  //* Each sector is 22.5°
  const index = Math.round((deg % 360) / 22.5) % 16;
  return directions[index];
}


//* HELPER FUNCTION TO GET AQI DISPLAY DATA===============================================================
export const GetAQICategory = (aqi) => {
  const categories = [
    { level: "Good", color: "#4CAF50", advice: "Air quality is excellent." },
    {
      level: "Fair",
      color: "#FFEB3B",
      advice: "Sensitive groups should reduce outdoor activity.",
    },
    {
      level: "Moderate",
      color: "#FF9800",
      advice: "Some pollutants may affect health.",
    },
    {
      level: "Poor",
      color: "#F44336",
      advice: "Health effects possible for all.",
    },
    {
      level: "Very Poor",
      color: "#9C27B0",
      advice: "Avoid outdoor activities.",
    },
  ];
  return categories[aqi - 1] || categories[4]; // Default to "Very Poor" if invalid
};

