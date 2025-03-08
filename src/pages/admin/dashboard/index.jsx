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

  const handleClick = (event, date) => {
    if (!event?.isHoliday) {
      const selectdate = dayjs(date).format("YYYY-MM-DD");
      if (date) {
        navigate(
          `/admin/shift/calendarview?id=${event?.id}&date=${selectdate}`,
        );
      }
    }
  };

  const cardsData = [
    {
      title: "Upcoming Shift",
      details: admindashboard?.upcoming_shifts?.map((shift) => {
        const selectdate = dayjs(shift?.shift?.date).format("YYYY-MM-DD");
        return {
          type: shift?.shift?.name,
          count: shift?.shift?.people_required,
          date: shift?.shift?.start_date,
          dates: `${dayjs(shift?.start_date).format("DD/MM/YY")} - ${dayjs(shift?.end_date).format("DD/MM/YY")}`,
          path: shift?.shift?.isHoliday
            ? ``
            : `/admin/shift/calendarview?id=${shift?.shift?.id}&date=${selectdate}`,
        };
      }),
      path: "/admin/shift", // Default path for the card
    },
    {
      title: "Available Slot",
      details: admindashboard?.available_slots?.map((slot) => ({
        type: slot?.shift?.name,
        count: slot?.shift?.people_required,
        date: slot?.shift?.start_date,
        dates: `${dayjs(slot?.start_date).format("DD/MM/YY")} - ${dayjs(slot?.end_date).format("DD/MM/YY")}`,
      })),
      path: "/admin/shift/available-slots", // Add a default path
    },
    {
      title: "Upcoming Holidays",
      details: admindashboard?.upcoming_holidays?.map((holiday) => ({
        type: holiday.holiday_name,
        date: holiday.date,
        time: dayjs(holiday.created_at).format("HH:MM"),
      })),
      path: "/admin/leave/bankholidays", // Existing path
    },
    {
      title: "People on Leave",
      details: admindashboard?.people_on_leave?.map((leave) => ({
        type: [
          leave?.employee?.first_name,
          leave?.employee?.middle_name,
          leave?.employee?.sur_name,
        ]
          .filter(Boolean)
          .join(" "),
        // date: [leave?.date],
      })),
      path: "/admin/leave/people-on-leave",
    },
  ];

  console.log(admindashboard?.available_slots, "available_slots");
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
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {cardsData.map((card, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 rounded-md bg-white p-6 shadow-sm"
            >
              <label className="mb-4 flex items-center justify-between">
                <h1 className="text-base font-bold text-black">{card.title}</h1>
              </label>
              <div className="overflow-y-min flex min-h-[13rem] flex-col gap-3 overflow-y-auto overflow-x-hidden">
                {card.details?.length > 0 ? (
                  card.details.map((item, idx) => (
                    <div
                      key={idx}
                      className="mr-5 flex items-center justify-between gap-4 rounded-full bg-gray-100 p-1 hover:bg-[#E95D394D]"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`flex h-11 w-11 items-center justify-center rounded-full border  ${card.title === "People on Leave" ? "bg-gray-100" : "bg-hrmprimaryorange p-1"}`}
                        >
                          {card.title === "People on Leave" ? (
                            <img
                              src="/assets/images/profile.jpg"
                              alt="People on Leave"
                              className="h-full w-full rounded-full object-cover"
                            />
                          ) : (
                            <div className="text-center text-xs font-medium text-white">
                              <p>{dayjs(item?.date).format("ddd")}</p>
                              <p>{dayjs(item?.date).format("DD")}</p>
                            </div>
                          )}
                        </div>
                        <label className="text-xs text-black">
                          <h1 className="text-sm font-semibold">
                            {item?.type?.charAt(0).toUpperCase() +
                              item?.type?.slice(1)}
                          </h1>
                          <h1>{item?.dates || item?.date}</h1>
                          {/* <h1>{item?.date || ""}</h1> */}
                          <h1>{item?.time || `Employee: ${item?.count}`}</h1>
                        </label>
                      </div>
                      <Link
                        to={item?.path}
                        className="rounded-full border bg-gray-soft p-2"
                      >
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
          <div className="overflow-y-min flex max-h-[14.3rem] flex-col gap-3 overflow-y-auto overflow-x-hidden">
            {admindashboard?.newsandevents?.events.map((event, index) => (
              <div
                key={index}
                className="mr-5 flex min-h-20 flex-row rounded-md border border-gray-300"
              >
                <h1 className="flex min-w-14 flex-col items-center justify-center bg-gray-300 text-center text-sm font-bold text-black/80">
                  {dayjs(event.start_date).format("D")} <br />
                  <span>{dayjs(event.start_date).format(" MMM")}</span>
                </h1>
                <h2 className="p-4 text-sm font-semibold text-black">
                  {event.event_title.length > 12
                    ? event.event_title.substring(0, 25) + "..."
                    : event.event_title}
                  <br />
                  <span className="flex items-center gap-1 text-xs font-normal text-gray-dark">
                    {event.start_time}{" "}
                    {/* <div className="h-3 border border-gray-dark"></div>You and
                    13+ more */}
                  </span>
                </h2>
              </div>
            ))}
            {admindashboard?.newsandevents?.news.map((newss, index) => (
              <div
                key={index}
                className="mr-5 flex min-h-20 flex-row rounded-md border border-gray-300"
              >
                <h1 className="flex min-w-14 flex-col items-center justify-center bg-gray-300 text-center text-sm font-bold text-black/80">
                  {dayjs(newss.start_date).format("D")} <br />
                  <span>{dayjs(newss.start_date).format(" MMM")}</span>
                </h1>
                <h2 className="p-4 text-sm font-semibold text-black">
                  {newss.news_title.length > 12
                    ? newss.news_title.substring(0, 25) + "..."
                    : newss.news_title}
                  <br />
                  {/* <span className="flex items-center gap-1 text-xs font-normal text-gray-dark">
                    {newss.start_time} 11.30{" "}
                    <div className="h-3 border border-gray-dark"></div>You and
                    13+ more
                  </span> */}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
