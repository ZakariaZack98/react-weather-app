import { configureStore } from '@reduxjs/toolkit'
import weatherReducer from '../features/weatherData/weatherSlice'

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
})