import { Popover, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function RemoveResume({ popupOpen, setPopupOpen }) {
  const [loader, setLoader] = useState(false);

  return (
    <>
      {popupOpen && (
        <div className="fixed inset-0 bg-black/20 z-[200] w-full h-full self-start flex justify-end">
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
                <Popover.Panel className="w-[23rem] bg-white h-screen p-7 transform">
                  <div className="flex justify-between items-center">
                    <h1 className="text-black text-base font-semibold leading-7">
                      Filter Jobs
                    </h1>
                    <button
                      onClick={() => setPopupOpen(false)}
                      className="text-black font-extrabold text-xl"
                    >
                      ✕
                    </button>
                  </div>
                  <form className="flex flex-col gap-2.5 py-4  h-full overflow-y-auto invisible-scroll-y">
                    <div className="flex group flex-col space-y-1">
                      <label className="text-[#2C2C2C] text-sm group-focus-within:text-[#2E2E2E] font-medium">
                        Status
                      </label>
                      <input
                        // {...register("", { required: true })}
                        autoComplete="off"
                        type="text"
                        placeholder="Enter group name"
                        className="input-box w-full h-9"
                      />
                    </div>
                    <div className="flex group flex-col space-y-1">
                      <label className="text-[#2C2C2C] text-sm group-focus-within:text-[#2E2E2E] font-medium">
                        Hiring Manager
                      </label>
                      <input
                        // {...register("", { required: true })}
                        autoComplete="off"
                        type="text"
                        placeholder="Enter group name"
                        className="input-box w-full h-9"
                      />
                    </div>
                    <div className="flex group flex-col space-y-1">
                      <label className="text-[#2C2C2C] text-sm group-focus-within:text-[#2E2E2E] font-medium">
                        Internal Code
                      </label>
                      <input
                        // {...register("", { required: true })}
                        autoComplete="off"
                        type="text"
                        placeholder="Enter group name"
                        className="input-box w-full h-9"
                      />
                    </div>
                    <div className="flex group flex-col space-y-1">
                      <label className="text-[#2C2C2C] text-sm group-focus-within:text-[#2E2E2E] font-medium">
                        Department
                      </label>
                      <input
                        // {...register("", { required: true })}
                        autoComplete="off"
                        type="text"
                        placeholder="Enter group name"
                        className="input-box w-full h-9"
                      />
                    </div>
                    <div className="flex group flex-col space-y-1">
                      <label className="text-[#2C2C2C] text-sm group-focus-within:text-[#2E2E2E] font-medium">
                        Country
                      </label>
                      <input
                        // {...register("", { required: true })}
                        autoComplete="off"
                        type="text"
                        placeholder="Enter group name"
                        className="input-box w-full h-9"
                      />
                    </div>
                    <div className="flex group flex-col space-y-1">
                      <label className="text-[#2C2C2C] text-sm group-focus-within:text-[#2E2E2E] font-medium">
                        State
                      </label>
                      <input
                        // {...register("", { required: true })}
                        autoComplete="off"
                        type="text"
                        placeholder="Enter group name"
                        className="input-box w-full h-9"
                      />
                    </div>
                    <div className="flex group flex-col space-y-1">
                      <label className="text-[#2C2C2C] text-sm group-focus-within:text-[#2E2E2E] font-medium">
                        City
                      </label>
                      <input
                        // {...register("", { required: true })}
                        autoComplete="off"
                        type="text"
                        placeholder="Enter group name"
                        className="input-box w-full h-9"
                      />
                    </div>
                    <div className="flex items-end gap-x-4 h-full w-full">
                      <div className="border-[#ECE9F1] border font-medium rounded flex items-center justify-center text-[0.8rem] tracking-[0.1px] text-[#7F7F7F] h-9 flex-[0.5] px-7">
                        Clear all
                      </div>
                      <button className="bg-[#181C3A]  flex-[0.5] font-medium rounded flex items-center justify-center text-[0.8rem] tracking-[0.1px] text-white h-9 px-7">
                        {loader ? (
                          <div className="flex items-center gap-3">
                            <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                            Applying
                          </div>
                        ) : (
                          "Apply"
                        )}
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
  );
}
