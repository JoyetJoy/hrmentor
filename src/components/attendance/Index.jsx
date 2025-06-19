import React, { useEffect, useState } from "react";
import { ChevronDown, Clock3, Trash2, X } from "lucide-react";
import AddEntryModal from "./AddEntry";
import toast from "react-hot-toast";
import { newRequest } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { ATTENDANCE_GET, CHANGE_ATTENDANCE } from "@/api/master";
import dayjs from "dayjs";

const Options = [{
  Title:'Present',
  value:'Present'
},{
  Title:'Absent',
  value:'Absent'
},]
const Index = ({ attendance, setAttendance, empId, refetch }) => {
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

const id = empId?.attendance?.attendance_id;
  const { data, isLoading,refetch:refetchData } = useQuery({
    queryKey: ["attendanceData", id],
    queryFn: () =>
      newRequest
        .get(`${ATTENDANCE_GET}?id=${id}`)
        .then((res) => res.data),
    enabled: !!id,
  });
 
  useEffect(() => {
    if (!empId?.attendance?.attendance_id) {
      setLeave(empId?.attendance?.status);
      setEntry();
    }
    if (data?.clock_in_time) {
      const clockin = dayjs(data?.clock_in_time).format("HH:mm");
      const clockout = dayjs(data?.clock_out_time).format("HH:mm");
      setLeave(empId?.attendance?.status);

      if (clockin || clockout) {
        setEntry({
          clockIn: clockin || "00:00",
          clockOut: clockout || "00:00",
          remarks: "",
        });
      }
    }
  }, [data, empId]);

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

  const save = async () => {
    try {
      if (
        fullData?.status == "Present" &&
        (!fullData?.clockIn || !fullData?.clockOut)
      ) {
        toast.error("Add clockin clockout data");
        return;
      }
      let data;

      data = {
        id: empId?.attendance?.attendance_id,
        status: fullData?.status,
        current_status: empId?.attendance?.status,
        shift_id: empId?.attendance?.shift_id,
        roster_id: empId?.attendance?.roster_id,
        attendance_date: empId?.date,
        employee_id: empId?.id,
        clock_in: fullData?.clockIn,
        clock_out: fullData?.clockOut,
        remarks: fullData?.remarks,
      };

      const response = await newRequest.post(CHANGE_ATTENDANCE, data);
      if (response.status === 200) {
        refetch();
        refetchData();
        setEntry();
        setAttendance(false);
        toast.success("Created successfully");
      }
    } catch (error) {
      toast.error("Something went wrong , Try after sometimes");
    }
  };

  const onclose = () => {
    setEntry();
    setAttendance(false);
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
          <div className="flex justify-between bg-[#dadae4] px-10 py-5">
            <p className="text-lg font-semibold text-[#555c5f]">
              Clock In / Clock Out
            </p>
            <button
              type="button"
              onClick={() => onclose()}
              className="text-lg font-extrabold text-[#555c5f]"
            >
              <X />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 px-10 py-7 text-sm font-semibold text-[#686868]">
            <div className="flex flex-col gap-1">
              <div className="flex w-full justify-between">
                <p className="text-[#2d2c2c]">Name</p>
                <p>
                  {empId?.attendance?.attendance_id
                    ? data?.employee?.first_name + data?.employee?.sur_name
                    : empId?.empname}
                </p>
              </div>
              <div className="flex w-full justify-between">
                <p className="text-[#2d2c2c]">Date</p>
                <p>
                  {empId?.attendance?.attendance_id
                    ? data?.attendance_date
                    : empId?.date}
                </p>
              </div>
              <div className="flex w-full justify-between">
                <p className="text-[#2d2c2c]">Duration</p>
                <p>
                  {empId?.attendance?.attendance_id
                    ? data?.shift_detail?.shift_duration
                    : "00:00:00"}
                </p>
              </div>
              <div className="flex w-full justify-between">
                <p className="text-[#2d2c2c]">Shift Name</p>
                <p>
                  {empId?.attendance?.attendance_id
                    ? data?.shift_detail?.name
                    : empId?.attendance?.shift_name}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex w-full justify-between">
                <p className="text-[#2d2c2c]">Employee Id</p>
                <p>
                  {empId?.attendance?.attendance_id
                    ? data?.employee_id
                    : empId?.id}
                </p>
              </div>
              <div className="flex w-full justify-between">
                <p className="text-[#2d2c2c]">Day</p>
                <p>{empId?.day}</p>
              </div>
              <div className="flex w-full justify-between">
                <p className="text-[#2d2c2c]">Status</p>
                <p>{fullData?.status}</p>
              </div>
              <div className="flex w-full justify-between">
                <p className="text-[#2d2c2c]">Shift Time</p>
                <p>
                  {empId?.attendance?.attendance_id
                    ? data?.shift_detail?.start_time
                    : empId?.attendance?.start_time}{" "}
                  -{" "}
                  {empId?.attendance?.attendance_id
                    ? data?.shift_detail?.end_time
                    : empId?.attendance?.end_time}
                </p>
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
                  {Options.map((option)=>(
                    <li
                    onClick={() => {
                      setLeave(option.value);
                      setIsDropdownOpen(false);
                    }}
                    className="cursor-pointer p-2 hover:bg-gray-200"
                  >
                    {option.Title}
                  </li>
                  ))}
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
