import React, { useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { X } from "lucide-react";
import Select from "react-select";
import { customSelectStyles } from "@/utils/customStyles";
import { useNavigate } from "react-router-dom";
import { EMPLOYEE_RESCHEDULE, EMPLOYEE_STATUS, newRequest } from "@/api";
import toast from "react-hot-toast";

const Reschedule = ({ popupOpen, setPopupOpen, type, id, data, refetch, joinDate,RightToWork, dbs }) => {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const [date, setDate] = useState(joinDate);
  const uid = searchParams.get("uid");
  const onClose = () => {
    // setSelectedEmployee("");
    setPopupOpen(false);
  };

  const options = [
    { label: "On Leave", value: "On Leave", id: 3 },
    { label: "Onboarding Pending", value: "Onboarding Pending", id: 1 },
    { label: "Active", value: "Active", id: 4 },
    { label: "Awaiting Joining", value: "Awaiting Joining", id: 5 },
    { label: "Resigned", value: "Resigned", id: 6 },
    { label: "Terminated", value: "Terminated", id: 7 },
  ];

  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (data?.employmentStatus) {
      const selectedOption = options.find(
        (option) => option.id === data?.employmentStatus?.id,
      );
      setStatus(selectedOption?.id);
    }
  }, [data]);

  const handleSave = async () => {
    try {
      if(type==='status' && !data?.work_email){
        toast.error("Work email is missing. Please add it to proceed.");
        return;
      }
      if(type==='status' && dbs?.listing.length==0){
        toast.error("DBS is missing. Please add it to proceed.");
        return;
      }
      if(type==='status' && RightToWork?.listing.length==0){
        toast.error("Right to work is missing. Please add it to proceed.");
        return;
      }
      let onboarding;
      if(type==="reschedule"){
        onboarding = {
          employee_id: id,
          reschedule_date: date,
      }
    }else{
        onboarding = {
          employee_id: id,
          status: status,
        };
      }
      const api=type==="reschedule" ? EMPLOYEE_RESCHEDULE :EMPLOYEE_STATUS
      const response = await newRequest.post(api,
        onboarding,
      );
      if (response?.status === 200) {
        setPopupOpen(false);
        toast.success(response?.data?.message);
        refetch();
        // navigate(`/admin/employee/details/?uid=${id}`);
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
                {type === "reschedule"
                  ? "Reschedule date of joining"
                  : "Change Status"}
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
                  value={date}
                  onChange={(e)=>setDate(e.target.value)}
                  className="mt-2 h-9 rounded-md border border-[#c2c1c1] px-3 text-sm text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                />
              </div>
            ) : (
              <div className="flex flex-col">
                <label
                  htmlFor="Status"
                  className="text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <Select
                  className="mt-1 h-10 rounded border pl-3 pr-2 text-sm"
                  options={options}
                  styles={customSelectStyles}
                  defaultValue={data?.employmentStatus || options[0]} // Default to the first option object
                  onChange={(selectedOption) => setStatus(selectedOption.id)} // Update status with the selected value
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
