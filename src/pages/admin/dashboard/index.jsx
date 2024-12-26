import React from "react";
import { Clock4, Eye, MoveDiagonal, Search } from "lucide-react";
import { employeeDetails, meetings } from "@/constants/dummyData";
import StatsCard from "@/components/dashboard/StatsCard";
import ProfileCompletionCount from "@/components/dashboard/ProfileCompletionCount";
import LeaveAvailability from "@/components/dashboard/LeaveAvailability";
import { Link } from "react-router-dom";
export const AdminDashboard = () => {
  const cardsData = [
    {
      title: "Upcoming Shift",
      details: [
        { type: "Visa", count: "5/233" },
        { type: "Passport", count: "3/150" },
        { type: "ID Card", count: "8/300" },
      ],
    },
    {
      title: "Available slot",
      details: [
        { type: "HR", count: "2/20" },
        { type: "Engineers", count: "10/50" },
        { type: "Designers", count: "5/30" },
      ],
    },
    {
      title: "Upcoming Holidays",
      details: [
        { type: "2024", count: "10/12" },
        { type: "2025", count: "8/10" },
        { type: "2026", count: "5/8" },
      ],
    },
    {
      title: "People on leave",
      details: [
        { type: "HR", count: "2/12" },
        { type: "Engineers", count: "3/15" },
        { type: "Designers", count: "1/10" },
      ],
    },
  ];
  return (
    <div className="my-3 flex items-baseline justify-between gap-4 rounded-md">
      <div className="flex min-w-[73%] flex-col gap-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-black">Dashboard</h1>
          <div className="flex items-center gap-3">
            <div className="btn flex h-10 min-h-10 items-center justify-center rounded-md bg-neutralmedium px-6 text-xs font-normal text-white hover:bg-hrmdarkblue">
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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {cardsData.map((card, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 rounded-md bg-white p-6 shadow-sm"
            >
              <label className="mb-4 flex items-center justify-between">
                <h1 className="text-base font-bold text-black">{card.title}</h1>
                <p className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  View <Eye className="size-4 text-black/70" />
                </p>
              </label>
              {card.details.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-4 rounded-full bg-gray-100 p-2"
                >
                  <div className="flex items-center gap-2">
                    <div className="rounded-full border border-gray-soft">
                      <img
                        src="/assets/images/employee_access/profile.png"
                        alt=""
                        className=""
                      />
                    </div>
                    <label className="text-xs text-black">
                      <h1>{item.type}</h1>
                      <h1>{item.count}</h1>
                    </label>
                  </div>
                  <div className="rounded-full border bg-gray-soft p-2">
                    <MoveDiagonal
                      className="size-3 text-black"
                      strokeWidth={1.7}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-[27%] flex-col">
        <ProfileCompletionCount />
        <LeaveAvailability />
        <div className="mt-4 rounded-md bg-white p-6 shadow-sm">
          <h1 className="mb-4 flex items-center justify-between text-lg font-semibold text-black">
            News & Events
            <Link
              to="/admin/news-event/view"
              className="flex cursor-pointer items-center gap-2 text-xs font-medium text-gray-dark"
            >
              View <Eye className="size-4 text-black/70" />
            </Link>
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
      </div>
    </div>
  );
};
