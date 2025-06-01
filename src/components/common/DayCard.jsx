import React from "react";
import { ConvertToLocalISOString, DateFormatter } from "../../utils/utils";

const DayCard = ({ foreCastData, date, activeDay, setActiveDay }) => {
  return (
    <div
      className={` ${
        date === activeDay ? "bg-[#1B3754] h-45 border-t-2" : "bg-[rgba(189,189,189,0.04)]"
      } py-5 2xl:px-7 xl:px-4 rounded-xl flex flex-col gap-y-4 cursor-pointer`}
      data-date={date}
      onClick={() => setActiveDay(date)}>
      <div className="date flex justify-between items-center">
        {/* //!FIX THE LOCAL TIME BUG */}
        <p className="date text-xl font-semibold">
          {DateFormatter(ConvertToLocalISOString(new Date().toISOString())) === foreCastData.date ? "Today" : foreCastData.date}
        </p>
        <p>{foreCastData.day}</p>
      </div>
      <div className="iconAndDate flex justify-between items-stretch">
        <div className="flex">
          <picture className=" w-1/2 aspect-square flex justify-center items-center rounded-full bg-blue-300 relative z-10">
            <img
              src={`https://openweathermap.org/img/wn/${foreCastData.dominantIcons.dayIcon}@2x.png`}
              alt=""
              className="w-9/10 "
            />
          </picture>
          <picture className=" w-1/2 flex justify-center items-center rounded-full bg-blue-950 -translate-x-3">
            <img
              src={`https://openweathermap.org/img/wn/${foreCastData.dominantIcons.nightIcon}@2x.png`}
              alt=""
              className="w-9/10 "
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
