import { Button, Popover, Transition } from "@headlessui/react";
import { Upload, X } from "lucide-react";
import React, { Fragment } from "react";
import ReactQuill from "react-quill";

function AddEmail({ popupOpen, setPopupOpen }) {
  function closeModal() {
    setPopupOpen(false);
  }
  const [state, setState] = React.useState({ value: null });
  const handleChange = (value) => {
    setState({ value });
  };
  const modules = {
    toolbar: {
      container: "#toolbar", // Attach the toolbar to a custom container
    },
  };
  return (
    <>
      {popupOpen && (
        <div className="fixed inset-0 z-[100] flex h-full w-full items-center justify-center bg-black/20">
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
                <Popover.Panel className="w-[45rem] transform rounded-md bg-white px-9 py-9">
                  <div className="mb-9 flex items-center justify-between">
                    <h1 className="text-base font-bold leading-7 text-neutral-700">
                      Add Email
                    </h1>
                    <button
                      onClick={closeModal}
                      className="text-lg font-extrabold text-[#00000080]"
                    >
                      <X />
                    </button>
                  </div>

                  <form className="mt-4 grid grid-cols-1 gap-3">
                    <div className="group flex flex-col space-y-1">
                      <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                        Receipts
                      </label>
                      <input
                        // {...register("name", { required: true })}
                        type="text"
                        className="input-box h-10 w-full border-[#C2C1C1] placeholder:text-xs placeholder:text-[#7F7F7F] focus:border-[#C2C1C1]"
                        placeholder="Enter Subject"
                      />
                      {/* {errors.name && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.name?.message}
                      </span>
                    )} */}
                    </div>
                    <div className="group flex flex-col space-y-1">
                      <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                        Subject{" "}
                      </label>
                      <input
                        type="text"
                        className="input-box h-10 w-full border-[#C2C1C1] placeholder:text-xs placeholder:text-[#7F7F7F] focus:border-[#C2C1C1]"
                        placeholder="Enter Subject"
                      />
                    </div>
                    <label className="label-text">Enter Mail</label>
                    <div className="group flex flex-col rounded-md border border-[#C2C1C1]">
                      <div
                        id="toolbar"
                        className="mb-2 flex items-center rounded border-none p-2"
                      >
                        <button className="ql-bold h-7 w-1/2"></button>
                        <button className="ql-underline"></button>
                        <button className="ql"></button>
                        <select className="ql-font">
                          <option value="sans-serif">Sans Serif</option>
                          <option value="serif">Serif</option>
                          <option value="monospace">Monospace</option>
                        </select>
                        <select className="ql-align">
                          <option selected></option>
                          <option value="center"></option>
                          <option value="right"></option>
                          <option value="justify"></option>
                        </select>
                        <select className="ql-color"></select>
                        <select className="ql-background"></select>
                        <button className="ql-list" value="ordered"></button>
                        <button className="ql-list" value="bullet"></button>
                        <button className="ql-link"></button>
                        <button className="ql-image"></button>
                        <button className="ql-clean"></button>
                      </div>

                      <ReactQuill
                        theme="snow"
                        value={state}
                        onChange={handleChange}
                        placeholder={""}
                        className="h-36"
                        modules={modules}
                      />
                    </div>

                    <div className="mt-2 flex flex-row items-start gap-2">
                      <button className="flex h-10 w-32 cursor-pointer items-center justify-center gap-2 rounded border border-[#ECE9F1] text-sm font-semibold text-[#7F7F7F] focus:outline-none">
                        Cancel
                      </button>
                      <button className="flex h-10 w-32 cursor-pointer items-center justify-center gap-2 rounded bg-bgColor-100 text-sm font-normal text-white focus:outline-none">
                        Save
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

export default AddEmail;
