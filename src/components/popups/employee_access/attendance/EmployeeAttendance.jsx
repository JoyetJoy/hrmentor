import { Dialog, DialogPanel } from "@headlessui/react";
import { X } from "lucide-react";
import React from "react";

export default function EmployeeAttendance({ popupOpen, setPopupOpen }) {
  // const [loader, setLoader] = useState(false);

  function close() {
    setPopupOpen(false);
  }
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
              <div className="group flex flex-col space-y-1">
                <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  Status
                </label>
                <p className="text-sm font-semibold text-textcolor-green">
                  {" "}
                  present
                </p>
              </div>
              <div className="group flex flex-col space-y-1">
                <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  Date
                </label>
                <p className="text-sm font-semibold">Oct 3,2024 </p>
              </div>
              <div className="group flex w-full flex-col gap-1">
                <label className="label-text">Day</label>
                <p className="text-sm font-semibold">Monday</p>
              </div>
              <div className="group flex w-full flex-col gap-1">
                <label className="label-text">Total in-time</label>
                <p className="text-sm font-semibold">08:00Hr</p>
              </div>
              <div className="group flex w-full flex-col gap-1">
                <label className="label-text">Shift</label>
                <p className="text-sm font-semibold">Morning Shift(07:55:00)</p>
              </div>
              <div className="group flex w-full flex-col gap-1">
                <label className="label-text">Over time</label>
                <p className="text-sm font-semibold">03:76:00</p>
              </div>
              <div className="group flex w-full flex-col gap-1">
                <label className="label-text">Break Time</label>
                <p className="text-sm font-semibold">76 Min</p>
              </div>
              <div className="group flex w-full flex-col gap-1">
                <label className="label-text">Location</label>
                <p className="text-sm font-semibold">Trivandrum</p>
              </div>
              <div className="group flex w-full flex-col gap-1">
                <label className="label-text">Day start on</label>
                <p className="text-sm font-semibold">Oct 3,2024,12:00Am</p>
              </div>
              <div className="group flex w-full flex-col gap-1">
                <label className="label-text">Day end on</label>
                <p className="text-sm font-semibold">Oct 10,2024,12:00Pm</p>
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
