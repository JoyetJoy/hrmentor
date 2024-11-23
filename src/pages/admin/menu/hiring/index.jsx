import { newRequest } from "@/api";
import MonthlyCalendarPicker from "@/components/common/MonthPicker";
import NewJoiners from "@/components/hiring/dashboard/NewJoiner";
import MenuHeaderHiring from "@/components/hiring/MenuHeader";
import { OverviewCards } from "@/components/hiring/overview/OverviewCard";
import NewComers from "@/components/popups/hiring/dashboard/NewComers";
import Loader from "@/components/ui/Loader";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useState } from "react";

export const HiringDashboard = () => {
  // hiring-dashboard
  const { data: hiringData, isLoading } = useQuery({
    queryKey: ["hiringData"],
    queryFn: () =>
      newRequest.get("hiring-dashboard").then((res) => {
        return res.data;
      }),
  });

  const [selectedDate, setSelectedDate] = useState(dayjs());
  return (
    <>
      <MenuHeaderHiring page={1} />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-3">
          <OverviewCards data={hiringData?.countDashboard} />
          <div className="my-3 grid grid-cols-3 gap-3">
            <div>
              <h1 className="text-[ #2C2C2C] mb-4 text-sm font-bold">
                Upcoming Joiners
              </h1>
              <div className="flex h-fit flex-col gap-y-3 rounded-md bg-white p-5">
                <NewJoiners />
              </div>
            </div>
            <div>
              <div className="h-fit rounded-md bg-white pb-7">
                <MonthlyCalendarPicker
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
              </div>
            </div>
            <div>
              <h1 className="text-[ #2C2C2C] mb-4 text-sm font-bold">
                New Joiners
              </h1>
              <div className="flex h-fit flex-col gap-y-3 rounded-md bg-white p-5">
                <NewComers />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
