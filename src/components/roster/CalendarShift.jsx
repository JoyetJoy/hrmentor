import { newRequest } from "@/api";
import Loader from "@/components/ui/Loader";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import LeaveRequest from "../popups/master/roster/Calendar/LeaveRequest";
import { ROSTER_CLAIMED_EMPLOYEE_DETAILS, ROSTER_CLAIMED_EMPLOYEE_DETAILS_POST } from "@/api/setup";

export default function CalanderShift({rosterCalim, isLoading, refetch}) {
  const [leaveOpen, setLeaveOpen] = useState(false);
  const [claimOpen, setClaimOpen] = useState(false);
  const [leavepopup, setLeavepopup] = useState(false);
  const [type, setType] = useState("");
  const [selectedId, setSelectedId] = useState('');
  const [selectedData, setSelectedData] = useState();

  const { data: rosterEmpList } = useQuery({
    queryKey: ["rosterEmpList", selectedId],
    queryFn: () => {
      console.log(`Fetching employee list for shift ID: ${selectedId}`);
      return newRequest
        .get(`${ROSTER_CLAIMED_EMPLOYEE_DETAILS}/${selectedId}`)
        .then((res) => {
          return res.data;
        });
    },
    enabled: !!selectedId,
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
            refetch={refetch}
            type={type}
            setType={setType}
            data={rosterEmpList}
            api={ROSTER_CLAIMED_EMPLOYEE_DETAILS_POST}
            selectedId={selectedId}
            selectedData={selectedData}
            rosterCalim={rosterCalim}
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
                    {rosterCalim?.roster_details?.available_employees_count}
                  </p>
                  <p className="text-[0.7rem] text-[#a5a5a6]">Employees</p>
                </div>
                <div className="rounded-md border border-[#eceef6] bg-white px-3 py-1">
                  <p className="text-sm font-semibold">Shift Claim</p>
                  <p className="text-lg font-semibold">
                    {rosterCalim?.roster_details?.shift_claim_requests?.length}
                  </p>
                  <p className="text-[0.7rem] text-[#a5a5a6]">Requests</p>
                </div>
                <div className="rounded-md border border-[#eceef6] bg-white px-3 py-1">
                  <p className="text-sm font-semibold">Leave Requested</p>
                  <p className="text-lg font-semibold">
                    {rosterCalim?.roster_details?.leave_requests_of_roster_employees_count}
                  </p>
                  <p className="text-[0.7rem] text-[#a5a5a6]">Employees</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <ChevronDown 
                  size={16}
                  strokeWidth={1.5}
                  onClick={() => setLeaveOpen(!leaveOpen)}
                  className={`cursor-pointer transition-transform duration-300 ${leaveOpen ? "-rotate-90" : ""}`}
                />
                <p className="text-sm font-semibold whitespace-nowrap">Leave Requests</p>
                <hr className="float-end ml-3 w-[69.3%]" />
              </div>
              {!leaveOpen && (
                <div className="flex  flex-col gap-3 w-full items-center justify-center">
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
                <p className="text-sm font-semibold whitespace-nowrap">Claimed Requests</p>
                <hr className="float-end ml-3 w-[66.2%]" />
              </div>
              {claimOpen && (
                <div className="flex w-full flex-col gap-3 items-center justify-center">
                  {rosterCalim?.roster_details?.shift_claim_requests?.map((claimedEmployee)=>(
                    <div
                    key={claimedEmployee?.id}
                    onClick={() => {
                      setSelectedId(claimedEmployee?.id)
                      setLeavepopup(true);
                      setSelectedData(claimedEmployee);
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
                        setSelectedId(claimedEmployee?.id)
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
