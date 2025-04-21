import React from 'react';
import PropTypes from 'prop-types';
import { UVLabelGrads } from '../../lib/GradColorGrp';

// Gradient: 20% orange, 80% yellow, 20% orange (overlaps at ends for smoothness)
const SEMI_GRADIENT_COLORS = [
  { stop: 0, color: '#FFA500' },    // orange
  { stop: 0.2, color: '#FFD700' },  // yellow
  { stop: 0.8, color: '#FFD700' },  // yellow
  { stop: 1, color: '#FFA500' },    // orange
];

// Helper to get color at a given progress (0-1) along the gradient
function getSemiGradientColor(progress) {
  for (let i = 1; i < SEMI_GRADIENT_COLORS.length; i++) {
    if (progress <= SEMI_GRADIENT_COLORS[i].stop) {
      const prev = SEMI_GRADIENT_COLORS[i - 1];
      const next = SEMI_GRADIENT_COLORS[i];
      const range = next.stop - prev.stop;
      const pct = (progress - prev.stop) / range;
      const hexToRgb = hex => hex.match(/\w\w/g).map(x => parseInt(x, 16));
      const rgbToHex = rgb => '#' + rgb.map(x => x.toString(16).padStart(2, '0')).join('');
      const prevRgb = hexToRgb(prev.color.replace('#', ''));
      const nextRgb = hexToRgb(next.color.replace('#', ''));
      const rgb = prevRgb.map((c, idx) => Math.round(c + (nextRgb[idx] - c) * pct));
      return rgbToHex(rgb);
    }
  }
  return SEMI_GRADIENT_COLORS[SEMI_GRADIENT_COLORS.length - 1].color;
}

// Helper to convert polar coordinates to cartesian
function polarToCartesian(cx, cy, r, angle) {
  const a = (angle - 180) * Math.PI / 180.0;
  return {
    x: cx + r * Math.cos(a),
    y: cy + r * Math.sin(a)
  };
}

// Helper to describe an SVG arc path
function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return [
    "M", start.x, start.y,
    "A", r, r, 0, largeArcFlag, 1, end.x, end.y
  ].join(" ");
}

const SemiCircularProgressBar = ({ min = 0, max = 100, value = 50 }) => {
  const percentage = ((value - min) / (max - min)) * 100;
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);
  const sweepAngle = 120; // 1/3 of a circle
  const angle = (clampedPercentage / 100) * sweepAngle;

  const radius = 80;
  const cx = 100;
  const cy = 100;
  const startAngle = (180 - sweepAngle) / 2;
  const startRad = (Math.PI * (startAngle - 180)) / 180;
  const endRad = (Math.PI * (startAngle + angle - 180)) / 180;

  const x0 = cx + radius * Math.cos(startRad);
  const y0 = cy + radius * Math.sin(startRad);
  const x = cx + radius * Math.cos(endRad);
  const y = cy + radius * Math.sin(endRad);
  const largeArcFlag = angle > 180 ? 1 : 0;

  // Calculate thumb color based on position in gradient
  const getThumbColor = (percent) => {
    if (percent <= 20) return "orange";
    if (percent <= 80) return "yellow";
    return "orange";
  };
  const thumbColor = getThumbColor(clampedPercentage);

  return (
    <div className="w-[200px] h-[100px] relative">
      <svg width="200" height="100" viewBox="0 0 200 100">
        {/* Gradient background track */}
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="orange" />
            <stop offset="20%" stopColor="yellow" />
            <stop offset="80%" stopColor="yellow" />
            <stop offset="100%" stopColor="orange" />
          </linearGradient>
        </defs>

        <path
          d={`M${x0},${y0} A${radius},${radius} 0 0,1 ${cx + radius * Math.cos((Math.PI * (startAngle + sweepAngle - 180)) / 180)},${cy + radius * Math.sin((Math.PI * (startAngle + sweepAngle - 180)) / 180)}`}
          fill="none"
          stroke="url(#grad)"
          strokeWidth="3"
        />

        {/* Transparent foreground (acts as mask/progress filler) */}
        <path
          d={`M${x0},${y0} A${radius},${radius} 0 ${angle > 60 ? 1 : 0},1 ${x},${y}`}
          fill="none"
          stroke="white"
          strokeOpacity="0"
          strokeWidth="3"
        />

        {/* Thumb */}
        <circle cx={x} cy={y} r="7" fill={thumbColor} stroke="#fff" strokeWidth="3" />
      </svg>
    </div>
  );
};




