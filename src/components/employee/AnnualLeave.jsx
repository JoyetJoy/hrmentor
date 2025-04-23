import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { ANNUAL_LEAVE, newRequest } from "@/api";
import { useQuery } from "@tanstack/react-query";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AnnualLeave() {
  const {data: annualLeave, isLoading, refetch,} = useQuery({
    queryKey: ["annualLeave"],
    queryFn: () =>
      newRequest.get(ANNUAL_LEAVE).then((res) => {
        return res.data;
      }),
  });
  console.log(annualLeave);
  
  const data = {
    labels: ["Consumed", "Remaining"],
    datasets: [
      {
        data: [annualLeave?.consumed, annualLeave?.remaining],
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
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw} Hrs`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full rounded-md bg-white px-5 py-3 shadow-sm">
      <div className="w-[80%]">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}
