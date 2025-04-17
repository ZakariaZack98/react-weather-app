import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CommonLayout from './pages/CommonLayout'
import Home from './pages/home/Index'
import { WeatherProvider } from './contexts/WeatherContext'
import Aos from 'aos'
import "aos/dist/aos.css"

const App = () => {
  useEffect(() => {
    Aos.init({
      duration: 300,
      once: true,
    });
  })
  return (
    <WeatherProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<CommonLayout />}>
            <Route index element={<Home/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </WeatherProvider>
  )
}

export default App
