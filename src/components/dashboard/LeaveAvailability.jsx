import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function LeaveAvailability() {
  const data = {
    labels: ["Available", "Consumed", "Annual", "Accrued"],
    datasets: [
      {
        data: [6, 2, 12, 8], // Example data
        backgroundColor: ["#456EF2", "#FFA38F", "#FFD74A", "#FFBC29"],
        hoverBackgroundColor: ["#456EF2", "#FFA38F", "#FFD74A", "#FFBC29"],
      },
    ],
  };

  const options = {
    cutout: "70%", // To create a donut chart
    plugins: {
      legend: {
        position: "right",
      },
    },
  };

  return (
    <div className="rounded-md bg-white px-6 py-3">
      <h1 className="mb-5 text-base font-semibold">
        Leave availability
        <br />
        <span className="text-xs font-normal text-gray-500">
          Total Employee: 800
        </span>
      </h1>
      <div className="m-auto w-48">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}
