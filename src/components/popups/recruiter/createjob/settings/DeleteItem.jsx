import { Popover, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import React, { Fragment } from "react";
import { Controller, useForm } from "react-hook-form";

function DeleteItem({ popupdeleteOpen, setPopupdeleteOpen }) {
    const {
        formState: { errors },
      } = useForm({
        mode: "onSubmit",
        // resolver: yupResolver(schema),
      });
      function closeModal() {
        setPopupdeleteOpen(false);
      }
  return (
    <>
      {popupdeleteOpen && (
        <div className="fixed inset-0 z-[100] flex h-full w-full items-center justify-center bg-black/20">
          <Popover className="relative">
            <>
              <Transition
                as={Fragment}
                show={popupdeleteOpen}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="w-[29rem] transform rounded-md bg-white px-9 pb-10 pt-6">
                  <div className="mb-5 flex items-center justify-center">
                    <h1 className="text-center text-lg font-bold leading-7 text-neutral-700">
                      Delete?
                      <p className="whitespace-nowrap text-sm font-normal mt-3 text-[#7F7F7F]">
                        Are you sure you want to delete?
                      </p>
                    </h1>
                    {/* <button
                    onClick={closeModal}
                    className="text-[#00000080] font-extrabold  text-lg"
                  >
                  <X/>
                  </button> */}
                  </div>

                  <form className="grid grid-cols-1 gap-3">
                    <div className="mt-2 flex flex-row items-center justify-center gap-2">
                      <button className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded border border-[#ECE9F1] bg-white text-sm font-semibold text-[#7F7F7F] focus:outline-none">
                        Cancel
                      </button>
                      <button
                        onClick={closeModal}
                        className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded bg-bgColor-100 text-sm font-semibold text-white focus:outline-none"
                      >
                        Delete
                      </button>
                    </div>
                  </form>
                </Popover.Panel>
              </Transition>
            </>
          </Popover>
        </div>
      )}
    </>
  )
}

export default DeleteItem
