import React, { useEffect, useMemo, useState } from "react";
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
    enabled: !!id,
  });

  // 🔹 Selected year state
  const [selectedYear, setSelectedYear] = useState("");

  // 🔹 Extract years from API
  const years = useMemo(() => {
    return annualLeave?.data ? Object.keys(annualLeave.data) : [];
  }, [annualLeave]);

  // 🔹 Default to current year
  useEffect(() => {
    if (years.length) {
      const currentYear = new Date().getFullYear().toString();
      setSelectedYear(years.includes(currentYear) ? currentYear : years[0]);
    }
  }, [years]);

  // 🔹 Data for selected year
  const yearData = annualLeave?.data?.[selectedYear] || {};

  const chartValues = [
    Number(yearData.consumed || 0),
    Number(yearData.remaining || 0),
  ];

  // 🔹 Chart data
  const data = {
    labels: ["Consumed", "Remaining"],
    datasets: [
      {
        data: chartValues,
        backgroundColor: ["#456EF2", "#FFA38F"],
        hoverBackgroundColor: ["#456EF2", "#FFA38F"],
      },
    ],
  };

  // 🔹 Chart options
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
          label: (tooltipItem) =>
            `${tooltipItem.label}: ${tooltipItem.raw} Hrs`,
        },
      },
      leaveData: {
        remaining: Number(yearData.remaining || 0),
      },
    },
  };

  // 🔹 Center text plugin
  const centerTextPlugin = {
    id: "centerText",
    beforeDraw: (chart) => {
      const { width, height, ctx } = chart;
      const remaining =
        chart?.config?.options?.plugins?.leaveData?.remaining || 0;

      ctx.save();

      const centerX = width / 2 - 50;
      const centerY = height / 2;

      ctx.font = "12px sans-serif";
      ctx.fillStyle = "#999";
      ctx.textAlign = "center";
      ctx.fillText("Remaining", centerX, centerY - 10);

      ctx.font = "bold 16px sans-serif";
      ctx.fillStyle = "#000";
      ctx.fillText(`${remaining} Hrs`, centerX, centerY + 10);

      ctx.restore();
    },
  };

  return (
    <div className="w-full rounded-md bg-white px-5 py-3 shadow-sm mt-5">
      <div className="flex justify-between items-center mb-2">
        <p className="font-semibold">Annual Leave</p>

        {/* 🔽 Year Selector */}
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="w-[80%]">
        {selectedYear && (
          <Doughnut
            data={data}
            options={options}
            plugins={[centerTextPlugin]}
          />
        )}
      </div>
    </div>
  );
}