import { CLOCKOUT, newRequest } from "@/api";
import { Dialog, DialogPanel } from "@headlessui/react";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function ClockOut({
  clockOutPopupOpen,
  setClockOutPopupOpen,
  clockindata,
  loggedTime,
  setTimer,
  setLoggedTime
}) {
  const [overtime, setOvertime] = useState("00:00:00");
  function close() {
    setClockOutPopupOpen(false);
  }

  useEffect(() => {
    if (!clockindata?.start_time) return;

    const calculateLoggedTime = () => {
      // Get the current date to use for constructing the time
      const currentDate = new Date();

      // Combine the current date with the shift_end_time to create a valid Date object
      const shiftEndDate = new Date(
        `${currentDate.toDateString()} ${clockindata?.shift_end_time}`,
      );

      // Calculate the elapsed time from the shift's start time
      const elapsedTime = Date.now() - shiftEndDate.getTime();

      return new Date(elapsedTime).toISOString().substr(11, 8); // HH:mm:ss format
    };

    const interval = setInterval(
      () => setOvertime(calculateLoggedTime()),
      1000,
    );
    return () => clearInterval(interval);
  }, [clockindata]);

  const handleSubmit = async () => {
    const formData={
      attendence_id:clockindata?.id
    }
    try {
      const response = await newRequest.post(CLOCKOUT,formData);
      if (response.status === 200) {
        setLoggedTime("00:00:00");
        setTimer(response.data.timer);
        setClockOutPopupOpen(false);
        toast.success("Clock Out Successfully");
      }
    } catch (error) {
      toast.error("Failed to end break. Please try again.");
    } 
  };

  return (
    <Dialog
      open={clockOutPopupOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/20">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="data-[closed]:transform-[scale(95%)] w-full max-w-md rounded bg-white/90 p-10 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
          >
            <div className="mb-7 flex items-center justify-between">
              <h1 className="text-lg font-bold leading-7 text-textcolor-darkCharcoal">
                Clock Out{" "}
              </h1>
              <button
                onClick={close}
                className="text-xl font-extrabold text-textcolor-darkCharcoal"
              >
                <X />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 gap-y-7">
              <div className="group col-span-2 flex flex-col space-y-1">
                <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  {clockindata?.shift_detail?.name}
                </label>
                <p className="text-sm font-semibold">
                  {clockindata?.shift_start_time} -{" "}
                  {clockindata?.shift_end_time}
                </p>
              </div>
              <div className="group flex flex-col space-y-1">
                <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  Total in-time
                </label>
                <p className="text-sm font-semibold">{loggedTime}</p>
              </div>

              <div className="group flex w-full flex-col gap-1">
                <label className="label-text flex justify-end">Overtime</label>
                <p className="flex justify-end text-sm font-semibold">
                  {overtime}
                </p>
              </div>
              <div className="col-span-2 mt-7 flex w-full items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={close}
                  className="flex h-11 w-fit min-w-40 cursor-pointer items-center justify-center gap-2 rounded-md border border-black text-sm font-semibold text-black focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex h-11 w-fit min-w-40 cursor-pointer items-center justify-center gap-2 rounded-md bg-black text-sm font-semibold text-white focus:outline-none"
                >
                  End
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
