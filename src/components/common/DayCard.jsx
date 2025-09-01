import React from "react";
import { ConvertToLocalISOString, DateFormatter } from "../../utils/utils";

const DayCard = ({ foreCastData, date, activeDay, setActiveDay }) => {
  return (
    <div
      className={` ${
        date.split(' ')[0] === activeDay.split(' ')[0] ? "surface-card-darkest xl:h-45 h-32 border-t-2 border-white" : "surface-card"
      } xl:py-5 2xl:px-7 xl:px-4 px-3 py-2 rounded-xl flex flex-col gap-y-4 cursor-pointer text-nowrap`}
      data-date={date}
      onClick={() => setActiveDay(date)}>
      <div className="date flex justify-between items-center">
        {/* //!FIX THE LOCAL TIME BUG */}
        <p className="date lg:text-2xl text-sm font-semibold">
          {DateFormatter(ConvertToLocalISOString(new Date().toISOString())) === foreCastData.date ? "Today" : foreCastData.date}
        </p>
        <p className="xl:text-md text-sm">{foreCastData.day}</p>
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
          <picture className=" w-1/2 flex justify-center items-center rounded-full bg-black -translate-x-3">
            <img
              src={`https://openweathermap.org/img/wn/${foreCastData.dominantIcons.nightIcon}@2x.png`}
              alt=""
              className="w-9/10 "
            />
          </picture>
        </div>
        <div className="temp flex flex-col">
          <p className="xl:text-2xl text-md font-semibold">{foreCastData.tempSummery.max}°c</p>
          <p className="xl:text-2xl text-md font-semibold opacity-70">{foreCastData.tempSummery.min}°c</p>
        </div>
      </div>
    </div>
  );
};

export default DayCard;
