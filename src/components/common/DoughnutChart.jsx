import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const DoughnutChart = ({
  labels = ['Red', 'Blue', 'Yellow'],
  dataSet = [30, 50, 20],
  backgroundColors = ['yellow', 'orange', 'cyan', 'red', 'white', '#c0d1d0', 'green'],
  label = 'Dataset'
}) => {
  const data = {
    labels,
    datasets: [
      {
        label,
        data: dataSet,
        backgroundColor: backgroundColors,
        borderWidth: 0, // Remove border
      }
    ]
  }

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: 'white',
          padding: 20,
          // font: {
          //   size: 16,
          // },
        }
      },
      tooltip: {
        enabled: true,
      }
    }
  }

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <Doughnut data={data} options={options} />
    </div>
  )
}

export default DoughnutChart