import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ProgressBar = ({ maxValue = 100, inputValue, color }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0); // Initial progress is 0
  const progressPercentage = Math.min((inputValue / maxValue) * 100, 100); // Ensure it doesn't exceed 100%

  useEffect(() => {
    const animation = setTimeout(() => {
      setAnimatedProgress(progressPercentage); // Animate to the calculated percentage
    }, 100);

    return () => clearTimeout(animation); // Cleanup timeout
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
          height: `${animatedProgress}%`, // Use animated progress
          backgroundColor: color,
          borderRadius: '10px', // Rounded corners at the top
          position: 'absolute',
          bottom: 0, // Start from the bottom
          transition: 'height 0.5s ease-in-out', // Smooth animation
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
