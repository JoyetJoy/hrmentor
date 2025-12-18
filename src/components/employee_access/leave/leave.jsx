import React, { useEffect, useMemo, useState } from "react";
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

  const { data: leave } = useQuery({
    queryKey: ["leave", employeeId],
    queryFn: () =>
      newRequest.get(EMPLOYEE_ANNUAL_LEAVE).then((res) => res.data),
    enabled: !!employeeId,
  });

  // 🔹 Selected Year State
  const [selectedYear, setSelectedYear] = useState("");

  // 🔹 Extract years from API response
  const years = useMemo(() => {
    return leave?.data ? Object.keys(leave.data) : [];
  }, [leave]);

  // 🔹 Set default year (current year if available)
  useEffect(() => {
    if (years.length) {
      const currentYear = new Date().getFullYear().toString();
      setSelectedYear(years.includes(currentYear) ? currentYear : years[0]);
    }
  }, [years]);

  // 🔹 Selected year data
  const yearData = leave?.data?.[selectedYear] || {};

  const annual = [
    Number(yearData.consumed || 0),
    Number(yearData.remaining || 0),
  ];

  // 🔹 Chart Data
  const data = {
    labels: ["Consumed", "Remaining"],
    datasets: [
      {
        data: annual,
        backgroundColor: ["#456EF2", "#FFA38F"],
        hoverBackgroundColor: ["#456EF2", "#FFA38F"],
      },
    ],
  };

  // 🔹 Chart Options
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
      tooltip: {
        callbacks: {
          label: (tooltipItem) =>
            `${tooltipItem.label}: ${tooltipItem.raw} Hrs`,
        },
      },
      leaveData: {
        remaining: Number(yearData.remaining || 0),
      },
    },
  };

  // 🔹 Center Text Plugin
  const centerTextPlugin = {
    id: "centerText",
    beforeDraw: (chart) => {
      const { width, height, ctx } = chart;
      const remaining =
        chart?.config?.options?.plugins?.leaveData?.remaining || 0;

      ctx.save();

      // Title
      ctx.font = "bold 14px sans-serif";
      ctx.fillStyle = "#525252";
      ctx.textAlign = "left";
      ctx.fillText(`Annual Leave (${selectedYear})`, 10, 20);

      // Center Text
      const centerX = width / 2 - 45;
      const centerY = height / 2;

      ctx.textAlign = "center";
      ctx.font = "12px sans-serif";
      ctx.fillStyle = "#999";
      ctx.fillText("Remaining", centerX, centerY - 10);

      ctx.font = "bold 16px sans-serif";
      ctx.fillStyle = "#000";
      ctx.fillText(`${remaining} Hrs`, centerX, centerY + 12);

      ctx.restore();
    },
  };

  return (
    <div className="w-full h-auto grid sm:grid-cols-2 lg:grid-cols-3  gap-5">
      <div className="bg-white rounded-md shadow-sm mb-5 p-4">
        {/* 🔽 Year Selector */}
        <div className="flex justify-end mb-2">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* 📊 Doughnut Chart */}
        <div className="h-[17rem]">
          <Doughnut
            data={data}
            options={options}
            plugins={[centerTextPlugin]}
          />
        </div>
      </div>
    </div>
  );
}
