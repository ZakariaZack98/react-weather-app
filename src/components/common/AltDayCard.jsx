import React, { useEffect, useState } from "react";
import { DateFormatter } from "../../utils/utils";
import ProgressBar from "./ProgressBar";
import { FaCloudSun, FaDroplet, FaWind } from "react-icons/fa6";
import { FaCloudMoon } from "react-icons/fa";

const AltDayCard = ({ foreCastData, date, activeDay, setActiveDay, activeMode }) => {

  const [altCardData, setAltCardData] = useState({
    max: 100,
    input: 0,
    color: 'blue'
  });

  useEffect(() => {
    if (activeMode === 'Precipitation') {
      const allRainObj = foreCastData?.data?.map(hourlyData => hourlyData.rain).filter(item => Boolean(item));
      const avg = allRainObj.map(obj => Object.values(obj)[0]).reduce((a, b) => a + b) / allRainObj.length
      console.log(avg)
      setAltCardData({
        input: Math.max(...foreCastData?.data?.map(hourlyData => hourlyData.pop * 100)),
        color: 'rgba(78, 113, 252, 1)',
        topData: {
          data: avg.toFixed(2),
          prefix: 'in',
          icon: FaDroplet
        },
        bottomData: {
          data: Math.max(...foreCastData?.data?.map(hourlyData => hourlyData.pop * 100)),
          prefix: '% chances of rain',
          
        }
      })
    } else if (activeMode === 'Cloud Cover') {
      const dayObj = foreCastData?.data?.filter(hourlyData => hourlyData.sys.pod === 'd');
      const avgDayCloud = dayObj.map(data => data.clouds.all).reduce((a, b) => a + b) / dayObj.length;
      const nightObj = foreCastData?.data?.filter(hourlyData => hourlyData.sys.pod === 'n');
      const avgNightCloud = nightObj.map(data => data.clouds.all).reduce((a, b) => a + b) / nightObj.length;
      console.log(avgDayCloud)
      setAltCardData({
        input: foreCastData?.data?.map(hourlyData => hourlyData.clouds.all).reduce((a, b) => a + b) / foreCastData?.data?.length,
        color: 'cyan',
        topData: {
          data: Math.round(avgDayCloud),
          prefix: '%',
          icon: FaCloudSun
        },
        bottomData: {
          data: Math.round(avgNightCloud),
          prefix: '%',
          icon: FaCloudMoon
        }
      })
    } else if (activeMode === 'Wind') {
      const avgWindSpeed = foreCastData?.data?.map(hourlyData => hourlyData.wind.speed).reduce((a, b) => a + b) / foreCastData?.data?.length;
      const maxGust = Math.max(...foreCastData?.data?.map(hourlyData => hourlyData.wind.gust));
      setAltCardData({
        max: Math.max(...foreCastData?.data?.map(hourlyData => hourlyData.wind.speed)),
        input: foreCastData?.data?.map(hourlyData => hourlyData.wind.speed).reduce((a, b) => a + b) / foreCastData?.data?.length,
        color: '#85BDF6',
        topData: {
          data: Math.round(avgWindSpeed),
          prefix: 'mph',
        },
        bottomData: {
          data: `${Math.round(maxGust)}mph`,
          prefix: 'Wind Gust',
          icon: FaWind
        }
      })
    } else if (activeMode === 'Humidity') {
      setAltCardData({
        max: Math.max(...foreCastData?.data?.map(hourlyData => hourlyData.main.humidity)),
        input: foreCastData?.data?.map(hourlyData => hourlyData.main.humidity).reduce((a, b) => a + b) / foreCastData?.data?.length,
        color: '#85BDF6',
        topData: {
          data: `${Math.max(...foreCastData?.data?.map(hourlyData => hourlyData.main.humidity))}%`,
          prefix: 'max',
        },
        bottomData: {
          data: `${Math.min(...foreCastData?.data?.map(hourlyData => hourlyData.main.humidity))}%`,
          prefix: 'min',
        }
      })
    } else if (activeMode === 'Visibility') {
      setAltCardData({
        max: 100,
        input: 100, // !API Providing innacurate data
        color: '#43A36B',
        topData: {
          data: 10,
          prefix: 'km',
        },
        bottomData: {
          data: 'Excellent',
          prefix: '',
        }
      })
    } else if (activeMode === 'Pressure') {
      setAltCardData({
        // !API Providing innacurate data
        max: Math.max(...foreCastData?.data?.map(hourlyData => hourlyData.main.pressure)) - 990,
        input: ((foreCastData?.data?.map(hourlyData => hourlyData.main.pressure).reduce((a, b) => a + b) / foreCastData?.data?.length) - 990),
        color: '#8A83EE',
        topData: {
          data: `${Math.max(...foreCastData?.data?.map(hourlyData => hourlyData.main.pressure))}mbr`,
          prefix: 'max',
        },
        bottomData: {
          data: `${Math.max(...foreCastData?.data?.map(hourlyData => hourlyData.main.pressure))}mbr`,
          prefix: 'min',
        }
      })
    }
  }, [activeMode, foreCastData])


  return (
    <div
      className={`w-1/5 ${date === activeDay ? "bg-[#3e5063] h-44" : "bg-[#334454]"
        } py-5 px-7 rounded-xl flex flex-col gap-y-4 cursor-pointer`}
      data-date={date}
      onClick={() => setActiveDay(date)}>
      <div className="date flex justify-between items-center">
        <p className="date text-xl font-semibold">
          {DateFormatter(new Date().toISOString().split("T")[0]) === foreCastData.date ? "Today" : foreCastData.date}
        </p>
        <p>{foreCastData.day}</p>
      </div>
      <div className="iconAndDate flex justify-between items-stretch">
        {
          activeMode === 'Overview' || activeMode === 'Feels Like' ? (
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
          ) : (
            <div className="flex flex-col justify-end">
              <div className="topData flex items-end gap-x-2">
              {altCardData?.topData?.icon && (
                  <span className="text-2xl mb-1" style={{ color: altCardData?.color }}>
                    {React.createElement(altCardData.topData.icon)}
                  </span>
                )}
                <span className='text-2xl font-semibold'>{altCardData?.topData?.data}</span><span className="font-md font-medium">{altCardData?.topData?.prefix}</span>
              </div>
              <div className="bottomData flex items-end gap-x-2">
                {altCardData?.bottomData?.icon && (
                  <span className="text-2xl mb-1" style={{ color: altCardData?.color }}>
                    {React.createElement(altCardData.bottomData.icon)}
                  </span>
                )}
                <span className={`${activeMode === 'Humidity' || activeMode === 'Cloud Cover' || activeMode === 'Pressure' ? 'text-2xl font-semibold' : ''} opacity-50`}>
                  {altCardData?.bottomData?.data}
                </span><span className="opacity-50">{altCardData?.bottomData?.prefix}</span>
              </div>
            </div>
          )
        }
        <div style={{ height: "70px", display: "flex", alignItems: "center", zIndex: 50 }}>
          <ProgressBar maxValue={altCardData.max || 100} inputValue={altCardData.input} color={altCardData.color} />
        </div>
      </div>
    </div>
  );
};

export default AltDayCard;
