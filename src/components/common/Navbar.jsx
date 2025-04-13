import React from 'react'
import { FaGear } from 'react-icons/fa6'
import { useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navElems = ['Discover', 'Following', 'Weather', 'Hourly', 'Monthly', 'Trends', 'Severe Weather', 'Hurricanes', 'Pollens', 'Storm Updates', 'Earthquakes', 'Air Qyality']
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  return (
    <div className="bg-white">
      <div className= 'container mx-auto py-4 flex justify-between'>
      <div className="navItems flex items-center gap-x-7 font-medium">
        {
          navElems?.map((elem, idx) => <span key={idx} className={elem === path ? 'font-bold' : ''} onClick={() => navigate(`/${elem}`)}>{elem}</span>)
        }
      </div>
      <span>
        <FaGear/>
      </span>
    </div>
    </div>
  )
}

export default Navbar