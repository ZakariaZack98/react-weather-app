import React, { useEffect, useState } from "react";
import { FaChartBar, FaList } from "react-icons/fa";
import { useSelector } from 'react-redux'
import DayCard from "../common/DayCard";
import { ConvertToLocalISOString, DateFormatter, GetDailyIcon, GetTempSummery } from "../../utils/utils";
import Chart from "./Chart";
import AltDayCard from "../common/AltDayCard";
import HourForecastCard from "../common/HourForecastCard";
import _ from "../../lib/componentsData";
import ForecastSliderSkeleton from "../LoadingSkeletons/ForecastSliderSkeleton";


const ForecastSlider = () => {
  const modes = _.forecastSliderModes;
  const cardLegends = _.cardLegends;
  const [visualizeMode, setVisualizeMode] = useState("chart");
  const [activeMode, setActiveMode] = useState("Overview");
  const hourlyForecastData = useSelector(state => state.weather.hourlyForecastData);
  const [weatherDataByDay, setWeatherDataByDay] = useState([]);
  const [activeDay, setActiveDay] = useState(
    new Date().toString().split(" ")[2] + " " + new Date().toString().split(" ")[1]
  );
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * TODO: ORGANIZE ALL THE FORECAST DATA INTO AN ARRAY (INDEX WILL BE THE DAY; ie, 0 is today, 1 is next date & so on....)
   * @param {hourlyForecastData} {Array}
   * */
  useEffect(() => {
    try {
      setIsLoading(true);
      setError(null);

      if (!hourlyForecastData) {
        setError("No forecast data available");
        return;
      }

      //? FIX OF THE DATE FORMAT CONFLICT
      if (activeDay.startsWith('0')) {
        setActiveDay(activeDay.slice(1));
      }

      if (hourlyForecastData && hourlyForecastData.length > 0) {
        const today = new Date();
        const todayStr = ConvertToLocalISOString(today).split("T")[0];
        const weatherDataByDate = [];

        try {
          //? Get today's data based on actual date
          const todaysData = hourlyForecastData.filter(
            data => data.dt_txt.split(" ")[0] === todayStr
          );
          weatherDataByDate.push(todaysData);

          //? Next 4 days by date
          for (let i = 1; i <= 4; i++) {
            const nextDate = new Date(today);
            nextDate.setDate(today.getDate() + i);
            const formattedDate = ConvertToLocalISOString(new Date(nextDate)).split("T")[0];
            const targetDateData = hourlyForecastData.filter((data) => data.dt_txt.split(" ")[0] === formattedDate);

            if (!targetDateData.length) {
              throw new Error(`No data available for date: ${formattedDate}`);
            }

            weatherDataByDate.push(targetDateData);
          }

          const updatedWeatherData = weatherDataByDate.map((dateData) => {
            if (!dateData[0]?.dt_txt) {
              throw new Error("Invalid date data structure");
            }

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
        } catch (err) {
          setError(`Error processing forecast data: ${err.message}`);
        }
      }
    } catch (err) {
      setError(`Unexpected error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [hourlyForecastData, activeDay, visualizeMode, activeMode]);

  if (error) {
    return (
      <div className="flex justify-center items-center p-4 bg-red-500/10 rounded-xl">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-4">
        <p className="text-gray-400">Loading forecast data...</p>
      </div>
    );
  }

  if (!weatherDataByDay || weatherDataByDay.length === 0) {
    return <ForecastSliderSkeleton />;
  }

  return (
    <div className="pb-4 mt-3 lg:mt-0">
      <div className="modePart flex flex-col-reverse md:flex-row justify-between items-center pb-2">
        <div className="modes flex 2xl:flex-nowrap flex-wrap gap-4 py-3">
          {modes?.map((mode, idx) => (
            <p
              key={idx}
              className={`2xl:px-6 px-4 2xl:text-md md:text-sm text-nowrap py-1 rounded-xl ${activeMode === mode ? "bg-yellow-500 text-black font-bold" : "surface-card-darker hover:bg-[#ffffff4d]"
                } cursor-pointer  duration-300 `}
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
        <div className="dayCardsWrapper overflow-x-auto flex justify-between items-start gap-x-2 no-scrollbar" style={{ msOverflowStyle: 'none' }}>
          {weatherDataByDay?.map((data, idx) => (
            activeMode === 'Overview' || activeMode === 'Feels Like' ? <div className="w-1/5 min-w-40">
              <DayCard
                key={idx}
                foreCastData={data}
                date={data.date}
                activeDay={activeDay}
                setActiveDay={setActiveDay}
                activeMode={activeMode}
              />
            </div> : <div className="w-1/5 min-w-40">
              <AltDayCard
                key={idx}
                foreCastData={data}
                date={data.date}
                activeDay={activeDay}
                setActiveDay={setActiveDay}
                activeMode={activeMode}
              />
            </div>
          ))}
        </div>
        {
          visualizeMode === 'chart' ? <Chart data={weatherDataByDay.find((data) => data.date.split(' ')[0] === activeDay.split(' ')[0])} activeMode={activeMode} /> : (
            <div className="flex flex-col w-full p-5 surface-card-darkest rounded-xl -translate-y-4 gap-x-2 " >
              <div className="flex gap-x-2 justify-between overflow-x-auto no-scrollbar" style={{ msOverflowStyle: 'none' }}>
                {
                  weatherDataByDay.find((data) => data.date === activeDay).data.map((hourlyForecastData, idx) => (
                    <div
                      key={hourlyForecastData.dt}
                      className="transition-all duration-500 ease-in-out"
                      style={{
                        opacity: '1',
                        transform: 'none',
                        willChange: 'transform, opacity'
                      }}
                    >
                      <HourForecastCard
                        displayData={hourlyForecastData}
                        delay={idx * 100}
                      />
                    </div>
                  ))
                }
              </div>
              <div className="legends flex gap-x-10 mt-4">
                {
                  cardLegends?.map(legend => (
                    <div key={legend.name} className=" flex gap-x-2">
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
    </div>
  );
};

export default ForecastSlider;
