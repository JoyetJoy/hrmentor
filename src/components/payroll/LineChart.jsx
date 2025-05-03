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

const Expense = ({datas}) => {
  console.log(datas);
  const months = datas?.graph.map(item => item.month);
  const values = datas?.graph.map(item => item.value);
  
  const data = {
    labels:months,
    datasets: [
      {
        label: "Payout",
        data: values,
        borderColor: "rgb(233,93,57)",
        backgroundColor: "rgb(233,93,57)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // This hides the "Payout" label on top
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `£${context.parsed.y}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    maintainAspectRatio: false, // Allow custom height
  };

  return (
    <div className="w-full min-h-[20rem] mt-5">
      <Line data={data} options={options} style={{ height: "300px" }} />
    </div>
  );
};

export default Expense;
