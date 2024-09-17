import { customSelectStyles, statusDataSelecter } from "@/utils/customStyles";
import { Eye } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import Select from "react-select";

function RecruiterSideBar() {
  const statusData = [
    { id: 1, count: 2, label: "New", bgColor: "#F0F8FF" },
    { id: 2, count: 0, label: "Interview", bgColor: "#F0FFFD" },
    { id: 3, count: 2, label: "Hiring", bgColor: "#F0FFF1" },
    { id: 4, count: 28, label: "Hold", bgColor: "#FFF2F2" },
    { id: 5, count: 11, label: "Reject", bgColor: "#FFFCF0" },
    { id: 6, count: 7, label: "Backup", bgColor: "#FBF0FF" },
  ];
  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "paused", label: "Paused" },
    { value: "delayed", label: "Delayed" },
    { value: "canceled", label: "Canceled" },
  ];

  return (
    <div className="flex w-1/3 flex-col gap-2 rounded-md bg-white p-7">
      <div className="flex flex-row justify-between">
        <h1 className="text-base font-bold">Job information</h1>
        <div className="flex flex-row gap-2">
          <Link
            to={""}
            className="flex size-8 cursor-pointer items-center rounded-full bg-gray-500 p-2 text-black"
          >
            <Eye />
          </Link>
          <Link
            to={""}
            className="flex size-8 cursor-pointer items-center rounded-full bg-gray-500 p-2 text-black"
          >
            <img src="/assets/icons/admin/marker.svg" />
          </Link>
        </div>
      </div>
      <hr className="border-1 my-2 border-gray-500" />
      <div className="mt-3 grid grid-cols-3 gap-3">
        {statusData.map((item) => (
          <div
            key={item.id}
            className="rounded-md"
            style={{ backgroundColor: item.bgColor }}
          >
            <h1 className="flex flex-col items-center px-4 py-6 text-2xl font-semibold">
              {item.count}
              <span className="text-sm font-normal">{item.label}</span>
            </h1>
          </div>
        ))}
      </div>
      <hr className="border-1 my-2 border-gray-500" />
      <h1 className="flex items-center justify-between text-sm font-medium text-black">
        Display on career page
        <input
          type="checkbox"
          className="toggle border-[#5264EA] bg-white [--tglbg:#5264EA] hover:bg-white"
          defaultChecked
        />
      </h1>
      <hr className="border-1 my-2 border-gray-500" />
      <div className="mb-3 flex items-center justify-between text-sm font-medium text-black">
        {" "}
        Job status
        <Select
          name="status"
          aria-label="Project status"
          placeholder="Select status"
          options={statusOptions}
          styles={statusDataSelecter}
          className="w-7/12 rounded-md bg-[#EBEBF0] px-3 py-2 pl-3 text-xs min-h-10 h-10"
        />
      </div>
      <div className="mb-3 flex items-center justify-between text-sm font-medium text-black">
        Hiring manager
        <Select
          name="status"
          aria-label="Project status"
          placeholder="Select status"
          options={statusOptions}
          styles={statusDataSelecter}
          className="w-7/12 rounded-md bg-[#EBEBF0] px-3 py-2 pl-3 text-xs min-h-10 h-10"
        />
      </div>
      <div className="mb-3 flex items-center justify-between text-sm font-medium text-black">
        {" "}
        Interviewer
        <Select
          name="status"
          aria-label="Project status"
          placeholder="Select status"
          options={statusOptions}
          styles={statusDataSelecter}
          className="w-7/12 rounded-md bg-[#EBEBF0] px-3 py-2 pl-3 text-xs min-h-10 h-10"
        />
      </div>
    </div>
  );
}

export default RecruiterSideBar;
