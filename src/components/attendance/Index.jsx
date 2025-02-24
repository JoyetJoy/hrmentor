import React, { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import AddEntryModal from "./AddEntry";

const Index = ({ attendance, setAttendance }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [addEntry, setAddEntry] = useState(false);
  return (
    <div className="flex justify-end">
        <AddEntryModal
          addEntry={addEntry}
          setAddEntry={setAddEntry}
        />
      {attendance && (
        <div className="absolute right-10 top-36 z-10 w-5/12 overflow-hidden rounded-lg bg-white shadow-lg shadow-black">
          <div className="flex justify-between bg-[#354ff3] px-10 py-7">
            <p className="text-lg font-semibold text-white">
              Clock In / Clock Out
            </p>
            <button
              type="button"
              onClick={() => setAttendance(false)}
              className="text-lg font-extrabold text-[#00000080]"
            >
              <X />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 px-10 py-7 text-sm font-semibold text-[#686868]">
            <div className="flex flex-col gap-1">
              <div className="flex w-full justify-between">
                <p>Name</p>
                <p>Joyet</p>
              </div>
              <div className="flex w-full justify-between">
                <p>Date</p>
                <p>12-02-2025</p>
              </div>
              <div className="flex w-full justify-between">
                <p>Clock In</p>
                <p>09:00 AM</p>
              </div>
              <div className="flex w-full justify-between">
                <p>Status</p>
                <p>Active</p>
              </div>
              <div className="flex w-full justify-between">
                <p>Shift Name</p>
                <p>Morning</p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex w-full justify-between">
                <p>Employee Id</p>
                <p>EMP123</p>
              </div>
              <div className="flex w-full justify-between">
                <p>Day</p>
                <p>Monday</p>
              </div>
              <div className="flex w-full justify-between">
                <p>Clock Out</p>
                <p>06:00 PM</p>
              </div>
              <div className="flex w-full justify-between">
                <p>Status</p>
                <p>Completed</p>
              </div>
              <div className="flex w-full justify-between">
                <p>Shift Time</p>
                <p>Morning</p>
              </div>
            </div>
          </div>
          <hr className="h-[0.10rem] bg-[#d1d2d5]" />
          <div className="min-h-[22rem] bg-slate-400"></div>
          <hr className="h-[0.10rem] bg-[#d1d2d5]" />
          <div className="text-sm font-semibold text-white p-2 flex gap-3">
            <button 
              onClick={()=>setAddEntry(true)}
              className="bg-blue-700 px-3 py-2 rounded-lg flex gap-1 items-center"><span>ADD ENTRIES</span> <ChevronDown /></button>
            <button 
              onClick={()=>setIsDropdownOpen(!isDropdownOpen)}
            className="bg-blue-700 px-3 py-2 rounded-lg flex gap-1 items-center"><span>MARK AS</span><ChevronDown /></button>
            {isDropdownOpen && (
          <div className="absolute bottom-14 left-36 mt-2 w-32 bg-white text-black shadow-lg rounded-lg">
            <ul className="p-2">
              <li className="p-2 hover:bg-gray-200 cursor-pointer">Completed</li>
              <li className="p-2 hover:bg-gray-200 cursor-pointer">Pending</li>
              <li className="p-2 hover:bg-gray-200 cursor-pointer">Canceled</li>
            </ul>
          </div>
        )}
            <button className="bg-blue-700 px-3 py-2 rounded-lg">RECALCULATE</button>
            <button 
              onClick={() => setAttendance(false)}
              className="bg-red-600 px-3 py-2 rounded-lg">CLOSE</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
