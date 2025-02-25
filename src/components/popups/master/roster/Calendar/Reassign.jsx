import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { X } from "lucide-react";
import { newRequest, SHIFT_CLAIM } from "@/api";
import toast from "react-hot-toast";
import { customSelectStyles } from "@/utils/customStyles";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

function Reassign({
  popupOpen,
  setPopupOpen,
  type,
  id,
  setSelectedEmployee,
  rosterEmpList,
  handleReassign,
  onConfirm,
  isOn,
  setIsOn,
  rosterCalim,
}) {
  const [claimcount, setClaimcount] = useState(0);
  const { control } = useForm();

  // Function to handle saving shift claim updates
  const handleSave = async () => {
    try {
      if (type === "claim") {
        const data = { roster_id: id, auto_close_at_claim: claimcount };
        const res = await newRequest.post(SHIFT_CLAIM, data);
        toast.success(res?.data?.message);
        setPopupOpen(false);
        onConfirm(); // Updates the checkbox state
      }
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Failed to update");
    }
  };

  return (
    <Dialog
      open={popupOpen}
      as="div"
      className="relative z-10"
      onClose={() => setPopupOpen(false)}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/20">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-[26rem] rounded bg-white p-10">
            <div className="mb-5 flex justify-between">
              <DialogTitle as="h1" className="text-md font-bold">
                {type === "reassign" ? "Reassign Shift" : "Shift Claim"}
              </DialogTitle>
              <button
                onClick={() => setPopupOpen(false)}
                className="text-gray-500 hover:text-black"
              >
                <X />
              </button>
            </div>

            {type === "reassign" ? (
              <>
                {/* Employee Selection */}
                <p className="mb-2 text-sm font-semibold">Search Employee</p>
                <div className="flex flex-col gap-1.5 min-w-52">
                  <Controller
                    name="employees"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        isSearchable={true}
                        styles={customSelectStyles}
                        placeholder="Select Employee"
                        className="input-box w-full"
                        options={rosterEmpList?.employees?.map((item) => ({
                          label: item.first_name,
                          value: item?.id,
                        }))}
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption);
                          setSelectedEmployee(selectedOption.value);
                        }}
                      />
                    )}
                  />
                </div>

                {/* Employee List - Mapping */}
                {rosterEmpList?.employees?.length > 0 && (
                  <ul className="mt-2 max-h-40 overflow-y-auto rounded border bg-white shadow">
                    {rosterEmpList.employees.map((employee) => (
                      <li
                        key={employee.id}
                        className="cursor-pointer p-2 hover:bg-gray-100"
                        onClick={() => setSelectedEmployee(employee)}
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-hrmprimaryorange/10 text-sm font-bold uppercase">
                            {employee.first_name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold">
                              {employee.first_name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {employee.role}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Display selected employee */}
                {setSelectedEmployee && (
                  <div className="mt-4 flex items-center gap-2 rounded bg-gray-100 p-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-hrmprimaryorange/10 text-sm font-bold uppercase">
                      {setSelectedEmployee.name?.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">
                        {setSelectedEmployee.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {setSelectedEmployee.role}
                      </p>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setPopupOpen(false)}
                    className="w-full rounded border border-black px-4 py-3"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleReassign}
                    className="w-full rounded bg-black px-7 py-3 text-white"
                  >
                    Reassign
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Shift Claim Input */}
                <div className="text-sm flex gap-2 items-center mt-3">
                  <p>Auto Close at</p>
                  <input
                    type="number"
                    className="border h-8 w-40 rounded-md text-sm px-2"
                    value={claimcount}
                    onChange={(e) =>
                      setClaimcount(e.target.value.replace(/[eE]/g, ""))
                    }
                  />
                  <p>Requests</p>
                </div>

                {/* Update Button */}
                <div className="w-full flex mt-5 justify-center items-center">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="w-[48%] rounded bg-black py-2 text-white"
                  >
                    Update
                  </button>
                </div>
              </>
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default Reassign;
