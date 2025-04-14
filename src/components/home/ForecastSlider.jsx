import React, { useState } from 'react'
import { FaChartBar, FaList } from 'react-icons/fa';

const ForecastSlider = () => {
  const modes = ['Overview', 'Precipitation', 'Wind', 'Humidity', 'Cloud Cover', 'Pressure', 'Visibility', 'Feels Like'];
  const [visualizeMode, setVisualizeMode] = useState('chart');
  const [activeMode, setActiveMode] = useState('Overview');
  return (
    <div>
      <div className="modePart flex justify-between items-center">
        <div className="modes flex gap-x-4 py-3">
          {
            modes?.map((mode, idx) => (
              <p key={idx} className={`px-6 py-1 border border-[#ffffff3d] rounded-xl ${activeMode === mode ? 'bg-yellow-500 text-black font-bold' : 'bg-[#ffffff28] hover:bg-[#ffffff4d]'} cursor-pointer  duration-300 opacity-70`} onClick={() => setActiveMode(mode)}>{mode}</p>
            ))
          }
        </div>
        <div className="visualizationSwitch flex justify-center items-center">
          <div className={`chart flex justify-center items-center gap-x-1 px-5 py-2 border border-[#ffffff3d] rounded-s-xl ${visualizeMode === 'chart' ? 'bg-yellow-500 text-black font-bold' : 'bg-[#ffffff28] hover:bg-[#ffffff4d]'} cursor-pointer opacity-70`} onClick={() => setVisualizeMode('chart')}>
            <span>
              <FaChartBar/>
            </span>
          </div>
          <div className={`list flex justify-center items-center gap-x-1 px-5 py-2 border border-[#ffffff3d] rounded-e-xl ${visualizeMode === 'list' ? 'bg-yellow-500 text-black font-bold' : 'bg-[#ffffff28] hover:bg-[#ffffff4d]'} cursor-pointer opacity-70`} onClick={() => setVisualizeMode('list')}>
            <span>
              <FaList/>
            </span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ForecastSlider