import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { X } from "lucide-react";
import { newRequest } from "@/api";
import toast from "react-hot-toast";

function LeaveRequest({
  popupOpen,
  setPopupOpen,
  type,
  setType,
  requestData,
  handleSave,
  refetch,
  data,
  date,
  api,
  selectedId,
  rosterCalim,
  selectedData
}) {
  const [note, setNote] = useState("");

  const onClose = () => {
    setPopupOpen(false);
    setType("");
  };
console.log(data);

  // const saveRequest = async(id) => {
  //   if (type === "claimed") {
  //     const response = await newRequest.post(`${api}/${selectedId}`, {
  //       status_id:id,
  //       accepted_note: note,
  //     });
  //     if (response.status === 200) {
  //       toast.success(response.data?.message || "Claim request accepted successfully!");
  //       setDeletePopup(false);
  //       refetch();
  //     } else {
  //       toast.error(response.data?.message || "Failed to save claim request.");
  //     }
  //   }

  //   // Pass data to parent callback
  //   handleSave({ type, note });
  //   onClose();
  // };
  const saveRequest = async (statusId) => {
    try {
      if (!selectedId) {
        toast.error("Invalid request: No selected request ID");
        return;
      }
  
      if (type === "claimed") {
        const response = await newRequest.post(`${api}/${selectedId}`, {
          roster_id:rosterCalim?.roster_details?.roster_id,
          shift_id:rosterCalim?.roster_details?.shift_details?.shift_id,
          roster_date:date,
          employee_id:data?.request_details?.employee_id,
          available_count:rosterCalim?.roster_details?.available_employees_count,
          status_id: statusId,
          roster_claim_id:2,
          accepted_note: note,
        });
  
        if (response.status === 200) {
          toast.success(response.data?.message || "Claim request processed successfully!");
          refetch();
          // Close the popup
          setPopupOpen(false);
          setType("");
          setNote("");
  
          // Ensure UI updates
          if (typeof handleSave === "function") {
            handleSave({ type, note });
          }
        } else {
          toast.error(response.data?.message || "Failed to process request.");
        }
      }
    } catch (error) {
      console.error("Error processing request:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Dialog open={popupOpen} as="div" className="relative z-10" onClose={onClose}>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/20">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="flex w-full max-w-[26rem] flex-col gap-5 rounded bg-white p-10">
            <div className="flex justify-between">
              <DialogTitle as="h1" className="text-md font-bold">
                {type === "leave" ? "View Leave Request" : "Claim Request"}
              </DialogTitle>
              <button onClick={onClose} className="text-gray-500 hover:text-black">
                <X />
              </button>
            </div>
            <div className="mt-2 flex w-full items-center justify-center">
              <div className="flex h-14 w-full items-center justify-between rounded-md py-2 pl-2 pr-2">
                <div className="flex w-full items-center gap-x-2">
                  <div className="flex h-12 w-12 min-w-[3rem] items-center justify-center rounded-full bg-hrmprimaryorange/10 text-sm font-bold uppercase">
                    {requestData?.initials || data?.request_details?.employee?.first_name[0]}
                  </div>
                  <div className="w-full">
                    <h3 className="flex w-full justify-between text-base font-semibold">
                      <span className="mr-1">{requestData?.name || data?.request_details?.employee?.first_name}</span>
                      {type === "leave" && (
                        <span className="rounded-md bg-[#fef7f5] px-6 py-1 font-medium text-[#e95d39]">
                        {requestData?.leaveType || "Sick Leave"}
                      </span>
                      )}
                    </h3>
                    <p className="text-xs font-medium text-darkblack">
                      {requestData?.jobTitle || data?.request_details?.employee?.designation?.designation_name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <hr className="w-full" />
            {type === "claimed" ? (
              <div className="flex flex-col gap-2">
                <p className="text-sm">Note from employee</p>
                <p className="text-sm font-semibold">
                  {requestData?.description ||
                    data?.request_details?.note}
                </p>
                <div className="flex flex-col gap-1 mt-2">
                  <label htmlFor="note" className="text-sm">
                    Note
                  </label>
                  <textarea
                    id="note"
                    className="border min-h-20 rounded-md p-2 placeholder:text-sm"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add your note here"
                  />
                </div>
                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={()=>{
                      saveRequest(3)
                    }}
                    className="w-full rounded border border-black px-4 py-3"
                  >
                    Reject Request
                  </button>
                  <button
                    type="button"
                    onClick={()=>{
                      saveRequest(2)
                    }}
                    className="w-full rounded bg-black px-4 py-3 text-white"
                  >
                    Accept Request
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col">
                <div className="flex justify-between pr-5">
                <div className="flex flex-col">
                  <p className="text-sm">Start Date</p>
                  <p className="text-sm font-bold">
                    {requestData?.startDate || "Oct 14, 2024"}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm">End Date</p>
                  <p className="text-sm font-bold">
                    {requestData?.endDate || "Oct 14, 2024"}
                  </p>
                </div>
                </div>
                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-1/2 rounded border border-black px-4 py-3"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default LeaveRequest;
