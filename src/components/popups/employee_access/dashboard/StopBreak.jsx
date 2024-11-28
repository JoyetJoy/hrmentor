import { Dialog, DialogPanel } from "@headlessui/react";
import { X } from "lucide-react";
import React, { useState } from "react";

export default function StopBreak({ breakpopupOpen, setBreakPopupOpen, loggedTime }) {
  const [loader, setLoader] = useState(false);

  function close() {
    setBreakPopupOpen(false);
  }
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
            className="data-[closed]:transform-[scale(95%)] h-1/2 min-h-60 flex items-center justify-center  w-1/2  max-w-xs rounded bg-white/90 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
          >
            {loader ? (
              <div className="flex min-h-72 w-full items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-hrmprimaryorange"></div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 w-full">
                <img
                  src="/assets/icons/employee_access/header/dashboard/stopbreak.svg"
                  alt="stopbreak"
                  className="w-1/4 object-contain"
                />
                <p className="text-xs font-semibold text-hrmprimaryorange">
                  Logged Time : {loggedTime}
                </p>
                <button
                  type="submit"
                  onClick={close}
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
