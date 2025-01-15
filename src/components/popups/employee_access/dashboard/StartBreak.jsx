import { BREAKLIST, newRequest, STARTBREAK } from "@/api";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export default function StartBreak({
  breakpopupOpen,
  setBreakPopupOpen,
  attendanceId,
  setStartBreakPopupOpen
}) {
  const [selectedBreak, setSelectedBreak] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [nobreak, setNobreak] = useState(false);
  const shiftData = JSON.parse(localStorage.getItem("shiftid"));

  const { data: breaklist, refetch } = useQuery({
    queryKey: ["breaklist", shiftData],
    queryFn: () =>
      newRequest.get(`${BREAKLIST}/${shiftData?.id}`).then((res) => res.data),
    enabled: false,
  });

  useEffect(() => {
    if (breakpopupOpen) {
      refetch();
    }
  }, [breakpopupOpen, refetch]);

  function close() {
    setBreakPopupOpen(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedBreak) {
      setError("Please select a break time.");
      return;
    }
    const payload = {
      shift_id: shiftData?.id,
      roster_id: shiftData?.rosterid,
      break_id: selectedBreak?.id,
      attendance_id: attendanceId,
    };

    const response = await newRequest.post(STARTBREAK, payload);
    if (response.status === 200) {
      setBreakPopupOpen(false);
      setStartBreakPopupOpen(true);
      toast.success("Start break successfully");
    } else {
      setBreakPopupOpen(false);
      toast.error("Failed to start break, Try again.");
    }
  };

  return (
    <Dialog
      open={breakpopupOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/20">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="data-[closed]:transform-[scale(95%)] w-full max-w-md rounded bg-white/90 px-14 py-10 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
          >
            <div className="mb-7 flex items-center justify-between">
              <h1 className="text-lg font-bold leading-7 text-textcolor-darkCharcoal">
                Start Break
              </h1>
              <button
                onClick={close}
                className="text-xl font-extrabold text-textcolor-darkCharcoal"
              >
                <X />
              </button>
            </div>
            <form className="grid grid-cols-1" onSubmit={handleSubmit}>
              <div className="w-full">
                <div className="mx-auto w-full max-w-md">
                  <div className="space-y-4">
                    {(breaklist || []).map((breakTime) => (
                      <>
                      {breakTime?.break_status ?(
                        <button
                        key={breakTime.id}
                        type="button"
                        onClick={() => setSelectedBreak(breakTime)}
                        disabled={!breakTime?.break_status}
                        className={`flex w-full cursor-pointer flex-col items-start justify-between rounded-lg border px-5 py-1 text-sm/6 transition ${
                          selectedBreak?.id === breakTime.id
                            ? "border-hrmprimaryorange bg-hrmprimaryorange/15"
                            : "border-gray-300 bg-white"
                        } ${!breakTime?.break_status ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        <p className="font-medium text-textcolor-darkCharcoal">
                          {breakTime.type_name}
                        </p>
                        <p className="font-bold text-textcolor-darkCharcoal">
                          Duration : {breakTime.break_time_duration}
                        </p>
                        {!breakTime?.break_status && (
                          <p className="text-xs text-red-500">Not Available</p>
                        )}
                      </button>
                      ):(<p className="text-xs text-red-500">No Breaks Available</p>)}
                      </>
                    ))}
                  </div>
                </div>

                {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
              </div>

              <div className="col-span-2 mt-6 flex w-full flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={close}
                  className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-black text-sm font-semibold text-black focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md ${
                    loader
                      ? "cursor-not-allowed bg-gray-400 text-gray-200"
                      : "bg-hrmblack text-white"
                  } text-sm font-normal focus:outline-none`}
                  disabled={loader}
                >
                  {loader ? (
                    <div className="flex items-center gap-3">
                      <div className="h-5 w-full animate-spin rounded-full border-b-2 border-white"></div>
                      Starting...
                    </div>
                  ) : (
                    <span>Start</span>
                  )}
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
