import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function LeaveAvailability() {
  const data = {
    labels: ["Available", "Consumed", "Annual", "Accrued"],
    datasets: [
      {
        data: [6, 2, 12, 8],
        backgroundColor: ["#456EF2", "#FFA38F", "#FFD74A", "#FFBC29"],
        hoverBackgroundColor: ["#456EF2", "#FFA38F", "#FFD74A", "#FFBC29"],
      },
    ],
  };

  const options = {
    cutout: "70%",
    plugins: {
      legend: {
        position: "right",
        labels: {
          boxWidth: 10,
          padding: 14,
          usePointStyle: true,
        },
      },
    },
  };

  return (
    <div className="w-full rounded-md bg-white px-5 py-3">
      <div className="flex w-full gap-2 text-[0.78rem]">
        <div className="bg-hrmprimaryorange flex h-8 w-fit cursor-pointer items-center justify-center rounded px-2 font-semibold text-white">
          Casual Leave
        </div>
        <div className="flex h-8 w-fit cursor-pointer items-center justify-center rounded bg-black/10 px-2 font-semibold text-black/80">
          Sick leave
        </div>
        <div className="flex h-8 w-fit cursor-pointer items-center justify-center rounded bg-black/10 px-2 font-semibold text-black/80">
          Comp off
        </div>
        <div className="flex h-8 w-fit cursor-pointer items-center justify-center rounded bg-black/10 px-2 font-semibold text-black/80">
          Loss of pay
        </div>
      </div>

      <div className="w-[80%]">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}
