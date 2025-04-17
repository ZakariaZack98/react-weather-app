import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { ConvertTo12Hour } from '../../utils/utils';
import { ColorGroups } from '../../lib/GradColorGrp';

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
  const colorData = ColorGroups;
  const [gradColors, setGradColors] = useState(['rgba(243, 96, 39, 0.48)', 'rgba(0, 178, 28, 0.48)', 'rgba(255, 255, 255, 0)']);

  useEffect(() => {
    if (activeMode === 'Wind' || activeMode === 'Humidity') {
      setGradColors(colorData.wind);
    } else if (activeMode === 'Overview' || activeMode === 'Feels Like') {
      setGradColors(colorData.temp);
    } else if (activeMode === 'Pressure') {
      setGradColors(colorData.pressure);
    } else if (activeMode === 'Visibility') {
      setGradColors(colorData.visibility);
    } else {
      setGradColors(colorData.temp);
    }
  }, [activeMode, colorData]);

  if (!hourlyDataset || hourlyDataset.length === 0) {
    return <div className="text-center text-gray-500">No data available to display the chart.</div>;
  }

  const data = {
    labels: hourlyDataset.map((hourlyData) => ConvertTo12Hour(hourlyData.dt_txt.split(' ')[1])),
    datasets: [
      {
        label:
          activeMode === 'Precipitation'
            ? 'Chances of Rain (%)'
            : activeMode === 'Wind'
              ? 'Wind Speed (mph)'
              : activeMode === 'Humidity'
                ? 'Humidity (%)'
                : activeMode === 'Pressure'
                  ? 'Pressure (mbr)'
                  : activeMode === 'Visibility'
                    ? 'Visibility (km)'
                    : 'Temperature (°c)',
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
        borderColor: (ctx) => {
          const chart = ctx.chart;
          const { ctx: canvasCtx, chartArea } = chart;
          if (!chartArea) return 'orange';
          const gradient = canvasCtx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, gradColors[0]);
          gradient.addColorStop(0.5, gradColors[1]);
          gradient.addColorStop(1, gradColors[2]);
          return gradient;
        },
        backgroundColor: (ctx) => {
          const chart = ctx.chart;
          const { ctx: canvasCtx, chartArea } = chart;
          if (!chartArea) return 'orange';
          const gradient = canvasCtx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, gradColors[0]);
          gradient.addColorStop(0.5, gradColors[1]);
          gradient.addColorStop(1, gradColors[2]);
          return gradient;
        },
        tension: 0.5,
        borderWidth: 3,
        pointRadius: 0,
        pointHoverRadius: 6,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    color: 'white',
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        padding: 10,
        labels: {
          usePointStyle: true,
          color: 'white',
          generateLabels: (chart) => {
            const dataset = chart.data.datasets[0];
            return [{
              text: dataset.label,
              fillStyle: gradColors[1],
              strokeStyle: gradColors[1],
              pointStyle: 'circle',
              hidden: false,
              index: 0,
              fontColor: 'white',
              fontSize: 25,
            }];
          },
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: activeMode === 'Pressure' ? 990 : 0,
        max: activeMode === 'Wind' ? 15 : undefined,
        grid: {
          drawBorder: false,
          display: true,
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          stepSize: activeMode === 'Wind' ? 1 : 10,
          color: 'white',
        },
      },
      x: {
        position: 'top',
        grid: {
          display: true,
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: 'white',
          padding: 10,
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };

  return (
    <Line
      data={data}
      options={options}
      redraw
    />
  );
};

export default LineChart;