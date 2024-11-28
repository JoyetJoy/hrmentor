import { Dialog, DialogPanel } from "@headlessui/react";
import { X } from "lucide-react";
import React from "react";

export default function ClockOut({ clockOutpopupOpen, setClockOutPopupOpen }) {
  function close() {
    setClockOutPopupOpen(false);
  }
  return (
    <Dialog
      open={clockOutpopupOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/20">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="data-[closed]:transform-[scale(95%)] w-full max-w-md rounded bg-white/90 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
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
                  Morning shift
                </label>
                <p className="text-sm font-semibold">11:00 AM-6:00 PM</p>
              </div>
              <div className="group flex flex-col space-y-1">
                <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  Tota in-time
                </label>
                <p className="text-sm font-semibold">08:00Hr</p>
              </div>

              <div className="group flex w-full flex-col gap-1">
                <label className="label-text">Overtime</label>
                <p className="text-sm font-semibold">00:30:00</p>
              </div>
              <div className="mt-7 flex w-full items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={close}
                  className="flex h-11 w-fit min-w-40 cursor-pointer items-center justify-center gap-2 rounded-md border border-black text-sm font-semibold text-black focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  type="button"
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
