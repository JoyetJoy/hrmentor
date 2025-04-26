import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useUserStore } from "@/lib/slices/auth.slice";
import { useQuery } from "@tanstack/react-query";
import { EMPLOYEE_ANNUAL_LEAVE, newRequest } from "@/api";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function LeaveDiagram() {

    const { user } = useUserStore((state) => ({
        user: state.user,
      }));
      const employeeId = user?.employee_data?.id;
      
      const { data: leave, refetch } = useQuery({
        queryKey: ["leave", employeeId], // include ID to trigger on change
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
  const data1 = {
    labels: ["Available", "Consumed", "Annual", "Accrued"],
    datasets: [
      {
        data: [6, 2, 12, 8],
        backgroundColor: ["#456EF2", "#FFA38F", "#FFD74A", "#FFBC29"],
        hoverBackgroundColor: ["#456EF2", "#FFA38F", "#FFD74A", "#FFBC29"],
      },
    ],
  };

  const data2 = {
    labels: ["Available", "Consumed", "Annual", "Accrued"],
    datasets: [
      {
        data: [6, 2, 12, 8],
        backgroundColor: ["#456EF2", "#FFA38F", "#FFD74A", "#FFBC29"],
        hoverBackgroundColor: ["#456EF2", "#FFA38F", "#FFD74A", "#FFBC29"],
      },
    ],
  };

  const data3 = {
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
    cutout: "76%",
    plugins: {
      legend: {
        position: "right",
        labels: {
          boxWidth: 10,
          padding: 14,
          usePointStyle: true,
        },
      },
      leaveData: {
        total: leave?.total || 0,
      },
    },
  };
  
  const centerTextPlugin = {
    id: "centerText",
    beforeDraw: (chart) => {
      const { width, height, ctx } = chart;
      const total = chart?.config?.options?.plugins?.leaveData?.total;
  
      ctx.save();
  
      // 📍 Draw "Annual Leave" on top-left
      ctx.font = "bold 14px sans-serif";
      ctx.fillStyle = "#525252";
      ctx.textAlign = "left";
      ctx.fillText("Annual Leave", 10, 20); // 10px from left, 20px from top
  
      // 📍 Draw "Total" in center
      const centerX = width / 2 - 45;
      const centerY = height / 2;
  
      ctx.textAlign = "center";
      ctx.font = "12px sans-serif";
      ctx.fillStyle = "#999";
      ctx.fillText("Total", centerX, centerY - 10);
  
      // 📍 Draw "XXX Hrs" just below "Total"
      ctx.font = "bold 16px sans-serif";
      ctx.fillStyle = "#000";
      ctx.fillText(`${total} Hrs`, centerX, centerY + 12);
  
      ctx.restore();
    },
  };
  
  
  const centerTextPlugin1 = {
    id: "centerText",
    beforeDraw: (chart) => {
      const { width, height, ctx } = chart;
    //   const total =chart?.config?.options?.plugins?.leaveData?.total;
  
      ctx.restore();
      ctx.save();
//   console.log(leave);
  
      const centerX = width / 2 - 70; // move 10px to the left
      const centerY = height / 2 - 120;
  
      ctx.font = "12px sans-serif";
      ctx.fillStyle = "#999";
      ctx.textAlign = "center";
    //   ctx.fillText("Total", centerX, centerY - 10);
  
      ctx.font = "bold 16px sans-serif";
      ctx.fillStyle = "#525252";
      ctx.fillText(`Casual Leave`, centerX, centerY + 10);
      ctx.restore();
    },
  };

  const centerTextPlugin2 = {
    id: "centerText",
    beforeDraw: (chart) => {
      const { width, height, ctx } = chart;
    //   const total =chart?.config?.options?.plugins?.leaveData?.total;
  
      ctx.restore();
      ctx.save();
//   console.log(leave);
  
      const centerX = width / 2 - 70; // move 10px to the left
      const centerY = height / 2 - 120;
  
      ctx.font = "12px sans-serif";
      ctx.fillStyle = "#999";
      ctx.textAlign = "center";
    //   ctx.fillText("Total", centerX, centerY - 10);
  
      ctx.font = "bold 16px sans-serif";
      ctx.fillStyle = "#525252";
      ctx.fillText(`Sick Leave`, centerX, centerY + 10);
      ctx.restore();
    },
  };

  const centerTextPlugin3 = {
    id: "centerText",
    beforeDraw: (chart) => {
      const { width, height, ctx } = chart;
    //   const total =chart?.config?.options?.plugins?.leaveData?.total;
  
      ctx.restore();
      ctx.save();
//   console.log(leave);
  
      const centerX = width / 2 - 70; // move 10px to the left
      const centerY = height / 2 - 120;
  
      ctx.font = "12px sans-serif";
      ctx.fillStyle = "#999";
      ctx.textAlign = "center";
    //   ctx.fillText("Total", centerX, centerY - 10);
  
      ctx.font = "bold 16px sans-serif";
      ctx.fillStyle = "#525252";
      ctx.fillText(`Comp Off`, centerX, centerY + 10);
      ctx.restore();
    },
  };

  return (
    <div className="w-full h-full grid grid-cols-4 gap-5 ">
        
      {/* <div className="flex w-full flex-wrap  gap-2 text-[0.77rem] font-semibold">
        <div className="bg-hrmprimaryorange flex h-8 w-fit cursor-pointer  whitespace-nowrap items-center justify-center rounded px-2 text-white">
          Casual Leave
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
      </div> */}

      <div className=" h-[17rem] w-full bg-white flex rounded-md px-5 pt-3 shadow-sm">
        <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
      </div>
      {/* <div className=" h-[17rem] w-full bg-white flex rounded-md px-5 pt-3 shadow-sm">
        <Doughnut data={data1} options={options} plugins={[centerTextPlugin1]} />
      </div>
      <div className=" h-[17rem] w-full bg-white flex rounded-md px-5 pt-3 shadow-sm">
        <Doughnut data={data2} options={options} plugins={[centerTextPlugin2]} />
      </div>
      <div className=" h-[17rem] w-full bg-white flex rounded-md px-5 pt-3 shadow-sm">
        <Doughnut data={data3} options={options} plugins={[centerTextPlugin3]} />
      </div> */}
    </div>
  );
}
