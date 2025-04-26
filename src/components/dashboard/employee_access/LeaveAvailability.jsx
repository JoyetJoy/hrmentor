import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useQuery } from "@tanstack/react-query";
import { EMPLOYEE_ANNUAL_LEAVE, newRequest } from "@/api";
import { useUserStore } from "@/lib/slices/auth.slice";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function LeaveAvailability() {
  const [leavetype, setLeavetype] = useState('annual');

  const { user } = useUserStore((state) => ({
    user: state.user,
  }));
  const employeeId = user?.employee_data?.id;
  
  const { data: leave, refetch } = useQuery({
    queryKey: ["leave", leavetype, employeeId], // include ID to trigger on change
    queryFn: () =>
      newRequest.get(EMPLOYEE_ANNUAL_LEAVE).then((res) => res.data),
    enabled: !!employeeId, // ensure it waits until ID is ready
  });
  
const annual= [leave?.consumed || 0, leave?.remaining || 0]
const annualLabels = leave ? Object.keys(leave).filter((key) => key !== 'total') : [];
console.log(annualLabels);


  const data = {
    labels: annualLabels,
    datasets: [
      {
        data: annual,
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
      },leaveData: {
        total: leave?.total || 0,
      },  
    },
  };

  const centerTextPlugin = {
    id: "centerText",
    beforeDraw: (chart) => {
      const { width, height, ctx } = chart;
      const total =chart?.config?.options?.plugins?.leaveData?.total;
  
      ctx.restore();
      ctx.save();
  console.log(leave);
  
      const centerX = width / 2 - 50; // move 10px to the left
      const centerY = height / 2;
  
      ctx.font = "12px sans-serif";
      ctx.fillStyle = "#999";
      ctx.textAlign = "center";
      ctx.fillText("Total", centerX, centerY - 10);
  
      ctx.font = "bold 16px sans-serif";
      ctx.fillStyle = "#000";
      ctx.fillText(`${total} Hrs`, centerX, centerY + 10);
      ctx.restore();
    },
  };

  return (
    <div className="w-full rounded-md bg-white px-5 py-3 shadow-sm">
      <div className="flex w-full flex-wrap  gap-2 text-[0.77rem] font-semibold">
        <div className="bg-hrmprimaryorange flex h-8 w-fit cursor-pointer  whitespace-nowrap items-center justify-center rounded px-2 text-white">
          Annual Leave
        </div>
        <div className="flex h-8 w-fit cursor-pointer items-center justify-center rounded border  whitespace-nowrap  border-black/15 bg-black/5 px-2 text-black/80">
          Sick leave
        </div>
        <div className="flex h-8 w-fit cursor-pointer items-center justify-center rounded border  whitespace-nowrap border-black/15 bg-black/5 px-2 text-black/80">
          Comp off
        </div>
        <div className="flex h-8 w-fit cursor-pointer items-center justify-center rounded border  whitespace-nowrap border-black/15 bg-black/5 px-2 text-black/80">
          Loss of pay
        </div>
      </div>

      <div className="w-[80%]">
        <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
      </div>
    </div>
  );
}
