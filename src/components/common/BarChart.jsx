import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { ConvertTo12Hour } from "../../utils/utils";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Filler, Tooltip, Legend);


const BarChart = ({hourlyDataset, activeMode}) => {

  if (!hourlyDataset || hourlyDataset.length === 0) {
    return <div className="text-center text-gray-500">No data available to display the chart.</div>;
  }

  const data = {
    labels: hourlyDataset.map((hourlyData) => ConvertTo12Hour(hourlyData.dt_txt.split(" ")[1])),
    datasets: [
      {
        label:
          activeMode === "Cloud Cover"
            ? "Cloud Cover (%)"
            : activeMode === "Precipitation"
            ? "Chances of Rain (%)"
            : 'fallback',
        data:
          activeMode === "Precipitation"
            ? hourlyDataset.map((hourlyData) => hourlyData.pop * 100)
            : hourlyDataset.map((hourlyData) => hourlyData.clouds.all),           
        borderColor: activeMode === 'Cloud Cover' ? 'cyan' : 'rgba(78, 113, 252, 1)',
        backgroundColor: activeMode === 'Cloud Cover' ? 'cyan' : 'rgba(78, 113, 252, 1)',
        borderRadius: 50,
        barThickness: 30,
      },
    ],
  };

  const options = {
    responsive: true,
    color: "white",
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",

        paddingEnd: 100,
        labels: {
          usePointStyle: true,
          color: "white",
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        max: activeMode === "Precipitation" || activeMode === "Cloud Cover" ? 100 : undefined,
        grid: {
          drawBorder: false,
          display: true,
          color: "rgba(255, 255, 255, 0.05)",
        },
        ticks: {
          stepSize: activeMode === "Wind" ? 1 : 10,
          color: "white",
        },
      },
      x: {
        position: "top",
        grid: {
          display: true,
          color: "rgba(255, 255, 255, 0.05)",
        },
        ticks: {
          color: "white",
          padding: 10,
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
  };

  return <Bar data={data} options={options} redraw />;
};

export default BarChart;
