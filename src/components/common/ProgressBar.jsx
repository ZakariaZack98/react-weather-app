import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ProgressBar = ({ maxValue = 100, inputValue, color = 'blue'}) => {
  const [animatedProgress, setAnimatedProgress] = useState(0); 
  const progressPercentage = Math.min((inputValue / maxValue) * 100, 100); 

  useEffect(() => {
    const animation = setTimeout(() => {
      setAnimatedProgress(progressPercentage); 
    }, 100);

    return () => clearTimeout(animation); 
  }, [progressPercentage]);

  return (
    <div
      style={{
        width: '20px',
        height: '100%',
        backgroundColor: '#e0e0e0',
        borderRadius: '10px',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: 'rgba(36, 36, 36, 0.9)',
      }}
    >
      <div
        style={{
          width: '100%',
          height: `${animatedProgress}%`,
          backgroundColor: color,
          borderRadius: '10px',
          position: 'absolute',
          bottom: 0, 
          transition: 'height 0.5s ease-in-out',
        }}
      ></div>
    </div>
  );
};

ProgressBar.propTypes = {
  maxValue: PropTypes.number.isRequired,
  inputValue: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export default ProgressBar;
