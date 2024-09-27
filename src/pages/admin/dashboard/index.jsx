import React from "react";
import { Clock4, Search, Calendar, CircleAlert, MoveRight } from "lucide-react";
import { employeeDetails, meetings } from "@/constants/dummyData";
import StatsCard from "@/components/dashboard/StatsCard";

export const AdminDashboard = () => {
  return (
    <div className="my-3 flex items-baseline justify-between gap-4 rounded-md">
      <aside className="flex min-w-[70%] flex-col gap-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-black">Dashbord</h1>
          <div className="flex items-center gap-3">
            <div className="btn flex h-10 min-h-10 items-center justify-center rounded-md bg-[#2B2B2B] px-6 text-xs font-normal text-white hover:bg-[#030E5C]">
              <Clock4 className="size-4" />
              Clock in
            </div>
            <label className="input flex h-10 min-h-10 items-center gap-2 rounded-md border-none pr-28 outline-none">
              <Search className="size-4 object-contain text-gray-200" />
              <input
                type="text"
                className="grow placeholder:text-sm placeholder:text-gray-200 focus:outline-none"
                placeholder="Search"
              />
            </label>
          </div>
        </div>
        <StatsCard />
        <div className="bg-white px-16 py-4">
          <div className="flex items-center justify-between py-3">
            <h1 className="flex items-center justify-center gap-3 text-xl font-bold text-black">
              Total Count <CircleAlert className="size-5" />
            </h1>
            <div className="flex items-center gap-3">
              <p className="text-xs text-gray-200">Provision Month </p>
              <h1 className="flex items-center gap-1 text-xs font-medium text-black">
                <Calendar className="size-4" />
                March 2020
              </h1>
              <div className="h-4 w-4">
                <img
                  src={"/assets/icons/admin/more-horizontal.svg"}
                  alt="moreIcon"
                  className="w-full object-contain"
                />
              </div>
            </div>
          </div>
          <div>
            <img
              src={"/assets/images/graph.png"}
              alt=""
              className="w-full object-contain"
            />
          </div>
        </div>
      </aside>
      {/* -------right------- */}
      <aside className="flex w-[30%] flex-col">
        <div className="relative mb-4 flex h-28 flex-col justify-between rounded-xl bg-white px-5 py-4">
          <div className="flex gap-3 font-medium">
            Complete profile details
            <MoveRight />
          </div>
          <div className="bg-hrmprimaryorange flex h-7 w-fit items-center justify-center rounded-lg px-5 text-sm font-semibold text-white">
            43%
          </div>
          <img
            className="absolute right-0 top-0"
            src="/assets/images/dashboard/group.svg"
            alt="svg"
          />
        </div>
        <div className="rounded-md bg-white px-6 py-3">
          <h1 className="mb-5 text-base font-semibold">
            Employee Composition
            <br />
            <span className="text-xs font-normal text-gray-200">
              Total Empployee:800
            </span>
          </h1>
          <div className="m-auto w-48">
            <img
              src={"/assets/images/dataflow.png"}
              alt=""
              className="w-full"
            />
          </div>
        </div>
        <div className="mt-6 rounded-md bg-white p-6">
          <h1 className="mb-5 text-base font-semibold text-black">
            News & Events
          </h1>
          <div className="flex flex-col gap-3">
            {meetings.map((meeting, index) => (
              <div
                key={index}
                className="flex flex-row rounded-md border border-gray-300"
              >
                <h1 className="bg-gray-400 p-4 text-center text-sm font-medium text-bgColor-100">
                  {meeting.date} <br />
                  <span>{meeting.month}</span>
                </h1>
                <h2 className="p-4 text-sm font-medium text-black">
                  {meeting.title} <br />
                  <span className="text-xs font-normal text-gray-200">
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
