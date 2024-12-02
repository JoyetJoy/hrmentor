import { Dialog, DialogPanel } from "@headlessui/react";
import { X } from "lucide-react";
import React from "react";

export default function AddManually({ popupOpen, setPopupOpen }) {
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
                Add Manually
              </h1>
              <button
                onClick={close}
                className="text-xl font-extrabold text-textcolor-darkCharcoal"
              >
                <X />
              </button>
            </div>
            <div className="grid grid-cols-2 justify-between gap-2 ">
              <div className="group col-span-2 flex flex-col gap-1">
                <label className="label-text">Date</label>
                <input autoComplete="off" type="date" className="input-box pr-2" />
                {/* {errors.date && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.date?.message}
                  </span>
                )} */}
              </div>
              <div className="group col-span-2 flex flex-col gap-1 ">
                <label className="label-text">Total working Hours</label>
                <input autoComplete="off" type="text" className="input-box" />
                {/* {errors.total_hr && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.total_hr?.message}
                  </span>
                )} */}
              </div>
              <div className="group flex flex-col gap-1">
                <label className="label-text">Clock in</label>
                <input autoComplete="off" type="text" className="input-box" />
                {/* {errors.clock_in && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.clock_in?.message}
                  </span>
                )} */}
              </div>{" "}
              <div className="group flex flex-col gap-1">
                <label className="label-text">Clock out</label>
                <input autoComplete="off" type="text" className="input-box" />
                {/* {errors.clock_out && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.clock_out?.message}
                  </span>
                )} */}
              </div>
              <div className="group col-span-2 flex flex-col gap-1">
                <label className="label-text">Overtime</label>
                <input autoComplete="off" type="text" className="input-box" />
                {/* {errors.overtime && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.overtime?.message}
                  </span>
                )} */}
              </div>
              <div className="group col-span-2 flex flex-col gap-1">
                <label className="label-text">Break Time(Duration)</label>
                <input autoComplete="off" type="text" className="input-box" />
                {/* {errors.overtime && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.overtime?.message}
                  </span>
                )} */}
              </div>
              <div className="flex col-span-2 items-center gap-2 my-2">
                <p className="border border-b w-full "></p>
                <p className="text-xs text-textcolor-darkCharcoal">or</p>
                <p className="border border-b-1 w-full "></p>
              </div>
              <div className="group flex flex-col gap-1">
                <label className="label-text">Break Time start</label>
                <input autoComplete="off" type="text" className="input-box" />
                {/* {errors.break_start && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.break_start?.message}
                  </span>
                )} */}
              </div>{" "}
              <div className="group flex flex-col gap-1">
                <label className="label-text">Break Time End</label>
                <input autoComplete="off" type="text" className="input-box" />
                {/* {errors.time_end && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.time_end?.message}
                  </span>
                )} */}
              </div>
              <div className="mt-4 flex w-full items-center gap-3">
                <button
                  type="button"
                  onClick={close}
                  className="flex h-11 w-fit min-w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-black text-sm font-semibold text-black focus:outline-none"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={close}
                  className="flex h-11 w-fit min-w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-black text-sm font-semibold text-white bg-black focus:outline-none"
                >
                  Save
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
