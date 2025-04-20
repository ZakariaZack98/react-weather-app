import React from 'react';
import PropTypes from 'prop-types';
import { UVLabelGrads } from '../../lib/GradColorGrp';

const GRADIENT_COLORS = [
  { stop: 0, color: '#22c55e' },
  { stop: 0.25, color: '#a3e635' },
  { stop: 0.5, color: '#fde047' },
  { stop: 0.75, color: '#f97316' },
  { stop: 1, color: '#ef4444' },
];

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

const SemiCircularProgressBar = ({
  value = 70,
  max = 100,
  color = 'cyan',
  size = 180,
  strokeWidth = 12,
  bgColor = 'rgba(200,200,200,0.2)'
}) => {
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = Math.PI * radius;
  const progress = Math.max(0, Math.min(value / max, 1));
  const dashOffset = circumference * (1 - progress);

  return (
    <svg width={size} height={size / 2} viewBox={`0 0 ${size} ${size / 2}`}>
      {/* Background arc */}
      <path
        d={`
          M ${center - radius},${center}
          A ${radius},${radius} 0 0 1 ${center + radius},${center}
        `}
        stroke={bgColor}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
      />
      {/* Foreground arc */}
      <path
        d={`
          M ${center - radius},${center}
          A ${radius},${radius} 0 0 1 ${center + radius},${center}
        `}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
      />
      {/* Optional: Thumb */}
      <circle
        cx={center - radius + 2 * radius * progress}
        cy={center}
        r={strokeWidth / 2}
        fill={color}
        stroke="#fff"
        strokeWidth={2}
        style={{ transition: 'cx 0.3s' }}
      />
    </svg>
  );
};

SemiCircularProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
  strokeWidth: PropTypes.number,
  bgColor: PropTypes.string,
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