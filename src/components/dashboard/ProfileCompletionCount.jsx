import { MoveRight } from "lucide-react";
import { Bar } from "react-chartjs-2";
import React from "react";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function ProfileCompletionCount({ value }) {
  const percentage = value?.overallPercentage.toFixed(2); 

  const data = {
    labels: ["Progress"],
    datasets: [
      {
        label: "Profile Completion",
        data: [percentage],
        backgroundColor: "#E95D39", 
        borderRadius: 5,
        barThickness: 25, 
      },
    ],
  };

  const options = {
    indexAxis: "y",
    scales: {
      x: {
        max: 100,
        display: false,
        ticks: {
          display: false, 
        },
        grid: {
          display: false, 
          drawBorder: false,
        },
      },
      y: {
        display: false,
        ticks: {
          display: false, 
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false, 
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw}%`, 
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="relative mb-4 flex h-28 flex-col justify-between rounded-xl bg-white px-5 py-4 shadow">
      <div className="z-10 flex items-center gap-3 font-medium">
        Complete profile details
        <Link to="/admin/company/general">
          <MoveRight />
        </Link>
      </div>
      <div className="h-10 w-full">
        <Bar data={data} options={options} />
      </div>
      <div className="absolute bottom-1 right-5 text-xs font-semibold text-gray-600">
        {percentage}% Completed
      </div>
    </div>
  );
}
