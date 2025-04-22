import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const AltBarChart = ({
  labels = [],
  dataSet = [],
  secondDataSet,
  label = 'Dataset',
  secondLabel,
  borderColor,
  backgroundColor
}) => {
  const data = {
    labels,
    datasets: [
      {
        label,
        data: dataSet,
        borderColor: borderColor,
        backgroundColor: backgroundColor,
        barThickness: 2,
        barPercentage: 0.8, 
      },
      ...(secondDataSet ? [{
        label: secondLabel,
        data: secondDataSet,
        borderColor: borderColor,
        backgroundColor: backgroundColor,
        barThickness: 24,
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
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: 'white',
          dusplay: false,
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
      <Bar data={data} options={options} redraw />
    </div>
  )
}

export default AltBarChart