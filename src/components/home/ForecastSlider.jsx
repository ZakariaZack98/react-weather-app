import React, { useContext, useEffect, useState } from "react";
import { FaChartBar, FaList, FaTemperatureHigh, FaWind } from "react-icons/fa";
import { WeatherContext } from "../../contexts/WeatherContext";
import DayCard from "../common/DayCard";
import { ConvertToLocalISOString, DateFormatter, GetDailyIcon, GetTempSummery } from "../../utils/utils";
import Chart from "./Chart";
import AltDayCard from "../common/AltDayCard";
import HourForecastCard from "../common/HourForecastCard";
import { FaDroplet } from "react-icons/fa6";

const ForecastSlider = () => {
  const modes = [
    "Overview",
    "Precipitation",
    "Wind",
    "Humidity",
    "Cloud Cover",
    "Pressure",
    "Visibility",
    "Feels Like",
  ];

  const cardLegends = [
    {
      name: 'Feels Like',
      icon: FaTemperatureHigh
    },
    {
      name: 'Precipitation',
      icon: FaDroplet
    },
    {
      name: 'Wind',
      icon: FaWind
    },
  ]

  const [visualizeMode, setVisualizeMode] = useState("chart");
  const [activeMode, setActiveMode] = useState("Overview");
  const { hourlyForecastData } = useContext(WeatherContext);
  const [weatherDataByDay, setWeatherDataByDay] = useState([]);
  const [activeDay, setActiveDay] = useState(
    new Date().toString().split(" ")[2] + " " + new Date().toString().split(" ")[1]
  );

  /**
   * TODO: ORGANIZE ALL THE FORECAST DATA INTO AN ARRAY (INDEX WILL BE THE DAY; ie, 0 is today, 1 is next date & so on....)
   * @param {hourlyForecastData} {Array}
   * */
  useEffect(() => {
    if (hourlyForecastData && hourlyForecastData.length > 0) {
      const today = new Date();
      const weatherDataByDate = [];

      // First day's data: first 8 elements (24 hours)
      weatherDataByDate.push(hourlyForecastData.slice(0, 8));

      // Next 4 days by date
      for (let i = 1; i <= 4; i++) {
        const nextDate = new Date(today);
        nextDate.setDate(today.getDate() + i);
        const formattedDate = ConvertToLocalISOString(new Date(nextDate)).split("T")[0]; //! LOCAL DATE BUG
        const targetDateData = hourlyForecastData.filter((data) => data.dt_txt.split(" ")[0] === formattedDate);
        weatherDataByDate.push(targetDateData);
      }

      const updatedWeatherData = weatherDataByDate.map((dateData) => {
        return {
          id: 0,
          date: DateFormatter(dateData[0].dt_txt.split(" ")[0]),
          day: new Date(dateData[0].dt_txt.split(" ")[0]).toLocaleString("default", { weekday: "long" }),
          dominantIcons: GetDailyIcon(dateData),
          tempSummery: GetTempSummery(dateData),
          data: dateData,
        };
      });

      setWeatherDataByDay(updatedWeatherData);
    }
  }, [hourlyForecastData]);

  if (weatherDataByDay && weatherDataByDay.length > 0) {
    return (
      <div className="pb-4">
        <div className="modePart flex justify-between items-center pb-5">
          <div className="modes flex gap-x-4 py-3">
            {modes?.map((mode, idx) => (
              <p
                key={idx}
                className={`px-6 py-1 border border-[#ffffff3d] rounded-xl ${activeMode === mode ? "bg-yellow-500 text-black font-bold" : "bg-[#ffffff28] hover:bg-[#ffffff4d]"
                  } cursor-pointer  duration-300 opacity-70`}
                onClick={() => setActiveMode(mode)}>
                {mode}
              </p>
            ))}
          </div>
          <div className="visualizationSwitch flex justify-center items-center">
            <div
              className={`chart flex justify-center items-center gap-x-1 px-5 py-2 border border-[#ffffff3d] rounded-s-xl ${visualizeMode === "chart" ? "bg-yellow-500 text-black font-bold" : "bg-[#ffffff28] hover:bg-[#ffffff4d]"
                } cursor-pointer opacity-70`}
              onClick={() => setVisualizeMode("chart")}>
              <span>
                <FaChartBar />
              </span>
            </div>
            <div
              className={`list flex justify-center items-center gap-x-1 px-5 py-2 border border-[#ffffff3d] rounded-e-xl ${visualizeMode === "list" ? "bg-yellow-500 text-black font-bold" : "bg-[#ffffff28] hover:bg-[#ffffff4d]"
                } cursor-pointer opacity-70`}
              onClick={() => setVisualizeMode("list")}>
              <span>
                <FaList />
              </span>
            </div>
          </div>
        </div>
        <div className="mainSlider">
          <div className="dayCardsWrapper flex items-start gap-x-2">
            {weatherDataByDay?.map((data, idx) => (
              activeMode === 'Overview' || activeMode === 'Feels Like' ? <DayCard
                key={idx}
                foreCastData={data}
                date={data.date}
                activeDay={activeDay}
                setActiveDay={setActiveDay}
                activeMode={activeMode}
              /> : <AltDayCard
                key={idx}
                foreCastData={data}
                date={data.date}
                activeDay={activeDay}
                setActiveDay={setActiveDay}
                activeMode={activeMode}
              />
            ))}
          </div>
          {
            visualizeMode === 'chart' ? <Chart data={weatherDataByDay.find((data) => data.date === activeDay)} activeMode={activeMode} /> : (
              <div className="flex flex-col w-full p-5 bg-[#3E5063] rounded-xl -translate-y-4 gap-x-2">
                <div className="flex gap-x-2">
                  {
                    weatherDataByDay.find((data) => data.date === activeDay).data.map((hourlyForecastData, idx) => <HourForecastCard key={hourlyForecastData.dt} displayData={hourlyForecastData} delay={idx * 100}/>)
                  }
                </div>
                <div className="legends flex gap-x-10 mt-4">
                  {
                    cardLegends?.map(legend => (
                      <div className=" flex gap-x-2">
                        <span>
                          {React.createElement(legend.icon)}
                        </span>
                        <p className="text-sm">{legend.name}</p>
                      </div>
                    ))
                  }
                </div>
              </div>
            )
          }
        </div>
        <div style={{ height: "100px", display: "flex", alignItems: "center" }}>
        </div>
      </div>
    );
  }
};

export default ForecastSlider;
