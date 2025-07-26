import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { ANNUAL_LEAVE, newRequest } from "@/api";
import { useQuery } from "@tanstack/react-query";

// Register core chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

export default function AnnualLeave({ id }) {
  const { data: annualLeave } = useQuery({
    queryKey: ["annualLeave", id],
    queryFn: () =>
      newRequest.get(`${ANNUAL_LEAVE}?emp_id=${id}`).then((res) => res.data),
  });

  const data = {
    labels: ["Consumed", "Remaining"],
    datasets: [
      {
        data: [annualLeave?.consumed || 0, annualLeave?.remaining || 0],
        backgroundColor: ["#456EF2", "#FFA38F"],
        hoverBackgroundColor: ["#456EF2", "#FFA38F"],
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

  const centerTextPlugin = {
    id: "centerText",
    beforeDraw: (chart) => {
      const { width, height, ctx } = chart;
  
      ctx.restore();
      ctx.save();
  
      const centerX = width / 2 - 50; // move 10px to the left
      const centerY = height / 2;
  
      ctx.font = "12px sans-serif";
      ctx.fillStyle = "#999";
      ctx.textAlign = "center";
      ctx.fillText("Remaining", centerX, centerY - 10);
  
      ctx.font = "bold 16px sans-serif";
      ctx.fillStyle = "#000";
      ctx.fillText(`${annualLeave?.remaining} Hrs`, centerX, centerY + 10);
      ctx.restore();
    },
  };

  return (
    <div className="w-full rounded-md bg-white px-5 py-3 shadow-sm mt-5">
      <div className="w-[80%]">
        <p className="font-semibold">Annual Leave</p>
        {annualLeave && (
          <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
        )}
      </div>
    </div>
  );
}
