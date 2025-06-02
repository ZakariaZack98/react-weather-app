import React, { useContext } from 'react'
import { WeatherContext } from '../../../contexts/WeatherContext'

const VisibilityTrendCard = () => {
  const {weatherDataNow} = useContext(WeatherContext);
  const visibility = weatherDataNow?.visibility;
  const visibilityKM = visibility / 1000;

  // * HELPER FUNCTION TO GET VISIBILITY DISPLAY DATA
  function getVisibilityCategory(visibilityMeters) {
    if (visibilityMeters < 1000) return { 
      level: "Very Poor", 
      color: "#F44336", 
      advice: "Dense fog. Drive with caution." 
    };
    if (visibilityMeters < 4000) return { 
      level: "Poor", 
      color: "#FF9800", 
      advice: "Reduced visibility due to haze." 
    };
    if (visibilityMeters < 10000) return { 
      level: "Moderate", 
      color: "#FFC107", 
      advice: "Slight haze; generally safe." 
    };
    if (visibilityMeters < 20000) return { 
      level: "Good", 
      color: "#4CAF50", 
      advice: "Clear visibility." 
    };
    return { 
      level: "Excellent", 
      color: "#2196F3", 
      advice: "Perfect visibility conditions." 
    };
  }

  const visibilityDetails = getVisibilityCategory(visibility);

  return (
    <div className='min-h-75 p-4 flex flex-col gap-y-3 justify-between rounded-xl surface-card'>
      <h1 className='font-semibold'>Visibiity</h1>
      <div className="div flex flex-col justify-center items-center relative gap-y-2">
        {
          [50, 60, 70, 80, 90].map(item => 
          (<div key={item} className='w-full flex justify-center'>
            <div className={` h-3 rounded-xl ${item === 50 && visibilityKM < 9 ? 'bg-[rgba(0,0,0,0.52)]' : item === 60 && visibilityKM <= 7 ? 'bg-[rgba(0,0,0,0.52)]' : item === 70 && visibilityKM <= 5 ? 'bg-[rgba(0,0,0,0.52)]' : 'bg-green-700'}`} style={{width: `${item}%`}}></div>
          </div>))
        }
      </div>
      <div className="textSec">
        <div className="flex items-center gap-x-2">
          <p className='font-semibold'>{visibilityDetails.level}</p>
          <span className='h-5 w-5 rounded-full' style={{ backgroundColor: visibilityDetails.color }}></span>
        </div>
        <p className='text-[13px] mt-2'>{visibilityDetails.advice}</p>
      </div>
    </div>
  )
}

export default VisibilityTrendCard