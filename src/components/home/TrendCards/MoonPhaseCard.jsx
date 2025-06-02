import React from 'react'
import { WiMoonAltFull, WiMoonAltNew, WiMoonAltWaningCrescent4, WiMoonAltWaxingCrescent4 } from 'react-icons/wi';

const MoonPhaseCard = () => {
  //* HELPER FUNCTION TO CALCULATE MOON PHASE=================================
  function getMoonPhase(date) {
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();

    // Simplified calculation (accuracy ±1 day)
    let c = 0, jd = 0, b = 0, e = 0;
    if (month < 3) { year--; month += 12; }
    month++;
    const a = Math.floor(year / 100);
    b = Math.floor(a / 4);
    c = 2 - a + b;
    e = Math.floor(365.25 * (year + 4716));
    const f = Math.floor(30.6001 * month);
    jd = c + day + e + f - 1524.5;
    const sinceNew = jd - 2451549.5;
    const moonCycle = sinceNew / 29.53;
    const phase = moonCycle - Math.floor(moonCycle);

    return phase; // 0-1
  }

  const phase = getMoonPhase(new Date());

  //* MOON ICON COMPONENT BASED ON MOON PHASE=================================
  const MoonPhase = ({ phase }) => {
    const getPhaseIcon = () => {
      if (phase === 0) return <WiMoonAltNew size={200} color='yellow' />;
      if (phase <= 0.25) return <WiMoonAltWaxingCrescent4 size={200} color='yellow' />;
      if (phase <= 0.5) return <WiMoonAltWaxingGibbous size={200} color='yellow' />;
      if (phase === 0.5) return <WiMoonAltFull size={200} color='yellow' />;
      if (phase <= 0.75) return <WiMoonAltWaningGibbous size={200} color='yellow' />;
      return <WiMoonAltWaningCrescent4 size={200} color='yellow' />;
    };

    return (
      <div>
        {getPhaseIcon()}
      </div>
    );
  };

//* HELPER FUNCTION FOR GETTING MOON PHASE DETAILS=============================
function getMoonPhaseDetails(phase) {
  // Validate input
  if (phase < 0 || phase > 1) {
    throw new Error('Moon phase must be between 0 and 1');
  }

  // Normalize phase to handle floating-point precision
  const normalizedPhase = Math.round(phase * 100) / 100;

  // Calculate illumination percentage (for description)
  const illumination = Math.round(
    Math.abs(0.5 - normalizedPhase) * 2 * 100
  );

  // Determine phase details
  let name, emoji, iconName, description;

  if (normalizedPhase === 0 || normalizedPhase === 1) {
    name = 'New Moon';
    emoji = '🌑';
    iconName = 'new';
    description = 'The moon is not visible';
  } else if (normalizedPhase < 0.25) {
    name = 'Waxing Crescent';
    emoji = '🌒';
    iconName = 'waxing-crescent';
    description = `Crescent moon (${illumination}% visible)`;
  } else if (normalizedPhase === 0.25) {
    name = 'First Quarter';
    emoji = '🌓';
    iconName = 'first-quarter';
    description = 'Half moon (right side lit)';
  } else if (normalizedPhase < 0.5) {
    name = 'Waxing Gibbous';
    emoji = '🌔';
    iconName = 'waxing-gibbous';
    description = `Gibbous moon (${illumination}% visible)`;
  } else if (normalizedPhase === 0.5) {
    name = 'Full Moon';
    emoji = '🌕';
    iconName = 'full';
    description = 'The moon is fully visible';
  } else if (normalizedPhase < 0.75) {
    name = 'Waning Gibbous';
    emoji = '🌖';
    iconName = 'waning-gibbous';
    description = `Gibbous moon (${illumination}% visible)`;
  } else if (normalizedPhase === 0.75) {
    name = 'Last Quarter';
    emoji = '🌗';
    iconName = 'last-quarter';
    description = 'Half moon (left side lit)';
  } else {
    name = 'Waning Crescent';
    emoji = '🌘';
    iconName = 'waning-crescent';
    description = `Crescent moon (${illumination}% visible)`;
  }

  return {
    name,
    emoji,
    iconName,
    description,
    illumination,
    phase: normalizedPhase
  };
}

const moonPhaseDetails = getMoonPhaseDetails(phase);


  return (
    <div className='min-h-75 p-4 flex flex-col gap-y-3 justify-between rounded-xl surface-card'>
      <h1 className='font-semibold'>Moon Phase</h1>
      <div className="flex justify-center items-center">
        <MoonPhase phase={phase} />
      </div>
      <div className="w-full flex justify-center">
        {moonPhaseDetails.name} {Math.round(phase * 100)}%
      </div>
    </div>
  )
}

export default MoonPhaseCard