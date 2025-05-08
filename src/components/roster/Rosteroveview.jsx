import React, { useEffect, useState } from "react";
import { newRequest } from "@/api";
import { SHIFT_CLAIM_ON_OFF } from "@/api/setup";

function Rosteroveview({ rosterCalim, date, id, refetch }) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (rosterCalim?.roster_details?.shift_claim_status === 1) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [rosterCalim]);

  const handleClaim = async () => {
    try {
      const data={
        roster_id :id,
        date,
        department_id:rosterCalim?.roster_details?.shift_details?.department_id,
        shift_claim:isChecked?0:1
      }
      const response = await newRequest.post(SHIFT_CLAIM_ON_OFF,data);
      refetch();
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while updating the claim.");
    }
  };

  return (
    <div className="mx-3 mb-2 flex items-center justify-between">
      <div className="flex w-full items-center justify-between gap-4 font-semibold text-black">
        <div className="flex w-1/2 items-center gap-48">
          <div className="text flex items-center gap-1 pr-2 text-sm font-semibold text-black">
            {rosterCalim?.roster_details?.shift_details?.shift_name}
          </div>
          {rosterCalim?.roster_details?.available_employees_count > 0 && (
            <div className="flex gap-2">
              <p className="pr-2 text-[0.8rem]">Shift Claim</p>
              <p className="text-[0.8rem] text-slate-600">Close</p>
              <div
                onClick={() => handleClaim()}
                className={`h-[1.30rem] w-[2.45rem] cursor-pointer rounded-full p-[1px] ${isChecked ? "bg-[#00b448] pt-[2.2px]" : "border border-[#888888] bg-white pt-[1.3px]"}`}
              >
                <div
                  className={`h-4 w-4 ${isChecked ? "bg-white" : "bg-black"} transform rounded-full transition-transform ${
                    isChecked ? "translate-x-5" : "translate-x-0"
                  }`}
                ></div>
              </div>
              <p className="text-[0.8rem] text-slate-600">Open</p>
            </div>
          )}
        </div>
        <div className="flex w-1/2 items-center justify-between">
          <p className="text-sm font-semibold text-[#2c2c2c]">
            Shift Date - {date}
          </p>
          <p className="text-sm font-semibold text-[#2c2c2c]">
            Shift Time - (
            {rosterCalim?.roster_details?.shift_details?.shift_start_time} -{" "}
            {rosterCalim?.roster_details?.shift_details?.shift_end_time})
          </p>
        </div>
      </div>
    </div>
  );
}

export default Rosteroveview;
