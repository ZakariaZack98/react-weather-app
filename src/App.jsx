import React from 'react'
import './assets/transitions.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CommonLayout from './pages/CommonLayout'
import Home from './pages/home/index'
import { WeatherProvider } from './contexts/WeatherContext'
import { Provider } from 'react-redux'
import { store } from './app/store'


const App = () => {
  return (
    <WeatherProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<CommonLayout />}>
              <Route index element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </WeatherProvider>
  )
}

export default App
