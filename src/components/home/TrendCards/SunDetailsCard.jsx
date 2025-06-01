import React, { useContext } from 'react';
import { WeatherContext } from '../../../contexts/WeatherContext';
import { SemiCircularProgressBar } from '../../common/SemiCircularProgressbar';
import { FiSunrise, FiSunset } from 'react-icons/fi';

const SunDetailsCard = () => {
  const { weatherDataNow } = useContext(WeatherContext);
  const currentTime = weatherDataNow?.dt ? weatherDataNow.dt * 1000 : undefined;
  const sunrise = weatherDataNow?.sys?.sunrise ? weatherDataNow.sys.sunrise * 1000 : undefined;
  const sunset = weatherDataNow?.sys?.sunset ? weatherDataNow.sys.sunset * 1000 : undefined;

  // * HELPER FUNCTION TO CONVERT UNIX TIMESTAMP TO REGULAR TIME ===========================
  function formatUnixTime(unixTimestamp) {
    const ts = unixTimestamp > 1e12 ? unixTimestamp : unixTimestamp * 1000;
    const date = new Date(ts);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const mins = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${mins} ${ampm}`;
  }

  const percent =
    sunrise && sunset && currentTime
      ? ((currentTime - sunrise) / (sunset - sunrise)) * 100
      : 0;
  // Only render if all values are present and valid
  const isValid =
    typeof sunrise === 'number' &&
    typeof sunset === 'number' &&
    typeof currentTime === 'number' &&
    sunrise < sunset &&
    currentTime >= sunrise &&
    currentTime <= sunset;

  return (
    <div className='min-h-75 p-4 flex flex-col gap-y-3 justify-between rounded-xl bg-[rgba(255,255,255,0.06)]'>
      <h1 className='font-semibold'>Sun</h1>
      <div className="flex flex-col w-full justify-center items-center">
        <p className='text-sm'>NOW</p>
        <h3 className='text-xl'>{formatUnixTime(currentTime)}</h3>
      </div>
      <div className="sunDetails">
        <div className='w-full flex justify-center scale-[1.8] translate-y-2'>
          {isValid ? (
            <SemiCircularProgressBar value={percent} max={100} min={0} />
          ) : (
            <div className="text-sm text-center text-gray-400">Sun is not up</div>
          )}
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span><FiSunrise/></span>
            <div className="text-[13px]">Sunrise</div>
            <div className="text-xl">{formatUnixTime(sunrise)}</div>
          </div>
          <div className="flex flex-col">
            <span className='flex justify-end'><FiSunset/></span>
            <div className="text-[13px] text-end">Sunset</div>
            <div className="text-xl">{formatUnixTime(sunset)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SunDetailsCard;
