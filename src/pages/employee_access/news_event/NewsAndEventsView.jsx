import { ALL_EVENT, ALL_NEWS, newRequest } from "@/api";
import NewsEventHeader from "@/components/common/NewsEventHeader";
import Pagination from "@/components/table/Pagination";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { ArrowLeft, ChevronRight, Filter } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function NewsAndEventsView() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [keyword, setKeyword] = useState("");
  const [selectedId, setSelectedId] = useState("null");

  const { data: employeeAllNews = [], isLoading } = useQuery({
    queryKey: ["employeeAllNews", currentPage, keyword],
    queryFn: async () => {
      const response = await newRequest.get(ALL_NEWS, {
        params: { page: currentPage },
      });
      return response.data || [];
    },
  });

  const { data: employeeAllEvent = [], isLoadingg } = useQuery({
    queryKey: ["employeeAllEvent", currentPage, keyword],
    queryFn: async () => {
      const response = await newRequest.get(ALL_EVENT, {
        params: { page: currentPage },
      });
      return response.data || []; // Ensure it always returns an array
    },
  });
  const newsItems = employeeAllNews;
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
                {/* <div className="h-10 min-h-10 rounded-md border border-gray-soft bg-white p-3">
                  <Filter className="size-4" />
                </div> */}
              </div>
              {newsItems.length > 0 && (
                <div className="flex items-start gap-2 py-4">
                  <div className="w-96 overflow-hidden rounded-md">
                    <img
                      src={newsItems[0].featured_image}
                      alt={newsItems[0].news_title}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link
                      to={`/admin/news-event/detail/${newsItems[0].id}`}
                      className="text-xl font-semibold hover:text-blue-600 hover:underline"
                    >
                      {newsItems[0].news_title}
                    </Link>
                    <p className="text-sm italic text-gray-500">
                      {newsItems[0].short_summary}
                    </p>
                    <div className="mt-3 flex items-center gap-2 font-medium text-black">
                      <div className="w-6 overflow-hidden">
                        <img
                          src="/assets/images/employee_access/pro.png"
                          alt=""
                          className="block"
                        />
                      </div>
                      <p className="text-xs">Jerome Bell</p>
                      <div className="h-4 w-[1.2] border border-l border-gray-dark"></div>
                      <p className="text-xs">
                        {dayjs(newsItems[0]?.created_at).format("DD MMM YYYY")}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-6">
              <h2 className="mb-4 text-xl font-semibold">News</h2>
              {newsItems?.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-96 overflow-hidden rounded-md">
                    <img
                      src={item.featured_image}
                      alt={item.news_title}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link
                      to={`/admin/news-event/detail/${item.id}`}
                      className="text-xl font-semibold hover:text-blue-600 hover:underline"
                    >
                      {item.news_title}
                    </Link>
                    <p className="text-sm italic text-gray-500">
                      {item.short_summary}
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
                      <p className="text-xs">
                        {dayjs(item[0]?.created_at).format("DD MMM YYYY")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* <Pagination/> */}
          </div>
          <div className="w-1/3 bg-white p-6">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="mb-4 text-xl font-semibold">Events</h2>
              {/* <div className="h-10 min-h-10 rounded-md border border-gray-soft bg-white p-3">
                <Filter className="size-4" />
              </div> */}
            </div>
            <div className="space-y-6">
              {employeeAllEvent?.map((event, index) => (
                <div key={index} className="items-star flex flex-col gap-3">
                  <div className="overflow-hidden rounded-md">
                    <img
                      src={event.featured_image}
                      alt={event.title}
                      className="w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">
                      {event.event_title}
                    </h3>
                    <div className="mt-3 flex items-center gap-2 font-medium text-black">
                      <p className="text-xs">
                        {dayjs(event.end_time).format("hh:mm")}
                      </p>
                      <div className="h-4 w-[1.2] border border-l border-gray-dark"></div>
                      <p className="text-xs">
                        {" "}
                        {dayjs(event.created_at).format("DD MMM YYYY")}
                      </p>
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
