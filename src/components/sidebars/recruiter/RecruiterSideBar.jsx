import { newRequest } from "@/api";
import { statusDataSelecter } from "@/utils/customStyles";
import { Switch } from "@headlessui/react";
import { Eye } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Select from "react-select";

function RecruiterSideBar({ jid }) {
  const [enabled, setEnabled] = useState(false);
  const statusData = [
    { id: 1, count: 0, label: "New", bgColor: "#F0F8FF" },
    { id: 2, count: 0, label: "Interview", bgColor: "#F0FFFD" },
    { id: 3, count: 0, label: "Hiring", bgColor: "#F0FFF1" },
    { id: 4, count: 0, label: "Hold", bgColor: "#FFF2F2" },
    { id: 5, count: 0, label: "Reject", bgColor: "#FFFCF0" },
    { id: 6, count: 0, label: "Backup", bgColor: "#FBF0FF" },
  ];
  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "paused", label: "Paused" },
    { value: "delayed", label: "Delayed" },
    { value: "canceled", label: "Canceled" },
  ];

  const handleToggleJobStatus = async (value) => {
    try {
      const res = await newRequest.post(`job-status-update/${jid}`, {
        career_page: value ? 1 : 0,
      });
      if (res?.data?.status === 201) {
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="flex w-1/3 flex-col gap-2 rounded-md bg-white p-7">
      <div className="flex flex-row justify-between">
        <h1 className="text-base font-bold">Job information</h1>
        <div className="flex flex-row gap-2">
          {/* <Link
            to={""}
            className="flex size-8 cursor-pointer items-center rounded-full bg-gray-500 p-2 text-black"
          >
            <Eye />
          </Link> */}
          <Link
            to={`/admin/recruiter/jobs/post?jid=${jid}`}
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
        <Switch
          checked={enabled}
          onChange={(value) => {
            handleToggleJobStatus(value);
          }}
          className="group relative flex h-7 w-14 cursor-pointer rounded-full border border-black/10 bg-white/10 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[checked]:bg-hrmprimaryorange data-[focus]:outline-1 data-[focus]:outline-white"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none -mt-[0.5px] inline-block size-5 translate-x-0 rounded-full border border-black/10 bg-black/80 shadow-lg ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-7 group-data-[checked]:bg-white"
          />
        </Switch>
      </h1>
      <hr className="border-1 my-2 border-gray-500" />
      <div className="mb-3 flex items-center justify-between text-sm font-medium text-black">
        Job status
        <Select
          name="status"
          aria-label="Project status"
          placeholder="Select status"
          options={statusOptions}
          styles={statusDataSelecter}
          className="h-10 min-h-10 w-7/12 rounded-md bg-[#EBEBF0] px-3 py-1 pl-3 text-xs"
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
          className="h-10 min-h-10 w-7/12 rounded-md bg-[#EBEBF0] px-3 py-1 pl-3 text-xs"
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
          className="h-10 min-h-10 w-7/12 rounded-md bg-[#EBEBF0] px-3 py-1 pl-3 text-xs"
        />
      </div>
    </div>
  );
}

export default RecruiterSideBar;
