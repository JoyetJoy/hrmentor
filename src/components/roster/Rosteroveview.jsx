import React, { useEffect, useState } from "react";
import Reassign from "../popups/master/roster/Calendar/Reassign";
import { newRequest, ROSTER_CLAIM } from "@/api";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

function Rosteroveview({ rosterCalim }) {
  const [isOn, setIsOn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [keyword, setKeyword] = useState("");
  const pageLimit = 10;

  useEffect(() => {
    if (rosterCalim) {
      setTotalPages(rosterCalim?.last_page);
    }
  }, [rosterCalim]);

  console.log(rosterCalim?.roster_details?.shift_details?.shift_start_time);

  return (
    <div className="mx-3 mb-2 flex items-center justify-between">
      <Reassign popupOpen={isOn} setPopupOpen={setIsOn} type={"claim"} id={rosterCalim?.roster_details?.roster_id} />
      <div className="flex items-center gap-2 font-semibold text-black">
        <div className="flex gap-36">
          <div className="text flex items-center justify-between gap-1 pr-2 text-sm font-semibold text-black">
            {rosterCalim?.roster_details?.shift_details?.shift_name}
          </div>
          <div className="flex gap-2">
            <p className="pr-2 text-[0.8rem]">Shift Claim</p>
            <p className="text-[0.8rem] text-slate-600">Close</p>
            <div
              onClick={() => {
                if (isOn) {
                  setIsOn(false);
                } else {
                  if(rosterCalim?.roster_details?.shift_details?.people_required === rosterCalim?.roster_details?.shift_claimed_employees_count){
                    setIsOn(false)
                  }
                  setIsOn(true);
                }
              }}
              className={`h-[1.30rem] w-[2.45rem] rounded-full p-[1px] ${isOn ? "bg-[#00b448] pt-[2.2px]" : "border border-[#888888] bg-white pt-[1.3px]"}`}
            >
              <div
                className={`h-4 w-4 ${isOn ? "bg-white" : "bg-black"} transform rounded-full transition-transform ${
                  isOn ? "translate-x-5" : "translate-x-0"
                }`}
              ></div>
            </div>
            <p className="text-[0.8rem] text-slate-600">Open</p>
          </div>
        </div>
      </div>
      <div className="flex gap-20 text-sm font-semibold text-[#2c2c2c]">
        <p>
          Shift Date -{" "}
          {dayjs(rosterCalim?.roster_details?.roster_start_date).format(
            "DD-MM-YYYY",
          )}
        </p>
        <p>
          Shift Time -
          {rosterCalim?.roster_details?.shift_details?.shift_start_time}
        </p>
      </div>
    </div>
  );
}

export default Rosteroveview;
