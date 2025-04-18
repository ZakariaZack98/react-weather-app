import React, { useContext } from 'react'
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { GetClosestTime } from '../../utils/utils';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

const TrendCurve = ({ data, curveColor }) => {
  const closest = GetClosestTime(data.labels);
  const pointRadiusArr = data.labels.map((timeStr, idx) => {
    if (timeStr === closest) {
      return 8;
    } else return 0
  })
  const temperatureData = {
    labels: data.labels, 
    datasets: [{
      data: data.data, 
      borderColor: curveColor, 
      tension: 0.4, 
      fill: false,
      pointRadius: 0,
      borderWidth: 10,
      pointRadius: pointRadiusArr,
      pointBackgroundColor: curveColor,
      pointBorderColor: 'white',
      pointShadow: true, 
      pointShadowBlur: 10, 
      pointShadowColor: 'rgba(0, 102, 204, 0.5)', 
      pointShadowOffsetX: 0, 
      pointShadowOffsetY: 3,
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
    <div style={{ width: "300px", height: "100px" }}>
      <Line data={temperatureData} options={options} />
    </div>
  )
}

export default TrendCurve