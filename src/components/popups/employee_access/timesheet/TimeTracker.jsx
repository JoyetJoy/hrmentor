import { newRequest } from "@/api";
import { TIME_SHEET } from "@/api/master";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import React from "react";

export default function TimeTracker({
  timeTrackerPopupOpen,
  setTimeTrackerPopupOpen,
  selectedId,
  weekDays
}) {
  const { data: events, refetch } = useQuery({
    queryKey: ["events", selectedId], 
    queryFn: () =>
      newRequest.get(`${TIME_SHEET}/${selectedId}`).then((res) => res.data),
    enabled: !!selectedId,
  });
  function close() {
    setTimeTrackerPopupOpen(false);
  }
  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    return `${hours} hr ${minutes} min`;
  };
 
  return (
    <Dialog
      open={timeTrackerPopupOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-10 overflow-y-auto bg-black/20">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="data-[closed]:transform-[scale(95%)] w-full max-w-sm justify-between rounded bg-white/90 p-8 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
          >
            <div className="mb-7 flex items-center justify-between">
              <h1 className="text-md font-bold leading-7 text-textcolor-darkCharcoal">
                This Week Time Tracker
              </h1>
              <button
                onClick={close}
                className="text-lg font-extrabold text-textcolor-darkCharcoal"
              >
                <X />
              </button>
            </div>
            <div className="grid grid-cols-2 justify-between gap-3 gap-y-7">
              <div className="group col-span-2 flex flex-col space-y-1">
                <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  Total Working Hours
                </label>
                <p className="text-sm font-semibold">
                  {" "}
                  {events?.days_hours?.length > 0
                    ? formatTime(events?.total_working_hours)
                    : "00Hr 00Min"}
                </p>
              </div>
              <div className="group flex flex-col space-y-1">
                <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  Date From
                </label>
                <p className="text-sm font-semibold">{weekDays[0]?.fullDate} </p>
              </div>
              <div className="group flex w-full flex-col gap-1">
                <label className="label-text">Date to</label>
                <p className="text-sm font-semibold">{weekDays[weekDays.length - 1]?.fullDate}</p>
              </div>
              <div className="mt-2 flex w-full items-end gap-3">
                <button
                  type="button"
                  onClick={close}
                  className="flex h-10 w-fit min-w-28 cursor-pointer items-center justify-center gap-2 rounded-md border border-black text-sm font-semibold text-black focus:outline-none"
                >
                  Close
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
