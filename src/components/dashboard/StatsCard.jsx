import { employeeDetails } from "@/constants/dummyData";
import { TrendingDown, TrendingUp } from "lucide-react";

export default function StatsCard() {
  return (
    <div className="grid grid-cols-4 gap-3">
      {employeeDetails.map((stat, index) => (
        <div
          key={index}
          className="rounded-md border border-black/10 bg-white px-5 py-4"
        >
          <div className="mb-5 flex items-center gap-2">
            <h2 className="min-w-fit text-sm font-semibold text-black">
              {stat.title}
            </h2>
            <span
              className={`flex h-7 items-center justify-center gap-1 rounded-full bg-[#23C10A26] px-2 text-[0.78rem] font-semibold text-[#0B8A00] ${
                stat.trend === "minus" ? "bg-[#C71026]/10 text-[#C71026]" : ""
              }`}
            >
              {stat.trend === "minus" ? (
                <TrendingDown className="h-4 text-red-500" />
              ) : (
                <TrendingUp className="h-4" />
              )}
              {stat.percentage}
            </span>
          </div>
          <h1 className="flex items-end gap-3 text-2xl font-bold text-black">
            {stat.value}
          </h1>
          <p className="mt-1 text-xs text-[#949494]">{stat.description}</p>
        </div>
      ))}
    </div>
  );
}
