import { newRequest, ROSTER_CLAIM } from "@/api";
import MonthlyCalendarPicker from "@/components/common/MonthPicker";
import NewJoiners from "@/components/hiring/dashboard/NewJoiner";
import MenuHeaderHiring from "@/components/hiring/MenuHeader";
import { OverviewCards } from "@/components/hiring/overview/OverviewCard";
import NewComers from "@/components/popups/hiring/dashboard/NewComers";
import Loader from "@/components/ui/Loader";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import RosterHeader from "@/components/common/RosterHeader";
import Rosteroveview from "@/components/roster/Rosteroveview";
import CalanderShift from "@/components/roster/CalendarShift";
import CalendarEmployees from "@/components/roster/CalendarEmployees";
import CalendarShiftHistory from "@/components/roster/CalendarShiftHistory";
import { useLocation } from "react-router-dom";

export const RosterCalendarView = ({ api, selectedId, selecteDate }) => {
  // hiring-dashboard
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("");
  const pageLimit = 10;
  const id = queryParams.get("id");
  const date = queryParams.get("date");

  console.log(id,date);
  

  const { data: rosterCalim, isLoading } = useQuery({
    queryKey: ["rosterCalim", currentPage, keyword, id, date],
    queryFn: () =>
      newRequest
        .get(`${ROSTER_CLAIM}/${id}/${date}`, {
          params: {
            search: keyword,
            page: currentPage,
            per_limit: pageLimit,
          },
        })
        .then((res) => {
          return res.data;
        }),
        enabled : !!id && !!date
  });

  useEffect(() => {
    if (rosterCalim) {
      setTotalPages(rosterCalim?.last_page);
    }
  }, [rosterCalim]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  return (
    <>
      <RosterHeader page={1} />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex min-h-[32rem] flex-col gap-2 pt-2">
          <Rosteroveview rosterCalim={rosterCalim} />
          <div className="grid h-full grid-cols-3 gap-2">
            <div className="flex h-fit flex-col gap-y-3 rounded-md">
              <CalanderShift
                rosterCalim={rosterCalim}
                isLoading={isLoading}
              />
            </div>
            <div className="min-h-[29rem] rounded-md bg-white pb-7">
              <CalendarEmployees
                rosterCalim={rosterCalim}
                isLoading={isLoading}
              />
            </div>
            <div className="min-h-[29rem] flex-col gap-y-3 rounded-md bg-white">
              <CalendarShiftHistory
                rosterCalim={rosterCalim}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
