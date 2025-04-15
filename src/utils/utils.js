const apiKey = import.meta.env.VITE_OW_APIKey;
const weatherApiKey = import.meta.env.VITE_WEATHER_APIKey;

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  const data = await response.json();
  return data;
}

export const FetchCurrentWeatherByMap = async (lat, lon) => {
  try {
    return await fetchData(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
  } catch (err) {
    console.error("Error fetching weather data", err.message);
  }
};

export const FetchAqiData = async (lat, lon) => {
  try {
    return await fetchData(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );
  } catch (error) {
    console.error("Error fetching AQI data", err.message);
  }
};

export const FetchHourlyForeCast = async (lat, lon) => {
  try {
    return await fetchData(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
  } catch (error) {
    console.error("Error fetching hourly forecast data", err.message);
  }
};

export async function GetWeatherBySearch(cityName) {
  weatherData = await fetchData(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
  );
  lat = weatherData.coord.lat;
  lon = weatherData.coord.lon;
}

export const DateFormatter = (timeStamp) => {
  const date = new Date(timeStamp);

  const formatter = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
  });
  return formatter.format(date);
};
