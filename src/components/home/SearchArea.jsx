import React, { useContext, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { WeatherContext } from "../../contexts/WeatherContext";
import { GetCoordBySearch } from "../../utils/utils";

const SearchArea = () => {
  const [input, setInput] = useState("");
  const { recentSearchLoc, setRecentSearchLoc, fetchAllWeatherData, setLocationName, coord } =
    useContext(WeatherContext);
  useEffect(() => {
    setInput("");
  }, [coord]);

  const getWeatherDataBySearch = (e) => {
    if (e.key === "Enter") {
      GetCoordBySearch(input)
        .then((data) => {
          fetchAllWeatherData(...data.coord);
          return data;
        })
        .then((data) => {
          const adjustedNameArr = data.locationName.split(",");
          adjustedNameArr[0] = input;
          const adjustedName = adjustedNameArr.join();
          const newRecentLocation = {
            name: adjustedName,
            coord: data.coord,
          };
          console.log(newRecentLocation.name);
          setLocationName(newRecentLocation.name);
          const updatedRecentSearchLoc = [...recentSearchLoc];
          if (!updatedRecentSearchLoc.find((item) => item.name === newRecentLocation.name))
            updatedRecentSearchLoc.splice(0, 0, newRecentLocation);
          if (updatedRecentSearchLoc.length > 4) updatedRecentSearchLoc.pop();
          setRecentSearchLoc(updatedRecentSearchLoc);
        });
    }
  };

  return (
    <div className="flex md:flex-nowrap flex-wrap py-4 md:gap-x-5 gap-y-2 pt-10">
      <div className="searchBar xl:w-2/8 md:w-1/3 w-full relative">
        <input
          type="text"
          className="w-full px-4 py-2 border-[1px] border-[#ffffff3f] rounded-3xl surface-card focus:outline-none"
          value={input}
          placeholder="Search for locations"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => getWeatherDataBySearch(e)}
        />
        <span className="absolute top-3 right-3">
          <FaSearch />
        </span>
      </div>
      <div className="recentSearchedLocations flex flex-wrap gap-2">
        {recentSearchLoc?.map((location) => (
          <div
            key={location.coord[1]}
            className="px-4 py-2 border-[1px] border-[#ffffff3d] rounded-3xl surface-card cursor-pointer hover:bg-[#ffffff4d] duration-300"
            onClick={() => {
              fetchAllWeatherData(location.coord[0], location.coord[1]);
            }}>
            <p className="opacity-70 text-sm">{location.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchArea;
