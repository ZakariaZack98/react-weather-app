const apiKey = import.meta.env.VITE_OW_APIKey;
const WEATHER_PRIORITY = [
  "Thunderstorm",
  "Rain",
  "Snow",
  "Drizzle",
  "Clouds",
  "Clear",
  "Mist",
  "Fog",
];

//* API DATA FETCH HELPER FUNCTION
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  const data = await response.json();
  return data;
}

/**
 * TODO: FETCH CURRENT WEATHER OF THE SELECTED POSITION ON THE MAP ==============================================
 * @param {lat} number latitude value from the leaflet map
 * @param {lon} number longitude value from the leaflet map
 * */ 
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
 * TODO: FETCH CURRENT AIR QUALITY OF THE SELECTED POSITION ON THE MAP ==============================================
 * @param {lat} number
 * @param {lon} number 
 * @return  {aqiData} object containing Air Quality data
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
 * TODO: Determine the wind direction from degree value==========================================================
 * @param {number} deg - Wind direction in degrees (0-360)
 * @returns {string} Wind direction abbreviation
 */
export function GetWindDirection(deg) {
  if (typeof deg !== 'number' || isNaN(deg)) return '';
  const directions = [
    'N', 'NNE', 'NE', 'ENE',
    'E', 'ESE', 'SE', 'SSE',
    'S', 'SSW', 'SW', 'WSW',
    'W', 'WNW', 'NW', 'NNW'
  ];
  //* Each sector is 22.5°
  const index = Math.round(((deg % 360) / 22.5)) % 16;
  return directions[index];
}

/**
 * TODO: FETCH FORECAST FOR 5 DAYS OF THE SELECTED POSITION ON THE MAP ==============================================
 * @param {lat} number
 * @param {lon} number 
 * @return  {foreCastData} object containing Air Quality data
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
 * TODO: FETCH  WEATHER OF THE SEARCHED LOCATION ==============================================
 * @param {cityName} string name of the city/place
 * 
 * */ 
export async function GetWeatherBySearch(cityName) {
  weatherData = await fetchData(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
  );
  lat = weatherData.coord.lat;
  lon = weatherData.coord.lon;
}

//* Formate ISO Date String to Readable date ie. 15 Apr
export const DateFormatter = (dateStr) => {
  const date = new Date(dateStr);

  const formatter = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
  });
  return formatter.format(date);
};


export function ConvertToLocalISOString(dateTimeString) {
  const date = new Date(dateTimeString);
  const pad = (num) => num.toString().padStart(2, '0');
  
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

const isDaytime = (entry) => entry.sys.pod === "d";

// * CONVERT ISO TIME STRING TO LOCAL AM/PM TIME
export const ConvertTo12Hour = (time24) => {
  const [hours, minutes, seconds] = time24?.split(':');
  const hour = parseInt(hours);
  
  const period = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  
  return `${hour12} ${period}`;
}



/**
 * TODO: GET DAY & NIGHT DOMINANT WEATHER ICON====================================================
 * @param {dailyData} array of daily forecast data/ 3hours step
 * @return {dominantIcon} object containing dominant day and night icon code
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
      daytimeEntries.find(
        (entry) => entry.weather[0].main === dominantDayCondition
      ) || daytimeEntries[0];

    //for nighttime icon
    let dominantNightCondition = "Clear";
    for (const condition of WEATHER_PRIORITY) {
      if (
        nighttimeEntries.some((entry) => entry.weather[0].main === condition)
      ) {
        dominantNightCondition = condition;
        break;
      }
    }
    const dominantNightEntry =
      nighttimeEntries.find(
        (entry) => entry.weather[0].main === dominantNightCondition
      ) || nighttimeEntries[0];

    return {
      dayIcon: dominantDayEntry?.weather[0]?.icon || '01d',
      nightIcon: dominantNightEntry?.weather[0]?.icon || '01n',
    };
  }
};

/**
 * TODO: GET MAX & MIN TEMP BASED ON HOURLY FORECAST DATA ============================================
 * @param {dailyData} array of daily forecast data/ 3hours step
 * @return {tempSummery} object containing min & max temp
 * */ 
export const GetTempSummery = (dailyData) => {
  if (dailyData && dailyData.length > 0) {
    const max = Math.round(
      Math.max(...dailyData.map((data) => data.main.temp))
    );
    const min = Math.round(
      Math.min(...dailyData.map((data) => data.main.temp))
    );
    return {
      min,
      max,
    };
  }
};
