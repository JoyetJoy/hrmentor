import { Dialog, DialogPanel } from '@headlessui/react';
import { X } from 'lucide-react';
import React from 'react'

export default function RequestClaimshift({popupOpen,setPopupOpen,selectedField,convertTo12HourFormat}) {

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
          className="  justify-between data-[closed]:transform-[scale(95%)] w-full max-w-md rounded bg-white/90 px-14 py-10 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
        >
          <div className="mb-7 flex items-center justify-between">
            <h1 className="text-md font-bold leading-7 text-textcolor-darkCharcoal">
            Request for Claim shift
            </h1>
            <button
              onClick={close}
              className="text-xl font-extrabold text-textcolor-darkCharcoal"
            >
              <X />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3 gap-y-7 justify-between">
            <div className="group  flex flex-col space-y-1">
              <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                Requesting Shift
              </label>
              <p className="text-sm font-semibold ">{selectedField?.slot?.shift?.name}</p>
            </div>
            <div className="group flex flex-col space-y-1">
              <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                Shift Time
              </label>
              <p className="text-sm font-semibold">{convertTo12HourFormat(selectedField?.slot?.shift?.start_time||'')}-{convertTo12HourFormat(selectedField?.slot?.shift?.end_time||'')}</p>
            </div>
            <div className="group flex w-full col-span-2  flex-col gap-1">
            <label className="label-text">Note</label>
            <textarea
              className="h-20 border rounded-md border-gray-muted w-full text-sm p-2"
              rows="4"
            />
            </div>
            <div className="mt-2 flex w-full items-center justify-between gap-3">
              <button
                type="button"
                onClick={close}
                className="flex h-11 w-fit min-w-40 cursor-pointer items-center justify-center gap-2 rounded-md border border-black text-sm font-semibold text-black focus:outline-none"
              >
                Close
              </button>
              <button
                type="button"
                onClick={close}
                className="flex h-11 w-fit min-w-40 cursor-pointer items-center justify-center gap-2 rounded-md border bg-black border-black text-sm font-semibold text-white focus:outline-none"
              >
                Send Request
              </button>
              
            </div>
          </div>
        </DialogPanel>
      </div>
    </div>
  </Dialog>
  )
}
