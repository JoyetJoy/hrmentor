import { Button, Popover, Transition } from '@headlessui/react';
import { Upload } from 'lucide-react';
import React, { Fragment } from 'react'

function AddRegistrationMembership({popupOpen, setPopupOpen}) {
    
    function closeModal() {
        setPopupOpen(false);
      }
  return (
    <>
    {popupOpen && (
      <div className="fixed inset-0 bg-black/20 z-[100] w-full h-full flex items-center justify-center">
        <Popover className="relative">
          <>
            <Transition
              as={Fragment}
              show={popupOpen}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="w-[20rem] transform px-9 py-5 bg-white rounded-lg">
                <div className="flex justify-between items-center">
                  <h1 className="text-neutral-700 text-xs font-extrabold leading-7">
                    Add Registration & Membershpis
                  </h1>
                  <button
                    onClick={closeModal}
                    className="text-[#00000080] font-extrabold  text-lg"
                  >
                    ✕
                  </button>
                </div>

                <form className="grid mt-4 gap-3 grid-cols-1">
                  <div className="flex group flex-col space-y-1">
                    <label className="text-[#3A3A3A] text-[0.8rem] group-focus-within:text-[#2E2E2E] font-medium">
                        Registration/Membership body
                    </label>
                    <input
                      // {...register("name", { required: true })}
                      type="text"
                      className="w-full h-10 input-box"
                    />
                    {/* {errors.name && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.name?.message}
                      </span>
                    )} */}
                  </div>
                  <div className="flex group flex-col space-y-1">
                    <label className="text-[#3A3A3A] text-[0.8rem] group-focus-within:text-[#2E2E2E] font-medium">
                    Professional Registration Number                    </label>
                    <input
                      type="text"
                      className="w-full  h-10 input-box border-[#C2C1C1] focus:border-[#C2C1C1]"
                    />
                  </div>
                  <div className="flex group flex-col space-y-1">
                    <label className="text-[#3A3A3A] text-[0.8rem] group-focus-within:text-[#2E2E2E] font-medium">
                      Expiry Date
                    </label>
                    <input
                      type="date"
                      className="w-full   h-10 input-box border-[#C2C1C1] focus:border-[#C2C1C1]"
                    />
                  </div>
                 
                  <div className="flex group flex-col space-y-1">
                    <label className="text-[#3A3A3A] text-[0.8rem] group-focus-within:text-[#2E2E2E] font-medium">
                      First Registered Date
                    </label>
                    <input
                      type="date"
                      className="w-full  h-10 input-box border-[#C2C1C1] focus:border-[#C2C1C1]"
                      autoComplete="off"

                    />
                  </div>
                  <div className="flex group flex-col space-y-1">
                    <label className="text-[#3A3A3A] text-[0.8rem] group-focus-within:text-[#2E2E2E] font-medium">
                      Revalidation/Renewal Date
                    </label>
                    <input
                      type="date"
                      className="w-full  h-10 input-box border-[#C2C1C1] focus:border-[#C2C1C1]"
                      autoComplete="off"

                    />
                  </div>
                  <div className="flex flex-row items-center justify-center gap-2 mt-2 ">
                  <button className="flex  cursor-pointer bg-[#030E5C] text-white focus:outline-none text-sm gap-2 w-32 font-normal h-10 justify-center items-center rounded">
                    Save
                  </button>
                  <button className="flex cursor-pointer text-black border border-black focus:outline-none text-sm gap-2 w-32 font-semibold h-10 justify-center items-center rounded">
                    Cancel
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

export default AddRegistrationMembership
