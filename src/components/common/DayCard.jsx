import React from "react";
import { DateFormatter } from "../../utils/utils";

const DayCard = ({ foreCastData, date, activeDay, setActiveDay, activeMode }) => {
  return (
    <div
      className={`w-1/5 ${
        date === activeDay ? "bg-[#3e5063] h-44" : "bg-[#334454]"
      } py-5 px-7 rounded-xl flex flex-col gap-y-4 cursor-pointer`}
      data-date={date}
      onClick={() => setActiveDay(date)}>
      <div className="date flex justify-between items-center">
        {/* //!FIX THE LOCAL TIME BUG */}
        <p className="date text-xl font-semibold">
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
        <div className="temp flex flex-col">
          <p className="text-2xl font-semibold">{foreCastData.tempSummery.max}°c</p>
          <p className="text-2xl font-semibold opacity-70">{foreCastData.tempSummery.min}°c</p>
        </div>
      </div>
    </div>
  );
};

export default DayCard;
