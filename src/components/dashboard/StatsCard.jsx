import { employeeDetails } from "@/constants/dummyData";
import { TrendingDown, TrendingUp } from "lucide-react";

export default function StatsCard() {
  return (
    <div className="grid w-full grid-cols-4 gap-3">
      {employeeDetails.map((stat, index) => (
        <div
          key={index}
          className="flex w-full flex-col items-start rounded-md border border-black/10 bg-white px-5 py-4"
        >
          <div className="mb-4 flex items-center gap-2">
            <h2 className="min-w-fit text-sm font-semibold text-black">
              {stat.title}
            </h2>
            <span
              className={`flex h-7 items-center justify-center gap-1 rounded-full bg-darkgreen px-2 text-[0.78rem] font-semibold text-textcolor-green ${
                stat.trend === "minus" ? "bg-textcolor-red/10 text-textcolor-red" : ""
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
          <p className="mt-1 text-xs text-gray-cool">{stat.description}</p>
        </div>
      ))}
    </div>
  );
}
