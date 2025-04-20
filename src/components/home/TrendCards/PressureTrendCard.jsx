import React, { useContext } from 'react'
import { WeatherContext } from '../../../contexts/WeatherContext'
import TrendCurve from '../../common/TrendCurve';

const PressureTrendCard = () => {
  const { weatherDataNow, hourlyForecastData } = useContext(WeatherContext);
  const currentPressure = weatherDataNow?.main?.pressure;
  const pressureForecastData = hourlyForecastData?.slice(0, 8);
  const dataForCurve = {
    labels: pressureForecastData?.map(hourlyData => hourlyData?.dt_txt?.split(' ')[1]),
    data: pressureForecastData?.map(hourlyData => hourlyData?.main?.pressure)
  }

  // * HELPER FUNCTION FOR GETTING PRESSURE RELATED DISPLAY DATA==================================================
  function getPressureDetails(pressure) {
    // Validate input
    if (typeof pressure !== 'number' || pressure < 800 || pressure > 1100) {
      throw new Error('Invalid pressure value (expected 800-1100 hPa)');
    }

    // Categorize pressure
    let label, description, color;

    if (pressure < 980) {
      label = 'Extremely Low';
      description = 'Stormy conditions imminent';
      color = '#7E57C2'; // Deep purple
    }
    else if (pressure < 1000) {
      label = 'Very Low';
      description = 'Severe weather likely';
      color = '#9C27B0'; // Purple
    }
    else if (pressure < 1013) {
      label = 'Low';
      description = 'Unsettled weather expected';
      color = '#F44336'; // Red
    }
    else if (pressure < 1019) {
      label = 'Normal';
      description = 'Typical weather patterns';
      color = '#2196F3'; // Blue
    }
    else if (pressure < 1029) {
      label = 'High';
      description = 'Calm and clear conditions';
      color = '#4CAF50'; // Green
    }
    else if (pressure < 1040) {
      label = 'Very High';
      description = 'Dry, stable air mass';
      color = '#2E7D32'; // Dark green
    }
    else {
      label = 'Extremely High';
      description = 'Unusually dry conditions';
      color = '#1B5E20'; // Very dark green
    }

    return {
      label,
      description,
      color,
    };
  }

  const pressureDetails = getPressureDetails(currentPressure);

  return (
    <div className='w-[24%] h-75 p-4 flex flex-col gap-y-3 justify-between rounded-xl bg-[rgba(255,255,255,0.06)]'>
      <h1 className='font-semibold'>Pressure</h1>
      <div className='h-[35%] w-full'>
        <TrendCurve data={dataForCurve} curveColor={pressureDetails.color} min={970} max={1050} ascpectMaintain={false} fill={true}/>
      </div>
      <div className="textSec text-sm">
        <div className="flex items-center gap-x-2 pb-7">
          <p className='font-semibold text-5xl'>
            {currentPressure}
          </p>
          <div className="flex flex-col gap-y-1">
            <p className='text-xl leading-5'>mbr</p>
            <p>Right Now</p>
          </div>
        </div>
        <div className="flex gap-x-2">
          <p className='font-semibold'>{pressureDetails.label}</p>
          <span className='w-5 h-5 rounded-full' style={{ backgroundColor: pressureDetails.color }}></span>
        </div>
        <p className='text-[13px] mt-2'>{pressureDetails.description}</p>
      </div>
    </div>
  )
}

export default PressureTrendCard