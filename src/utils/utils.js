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

const isDaytime = (entry) => entry.sys.pod === "d";


/**
 * TODO: GET DAY & NIGHT DOMINANT WEATHER ICON
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
