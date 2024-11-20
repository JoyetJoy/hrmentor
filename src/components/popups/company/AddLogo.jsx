import { Dialog, DialogPanel } from "@headlessui/react";
import { X } from "lucide-react";
import React, { useState } from "react";

export default function AddLogo({ popupOpen, setPopupOpen }) {
  const [loader, setLoader] = useState(false);

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
            className="data-[closed]:transform-[scale(95%)] w-full max-w-md rounded bg-white/90 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
          >
            <div className="mb-7 flex items-center justify-between">
              <h1 className="text-[0.94rem] font-bold leading-7 text-neutral-700">
                Choose Logo
              </h1>
              <button
                onClick={close}
                className="text-lg font-extrabold text-[#00000080]"
              >
                <X />
              </button>
            </div>
            {loader ? (
              <div className="flex min-h-72 w-full items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-hrmprimaryorange"></div>
              </div>
            ) : (
              <form
                className="grid grid-cols-2 gap-3"
                //   onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex flex-col items-center gap-2">
                  <img
                    src="/assets/images/company/companylogo1.png"
                    alt="logo"
                    className="object-contain w-full"
                  />
                  <input type="radio"  className="size-4"/>
                </div>
                <div className="flex flex-col items-center gap-6">
                  <img
                    src="/assets/images/company/companylogo2.png"
                    alt="logo"
                    className="object-contain w-full "
                  />
                   <input type="radio"  className="size-4"/> 
                </div>
                <div className="mt-2 flex w-full flex-row items-center col-span-2 justify-center gap-3">
                <button
                    type="button"
                    onClick={close}
                    className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-black text-sm font-semibold text-black focus:outline-none"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-hrmblack text-sm font-normal text-white focus:outline-none"
                    disabled={loader}
                  >
                    {loader ? (
                      <div className="flex items-center gap-3">
                        <div className="h-5 w-full animate-spin rounded-full border-b-2 border-white"></div>
                        Choose Logo
                      </div>
                    ) : (
                      <span>Choose Logo</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
