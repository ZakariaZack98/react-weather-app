import React from 'react';
import { FaLocationArrow } from 'react-icons/fa';
import { GetWindDirection } from '../../utils/utils';

/**
 * WindDirectionIcon
 * @param {Object} props
 * @param {number} props.deg - Wind direction in degrees (0-360)
 */
const WindDirectionIcon = ({ deg = 0, size = 32, color = '#ffffff' }) => {
  //* componsating default orientation of the icon
  const rotation = 135 - deg;

  return (
    <span
      style={{
        display: 'inline-block',
        transform: `rotate(${rotation}deg)`,
        transition: 'transform 0.3s',
      }}
      title={`Wind direction: ${GetWindDirection(deg)}`}
    >
      <FaLocationArrow size={size} color={color} />
    </span>
  );
};

export default WindDirectionIcon;