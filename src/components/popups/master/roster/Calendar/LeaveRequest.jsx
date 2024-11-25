import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { X } from "lucide-react";

function LeaveRequest({
  popupOpen,
  setPopupOpen,
  type,
  setType,
  requestData,
  handleSave,
}) {
  const [note, setNote] = useState("");

  const onClose = () => {
    setPopupOpen(false);
    setType("");
    setNote(""); // Clear note field on close
  };

  const saveRequest = () => {
    if (type === "claimed" && !note.trim()) {
      alert("Please add a note before accepting the request.");
      return;
    }

    // Pass data to parent callback
    handleSave({ type, note });
    onClose();
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
                    {requestData?.initials || "J"}
                  </div>
                  <div className="w-full">
                    <h3 className="flex w-full justify-between text-base font-semibold">
                      <span className="mr-1">{requestData?.name || "Jisham"}</span>
                      <span className="rounded-md bg-[#fef7f5] px-6 py-1 font-medium text-[#e95d39]">
                        {requestData?.leaveType || "Sick Leave"}
                      </span>
                    </h3>
                    <p className="text-xs font-medium text-darkblack">
                      {requestData?.jobTitle || "Developer"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <hr className="w-full" />
            {type === "claimed" ? (
              <div className="flex flex-col gap-2">
                <p className="text-sm">Not from employee</p>
                <p className="text-sm font-semibold">
                  {requestData?.description ||
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
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
                    onClick={onClose}
                    className="w-full rounded border border-black px-4 py-3"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={saveRequest}
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