const TwoThirdsCircularProgressBar = ({
  value = 70,
  max = 100,
  size = 120,
  strokeWidth = 12,
  bgColor = 'rgba(200,200,200,0.2)',
  gradColors = UVLabelGrads,
}) => {
  // Reduce the radius to add more space (padding) around the arc
  const padding = strokeWidth * 2.2;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const arcAngle = 240; // 2/3 of 360deg
  const startAngle = 150; // 90 + (360 - arcAngle)/2
  const endAngle = startAngle + arcAngle;
  const GRADIENT_COLORS = gradColors;

  // Helper to get color at a given progress (0-1) along the gradient
  function getGradientColor(progress) {
    for (let i = 1; i < GRADIENT_COLORS.length; i++) {
      if (progress <= GRADIENT_COLORS[i].stop) {
        const prev = GRADIENT_COLORS[i - 1];
        const next = GRADIENT_COLORS[i];
        const range = next.stop - prev.stop;
        const pct = (progress - prev.stop) / range;
        const hexToRgb = hex => hex.match(/\w\w/g).map(x => parseInt(x, 16));
        const rgbToHex = rgb => '#' + rgb.map(x => x.toString(16).padStart(2, '0')).join('');
        const prevRgb = hexToRgb(prev.color.replace('#', ''));
        const nextRgb = hexToRgb(next.color.replace('#', ''));
        const rgb = prevRgb.map((c, idx) => Math.round(c + (nextRgb[idx] - c) * pct));
        return rgbToHex(rgb);
      }
    }
    return GRADIENT_COLORS[GRADIENT_COLORS.length - 1].color;
  }

  // Helper to convert polar to cartesian
  const polarToCartesian = (cx, cy, r, angle) => {
    const a = (angle - 90) * Math.PI / 180.0;
    return {
      x: cx + r * Math.cos(a),
      y: cy + r * Math.sin(a)
    };
  };

  // Arc path for background and foreground
  const describeArc = (cx, cy, r, startAngle, endAngle) => {
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    return [
      'M', start.x, start.y,
      'A', r, r, 0, largeArcFlag, 0, end.x, end.y
    ].join(' ');
  };

  // Progress arc
  const progress = Math.max(0, Math.min(value / max, 1));
  const progressAngle = startAngle + arcAngle * progress;

  // Thumb position for smaller circle
  const thumbPos = polarToCartesian(center, center, radius, progressAngle);

  return (
    <div className='translate-x-1 rotate-[91deg]'>
      <svg
        width={size}
        // Add top padding and increase height accordingly
        height={center + radius + padding * 1.0}
        viewBox={`0 ${-padding * 0.5} ${size} ${center + radius + padding * 1.0}`}
      >
        <defs>
          <linearGradient id="progress-gradient" x1="0%" y1="90%" x2="0%" y2="0%">
            {GRADIENT_COLORS.map((stop, i) => (
              <stop key={i} offset={stop.stop * 100 + '%'} stopColor={stop.color} />
            ))}
          </linearGradient>
        </defs>
        {/* Background arc with gradient */}
        <path
          d={describeArc(center, center, radius, startAngle, endAngle)}
          stroke="url(#progress-gradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        />
        {/* Foreground arc (transparent) */}
        <path
          d={describeArc(center, center, radius, startAngle, progressAngle)}
          stroke="transparent"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        />
        {/* Thumb */}
        <circle
          cx={thumbPos.x}
          cy={thumbPos.y}
          r={strokeWidth / 1.2}
          fill={getGradientColor(progress)}
          stroke="#fff"
          strokeWidth={4}
          style={{ transition: 'cx 0.3s, cy 0.3s, fill 0.3s' }}
        />
      </svg>
    </div>
  );
};

TwoThirdsCircularProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  size: PropTypes.number,
  strokeWidth: PropTypes.number,
  bgColor: PropTypes.string,
};

export { SemiCircularProgressBar, TwoThirdsCircularProgressBar };