import React from 'react';

const UVSpeedometer = ({ uvIndex = 5}) => {
  const cappedUV = Math.min(uvIndex, 15); // cap at 15 for display
  const angle = (cappedUV / 15) * 180; // rotation angle from 0 to 180

  const getUVDetails = (uvi) => {
    if (uvi <= 2) return { level: 'Low', color: '#4CAF50', advice: 'Safe - No protection needed' };
    if (uvi <= 5) return { level: 'Moderate', color: '#FFC107', advice: 'Moderate - Wear sunscreen' };
    if (uvi <= 7) return { level: 'High', color: '#FF9800', advice: 'High - Protection required' };
    if (uvi <= 10) return { level: 'Very High', color: '#F44336', advice: 'Very High - Extra precautions' };
    return { level: 'Extreme', color: '#9C27B0', advice: 'Extreme - Avoid sun exposure' };
  };

  const uvDetails = getUVDetails(uvIndex);

  return (
    <div className="w-full max-w-md mx-auto text-center font-sans mt-8">
      <h3 className="text-lg font-semibold mb-4">UV Index</h3>

      <div className="relative w-full h-48">
        <svg viewBox="0 0 200 100" className="w-full h-full">
          {/* Gradient Definition */}
          <defs>
            <linearGradient id="uvGradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4CAF50" />
              <stop offset="15%" stopColor="#8BC34A" />
              <stop offset="35%" stopColor="#FFEB3B" />
              <stop offset="45%" stopColor="#FFC107" />
              <stop offset="60%" stopColor="#FF9800" />
              <stop offset="75%" stopColor="#FF5722" />
              <stop offset="85%" stopColor="#F44336" />
              <stop offset="100%" stopColor="#9C27B0" />
            </linearGradient>
          </defs>

          {/* Arc path */}
          <path
            d="M10,100 A90,90 0 0,1 190,100"
            fill="none"
            stroke="url(#uvGradient)"
            strokeWidth="14"
          />

          {/* Needle */}
          <line
            x1="100"
            y1="100"
            x2={100 + 70 * Math.cos((angle - 90) * (Math.PI / 180))}
            y2={100 + 70 * Math.sin((angle - 90) * (Math.PI / 180))}
            stroke={uvDetails.color}
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Center dot */}
          <circle cx="100" cy="100" r="5" fill={uvDetails.color} />
        </svg>

        {/* Min and Max Labels */}
        <div className="absolute top-[112px] w-full flex justify-between px-3 text-sm text-gray-600 font-medium">
          <span>0</span>
          <span>15</span>
        </div>

        {/* UV Value Label */}
        <div className="absolute top-[90px] left-1/2 transform -translate-x-1/2 text-center">
          <div
            className="text-white font-bold text-sm px-3 py-1 rounded-full"
            style={{ backgroundColor: uvDetails.color }}
          >
            {uvIndex.toFixed(1)} - {uvDetails.level}
          </div>
        </div>
      </div>

      {/* Advice */}
      <div className="mt-4 text-sm font-medium" style={{ color: uvDetails.color }}>
        {uvDetails.advice}
      </div>
    </div>
  );
};

export default UVSpeedometer;
