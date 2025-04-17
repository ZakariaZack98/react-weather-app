import React, { useEffect, useState } from "react";
import { DateFormatter } from "../../utils/utils";
import ProgressBar from "./ProgressBar";

const AltDayCard = ({ foreCastData, date, activeDay, setActiveDay, activeMode }) => {

  const [progressBarData, setProgressBarData] = useState({
    max: 100,
    input: 0,
    color: 'blue'
  });

  useEffect(() => {
    if(activeMode === 'Precipitation') {
      setProgressBarData({
        input: Math.max(...foreCastData?.data?.map(hourlyData => hourlyData.pop * 100)),
        color: 'blue'
      })
    } else if(activeMode === 'Cloud Cover') {
      setProgressBarData({
        input: foreCastData?.data?.map(hourlyData => hourlyData.clouds.all).reduce((a, b) => a + b) / foreCastData?.data?.length,
        color: 'cyan'
      }) 
    } else if(activeMode === 'Wind') {
      setProgressBarData({
        max: Math.max(...foreCastData?.data?.map(hourlyData => hourlyData.wind.speed)),
        input: foreCastData?.data?.map(hourlyData => hourlyData.wind.speed).reduce((a, b) => a + b) / foreCastData?.data?.length,
        color: '#85BDF6'
      }) 
    } else if(activeMode === 'Humidity') {
      setProgressBarData({
        max: Math.max(...foreCastData?.data?.map(hourlyData => hourlyData.wind.speed)),
        input: foreCastData?.data?.map(hourlyData => hourlyData.main.humidity).reduce((a, b) => a + b) / foreCastData?.data?.length,
        color: '#85BDF6'
      }) 
    } else if(activeMode === 'Visibility') {
      setProgressBarData({
        max: 100,
        input: 100, // !API Providing innacurate data
        color: '#43A36B'
      }) 
    } else if(activeMode === 'Pressure') {
      setProgressBarData({
        max: Math.max(...foreCastData?.data?.map(hourlyData => hourlyData.main.pressure)) - 990,
        input: ((foreCastData?.data?.map(hourlyData => hourlyData.main.humidity).reduce((a, b) => a + b) / foreCastData?.data?.length) - 990),
        color: '#8A83EE'
      }) 
    } 
  }, [activeMode, foreCastData])


  return (
    <div
      className={`w-1/5 ${
        date === activeDay ? "bg-[#3e5063] h-44" : "bg-[#334454]"
      } py-5 px-7 rounded-xl flex flex-col gap-y-4 cursor-pointer`}
      data-date={date}
      onClick={() => setActiveDay(date)}>
      <div className="date flex justify-between items-center">
        <p className="date text-2xl font-semibold">
          {DateFormatter(new Date().toISOString().split("T")[0]) === foreCastData.date ? "Today" : foreCastData.date}
        </p>
        <p>{foreCastData.day}</p>
      </div>
      <div className="iconAndDate flex justify-between items-stretch">
        <div className="flex">
          <picture className="h-17 w-17 flex justify-center items-center rounded-full bg-blue-300 relative z-10">
            <img
              src={`https://openweathermap.org/img/wn/${foreCastData.dominantIcons.dayIcon}@2x.png`}
              alt=""
              className="h-15 scale-125"
            />
          </picture>
          <picture className="h-17 w-17 flex justify-center items-center rounded-full bg-blue-950 -translate-x-3">
            <img
              src={`https://openweathermap.org/img/wn/${foreCastData.dominantIcons.nightIcon}@2x.png`}
              alt=""
              className="h-15 scale-125"
            />
          </picture>
        </div>
        <div style={{ height: "70px", display: "flex", alignItems: "center", zIndex: 50 }}>
          <ProgressBar maxValue={progressBarData.max || 100} inputValue={progressBarData.input} color={progressBarData.color} />
        </div>
      </div>
    </div>
  );
};

export default AltDayCard;
