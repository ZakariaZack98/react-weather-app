import React from 'react'

const ForecastSliderSkeleton = () => {
  return (
    <div className="pb-4 animate-pulse">
      {/* Mode Selection and Visualization Toggle */}
      <div className="modePart flex justify-between items-center pb-5">
        <div className="modes flex 2xl:flex-nowrap flex-wrap gap-4 py-3">
          {[...Array(8)].map((_, idx) => (
            <div
              key={idx}
              className="2xl:w-24 w-20 h-8 rounded-xl surface-card-darker"
            />
          ))}
        </div>
        <div className="visualizationSwitch flex justify-center items-center">
          <div className="w-16 h-10 rounded-s-xl surface-card-darker" />
          <div className="w-16 h-10 rounded-e-xl surface-card-darker" />
        </div>
      </div>

      {/* Day Cards Section */}
      <div className="mainSlider">
        <div className="dayCardsWrapper flex justify-between items-start gap-x-2">
          {[...Array(5)].map((_, idx) => (
            <div key={idx} className="w-1/5 min-w-40">
              <div className="min-h-75 p-4 flex flex-col gap-y-3 justify-between rounded-xl surface-card">
                {/* Date Section */}
                <div className="flex justify-between">
                  <div className="w-20 h-6 rounded-md surface-card-darker" />
                  <div className="w-12 h-6 rounded-md surface-card-darker" />
                </div>
                
                {/* Weather Icon Section */}
                <div className="flex justify-between items-center">
                  <div className="flex">
                    <div className="w-16 h-16 rounded-full surface-card-darker" />
                    <div className="w-16 h-16 rounded-full surface-card-darker -ml-3" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="w-14 h-6 rounded-md surface-card-darker" />
                    <div className="w-14 h-6 rounded-md surface-card-darker opacity-70" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chart/List Section */}
        <div className="w-full h-64 mt-4 rounded-xl surface-card-darker" />
      </div>
    </div>
  )
}

export default ForecastSliderSkeleton
