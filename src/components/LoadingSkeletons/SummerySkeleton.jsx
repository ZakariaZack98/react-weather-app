import React from 'react'

const SummerySkeleton = () => {
  return (
    <div className="summery pb-2 animate-pulse">
      {/* Location Header */}
      <div className="locationHeading flex items-center gap-x-10 pb-2">
        <div className="w-48 h-6 rounded-md surface-card-darker" />
        <div className="w-8 h-8 rounded-full surface-card-darker" />
      </div>

      <div className="mainContent w-full flex lg:flex-nowrap flex-wrap gap-5 items-stretch">
        {/* Current Weather Card */}
        <div className="currentWeather lg:w-1/2 w-full h-100 md:h-90 p-7 surface-card rounded-lg flex flex-col justify-between">
          {/* Header */}
          <div className="heading flex justify-between">
            <div className="w-32 h-4 rounded-md surface-card-darker" />
            <div className="w-20 h-4 rounded-md surface-card-darker" />
          </div>

          {/* Temperature Section */}
          <div className="tempPart flex items-center">
            <div className="temp flex items-center gap-x-3">
              <div className="w-20 h-20 rounded-full surface-card-darker" />
              <div className="w-24 h-14 rounded-md surface-card-darker " />
            </div>
            <div className="condition">
              <div className="w-28 h-6 rounded-md surface-card-darker mb-2" />
              <div className="w-24 h-4 rounded-md surface-card-darker" />
            </div>
          </div>

          {/* Suggestion Text */}
          <div className="w-full h-12 rounded-md surface-card-darker mb-5" />

          {/* Weather Metrics Grid */}
          <div className="othersUpdate w-full flex md:flex-nowrap flex-wrap md:gap-3 gap-10 justify-between">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="flex flex-col gap-2">
                <div className="w-16 h-3 rounded-sm surface-card-darker" />
                <div className="w-12 h-4 rounded-sm surface-card-darker" />
              </div>
            ))}
          </div>
        </div>

        {/* Map Section */}
        <div className="map lg:w-1/2 w-full md:h-90 h-70 rounded-lg relative surface-card-darker">
          {/* Map Controls */}
          <div className="absolute top-3 right-3 flex flex-col gap-y-2">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="w-7 h-7 rounded surface-card" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SummerySkeleton
