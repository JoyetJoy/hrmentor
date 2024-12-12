import React from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { X } from "lucide-react";
import Select from "react-select";
import { customSelectStyles } from "@/utils/customStyles";

const Reschedule = ({ popupOpen, setPopupOpen, type }) => {
  const onClose = () => {
    // setSelectedEmployee("");
    setPopupOpen(false);
  };

  const options = [
    { label: "On Leave", value: "on_leave" },
    { label: "Onboarding Pending", value: "onboarding_pending" },
    { label: "Active", value: "active" },
    { label: "Awaiting Joining", value: "awaiting_joining" },
    { label: "Resigned", value: "resigned" },
    { label: "Terminated", value: "terminated" },
  ];

  const handleSave = () => {
    setPopupOpen(false);
  };
  return (
    <Dialog
      open={popupOpen}
      as="div"
      className="relative z-10"
      onClose={onClose}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/20">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-[26rem] rounded bg-white p-10">
            <div className="mb-5 flex justify-between">
              <DialogTitle as="h1" className="text-md font-bold">
                Reschedule date of joining
              </DialogTitle>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-black"
              >
                <X />
              </button>
            </div>
            {type === "reschedule" ? (
              <div className="flex flex-col">
                <label
                  htmlFor="start_date"
                  className="text-sm font-medium text-gray-700"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  id="start_date"
                  className="mt-2 h-9 rounded-md border border-[#c2c1c1] px-3 text-sm text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                />
              </div>
            ) : (
              <div className="flex flex-col">
                <label
                  htmlFor="start_date"
                  className="text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <Select
                  className="mt-1 h-10 rounded border pl-3 pr-2 text-sm"
                  options={options}
                  styles={customSelectStyles}
                  defaultValue={options[0].value}
                />
              </div>
            )}
            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={handleSave}
                className="w-full rounded bg-black px-7 py-2 text-white"
              >
                Save
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full rounded border border-black px-4 py-3"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Reschedule;
