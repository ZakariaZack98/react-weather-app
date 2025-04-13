import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import CommonLayout from './pages/CommonLayout'
import { WeatherProvider } from './contexts/WeatherContext'

const App = () => {
  return (
    <WeatherProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<CommonLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </WeatherProvider>
  )
}

export default App
