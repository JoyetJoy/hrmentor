import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import MenuHeader from "@/components/common/MenuHeader";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";
import { customSelectStyles } from "@/utils/customStyles";
import { TEAM_ATTENDANCE, newRequest } from "@/api/master";

export default function Attendance() {
  const [date, setDate] = useState(new Date());

  // Dummy Data (With Status)
  const dummyEmployees = [
    {
      name: "John Doe",
      days_status: [
        { date: "2025-02-01", status: "Present" },
        { date: "2025-02-02", status: "Absent" },
        { date: "2025-02-03", status: "Annual Leave" },
        { date: "2025-02-04", status: "Company Leave" },
        { date: "2025-02-05", status: "Leave" },
        { date: "2025-02-06", status: "Leave" },
        { date: "2025-02-07", status: "Holiday" },
      ],
    },
    {
      name: "Jane Smith",
      days_status: [
        { date: "2025-02-01", status: "Present" },
        { date: "2025-02-02", status: "Present" },
        { date: "2025-02-03", status: "Leave" },
      ],
    },
  ];

  // Generate months and years
  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i,
    label: dayjs().month(i).format("MMMM"),
  }));

  const years = Array.from({ length: 11 }, (_, i) => ({
    value: 2020 + i,
    label: (2020 + i).toString(),
  }));

  // Handle month and year selection
  const handleMonthChange = (selectedOption) => {
    setDate(dayjs(date).month(selectedOption.value).toDate());
  };

  const handleYearChange = (selectedOption) => {
    setDate(dayjs(date).year(selectedOption.value).toDate());
  };

  // Generate all days in the selected month
  const getMonthDays = () => {
    const startOfMonth = dayjs(date).startOf("month");
    const daysInMonth = dayjs(date).daysInMonth();

    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = startOfMonth.add(i, "day");
      return {
        day: day.format("ddd"),
        date: day.format("MMM DD"),
        fullDate: day.format("YYYY-MM-DD"),
      };
    });
  };

  const monthDays = getMonthDays();
const events = {
    employees:dummyEmployees
}
  // Fetch Data using React Query
//   const { data: events = {}, refetch } = useQuery({
//     queryKey: ["events", date],
//     queryFn: () =>
//       newRequest
//         .get(TEAM_ATTENDANCE, {
//           params: { month: dayjs(date).format("MM"), year: dayjs(date).format("YYYY") },
//         })
//         .then((res) => res.data)
//         .catch(() => ({ employees: dummyEmployees })), // Use dummy data if API fails
//     staleTime: 0,
//   });

//   useEffect(() => {
//     refetch();
//   }, [date, refetch]);

  // Function to return Present, Absent, or Leave
  const formatStatus = (status) => {
    if (!status) return "Absent"; // Default to Absent if no data is found
    return status;
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        <MenuHeader menu={"Menu"} subMenu={""} currentpath={"Attendance"} icon={""} activeMenu={""} />

        {/* Filters */}
        <div className="flex w-full items-center justify-between px-4 py-2">
          <div className="flex items-center gap-4">
            <h5 className="text-md font-bold">Attendance</h5>
            <Select
              options={years}
              onChange={handleYearChange}
              styles={customSelectStyles}
              value={years.find((y) => y.value === dayjs(date).year())}
              placeholder={dayjs(date).format("YYYY")}
              className="input-box h-10 w-52 rounded-md border-gray-muted focus:border-gray-muted bg-white"
            />
            <Select
              options={months}
              onChange={handleMonthChange}
              styles={customSelectStyles}
              value={months.find((m) => m.value === dayjs(date).month())}
              placeholder={dayjs(date).format("MMMM")}
              className="input-box h-10 w-52 rounded-md border-gray-muted focus:border-gray-muted bg-white"
            />
          </div>
        </div>

        {/* Attendance Table */}
        <div className="w-full overflow-x-auto overflow-x-min rounded-md border border-gray-300 bg-white pb-2">
          <div className="table mx-auto w-full">
            <table style={{ borderSpacing: "0", width: "100%" }}>
              <thead className="bg-gray-soft">
                <tr>
                  <th className="text-sm font-bold capitalize text-gray-darkpale sticky left-0 w-full bg-[#ebebf0]">
                    Employee Name
                  </th>
                  {monthDays.map((dayObj, index) => (
                    <th key={index} className="text-sm font-bold capitalize text-gray-darkpale">
                      {dayObj.day}
                      <p className="font-medium">{dayObj.date}</p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {events?.employees?.length > 0
                  ? events.employees.map((employee, empIndex) => (
                      <tr key={empIndex} className="border-b-2 text-left">
                        <td className="text-[0.8rem] font-medium capitalize text-gray-darkpale border-r-2 sticky left-0 bg-white">
                          {employee.name}
                        </td>
                        {monthDays.map((dayObj, index) => {
                          const formattedDate = dayObj.fullDate;
                          console.log(formattedDate,employee?.days_status);
                          
                          const dayStatus = employee?.days_status?.find(
                            (event) => dayjs(event.date).format("YYYY-MM-DD") == formattedDate
                          );console.log(dayStatus);
                                                    
                          
                          return (
                            <td key={index} className={`text-[0.8rem] font-semibold text-center 
                              ${dayStatus?.status === 'Present' ? 'text-green-700' : 
                                ['Absent', 'Company Leave', 'Annual Leave', 'Holiday'].includes(dayStatus?.status) ? 'text-red-500' 
                                : 'text-gray-darkpale bg-[#c5c5cb]'} border-r-2`}>                            
                              {dayStatus?.status === 'Present' ? 'P' : dayStatus?.status === 'Absent' ? 'A' : dayStatus?.status === 'Annual Leave'?'AL': dayStatus?.status=== 'Company Leave'?'CL': dayStatus?.status==='Holiday'?'H': 'DO'}
                            </td>
                          );
                        })}
                      </tr>
                    ))
                  : dummyEmployees.map((employee, empIndex) => (
                      <tr key={empIndex} className="border-b-2 text-left">
                        <td className="text-[0.8rem] font-medium capitalize text-gray-darkpale sticky left-0 bg-white">
                          {employee.name}
                        </td>
                        {monthDays.map((dayObj, index) => {
                          const formattedDate = dayObj.fullDate;
                          const dayStatus = employee?.days_status?.find(
                            (event) => event.date === formattedDate
                          );
                          return (
                            <td key={index} className="text-[0.8rem] font-medium text-center text-gray-darkpale">
                              {formatStatus(dayStatus?.status)}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
