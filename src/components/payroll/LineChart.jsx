import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title);

const Expense = () => {
  const data = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
      "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
    ],
    datasets: [
      {
        label: "Additional Payout",
        data: [100, 300, 240, 260, 280, 300, 340, 320, 310, 190, 180, 150],
        borderColor: "rgb(233,93,57)",
        backgroundColor: "rgb(233,93,57)",
        tension: 0.4,
      },
    ],
  };

  const options = { 
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    maintainAspectRatio: false, // Allow custom height
  };

  return (
    <div className="w-full min-h-[20rem]">
      <Line data={data} options={options} style={{ height: "300px" }} />
    </div>
  );
};

export default Expense;
