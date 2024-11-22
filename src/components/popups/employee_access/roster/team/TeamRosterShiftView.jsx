import { Dialog, DialogPanel } from "@headlessui/react";
import { X } from "lucide-react";
import React from "react";

export default function TeamRosterShiftView({
  teamShiftViewPopupOpen,
  setTeamShiftViewPopupOpen,
}) {
  // const [loader, setLoader] = useState(false);

  function close() {
    setTeamShiftViewPopupOpen(false);
  }
  return (
    <Dialog
      open={teamShiftViewPopupOpen}
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
                Shift details
              </h1>
              <button
                onClick={close}
                className="text-xl font-extrabold text-textcolor-darkCharcoal"
              >
                <X />
              </button>
            </div>
            <div className="grid grid-cols-2 justify-between gap-3 gap-y-7">
              <div className="group col-span-2 flex items-center justify-between space-y-1 border border-b border-gray-darklight">
                <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  <div className="rounded-full bg-gray-darklight p-2">
                    <img
                      src="/assets/icons/setup/re-box.svg"
                      alt="icons"
                      className="h-4 w-4"
                    />
                  </div>
                  <p className="text-sm font-semibold"> 1:00pm-2:00pm</p>
                  Afternoon shift
                </label>
                <div className="cursor-pointer rounded-full bg-gray-darklight p-2">
                  <img
                    src="/assets/icons/setup/re-Edit.svg"
                    alt="icons"
                    className="h-5 w-5"
                  />
                </div>
              </div>
              <div className="group flex flex-col space-y-1">
                <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  Clock in time
                </label>
                <p className="text-sm font-semibold">1:00pm </p>
              </div>
              <div className="group flex w-full flex-col gap-1">
                <label className="label-text">Clock Out</label>
                <p className="text-sm font-semibold">3:00pm</p>
              </div>
              <div className="group col-span-2 flex w-full flex-col gap-1">
                <label className="label-text">Members</label>
                <p className="text-sm font-semibold">7</p>
              </div>
              <div className="group flex w-full flex-col gap-1">
                <label className="label-text">Department</label>
                <p className="text-sm font-semibold">IT</p>
              </div>
              <div className="group flex w-full flex-col gap-1">
                <label className="label-text">Work Location</label>
                <p className="text-sm font-semibold">TVM</p>
              </div>
              <div className="group flex w-full flex-col gap-1">
                <label className="label-text">Work Area</label>
                <p className="text-sm font-semibold">HRD</p>
              </div>
              <div className="group flex w-full flex-col gap-1">
                <label className="label-text">Pay type</label>
                <p className="text-sm font-semibold">perday</p>
              </div>
              <div className="group flex w-full flex-col gap-1">
                <label className="label-text">Created by</label>
                <p className="text-sm font-semibold">krishna</p>
              </div>
              <div className="overflow-y-min flex flex-col overflow-y-scroll">
                <div className="flex items-center gap-3 rounded-lg bg-gray-100 p-3">
                  <div className="rounded-full bg-gray-dark p-4"></div>
                  <div>
                    <p className="text-sm font-medium">kp</p>
                    <p className="text-xs font-medium text-darkblack">
                      UI/UX Design Intern
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-gray-100 p-3">
                  <div className="rounded-full bg-gray-dark p-4"></div>
                  <div>
                    <p className="text-sm font-medium">kp</p>
                    <p className="text-xs font-medium text-darkblack">
                      UI/UX Design Intern
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
