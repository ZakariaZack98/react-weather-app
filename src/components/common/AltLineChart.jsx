import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

// Custom plugin for vertical hover line
const verticalLinePlugin = {
  id: 'verticalLineOnHover',
  afterDraw: (chart) => {
    if (chart.tooltip?._active && chart.tooltip._active.length) {
      const ctx = chart.ctx;
      ctx.save();
      const activePoint = chart.tooltip._active[0];
      const x = activePoint.element.x;
      const chartArea = chart.chartArea;
      ctx.beginPath();
      ctx.moveTo(x, chartArea.top);
      ctx.lineTo(x, chartArea.bottom);
      ctx.lineWidth = 1; // 1px thickness
      ctx.strokeStyle = 'rgba(255,255,255,0.4)'; // semi-transparent white
      ctx.setLineDash([6, 6]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    }
  }
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  verticalLinePlugin // Register the vertical plugin here
)

const AltLineChart = ({
  labels = [2, 5, 6, 8, 5, 3, 5, 7, 3, 2, 1, 2, 5, 3, 5, 7, 3, 2, 5, 6, 8, 5, 3, 2, 5, 3, 2, 5, 6, 8,],
  secondLabel,
  ThirdLabel,
  dataSet = [23, 25, 26, 28, 25, 33, 25, 27, 30, 32, 31, 22, 25, 23, 25, 27, 23, 32, 35, 36, 38, 35, 33, 22, 25, 30, 32, 25, 26, 28,],
  secondDataSet,
  thirdDataset,
  label = 'Dataset',
  borderColors = ['rgba(75,192,192,1)'],
  backgroundColors = ['rgba(75,192,192,0.2)']
}) => {
  const data = {
    labels,
    datasets: [
      {
        label,
        data: dataSet,
        borderColor: borderColors[0],
        backgroundColor: backgroundColors[0],
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 6,
        borderWidth: 2,
      },
      ...(secondDataSet ? [{
        label: secondLabel,
        data: secondDataSet,
        borderColor: borderColors[1],
        backgroundColor: backgroundColors[1],
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 6,
        borderWidth: 2,
      }] : [])
    ]
  }

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: 'white',
        },
      },
      title: {
        display: false
      },
      tooltip: {
        mode: 'index',      // Show all datasets at the hovered index
        intersect: false,   // Show tooltip even if not directly over a point
      }
    },
    interaction: {
      mode: 'index',        // Match tooltip mode
      intersect: false,     // Enable tooltip on background hover
    },
    scales: {
      x: {
        grid: {
          display: false,
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: 'white',
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: 'white',
        }
      }
    }
  }

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Line data={data} options={options} redraw />
    </div>
  )
}

export default AltLineChart