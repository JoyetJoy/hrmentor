import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { X } from "lucide-react";
import Select from "react-select";
import { customSelectStyles } from "@/utils/customStyles";
import { useNavigate } from "react-router-dom";
import { newFormRequest } from "@/api";
import toast from "react-hot-toast";

const Reschedule = ({ popupOpen, setPopupOpen, type, id }) => {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const uid = searchParams.get("uid");
  const onClose = () => {
    // setSelectedEmployee("");
    setPopupOpen(false);
  };

  const options = [
    { label: "On Leave", value: 3 },
    { label: "Onboarding Pending", value: 1 },
    { label: "Active", value: 4 },
    { label: "Awaiting Joining", value: 5 },
    { label: "Resigned", value: 6 },
    { label: "Terminated", value: 7 },
  ];

  const [status, setStatus] = useState(null);

  const handleSave = async () => {
    setPopupOpen(false);
    try {
      const onboarding = {
        employee_id: id,
        status: status,
      };
      const response = await newFormRequest.post(
        `employee-status-update`,
        onboarding,
      );
      if (response?.status === 200) {
        setPopupOpen(false);
        toast.success("Approve successfully");
        window.location.reload()
        // navigate(`/admin/employee/details/?uid=${uid}`);
      } else {
        toast.error("Failed to approve,");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message[0] || "Failed to Approve employee.",
      );
    }
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
                {type === "reschedule" ?'Reschedule date of joining' : 'Change Status'}
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
                  defaultValue={options[0]} // Default to the first option object
                  onChange={(selectedOption) => setStatus(selectedOption.value)} // Update status with the selected value
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
