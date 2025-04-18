import React from 'react'
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { GetClosestTime } from '../../utils/utils';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

// Utility to convert hex to rgba
function hexToRgba(hex, alpha = 1) {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha})`;
}

const TrendCurve = ({ data, curveColor, min = undefined, max = undefined, fill = false }) => {
  const closest = GetClosestTime(data?.labels);
  const pointRadiusArr = data?.labels?.map(timeStr => {
    if (timeStr === closest) {
      return 10;
    } else return 0
  })

  const bgColor = curveColor.startsWith('#')
    ? hexToRgba(curveColor, 0.1)
    : curveColor.includes('rgb')
      ? curveColor.replace(/[\d.]+\)$/g, '0.1)')
      : curveColor; 

  const temperatureData = {
    labels: data?.labels, 
    datasets: [{
      data: data?.data, 
      borderColor: curveColor, 
      tension: 0.4, 
      fill: fill,
      backgroundColor: bgColor, 
      borderWidth: 10,
      pointRadius: pointRadiusArr,
      pointBackgroundColor: curveColor,
      pointBorderColor: 'white',
      pointShadow: true,
      pointBorderWidth: 5, 
      pointShadowBlur: 5, 
      pointShadowColor: '#000000', 
      pointShadowOffsetX: 0, 
      pointShadowOffsetY: 5,
    }]
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.parsed.y}°C`
        }
      }
    },
    scales: {
      x: {
        grid: { display: false }, 
        ticks: { color: "#666" },
        display: false 
      },
      y: {
        min: min,
        max: max,
        display: false, 
      }
    },
    elements: {
      line: {
        borderWidth: 2 
      }
    }
  };
  return (
    
      <Line data={temperatureData} options={options} />
    
  )
}

export default TrendCurve