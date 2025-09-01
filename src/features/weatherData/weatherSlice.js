import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {
  FetchAqiData,
  FetchCurrentWeatherByMap,
  FetchHourlyForeCast,
  FetchUVdata,
} from '../../utils/utils.js'

export const fetchAllWeatherData = createAsyncThunk(
  'weather/fetchAllWeatherData',
  async ({ lat, lon }, thunkAPI) => {
    try {
      const results = await Promise.allSettled([
        FetchCurrentWeatherByMap(lat, lon),
        axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`),
        FetchAqiData(lat, lon),
        FetchHourlyForeCast(lat, lon),
        FetchUVdata(lat, lon),
      ])

      const [weatherResult, locationResult, aqiResult, hourlyResult, uvResult] = results

      return {
        coord: [lat, lon],
        weatherDataNow: weatherResult.status === 'fulfilled' ? weatherResult.value : null,
        locationData: locationResult.status === 'fulfilled' ? locationResult.value.data : null,
        aqiData: aqiResult.status === 'fulfilled' ? aqiResult.value?.list?.[0] : null,
        hourlyForecastData: hourlyResult.status === 'fulfilled' ? hourlyResult.value?.list : null,
        uvData: uvResult.status === 'fulfilled' ? uvResult.value : null,
      }
    } catch (err) {
      return thunkAPI.rejectWithValue({ message: err.message })
    }
  }
)

const initialState = {
  apiKey: import.meta.env.VITE_OW_APIKey || '',
  recentSearchLoc: [],
  locationName: 'Bosila, Dhaka',
  coord: [23.8103, 90.4125],
  weatherDataNow: {},
  aqiData: null,
  hourlyForecastData: [],
  uvData: null,
  weatherMapMode: '',
  last365DaysData: [],
  status: 'idle',
  error: null,
  newsData: [],
}

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setCoord(state, action) { state.coord = action.payload },
    setLocationName(state, action) { state.locationName = action.payload },
    setWeatherMapMode(state, action) { state.weatherMapMode = action.payload },
    setRecentSearchLoc(state, action) { state.recentSearchLoc = action.payload },
    setNewsData(state, action) { state.newsData = action.payload },
    // add other simple setters if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllWeatherData.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchAllWeatherData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const payload = action.payload
        if (payload.coord) state.coord = payload.coord
        if (payload.weatherDataNow) {
          state.weatherDataNow = payload.weatherDataNow
          // set a readable locationName if reverse lookup available
          if (payload.weatherDataNow.name && payload.weatherDataNow.sys?.country) {
            state.locationName = `${payload.weatherDataNow.name}, ${payload.weatherDataNow.sys.country}`
          }
        }
        if (payload.locationData) {
          const addr = payload.locationData.address || {}
          state.locationName = `${addr.town || addr.suburb || addr.county || ''}, ${addr.state_district || ''}, ${addr.state || ''}, ${addr.country || ''}`.replace(/(^[,\s]+|[,\s]+$)/g,'')
        }
        state.aqiData = payload.aqiData || state.aqiData
        state.hourlyForecastData = payload.hourlyForecastData || state.hourlyForecastData
        state.uvData = payload.uvData || state.uvData
        state.last365DaysData = payload.last365Days?.days || state.last365DaysData
      })
      .addCase(fetchAllWeatherData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload?.message || action.error.message
      })
  }
})

export const { setCoord, setLocationName, setWeatherMapMode, setRecentSearchLoc, setNewsData } = weatherSlice.actions
export default weatherSlice.reducer