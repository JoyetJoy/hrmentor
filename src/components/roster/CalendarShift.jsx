import { newRequest } from "@/api";
import { DASHBOARD_CANDIDATES_LIST } from "@/api/recruiter";
import Loader from "@/components/ui/Loader";
import { useQuery } from "@tanstack/react-query";
import { Maximize2, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import LeaveRequest from "../popups/master/roster/Calendar/LeaveRequest";

export default function CalanderShift() {
  const [leaveOpen, setLeaveOpen] = useState(false);
  const [claimOpen, setClaimOpen] = useState(false);
  const [leavepopup,setLeavepopup] = useState(false);
  const [type,setType] = useState('');
  const pageLimit = 10;
  // Fetch List
  const { data: newCandidates, isLoading } = useQuery({
    queryKey: ["newCandidates"],
    queryFn: () =>
      newRequest
        .get(DASHBOARD_CANDIDATES_LIST, {
          params: {
            per_limit: pageLimit,
          },
        })
        .then((res) => {
          return res.data;
        }),
  });

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
          {newCandidates?.length ? (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-md border border-[#eceef6] bg-white px-3 py-1">
                  <p className="text-sm font-semibold">Total Required</p>
                  <p className="text-lg font-semibold">18</p>
                  <p className="text-[0.7rem] text-[#a5a5a6]">Employee</p>
                </div>
                <div className="rounded-md border border-[#eceef6] bg-white px-3 py-1">
                  <p className="text-sm font-semibold">Available</p>
                  <p className="text-lg font-semibold">18</p>
                  <p className="text-[0.7rem] text-[#a5a5a6]">Employees</p>
                </div>
                <div className="rounded-md border border-[#eceef6] bg-white px-3 py-1">
                  <p className="text-sm font-semibold">Shift Claim</p>
                  <p className="text-lg font-semibold">18</p>
                  <p className="text-[0.7rem] text-[#a5a5a6]">Requests</p>
                </div>
                <div className="rounded-md border border-[#eceef6] bg-white px-3 py-1">
                  <p className="text-sm font-semibold">Leave Requested</p>
                  <p className="text-lg font-semibold">18</p>
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
                  <div
                    // key={candidate?.id}
                    onClick={()=> {
                      setLeavepopup(true)
                      setType('leave')
                    }}
                    className="flex h-16 w-[90%] items-center justify-between rounded-full bg-white py-2 pl-2 pr-5"
                  >
                    <div className="flex items-center gap-x-2">
                      <div className="flex h-11 w-11 min-w-[2.75rem] items-center justify-center rounded-full bg-hrmprimaryorange/10 text-sm font-bold uppercase">
                        {/* {`${candidate?.first_name?.charAt(0)} ${candidate?.sur_name?.charAt(0)}`} */}
                        J
                      </div>
                      <div>
                        <h3 className="text-base font-semibold">
                          <span className="mr-1">Jisham</span>
                          <span className="mr-1">
                            {" "}
                            {/* {candidate?.middle_name ?? ""} */}V
                          </span>
                          {/* {candidate?.sur_name} */}
                        </h3>
                        <p className="text-xs font-medium text-darkblack">
                          {/* {candidate?.job_name?.job_title} */}
                          Developer
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={()=>setLeavepopup(true)}
                      className="flex cursor-pointer items-center rounded-full bg-gray-soft p-2"
                    >
                      <ChevronRight className="size-3" />
                    </button>
                  </div>
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
                  <div
                    // key={candidate?.id}
                    onClick={()=> {
                      setLeavepopup(true)
                      setType('claimed')
                    }}
                    className="flex h-16 w-[90%] items-center justify-between rounded-full bg-white py-2 pl-2 pr-5"
                  >
                    <div className="flex items-center gap-x-2">
                      <div className="flex h-11 w-11 min-w-[2.75rem] items-center justify-center rounded-full bg-hrmprimaryorange/10 text-sm font-bold uppercase">
                        {/* {`${candidate?.first_name?.charAt(0)} ${candidate?.sur_name?.charAt(0)}`} */}
                        J
                      </div>
                      <div>
                        <h3 className="text-base font-semibold">
                          <span className="mr-1">Jisham</span>
                          <span className="mr-1">
                            {" "}
                            {/* {candidate?.middle_name ?? ""} */}V
                          </span>
                          {/* {candidate?.sur_name} */}
                        </h3>
                        <p className="text-xs font-medium text-darkblack">
                          {/* {candidate?.job_name?.job_title} */}
                          Developer
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={()=>{
                        setLeaveOpen(true)
                        setType('claimed')
                      }}
                      className="flex cursor-pointer items-center rounded-full bg-gray-soft p-2"
                    >
                      <ChevronRight className="size-3" />
                    </button>
                  </div>
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
