import { newRequest, ENDBREAK } from "@/api";
import { Dialog, DialogPanel } from "@headlessui/react";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import {toast} from 'react-hot-toast';

export default function StopBreak({
  breakpopupOpen,
  setBreakPopupOpen,
  breakdata,
}) {
  const [loader, setLoader] = useState(false);
  const [breakDuration, setBreakDuration] = useState("");

  useEffect(() => {
    if (!breakdata?.start_time) return;

    const calculateLoggedTime = () => {
      // Create a Date object from the start_time string and handle it as a local time
      const startDate = new Date(`1970-01-01T${breakdata?.start_time}Z`);
      const elapsedTime = Date.now() - startDate.getTime();
      return new Date(elapsedTime).toISOString().substr(11, 8); // HH:mm:ss format
    };

    const interval = setInterval(
      () => setBreakDuration(calculateLoggedTime()),
      1000,
    );
    return () => clearInterval(interval);
  }, [breakdata]);

  function close() {
    setBreakPopupOpen(false);
  }

  const handleSubmit = async () => {
    setLoader(true);
    try {
      const response = await newRequest.post(ENDBREAK);
      if (response.status === 200) {
        setBreakPopupOpen(false);
        toast.success("Break Ended Successfully");
      }
    } catch (error) {
      toast.error("Failed to end break. Please try again.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <Dialog
      open={breakpopupOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={()=>{}}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/20">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="data-[closed]:transform-[scale(95%)] flex h-1/2 min-h-60 w-1/2 max-w-xs items-center justify-center rounded bg-white/90 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
          >
            {loader ? (
              <div className="flex min-h-72 w-full items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-hrmprimaryorange"></div>
              </div>
            ) : (
              <div className="flex w-full flex-col items-center gap-3">
                <img
                  src="/assets/icons/employee_access/header/dashboard/stopbreak.svg"
                  alt="stopbreak"
                  className="w-1/4 object-contain"
                />
                <p className="text-xs font-semibold text-hrmprimaryorange">
                  Break Time: {breakDuration}
                </p>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="flex h-10 w-1/3 cursor-pointer items-center justify-center gap-2 rounded-md bg-hrmprimaryorange text-sm font-normal text-white focus:outline-none"
                >
                  Stop Break
                </button>
              </div>
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
