import { Button, Popover, Transition } from '@headlessui/react';
import { Upload, X } from 'lucide-react';
import React, { Fragment } from 'react'
import ReactQuill from "react-quill";


function AddEmail({popupOpen, setPopupOpen}) {
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
              <Popover.Panel className="w-[45rem] transform px-9 py-9 bg-white rounded-md">
                <div className="flex justify-between items-center mb-9">
                  <h1 className="text-neutral-700 text-base font-bold leading-7">
                    Add Email
                  </h1>
                  <button
                    onClick={closeModal}
                    className="text-[#00000080] font-extrabold  text-lg"
                  >
                <X/>
                  </button>
                </div>

                <form className="grid mt-4 gap-3 grid-cols-1">
                  <div className="flex group flex-col space-y-1">
                    <label className="text-[#3A3A3A] text-[0.8rem] group-focus-within:text-[#2E2E2E] font-medium">
                      Receipts
                    </label>
                    <input
                      // {...register("name", { required: true })}
                      type="text"
                      className="w-full h-10 input-box  border-[#C2C1C1] focus:border-[#C2C1C1]  placeholder:text-[#7F7F7F] placeholder:text-xs"
                      placeholder='Enter Subject'
                    />
                    {/* {errors.name && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.name?.message}
                      </span>
                    )} */}
                  </div>
                  <div className="flex group flex-col space-y-1">
                    <label className="text-[#3A3A3A] text-[0.8rem] group-focus-within:text-[#2E2E2E] font-medium">
                    Subject                  </label>
                    <input
                      type="text"
                      className="w-full  h-10 input-box border-[#C2C1C1] focus:border-[#C2C1C1] placeholder:text-[#7F7F7F] placeholder:text-xs"
                      placeholder='Enter Subject'
                    />
                  </div>
                  <label className="label-text">Enter Mail</label>
            <div className="group flex flex-col border border-[#C2C1C1] rounded-md ">
              
              <div
                  id="toolbar"
                  className="mb-2 flex items-center rounded p-2 border-none"
                >
                  <button className="ql-bold h-7 w-1/2"></button>
                  {/* <button className="ql-italic"></button> */}
                  <button className="ql-underline"></button>
                  <button className="ql"></button>

                  {/* <button className="ql-strike"></button>
                  <select className="ql-header">
                    <option value="1"></option>
                    <option value="2"></option>
                    <option selected></option>
                  </select> */}
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

                  <div className="flex flex-row items-start  gap-2 mt-2 ">
                  <button className="flex cursor-pointer  text-[#7F7F7F] border border-[#ECE9F1] focus:outline-none text-sm gap-2 w-32 font-semibold h-10 justify-center items-center rounded">
                    Cancel
                  </button>
                  <button className="flex  cursor-pointer bg-bgColor-100 text-white focus:outline-none text-sm gap-2 w-32 font-normal h-10 justify-center items-center rounded">
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
  )
}

export default AddEmail
