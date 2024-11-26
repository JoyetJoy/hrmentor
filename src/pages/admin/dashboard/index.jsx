import React from "react";
import { Clock4, LogIn, Search} from "lucide-react";
import { employeeDetails, meetings } from "@/constants/dummyData";
import StatsCard from "@/components/dashboard/StatsCard";
import ProfileCompletionCount from "@/components/dashboard/ProfileCompletionCount";
import LeaveAvailability from "@/components/dashboard/LeaveAvailability";

export const AdminDashboard = () => {
  return (
    <div className="my-3 flex items-baseline justify-between gap-4 rounded-md">
      <aside className="flex min-w-[73%] flex-col gap-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-black">Dashboard</h1>
          <div className="flex items-center gap-3">
            <div className="btn flex h-10 min-h-10 items-center justify-center rounded-md bg-[#2B2B2B] px-6 text-xs font-normal text-white hover:bg-hrmdarkblue">
              <Clock4 className="size-4" />
              Clock in
            </div>
            <label className="input flex h-10 min-h-10 items-center gap-2 rounded-md border-none pr-28 outline-none">
              <Search className="size-4 object-contain text-gray-dark" />
              <input
                type="text"
                className="grow placeholder:text-sm placeholder:text-gray-dark focus:outline-none"
                placeholder="Search"
              />
            </label>
          </div>
        </div>
        <StatsCard />
        <img src="/dummy.svg" />
      </aside>
      <aside className="flex w-[27%] flex-col">
        <ProfileCompletionCount />
        <LeaveAvailability />
        <div className="mt-4 rounded-md bg-white p-6 shadow-sm">
          <h1 className="mb-4 text-lg font-semibold text-black">
            News & Events
          </h1>
          <div className="flex flex-col gap-3">
            {meetings.map((meeting, index) => (
              <div
                key={index}
                className="flex flex-row rounded-md border border-gray-300"
              >
                <h1 className="flex w-16 flex-col items-center justify-center bg-gray-300 text-center text-sm font-bold text-black/80">
                  {meeting.date} <br />
                  <span>{meeting.month}</span>
                </h1>
                <h2 className="p-4 text-sm font-semibold text-black">
                  {meeting.title} <br />
                  <span className="text-xs font-normal text-gray-dark">
                    {meeting.details}
                  </span>
                </h2>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};
