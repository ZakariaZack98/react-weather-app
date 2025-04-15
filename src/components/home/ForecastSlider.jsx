import React, { useContext, useEffect, useState } from 'react'
import { FaChartBar, FaList } from 'react-icons/fa';
import { WeatherContext } from '../../contexts/WeatherContext';
import DayCard from '../common/DayCard';
import { DateFormatter } from '../../utils/utils';

const ForecastSlider = () => {
  const modes = ['Overview', 'Precipitation', 'Wind', 'Humidity', 'Cloud Cover', 'Pressure', 'Visibility', 'Feels Like'];
  const [visualizeMode, setVisualizeMode] = useState('chart');
  const [activeMode, setActiveMode] = useState('Overview');
  const {hourlyForecastData} = useContext(WeatherContext);
  const [weatherDataByDay , setWeatherDataByDay] = useState([]);
  const [day, setDay] = useState(0);

  /**
   * TODO: ORGANIZE ALL THE FORECAST DATA INTO AN ARRAY (INDEX WILL BE THE DAY; ie, 0 is today, 1 is next date & so on....)
   * @param {hourlyForecastData} {Array}
   * */ 
  useEffect(() => {
    if(hourlyForecastData && hourlyForecastData.length > 0) {
      const today = new Date();
      const weatherDataByDate = [];
      for(let i = 0; i <= 4; i++) {
        const nextDate = new Date(today);
        nextDate.setDate(today.getDate() + i);
        const formattedDate = nextDate.toISOString().split('T')[0];
        const targetDateData = hourlyForecastData.filter(data => data.dt_txt.split(' ')[0] === formattedDate);
        weatherDataByDate.push(targetDateData);
      }
      const updatedWeatherData = weatherDataByDate?.map(dateData => {
        return {
          id: 0,
          date: DateFormatter(dateData[0]?.dt),
          day: new Date(dateData[0]?.dt_txt.split(' ')[0]).toLocaleString('default', { weekday: 'long' }),
          data: dateData
        }
      })
      setWeatherDataByDay(updatedWeatherData);
    }
  }, [hourlyForecastData])


  return (
    <div className='pb-4'>
      <div className="modePart flex justify-between items-center pb-5">
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
      <div className="mainSlider">
        <div className="dayCardsWrapper flex">
          <DayCard/>
        </div>
      </div>
    </div>
  )
}

export default ForecastSlider