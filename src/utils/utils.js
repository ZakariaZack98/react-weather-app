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
 * TODO: FETCH CURRENT WEATHER OF THE SELECTED LOCATION ==============================================
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
 * TODO: FETCH CURRENT AIR QUALITY OF THE SELECTED LOCATION ==============================================
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

//* HELPER FUNCTION TO GET AQI DISPLAY DATA===============================================================
export const GetAQICategory = (aqi) => {
  const categories = [
    { level: "Good", color: "#4CAF50", advice: "Air quality is excellent." },
    { level: "Fair", color: "#FFEB3B", advice: "Sensitive groups should reduce outdoor activity." },
    { level: "Moderate", color: "#FF9800", advice: "Some pollutants may affect health." },
    { level: "Poor", color: "#F44336", advice: "Health effects possible for all." },
    { level: "Very Poor", color: "#9C27B0", advice: "Avoid outdoor activities." }
  ];
  return categories[aqi - 1] || categories[4]; // Default to "Very Poor" if invalid
}


/**
 * TODO: FETCH CURRENT UV DATA OF THE SELECTED LOCATION ==============================================
 * @param {lat} number
 * @param {lon} number 
 * @return  {UVdata} object containing Air Quality data
 * */ 
export const FetchUVdata = async (lat, lon) => {
  try {
    return await fetchData(
      `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`
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

/**
 * TODO: RETURN THE CLOSEST TIMESTRING TO CURRENT LOCAL TIME FROM AN ARRAY OF TIMESTRINGS===============================
 * @param {timeArray} array 
 * @returns {closestTime} string
 */ 
export const GetClosestTime = (timeArray) => {
  const timeToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
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
