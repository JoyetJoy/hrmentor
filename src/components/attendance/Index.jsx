import React, { useEffect, useState } from "react";
import { ChevronDown, Clock3, Trash2, X } from "lucide-react";
import AddEntryModal from "./AddEntry";
import toast from "react-hot-toast";

const Index = ({ attendance, setAttendance }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [addEntry, setAddEntry] = useState(false);
  const [entry, setEntry] = useState("");
  const [leave, setLeave] = useState("");
  const [type, setType] = useState("");
  const [fullData, setFullData] = useState({
    clockIn: "",
    clockOut: "",
    remarks: "",
    status: "",
  });

  const deleteEntry = () => {
    setEntry("");
  };

  useEffect(() => {
    setFullData((prevState) => ({
      ...prevState,
      clockIn: entry?.clockIn,
      clockOut: entry?.clockOut,
      remarks: entry?.remarks,
      status: leave,
    }));
  }, [entry, leave]);

  const save = () => {
    console.log(fullData);

    // setAttendance(false);
  };
  return (
    <div className="flex justify-end">
      <AddEntryModal
        addEntry={addEntry}
        setAddEntry={setAddEntry}
        type={type}
        entry={entry}
        setEntry={setEntry}
      />
      {attendance && (
        <div className="absolute right-10 top-32 z-20 w-5/12 overflow-hidden rounded-lg bg-white shadow-lg shadow-black">
          <div className="flex justify-between bg-[#dadae4] px-10 py-7">
            <p className="text-lg font-semibold text-[#555c5f]">
              Clock In / Clock Out
            </p>
            <button
              type="button"
              onClick={() => setAttendance(false)}
              className="text-lg font-extrabold text-[#555c5f]"
            >
              <X />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 px-10 py-7 text-sm font-semibold text-[#686868]">
            <div className="flex flex-col gap-1">
              <div className="flex w-full justify-between">
                <p>Name</p>
                <p>Jennifer Gilbert</p>
              </div>
              <div className="flex w-full justify-between">
                <p>Date</p>
                <p>24-02-2025</p>
              </div>
              <div className="flex w-full justify-between">
                <p>Duration</p>
                <p>00:00</p>
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
                <p>Status</p>
                <p>Present</p>
              </div>
              <div className="flex w-full justify-between">
                <p>Shift Time</p>
                <p>09:00:00 - 13:00:00</p>
              </div>
            </div>
          </div>
          <hr className="h-[0.10rem] bg-[#d1d2d5]" />
          <div className="flex w-full px-10 py-5 text-sm font-semibold text-[#686868]">
            <p className="w-1/2">Clock-In</p>
            <p className="w-1/2">Clock-Out</p>
            <p className=" ">Action</p>
          </div>
          <hr className="h-[0.10rem] bg-[#d1d2d5]" />
          <div className="overflow-y-min flex max-h-[18rem] min-h-[13rem] w-full flex-col gap-2 overflow-y-auto px-10 py-5 text-sm font-semibold text-[#686868]">
            {entry && (
              <div className="flex w-full">
                <p className="flex w-1/2 gap-2">
                  <span>
                    <Clock3 size={16} />
                  </span>
                  {entry?.clockIn}
                </p>
                <p className="flex w-1/2 gap-2">
                  <span>
                    <Clock3 size={16} />
                  </span>
                  {entry?.clockOut}
                </p>
                <p
                  onClick={() => {
                    setType("Edit");
                    setAddEntry(true);
                  }}
                  className="mr-2 flex size-7 cursor-pointer items-center rounded-full bg-gray-soft p-2"
                >
                  <img
                    src="/assets/icons/admin/marker.svg"
                    className="w-full object-contain"
                  />
                </p>
                <p
                  onClick={() => deleteEntry()}
                  className="flex size-7 cursor-pointer items-center rounded-full bg-gray-soft p-2"
                >
                  <Trash2 size={20} />
                </p>
              </div>
            )}
          </div>
          <hr className="h-[0.10rem] bg-[#d1d2d5]" />
          <div className="flex gap-3 p-2 text-sm font-semibold text-white">
            <button
              onClick={() => {
                setAddEntry(true);
                setType("Entry");
              }}
              className="flex items-center gap-1 rounded-lg bg-blue-700 px-3 py-2"
            >
              <span>ADD ENTRIES</span> <ChevronDown />
            </button>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1 rounded-lg bg-blue-700 px-3 py-2"
            >
              <span>MARK AS</span>
              <ChevronDown />
            </button>
            {isDropdownOpen && (
              <div className="absolute bottom-14 left-36 mt-2 w-32 rounded-lg bg-white text-black shadow-lg">
                <ul className="p-2">
                  <li
                    onClick={() => {
                      setLeave("present");
                      setIsDropdownOpen(false);
                    }}
                    className="cursor-pointer p-2 hover:bg-gray-200"
                  >
                    Present
                  </li>
                  <li
                    onClick={() => {
                      setLeave("absent");
                      setIsDropdownOpen(false);
                    }}
                    className="cursor-pointer p-2 hover:bg-gray-200"
                  >
                    Absent
                  </li>
                  <li
                    onClick={() => {
                      setLeave("leave");
                      setIsDropdownOpen(false);
                    }}
                    className="cursor-pointer p-2 hover:bg-gray-200"
                  >
                    Leave
                  </li>
                </ul>
              </div>
            )}
            {/* <button className="bg-blue-700 px-3 py-2 rounded-lg">RECALCULATE</button> */}
            <button
              onClick={() => save()}
              className="rounded-lg bg-green-600 px-5 py-2"
            >
              SAVE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
