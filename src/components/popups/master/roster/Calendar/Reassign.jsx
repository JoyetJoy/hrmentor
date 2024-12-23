import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { X, Search } from "lucide-react";
import { newRequest, SHIFT_CLAIM } from "@/api";
import toast from "react-hot-toast";
import { customSelectStyles } from "@/utils/customStyles";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

function Reassign({ popupOpen, setPopupOpen, type, id, setSelectedEmployee, rosterEmpList, handleReassign }) {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [claimcount, setClaimcount] = useState(0);
  const { control } = useForm();

  // Function to filter employees based on keyword
  const handleSearch = (e) => {
    const value = e.target.value;
    setKeyword(value);
    if (value.trim() === "") {
      setResults([]);
    } else {
      const filtered = employees.filter((emp) =>
        emp.name.toLowerCase().includes(value.toLowerCase()),
      );
      setResults(filtered);
    }
  };

  const onClose = () => {
    setPopupOpen(false);
  };

  const handleSelect = (employee) => {
    setSelectedEmployee(employee);
    setResults([]);
    setKeyword("");
  };

  const handleSave = async () => {
    try {
      let data;
      let res;
  
      if (type === "claim") {
        data = { roster_id: id, auto_close_at_claim: claimcount };
      }
  
      if (data) {
        res = await newRequest.post(SHIFT_CLAIM, data);
        // Handle successful response
        toast.success(res?.data?.message)
        setPopupOpen(false)
      }
    } catch (error) {
      // Handle error
      console.error("Error saving data:", error);
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
                {type === "reassign" ? " Re assign" : "Shift Claim"}
              </DialogTitle>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-black"
              >
                <X />
              </button>
            </div>
            {type === "reassign" ? (
              <>
                <p className="mb-2 text-sm">Search Employee</p>
                <div
            className={`group flex flex-col gap-1.5 h-10 min-h-10 min-w-52`}
          >

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

                {/* Display search results */}
                {results.length > 0 && (
                  <ul className="mt-2 max-h-40 overflow-y-auto rounded border bg-white shadow">
                    {results.map((employee) => (
                      <li
                        key={employee.id}
                        className="cursor-pointer p-2 hover:bg-gray-100"
                        onClick={() => handleSelect(employee)}
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-hrmprimaryorange/10 text-sm font-bold uppercase">
                            {employee.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold">
                              {employee.name}
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

                {/* Selected employee */}
                {/* {selectedEmployee && (
                  <div className="mt-4 flex items-center gap-2 rounded bg-gray-100 p-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-hrmprimaryorange/10 text-sm font-bold uppercase">
                      {selectedEmployee.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">
                        {selectedEmployee.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {selectedEmployee.role}
                      </p>
                    </div>
                  </div>
                )} */}
                <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-full rounded border border-black px-4 py-3"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReassign}
                className="w-full rounded bg-black px-7 py-3 text-white"
              >
                Re assign
              </button>
            </div>
              </>
            ) : (
              <>
              <div className="text-sm flex gap-2 items-center">
                <p>Auto Close at</p>
                <input
                  type="number"
                  className="border h-8 w-40 rounded-md text-sm px-2"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[eE]/g, '');
                    setClaimcount(e.target.value)
                  }}
                />

                <p>Requests</p>
              </div>
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
