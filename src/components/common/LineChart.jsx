import React, { useContext, useEffect, useRef, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { WeatherContext } from '../../contexts/WeatherContext';
import { ConvertTo12Hour } from '../../utils/utils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const LineChart = ({ hourlyDataset, activeMode }) => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (!hourlyDataset || hourlyDataset.length === 0) {
      setChartData(null);
      return;
    }

    const newData = {
      labels: hourlyDataset.map((hourlyData) => ConvertTo12Hour(hourlyData.dt_txt.split(' ')[1])),
      datasets: [
        {
          label:
            activeMode === 'Precipitation'
              ? 'Rain'
              : activeMode === 'Wind'
              ? 'Wind Speed'
              : activeMode === 'Humidity'
              ? 'Humidity'
              : activeMode === 'Pressure'
              ? 'Pressure'
              : activeMode === 'Visibility'
              ? 'Visibility'
              : 'Temperature',
          data:
            activeMode === 'Precipitation'
              ? hourlyDataset.map((hourlyData) => hourlyData.pop * 100)
              : activeMode === 'Wind'
              ? hourlyDataset.map((hourlyData) => hourlyData.wind.speed)
              : activeMode === 'Humidity'
              ? hourlyDataset.map((hourlyData) => hourlyData.main.humidity)
              : activeMode === 'Pressure'
              ? hourlyDataset.map((hourlyData) => hourlyData.main.pressure)
              : activeMode === 'Visibility'
              ? hourlyDataset.map((hourlyData) => hourlyData.visibility / 1000)
              : activeMode === 'Feels Like'
              ? hourlyDataset.map((hourlyData) => hourlyData.main.feels_like)
              : hourlyDataset.map((hourlyData) => hourlyData.main.temp),
          borderColor: 'blue',
          tension: 0.5, 
          borderWidth: 3,
          pointRadius: 0, 
          pointHoverRadius: 6,
          fill: true, 
        },
      ],
    };

    console.log(newData);
    console.log(activeMode)

    setChartData(newData);
  }, [activeMode, hourlyDataset]);

  const options = {
    responsive: true,
    color: 'white',
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
          display: true,
          color: 'white',
        },
        ticks: {
          stepSize: 10, // Set the gap between y-axis values to 10
        },
      },
      x: {
        grid: {
          display: true,
          color: 'white',
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };

  if (!chartData) {
    return <div className="text-center text-gray-500">No data available to display the chart.</div>;
  }

  return <Line data={chartData} options={options} ref={chartRef} />;
};

export default LineChart;