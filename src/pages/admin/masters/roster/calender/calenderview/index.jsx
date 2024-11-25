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
import RosterHeader from "@/components/common/RosterHeader";
import Rosteroveview from "@/components/roster/Rosteroveview";
import CalanderShift from "@/components/roster/CalendarShift";
import CalendarEmployees from "@/components/roster/CalendarEmployees";
import CalendarShiftHistory from "@/components/roster/CalendarShiftHistory";

export const RosterCalendarView = () => {
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
      <RosterHeader page={1} />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex min-h-[32rem] flex-col gap-2 pt-2">
          <Rosteroveview />
          <div className="grid h-full grid-cols-3 gap-2">
            <div className="flex h-fit flex-col gap-y-3 rounded-md">
              <CalanderShift />
            </div>
            <div className="min-h-[29rem] rounded-md bg-white pb-7">
              <CalendarEmployees />
            </div>
            <div className="min-h-[29rem] flex-col gap-y-3 rounded-md bg-white">
              <CalendarShiftHistory />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
