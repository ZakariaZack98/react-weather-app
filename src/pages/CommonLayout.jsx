import React from 'react'
import Navbar from '../components/common/Navbar'
import { Outlet } from 'react-router-dom'

const CommonLayout = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <footer/>
    </>
  )
}

export default CommonLayout