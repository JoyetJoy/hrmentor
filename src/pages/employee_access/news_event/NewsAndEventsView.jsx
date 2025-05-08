import { ArrowLeft, ChevronRight, Filter } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function NewsAndEventsView() {
  
  const newsItems = [
    {
      title:
        "Our Company Launches Innovative HRMS Platform to Revolutionize Employee Management and Enhance Organizational Efficiency",
      description:
        "We are thrilled to introduce our groundbreaking HRMS platform, designed to transform employee management and drive organizational efficiency.",
      date: "November 23, 2023",
      image: "path_to_image1.jpg",
    },
  ];

  const events = [
    {
      title: "Our Company Unveils Next-Generation HRMS Solution Event",
      date: "November 25, 2023",
      time: "02:00 AM",
      image: "path_to_event_image1.jpg",
    },
  ];
  return (
    <div className="h-full">
      <div className="my-2 flex flex-row items-center justify-between rounded-md bg-white px-4 py-2">
        <div
          className={`flex items-center justify-between text-sm font-semibold text-hrmblue`}
        >
          <ArrowLeft
            onClick={() => {
              history.back();
            }}
            className="mr-2 size-4 cursor-pointer"
          />
          Menu
          <ChevronRight className="size-3" />
          <Link className="capitalize text-hrmprimaryorange" to={""}>
            New and Events
          </Link>
        </div>
      </div>
      <div className="w-full bg-gray-100">
        <div className="">
          <img src="/assets/images/employee_access/EventNews.png" alt="" />
        </div>
        <div className="mt-6 flex gap-3">
          <div className="flex flex-col bg-white p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="mb-4 text-xl font-semibold">Latest News</h2>
                <div className="h-10 min-h-10 rounded-md border border-gray-soft bg-white p-3">
                  <Filter className="size-4" />
                </div>
              </div>
              {newsItems.map((item, index) => (
                <div key={index} className="flex items-start gap-2 py-4">
                  <div className="w-full">
                    <img
                      src="/assets/images/employee_access/news.png"
                      alt={item.title}
                      className="object-containe w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link
                      to="/employee-access/news-events/detail"
                      className="text-xl font-semibold hover:text-blue-600 hover:underline"
                    >
                      {item.title}
                    </Link>
                    <p className="Italic text-sm text-gray-500">
                      {item.description}
                    </p>
                    <div className="mt-3 flex items-center gap-2 font-medium text-black">
                      <div className="w-6 overflow-hidden">
                        <img
                          src="/assets/images/employee_access/pro.png"
                          alt=""
                          className="w-full object-contain"
                        />
                      </div>
                      <p className="text-xs">Jerome Bell</p>
                      <div className="h-4 w-[1.2] border border-l border-gray-dark"></div>
                      <p className="text-xs">{item.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-6">
              <h2 className="mb-4 text-xl font-semibold">News</h2>
              {newsItems.map((item, index) => (
                <div key={index} className="flex items-start gap-2 py-4">
                  <div className="w-full">
                    <img
                      src="/assets/images/employee_access/news.png"
                      alt={item.title}
                      className="object-containe w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link
                      to="/employee-access/news-events/detail"
                      className="text-xl font-semibold hover:text-blue-600 hover:underline"
                    >
                      {item.title}
                    </Link>{" "}
                    <p className="text-sm italic text-gray-500">
                      {item.description}
                    </p>
                    <div className="mt-3 flex items-center gap-2 font-medium text-black">
                      <div className="w-6 overflow-hidden">
                        <img
                          src="/assets/images/employee_access/pro.png"
                          alt=""
                          className="w-full object-contain"
                        />
                      </div>
                      <p className="text-xs">Jerome Bell</p>
                      <div className="h-4 w-[1.2] border border-l border-gray-dark"></div>
                      <p className="text-xs">{item.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* <Pagination/> */}
          </div>
          <div className="w-1/2 bg-white p-6">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="mb-4 text-xl font-semibold">Events</h2>
              <div className="h-10 min-h-10 rounded-md border border-gray-soft bg-white p-3">
                <Filter className="size-4" />
              </div>
            </div>
            <div className="space-y-6">
              {events.map((event, index) => (
                <div key={index} className="items-star flex flex-col gap-3">
                  <div>
                    <img
                      src="/assets/images/employee_access/event.png"
                      alt={event.title}
                      className="w-full object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold">{event.title}</h3>
                    <div className="mt-3 flex items-center gap-2 font-medium text-black">
                      <p className="text-xs">{event.time}</p>
                      <div className="h-4 w-[1.2] border border-l border-gray-dark"></div>
                      <p className="text-xs">{event.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
