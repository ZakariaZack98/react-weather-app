import React from 'react'
import mockLastYearData from '../../lib/YearlyData.json'
import DoughnutChart from '../common/DoughnutChart';

const TrendInfo = () => {
  const yearlyData = mockLastYearData.days;
  // * DATA CALCULATIONS ========================================================
  const summeryData = [
    {
      label: 'Highest Temperature (°c)',
      max: Math.max(...yearlyData.map(dailyData => dailyData.tempmax)),
      min: Math.min(...yearlyData.map(dailyData => dailyData.tempmax)),
      avg: yearlyData.map(dailyData => dailyData.tempmax).reduce((a, b) => a + b) / yearlyData.length,
    },
    {
      label: 'Lowest Temperature (°c)',
      max: Math.max(...yearlyData.map(dailyData => dailyData.tempmin)),
      min: Math.min(...yearlyData.map(dailyData => dailyData.tempmin)),
      avg: yearlyData.map(dailyData => dailyData.tempmin).reduce((a, b) => a + b) / yearlyData.length,
    },
    {
      label: 'Precipitation (mm)',
      max: Math.max(...yearlyData.map(dailyData => dailyData.precip)),
      min: Math.min(...yearlyData.map(dailyData => dailyData.precip)),
      avg: yearlyData.map(dailyData => dailyData.precip).reduce((a, b) => a + b) / yearlyData.length,
    },
    {
      label: 'Wind (km/h)',
      max: Math.max(...yearlyData.map(dailyData => dailyData.windspeed)),
      min: Math.min(...yearlyData.map(dailyData => dailyData.windspeed)),
      avg: yearlyData.map(dailyData => dailyData.windspeed).reduce((a, b) => a + b) / yearlyData.length,
    },
    {
      label: 'Humidity (%)',
      max: Math.max(...yearlyData.map(dailyData => dailyData.humidity)),
      min: Math.min(...yearlyData.map(dailyData => dailyData.humidity)),
      avg: yearlyData.map(dailyData => dailyData.humidity).reduce((a, b) => a + b) / yearlyData.length,
    },
  ]

  // * HELPER FUNCTION FOR EXTRACTING CONDITIONS FROM YEARLY DATA===============
  function summarizeWeatherByType(days) {
    const summary = {
      sunny: 0,
      cloudy: 0,
      rainy: 0,
      thunderstorm: 0,
      snowy: 0,
      foggy: 0,
      other: 0
    };

    days.forEach(day => {
      const icon = day.icon?.toLowerCase() || '';
      const conditions = day.conditions?.toLowerCase() || '';

      if (icon.includes('clear') || conditions.includes('clear')) {
        summary.sunny++;
      } else if (
        icon.includes('cloud') ||
        conditions.includes('cloud')
      ) {
        summary.cloudy++;
      } else if (
        icon.includes('rain') ||
        conditions.includes('rain')
      ) {
        summary.rainy++;
      } else if (
        icon.includes('tstorm') ||
        conditions.includes('thunder')
      ) {
        summary.thunderstorm++;
      } else if (
        icon.includes('snow') ||
        conditions.includes('snow')
      ) {
        summary.snowy++;
      } else if (
        icon.includes('fog') ||
        conditions.includes('fog') ||
        conditions.includes('mist')
      ) {
        summary.foggy++;
      } else {
        summary.other++;
      }
    });

    return summary;
  }

  const conditionsData = summarizeWeatherByType(yearlyData);


  // * DATA CALCULATIONS ========================================================
  return (
    <div className='mb-25 flex lg:flex-nowrap flex-wrap gap-3'>
      <div className="lg:w-1/2 w-full rounded-2xl surface-card overflow-hidden text-sm md:text-[1rem]">
        <div className="heading flex bg-[rgba(255,255,255,0.17)] font-semibold py-3 px-5">
          <p className="w-[55%]">Daily Summery (last 12 months)</p>
          <p className="w-[15%] text-end">Max</p>
          <p className="w-[15%] text-end">Average</p>
          <p className="w-[15%] text-end">Min</p>
        </div>
        <div className="px-3">
          {
            summeryData?.map((item, idx, arr) => (
              <div key={item.label} className={`flex py-3 px-2 ${idx < arr.length - 1 ? 'border-b border-[rgba(255,255,255,0.16)]' : ''}`}>
                <p className="w-[55%]">{item.label}</p>
                <p className="w-[15%] text-end">{(item.max).toFixed(1)}</p>
                <p className="w-[15%] text-end">{(item.avg).toFixed(1)}</p>
                <p className="w-[15%] text-end">{(item.min).toFixed(1)}</p>
              </div>
            ))
          }
        </div>
      </div>

      <div className="lg:w-1/2 w-full rounded-2xl surface-card overflow-hidden flex justify-center gap-x-2 items-center">
        <div className="w-full me-10 ms-10 ">
          <DoughnutChart label='Days Count' labels={Object.keys(conditionsData).map((item, idx) => item + `: ${Object.values(conditionsData)[idx]} days`)} dataSet={Object.values(conditionsData)} />
        </div>

      </div>
    </div>
  )
}

export default TrendInfo