import { extractTime } from "@/utils/helpers";
import { Dialog, DialogPanel } from "@headlessui/react";
import { X } from "lucide-react";
import React from "react";

export default function EmployeeAttendance({ popupOpen, setPopupOpen, selected}) {  

  function close() {
    setPopupOpen(false);
  }

  function convertTo12HourFormat(time) {
    const [hours, minutes] = time.split(":");
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes} ${period}`;
  }

  const addOvertime = (overtimeArray) => {
    let totalHours = 0;
    let totalMinutes = 0;
    let totalSeconds = 0;
  
    overtimeArray.forEach((item) => {
      const [hours, minutes, seconds] = item.overtime_hours.split(":").map(Number);
  
      totalHours += hours;
      totalMinutes += minutes;
      totalSeconds += seconds;
  
      // Handle overflow of seconds into minutes
      totalMinutes += Math.floor(totalSeconds / 60);
      totalSeconds = totalSeconds % 60;
  
      // Handle overflow of minutes into hours
      totalHours += Math.floor(totalMinutes / 60);
      totalMinutes = totalMinutes % 60;
    });
  
    // Format result as "hh:mm:ss"
    return `${String(totalHours).padStart(2, "0")}:${String(totalMinutes).padStart(2, "0")}:${String(totalSeconds).padStart(2, "0")}`;
  };
 
  return (
    <Dialog
      open={popupOpen}
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
                Attendance
              </h1>
              <button
                onClick={close}
                className="text-xl font-extrabold text-textcolor-darkCharcoal"
              >
                <X />
              </button>
            </div>
            <div className="grid grid-cols-2 justify-between gap-3 gap-y-7">
              <div className="group flex w-full flex-col gap-1">
                <label className="label-text">Shift</label>
                <p className="text-sm font-semibold">{selected?.shift_detail ? selected?.shift_detail?.name : 'Present'} <br/>
                  {selected?.shift_detail && (
                    <span>({selected?.shift_start_time||selected?.shift_detail?.start_time||' 00:00:00'} - {selected?.shift_end_time||selected?.shift_detail?.end_time||' 00:00:00'})</span>
                  )}
                </p>
              </div>
              <div className="group flex flex-col space-y-1">
                <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                Shift duration
                </label>
                <p className="text-sm font-semibold">{selected?.shift_duration||selected?.shift_detail?.shift_duration || "00:00"} </p>
              </div>
              <div className="group flex w-full flex-col gap-1">
                <label className="label-text">Clock-in time</label>
                <p className="text-sm font-semibold">{selected?.clock_in_time? extractTime(selected?.clock_in_time):'00:00:00'}</p>
              </div>
              <div className="group flex w-full flex-col gap-1">
                <label className="label-text">Clock-out time</label>
                <p className="text-sm font-semibold">{selected?.clock_out_time? extractTime(selected?.clock_out_time):'00:00:00'}</p>
              </div>
              <div className="group flex w-full flex-col gap-1">
                <label className="label-text">Total Working Hours</label>
                <p className="text-sm font-semibold">{selected?.total_working_hour}</p>
              </div>
              <div className="group flex w-full flex-col gap-1">
                <label className="label-text">Overtime</label>
                <p className="text-sm font-semibold">
                  {selected?.over_time? addOvertime(selected?.over_time) : '00:00:00'}</p>
              </div>
              <div className="mt-2 flex w-full items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={close}
                  className="flex h-11 w-fit min-w-40 cursor-pointer items-center justify-center gap-2 rounded-md border border-black text-sm font-semibold text-black focus:outline-none"
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
