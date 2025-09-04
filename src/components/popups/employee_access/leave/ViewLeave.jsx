import { newRequest } from "@/api";
import { EMPLOYEE_LEAVE_REQUEST_DEATAILS } from "@/api/master";
import QueryTable from "@/components/table/QueryTable";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, X } from "lucide-react";
import React, { useState } from "react";

export default function ViewLeave({
  viewLeavePopupOpen,
  setViewLeavePopupOpen,
  selectedId,
}) {
  const [loader, setLoader] = useState(false);
  const [showLeaveDetail, setShowLeaveDetail] = useState(false);

  const { data: employeeLeaveRequestDetails = [] } = useQuery({
    queryKey: ["employeeLeaveRequestDetails", selectedId],
    queryFn: () =>
      newRequest
        .get(`${EMPLOYEE_LEAVE_REQUEST_DEATAILS}/${selectedId}`)
        .then((res) => res.data),
    enabled: !!selectedId,
  });

  function close() {
    setViewLeavePopupOpen(false);
  }
  const columns = React.useMemo(
    () => [
      {
        header: "Sl.no",
        accessorKey: "sno",
        cell: ({ row }) => {
          return (
            <div className="">
              {row.index + 1}
            </div>
          );
        },
      },
      {
        header: "Date",
        accessorKey: "date",
        cell: ({ row }) => (
            <p>{row?.original?.date ||'0000-00-00'}</p>
        ),
      },
      {
        header: "Shift",
        accessorKey: "shift_name",
      }
    ],
    [],
  );

  return (
    <Dialog
      open={viewLeavePopupOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/20">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="data-[closed]:transform-[scale(95%)] w-full max-w-md justify-between rounded bg-white/90 px-12 py-10 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
          >
            <div className="mb-7 flex items-center justify-between">
              <h1 className="text-lg font-bold leading-7 text-textcolor-darkCharcoal">
                View my leave
              </h1>
              <button
                onClick={close}
                className="text-xl font-extrabold text-textcolor-darkCharcoal"
              >
                <X />
              </button>
            </div>
            <div className="grid grid-cols-2 justify-between gap-3 gap-y-7">
              <div className="group flex flex-col space-y-1">
                <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  Start Date
                </label>
                <p className="text-sm font-semibold">
                  {employeeLeaveRequestDetails?.from_date}
                </p>
              </div>
              <div className="group flex w-full flex-col gap-1">
                <label className="label-text">End Date</label>
                <p className="text-sm font-semibold">
                  {employeeLeaveRequestDetails?.to_date}
                </p>
              </div>
              <div className="group flex w-full flex-col gap-1">
                <label className="label-text">Leave Type</label>
                <p className="text-sm font-semibold">
                  {employeeLeaveRequestDetails?.leave_type}
                </p>
              </div>
              <div className="group flex flex-col space-y-1">
                <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  Approval Status
                </label>
                <p
                  className="text-sm font-semibold"
                  style={{
                    color:
                      employeeLeaveRequestDetails?.leave_status?.text_color ||
                      "green",
                  }}
                >
                  {employeeLeaveRequestDetails?.leave_status
                    ?.leave_status_name || ""}
                </p>
              </div>
              <div className="group flex w-full flex-col gap-1">
                <label className="label-text">Leave Count</label>
                <p className="text-sm font-semibold">
                  {employeeLeaveRequestDetails?.total_leave_days} day
                </p>
              </div>
              <div className="group col-span-2 flex w-full flex-col gap-1">
                <label className="label-text">Description</label>
                <p className="text-sm font-semibold">
                  {employeeLeaveRequestDetails?.reason}
                </p>
              </div>
              <div className="mt-2 col-span-2 w-full items-center justify-between gap-3">
                <div className="group mt-5 flex items-center gap-3 text-[0.85rem] font-medium">
                <p>View leave details</p>
                <ChevronDown size={20} onClick={()=> setShowLeaveDetail(!showLeaveDetail)}/>
              </div>
              {showLeaveDetail && (
                <QueryTable
                  columns={columns}
                  list={employeeLeaveRequestDetails?.leave_period}
                />
              )}
                {/* <button
                  type="button"
                  onClick={close}
                  className="flex h-11 w-fit min-w-40 cursor-pointer items-center justify-center gap-2 rounded-md border border-black text-sm font-semibold text-black focus:outline-none"
                >
                  Close
                </button> */}
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
