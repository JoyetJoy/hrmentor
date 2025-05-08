import { customSelectStyles } from "@/utils/customStyles";
import { LogIn, X } from "lucide-react";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";

export default function ChangeStatus({
  open,
  setOpen,
  statusList,
  candidateDetails,
  handleCandidateStatus,
}) {
  const { control } = useForm();
  const [status, setStatus] = useState('');

  const handleSubmit = () => {
    if (status) {
      handleCandidateStatus(status);
      setOpen(false); // Close the modal after submitting
    } else {
      console.warn("Please select a status before submitting.");
    }
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[99] flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-sm rounded bg-white px-9 py-7 shadow-lg">
            <div className="flex justify-between">
              <h2 className="text-base font-semibold text-black">
                Change Status
              </h2>
              <X
                color="#7f7f7f"
                onClick={() => setOpen(false)}
                className="cursor-pointer"
              />
            </div>

            <div className="group mt-4 flex flex-col space-y-1 py-2">
              <label className="label-text">Current Status</label>
              <p className="input-box flex w-auto items-center">
                {candidateDetails?.status?.status_name}
              </p>
            </div>
            <div className="group flex flex-col space-y-1 py-2">
              <label className="label-text">New Status</label>
              <Controller
                name="status_hiring"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    isSearchable={true}
                    styles={customSelectStyles}
                    options={statusList}
                    value={statusList.find(
                      (option) =>
                        option.id ===
                        (field.value?.id || candidateDetails?.status?.id)
                    )} // Check if field.value.id exists, else fallback to candidateDetails?.status?.id
                    onChange={(selectedOption) => {
                      field.onChange(selectedOption); // Update the field value
                      setStatus(selectedOption); // Update the status state
                    }}
                    placeholder="New Hiring"
                    className="input-box"
                  />
                )}
              />
            </div>
            <div className="mt-4 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="h-10 w-full rounded-lg border border-black/20 px-4 text-sm font-semibold text-black/70 hover:bg-gray-pale"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-black/80 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
