import React from "react";
import { Clock4, Eye, MoveDiagonal, Search } from "lucide-react";
// import { meetings } from "@/constants/dummyData";
import StatsCard from "@/components/dashboard/StatsCard";
import ProfileCompletionCount from "@/components/dashboard/ProfileCompletionCount";
import LeaveAvailability from "@/components/dashboard/LeaveAvailability";
import { Link } from "react-router-dom";
import { ADMIN_DASHBOARD, newRequest } from "@/api";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
export const AdminDashboard = () => {
  // Fetch dashboard data
  const { data: admindashboard } = useQuery({
    queryKey: ["admindashboard"],
    queryFn: () => newRequest.get(ADMIN_DASHBOARD).then((res) => res.data),
    enabled: true,
    staleTime: 0,
  });

  const cardsData = [
    {
      title: "Upcoming Shift",
      details: admindashboard?.upcoming_shifts?.map((shift) => ({
        type: shift?.shift?.name,
        date: shift?.shift?.people_required,
        path: `/admin/shift/save-shift?id=${shift?.shift?.id}`
      })),
    },
    {
      title: "Available slot",
      details: admindashboard?.available_slots?.map((holiday) => ({
        type: holiday.holiday_name,
        date: holiday.date,
      })),
    },
    {
      title: "Upcoming Holidays",
      details: admindashboard?.upcoming_holidays?.map((holiday) => ({
        type: holiday.holiday_name,
        date: holiday.date,
      })),
    },
    {
      title: "People on leave",
      details: admindashboard?.people_on_leave?.map((holiday) => ({
        type: holiday.holiday_name,
        date: holiday.date,
      })),
    },
  ];
  console.log(
    admindashboard?.upcoming_shifts?.shift?.name,
    "admindashboardadmindashboard",
  );
  return (
    <div className="my-3 flex items-baseline justify-between gap-4 rounded-md">
      <div className="flex min-w-[73%] flex-col gap-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-black">Dashboard</h1>
          <div className="flex items-center gap-3">
            {/* <div className="btn flex h-10 min-h-10 items-center justify-center rounded-md bg-neutralmedium px-6 text-xs font-normal text-white hover:bg-hrmdarkblue">
              <Clock4 className="size-4" />
              Clock in
            </div> */}
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
        <StatsCard data={admindashboard} />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {cardsData.map((card, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 rounded-md bg-white p-6 shadow-sm"
            >
              <label className="mb-4 flex items-center justify-between">
                <h1 className="text-base font-bold text-black">{card.title}</h1>
                <Link
                 to={`/admin/shift`}
                 className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  View 
                  <Eye className="size-4 text-black/70" />
                </Link>
              </label>
              {card.details?.length > 0 ? (
                card.details.map((item, idx) => (
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
                        <h1>{item?.type}</h1>
                        <h1>{item?.count || item?.date}</h1>
                      </label>
                    </div>
                    <Link
                     to={item?.path}
                     className="rounded-full border bg-gray-soft p-2">
                      <MoveDiagonal
                        className="size-3 text-black"
                        strokeWidth={1.7}
                      />
                    </Link>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-dark">Data not available</p>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-[27%] flex-col">
        <ProfileCompletionCount value={admindashboard} />
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
            {admindashboard?.newsandevents?.events.map((event, index) => (
              <div
                key={index}
                className="flex flex-row rounded-md border border-gray-300"
              >
                <h1 className="flex w-16 flex-col items-center justify-center bg-gray-300 text-center text-sm font-bold text-black/80">
                  {dayjs(event.start_date).format("D")} <br />
                  <span>{dayjs(event.start_date).format(" MMM")}</span>
                </h1>
                <h2 className="p-4 text-sm font-semibold text-black">
                  {event.event_title} <br />
                  <span className="flex items-center gap-1 text-xs font-normal text-gray-dark">
                    {event.start_time}{" "}
                    <div className="h-3 border border-gray-dark"></div>You and
                    13+ more
                  </span>
                </h2>
              </div>
            ))}
            {admindashboard?.newsandevents?.news.map((newss, index) => (
              <div
                key={index}
                className="flex flex-row rounded-md border border-gray-300"
              >
                <h1 className="flex w-16 flex-col items-center justify-center bg-gray-300 text-center text-sm font-bold text-black/80">
                  {dayjs(newss.start_date).format("D")} <br />
                  <span>{dayjs(newss.start_date).format(" MMM")}</span>
                </h1>
                <h2 className="p-4 text-sm font-semibold text-black">
                  {newss.news_title} <br />
                  <span className="flex items-center gap-1 text-xs font-normal text-gray-dark">
                    {newss.start_time} 11.30{" "}
                    <div className="h-3 border border-gray-dark"></div>You and
                    13+ more
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
