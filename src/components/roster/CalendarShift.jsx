import { newRequest, ROSTER_CLAIM } from "@/api";
import { DASHBOARD_CANDIDATES_LIST } from "@/api/recruiter";
import Loader from "@/components/ui/Loader";
import { useQuery } from "@tanstack/react-query";
import { Maximize2, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeaveRequest from "../popups/master/roster/Calendar/LeaveRequest";

export default function CalanderShift({rosterCalim, isLoading}) {
  const [leaveOpen, setLeaveOpen] = useState(false);
  const [claimOpen, setClaimOpen] = useState(false);
  const [leavepopup, setLeavepopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("");
  const pageLimit = 10;

  useEffect(() => {
    if (rosterCalim) {
      setTotalPages(rosterCalim?.last_page);
    }
  }, [rosterCalim]);
  
  console.log(
    rosterCalim?.roster_details?.leave_employees[0]?.employee_name

    ,
  );
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <LeaveRequest
            popupOpen={leavepopup}
            setPopupOpen={setLeavepopup}
            type={type}
            setType={setType}
          />
          {rosterCalim ? (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-md border border-[#eceef6] bg-white px-3 py-1">
                  <p className="text-sm font-semibold">Total Required</p>
                  <p className="text-lg font-semibold">
                    {
                      rosterCalim?.roster_details?.shift_details
                        ?.people_required
                    }
                  </p>
                  <p className="text-[0.7rem] text-[#a5a5a6]">Employee</p>
                </div>
                <div className="rounded-md border border-[#eceef6] bg-white px-3 py-1">
                  <p className="text-sm font-semibold">Available</p>
                  <p className="text-lg font-semibold">
                    {rosterCalim?.roster_details?.shift_claimed_employees_count}
                  </p>
                  <p className="text-[0.7rem] text-[#a5a5a6]">Employees</p>
                </div>
                <div className="rounded-md border border-[#eceef6] bg-white px-3 py-1">
                  <p className="text-sm font-semibold">Shift Claim</p>
                  <p className="text-lg font-semibold">
                    {rosterCalim?.roster_details?.shift_details?.shift_claim}
                  </p>
                  <p className="text-[0.7rem] text-[#a5a5a6]">Requests</p>
                </div>
                <div className="rounded-md border border-[#eceef6] bg-white px-3 py-1">
                  <p className="text-sm font-semibold">Leave Requested</p>
                  <p className="text-lg font-semibold">
                    {rosterCalim?.roster_details?.shift_details?.employee_count}
                  </p>
                  <p className="text-[0.7rem] text-[#a5a5a6]">Employees</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <ChevronRight
                  size={16}
                  strokeWidth={1.5}
                  onClick={() => setLeaveOpen(!leaveOpen)}
                  className={`cursor-pointer transition-transform duration-300 ${leaveOpen ? "rotate-90" : ""}`}
                />
                <p className="text-sm font-semibold">Leave Requests</p>
                <hr className="float-end ml-3 w-[69.3%]" />
              </div>

              {leaveOpen && (
                <div className="flex w-full items-center justify-center">
                {rosterCalim?.roster_details?.leave_employees.map((employee)=>(
                    <div
                    key={employee?.id}
                    onClick={() => {
                      setLeavepopup(true);
                      setType("leave");
                    }}
                    className="flex h-16 w-[90%] items-center justify-between rounded-full bg-white py-2 pl-2 pr-5"
                  >
                    <div className="flex items-center gap-x-2">
                      <div className="flex h-11 w-11 min-w-[2.75rem] items-center justify-center rounded-full bg-hrmprimaryorange/10 text-sm font-bold uppercase">
                        {employee?.employee_name[0]}
                      </div>
                      <div>
                        <h3 className="text-base font-semibold">
                          <span className="mr-1">
                          {employee?.employee_name}
                          </span>
                        </h3>
                        <p className="text-xs font-medium text-darkblack">
                        {employee?.employee_designation_name}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setLeavepopup(true)}
                      className="flex cursor-pointer items-center rounded-full bg-gray-soft p-2"
                    >
                      <ChevronRight className="size-3" />
                    </button>
                  </div>
                ))}
                {rosterCalim?.roster_details?.leave_employees.length === 0 && (
                  <p className="text-sm text-black">No data</p>
                )
                }
                </div>
              )}

              <div className="flex items-center gap-1">
                <ChevronRight
                  size={16}
                  strokeWidth={1.5}
                  onClick={() => setClaimOpen(!claimOpen)}
                  className={`cursor-pointer transition-transform duration-300 ${claimOpen ? "rotate-90" : ""}`}
                />
                <p className="text-sm font-semibold">Claimed Requests</p>
                <hr className="float-end ml-3 w-[66.2%]" />
              </div>

              {claimOpen && (
                <div className="flex w-full items-center justify-center">
                  {rosterCalim?.roster_details?.shift_claim_requests?.map((claimedEmployee)=>(
                    <div
                    key={claimedEmployee?.id}
                    onClick={() => {
                      setLeavepopup(true);
                      setType("claimed");
                    }}
                    className="flex h-16 w-[90%] items-center justify-between rounded-full bg-white py-2 pl-2 pr-5"
                  >
                    <div className="flex items-center gap-x-2">
                      <div className="flex h-11 w-11 min-w-[2.75rem] items-center justify-center rounded-full bg-hrmprimaryorange/10 text-sm font-bold uppercase">
                        {/* {`${candidate?.first_name?.charAt(0)} ${candidate?.sur_name?.charAt(0)}`} */}
                        {claimedEmployee?.employee_name[0]}

                      </div>
                      <div>
                        <h3 className="text-base font-semibold">
                          <span className="mr-1">
                          {claimedEmployee?.employee_name}

                          </span>
                        </h3>
                        <p className="text-xs font-medium text-darkblack">
                          {claimedEmployee
                            ?.employee_designation_name}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setLeaveOpen(true);
                        setType("claimed");
                      }}
                      className="flex cursor-pointer items-center rounded-full bg-gray-soft p-2"
                    >
                      <ChevronRight className="size-3" />
                    </button>
                  </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <img
              className="mx-auto my-10 h-40 object-contain"
              src="/not-found.svg"
            />
          )}{" "}
        </>
      )}
    </>
  );
}
