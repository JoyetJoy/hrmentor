import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { X, Search } from "lucide-react";

function Reassign({ popupOpen, setPopupOpen, type }) {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Mock data for demonstration
  const employees = [
    { id: 1, name: "Jisham V", role: "Developer" },
    { id: 2, name: "Rahul K", role: "Designer" },
    { id: 3, name: "Aisha M", role: "Manager" },
  ];

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
    setSelectedEmployee("");
    setPopupOpen(false);
  };

  const handleSelect = (employee) => {
    setSelectedEmployee(employee);
    setResults([]);
    setKeyword("");
  };

  const handleSave = () => {
    if (selectedEmployee) {
      console.log("Selected Employee:", selectedEmployee);
      alert(`Employee ${selectedEmployee.name} selected!`);
      setPopupOpen(false);
    } else {
      alert("Please select an employee before saving.");
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
                <label className="input flex h-10 min-h-10 min-w-40 flex-row items-center gap-2 rounded-md border border-gray-platinum outline-none hover:border-gray-platinum">
                  <Search
                    className="size-4 object-contain text-gray-dark"
                    strokeWidth={2}
                  />
                  <input
                    type="text"
                    onChange={handleSearch}
                    value={keyword}
                    className="grow text-sm text-black placeholder:text-sm placeholder:font-medium placeholder:text-black/50 focus:outline-none"
                    placeholder="Search"
                  />
                </label>

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
                {selectedEmployee && (
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
                )}
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
                onClick={handleSave}
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
                <input type="text" className="border h-8 w-40 rounded-md text-sm px-2"/>
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
