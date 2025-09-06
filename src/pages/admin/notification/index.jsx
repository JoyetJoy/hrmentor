import { newRequest } from "@/api";
import { NOTIFICATIONS } from "@/api/hiring";
import Pagination from "@/components/table/Pagination";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { ArrowLeft, ChevronRight, Link, Search } from "lucide-react";
import React from "react";

export default function Notification() {
  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notification"],
    queryFn: () =>
      newRequest.get(NOTIFICATIONS).then((res) => {
        return res.data;
      }),
    refetchInterval: 5000, // Fetch every 5 seconds
    staleTime: 60000,
  });

  return (
    <div className="h-screen">
      <div className="my-2 flex w-full flex-row items-center justify-between rounded-md bg-white px-4 py-2">
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
          <h1 className="capitalize text-hrmprimaryorange">Notifications</h1>
        </div>
      </div>
      <div className="mb-2 mt-1 flex items-center justify-between">
        <h1 className="text-base font-semibold text-black">Notifications</h1>
        <label className="input flex h-10 min-h-10 min-w-96 items-center gap-2 rounded-md border border-gray-soft outline-none">
          <Search className="size-4 object-contain text-gray-dark" />
          <input
            type="text"
            // onChange={(e) => {
            //   setKeyword(e.target.value);
            // }}
            className="grow placeholder:text-sm placeholder:text-gray-dark focus:outline-none"
            placeholder="Search"
          />
        </label>
      </div>
      <div className="flex h-full flex-col gap-3 rounded-md bg-white">
        <div className="p-4">
          {notifications?.data?.map((notification) => (
            <div
              key={notification.id}
              className="mb-4 border-b border-gray-200 pb-4"
            >
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-red-500"></div>
                <h4 className="text-sm font-semibold text-black">
                  {notification.title}
                </h4>
              </div>
              <p className="mt-1 text-sm text-gray-600">{notification.data}</p>
              <p className="mt-1 text-xs text-gray-400">
                {dayjs(notification.created_at).format("DD/MM/YYYY")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
