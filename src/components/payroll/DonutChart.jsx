import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const SemiDonutChart = () => {
  const data = {
    labels: ["Completed", "Pending", "Cancelled"],
    datasets: [
      {
        data: [30, 40, 30], // Example values
        backgroundColor: ["#e95d39", "#181c3a", "#7f56da"], // Colors for sections
        borderWidth: 0,
      },
    ],
  };

  const options = {
    rotation: -90, // Start angle (from the top)
    circumference: 180, // Half-circle
    cutout: "60%", // Adjust inner radius (thickness)
    plugins: {
      legend: {
        position: "bottom", // Move legend below the chart
      },
    },
  };

  return (
    <div className="w-[280px] mx-auto">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default SemiDonutChart;
