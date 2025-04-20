import React, { useMemo } from 'react'
import { FaLocationArrow } from 'react-icons/fa';

const MovingArrow = ({ windDirDeg }) => {
  const distance = 30; // px, how far the dot moves

  // Memoize animationName, x, y, and keyframes for performance and stability
  const { animationName, x, y, keyframes } = useMemo(() => {
    const deg = 180 + windDirDeg;
    const rad = (deg - 90) * (Math.PI / 180);
    const x = Math.cos(rad) * distance;
    const y = Math.sin(rad) * distance;
    const animationName = `move-dot-${windDirDeg}`;
    const keyframes = `
      @keyframes ${animationName} {
        0% { transform: translate(0, 0); }
        80% { transform: translate(${x}px, ${y}px); }
        80.01% { transform: translate(0, 0); }
        100% { transform: translate(0, 0); }
      }
    `;
    return { animationName, x, y, keyframes };
  }, [windDirDeg]);

  return (
    <div style={{ position: 'relative', width: 120, height: 120 }}>
      <style>{keyframes}</style>
      <div
        className="movingDot w-10 h-10 rounded-full flex justify-center items-center"
        style={{
          position: 'absolute',
          left: 40,
          top: 40,
          animation: `${animationName} 1.7s linear infinite`
        }}
      >
        <div className="scale-150" style={{ rotate: `${135 + windDirDeg}deg` }}>
          <FaLocationArrow size={20}/>
        </div>
      </div>
    </div>
  )
}

export default MovingArrow