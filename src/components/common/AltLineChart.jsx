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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const AltLineChart = ({
  labels = [2, 5, 6, 8, 5,3,5,7,3,2,1,2, 5,3,5,7,3,2, 5, 6, 8, 5,3,2,5,3,2, 5, 6, 8,],
  secondLabel,
  ThirdLabel,
  dataSet = [23, 25, 26, 28, 25,33,25,27,30,32,31,22, 25,23,25,27,23,32, 35, 36, 38, 35,33,22,25,30,32, 25, 26, 28,],
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
        
      }
    ]
  }

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: 'white', // Legend text color
        },
      },
      title: {
        display: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: 'white',
          display: false // X-axis label color
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0,0,0,0.05)'
        },
        ticks: {
          color: 'white', // Y-axis label color
        }
      }
    }
  }

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Line data={data} options={options} />
    </div>
  )
}

export default AltLineChart