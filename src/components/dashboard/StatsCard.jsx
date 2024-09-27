import { employeeDetails } from "@/constants/dummyData";

export default function StatsCard() {
  return (
    <div className="grid grid-cols-4 gap-3">
      {employeeDetails.map((stat, index) => (
        <div
          key={index}
          className="rounded-md border border-black/10 bg-white px-5 py-4"
        >
          <div className="mb-5 flex items-center gap-2">
            <h2 className="text-sm font-semibold text-black">{stat.title}</h2>
            <span className="flex h-7 items-center justify-center gap-1 rounded-full bg-[#23C10A26] px-2 text-[0.78rem] font-semibold text-[#0B8A00]">
              <div className="h-3 w-3">
                <img
                  src={stat.icon}
                  alt="increase"
                  className="w-full object-contain"
                />
              </div>
              {stat.percentage}
            </span>
          </div>
          <h1 className="flex items-end gap-3 text-3xl font-semibold text-black">
            {stat.value}
          </h1>
          <p className="mt-1 text-xs text-gray-200">{stat.description}</p>
        </div>
      ))}
    </div>
  );
}
