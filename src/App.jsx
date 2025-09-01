import React from 'react'
import './assets/transitions.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CommonLayout from './pages/CommonLayout'
import Home from './pages/home/index'
import { Provider } from 'react-redux'
import { store } from './app/store'


const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<CommonLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
