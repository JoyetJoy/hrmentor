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
    employees: dummyEmployees,
  };
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
  console.log(events?.employees);

  return (
    <>
      <div className="flex h-screen flex-col">
        <MenuHeader
          menu={"Menu"}
          subMenu={""}
          currentpath={"Attendance"}
          icon={""}
          activeMenu={""}
        />

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
              className="input-box h-10 w-52 rounded-md border-gray-muted bg-white focus:border-gray-muted"
            />
            <Select
              options={months}
              onChange={handleMonthChange}
              styles={customSelectStyles}
              value={months.find((m) => m.value === dayjs(date).month())}
              placeholder={dayjs(date).format("MMMM")}
              className="input-box h-10 w-52 rounded-md border-gray-muted bg-white focus:border-gray-muted"
            />
          </div>
          <div className="flex items-center gap-8">
            <div className="flex gap-2 text-sm">
              <img
                className="h-5 object-contain"
                src="/assets/icons/tort.svg"
                alt="late"
              />
              <p className="text-sm">Late</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="flex h-7 w-7 items-center justify-center rounded-full bg-[#77c477d5] pl-[0.10rem] pt-[0.15rem] text-xs font-extrabold text-black">
                P
              </p>
              <p className="text-sm">Present</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e47f7f] pt-[0.02rem] text-xs font-extrabold text-black">
                A
              </p>
              <p className="text-sm">Absent</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="flex h-7 w-7 items-center justify-center rounded-full bg-[#AEB6E7] pt-[0.02rem] text-xs font-extrabold text-black">
                AL
              </p>
              <p className="text-sm">Annual Leave</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FDE3AA] pt-[0.02rem] text-xs font-extrabold text-black">
                CL
              </p>
              <p className="text-sm">Casual Leave</p>
            </div>

            <div className="flex items-center gap-2">
              <p className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e68ecf] pt-[0.02rem] text-xs font-extrabold text-black">
                H
              </p>
              <p className="text-sm">Holiday</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="flex h-7 w-7 items-center justify-center rounded-full bg-[#c5c5cb] pt-[0.02rem] text-xs font-extrabold text-black">
                DO
              </p>
              <p className="text-sm">Day Off</p>
            </div>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="overflow-x-min w-full overflow-x-auto rounded-md border border-gray-300 bg-white">
          <div className="table mx-auto w-full">
            {/* <table style={{ borderSpacing: "0", width: "100%" }}>
              <thead className="bg-gray-soft">
                <tr>
                  <th className="sticky left-0 w-full bg-[#ebebf0] text-sm font-bold capitalize text-gray-darkpale">
                    Employee Name
                  </th>
                  {monthDays.map((dayObj, index) => (
                    <th
                      key={index}
                      className="text-sm font-bold capitalize text-gray-darkpale"
                    >
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
                        <td className="sticky left-0 z-10 border-r-2 bg-white text-[0.8rem] font-medium capitalize text-gray-darkpale">
                          {employee.name}
                        </td>
                        {monthDays.map((dayObj, index) => {
                          const formattedDate = dayObj.fullDate;
                          console.log(formattedDate, employee?.days_status);

                          const dayStatus = employee?.days_status?.find(
                            (event) =>
                              dayjs(event.date).format("YYYY-MM-DD") ==
                              formattedDate,
                          );
                          console.log(dayStatus);

                          return (
                            <td
                              key={index}
                              className={`relative text-center text-[0.8rem] font-semibold ${
                                dayStatus?.status === "Present"
                                  ? "bg-[#9fe28e] text-green-700"
                                  : dayStatus?.status === "Holiday"
                                    ? "bg-[#eba2e4] text-[#ce32be]"
                                    : dayStatus?.status === "Company Leave"
                                      ? "bg-[#ebcba2] text-[#a36a20]"
                                      : dayStatus?.status === "Annual Leave"
                                        ? "bg-[#f17b69] text-[#be3333]"
                                        : dayStatus?.status === "Absent"
                                          ? "bg-[#f8a1a1] text-red-500"
                                          : "bg-[#c5c5cb] text-gray-darkpale"
                              } border-r-2`}
                            >
                              {dayStatus?.status === "Present" ? (
                                <>
                                  <span>P</span>
                                  <img
                                    className="absolute right-1 top-1 w-5 object-contain"
                                    src="/assets/icons/tort.svg"
                                    alt="late"
                                  />
                                </>
                              ) : dayStatus?.status === "Absent" ? (
                                "A"
                              ) : dayStatus?.status === "Annual Leave" ? (
                                "AL"
                              ) : dayStatus?.status === "Company Leave" ? (
                                "CL"
                              ) : dayStatus?.status === "Holiday" ? (
                                "H"
                              ) : (
                                "DO"
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))
                  : dummyEmployees.map((employee, empIndex) => (
                      <tr key={empIndex} className="border-b-2 text-left">
                        <td className="sticky left-0 bg-white text-[0.8rem] font-medium capitalize text-gray-darkpale">
                          {employee.name}
                        </td>
                        {monthDays.map((dayObj, index) => {
                          const formattedDate = dayObj.fullDate;
                          const dayStatus = employee?.days_status?.find(
                            (event) => event.date === formattedDate,
                          );
                          return (
                            <td
                              key={index}
                              className="text-center text-[0.8rem] font-medium text-gray-darkpale"
                            >
                              {formatStatus(dayStatus?.status)}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
              </tbody>
            </table> */}
           
           <table style={{ borderSpacing: "0", width: "100%" }}>
  <thead className="bg-gray-soft">
    <tr>
      <th className="sticky left-0 w-full border border-gray-300 bg-[#ebebf0] text-sm font-bold capitalize text-gray-darkpale">
        Employee Name
      </th>
      {monthDays.map((dayObj, index) => (
        <th
          key={index}
          className="text-sm font-bold border border-gray-300 capitalize text-gray-darkpale"
        >
          {dayObj.day}
          <p className="font-medium">{dayObj.date}</p>
        </th>
      ))}
    </tr>
  </thead>
  <tbody>
    {[
      { name: "John Doe", days_status: ["Present", "Present", "Day Off", "Present", "Present", "Holiday", "Present", "Present", "Day Off", "Company Leave","Present", "Present", "Day Off", "Present", "Present", "Absent","Present", "Present", "Holiday", "Present", "Present", "Day Off", "Absent","Present", "Present", "Day Off", "Present", "Present"] },
      { name: "Jane Smith", days_status: ["Present", "Day Off", "Present", "Present", "Holiday", "Present", "Present", "Company Leave", "Absent","Present", "Present", "Day Off", "Present", "Present", "Absent","Present", "Present", "Day Off", "Present", "Present", "Absent", "Holiday", "Present", "Present", "Day Off", "Absent","Present", "Present"  ] },
      { name: "David Brown", days_status: ["Present", "Present", "Present", "Day Off", "Company Leave", "Present", "Holiday", "Present", "Present", "Day Off", "Absent","Present", "Present", "Day Off", "Present", "Present", "Absent","Present", "Holiday", "Present", "Present", "Day Off", "Absent","Present", "Present", "Day Off", "Present" ,"Absent"] },
      { name: "Emma Wilson", days_status: ["Present", "Absent", "Present", "Present", "Holiday", "Present", "Present", "Day Off", "Absent","Present", "Present", "Day Off", "Present", "Present", "Absent","Present", "Present", "Day Off", "Present", "Present", "Absent", "Present", "Holiday", "Present", "Present", "Day Off", "Absent","Present" ] },
      { name: "Michael Johnson", days_status: ["Present", "Present", "Annual Leave", "Present", "Present", "Day Off", "Holiday", "Present", "Present", "Day Off", "Absent","Present", "Present", "Day Off", "Present", "Present", "Absent","Present", "Present", "Day Off", "Present", "Present", "Absent", "Holiday", "Present", "Present", "Day Off","Absent"] },
      { name: "Sophia Lee", days_status: ["Present", "Holiday", "Present", "Present", "Company Leave", "Absent","Present", "Present", "Day Off", "Present", "Present", "Absent","Present", "Present", "Day Off", "Present", "Present", "Absent", "Holiday", "Present", "Present", "Day Off", "Absent","Present", "Present", "Day Off", "Present", "Present"] }
    ].map((employee, empIndex) => (
      <tr key={empIndex} className="border-b-2 text-left">
        <td className="sticky left-0 z-10 border-r-2 bg-gray-300 text-[0.8rem] font-medium capitalize text-gray-darkpale">
          {employee.name}
        </td>
        {employee.days_status.map((status, index) => (
          <td
            key={index}
            className={`text-center text-[0.8rem] font-semibold ${
              status === "Present"
                ? "bg-[#77c477d5] text-black"
                : status === "Holiday"
                  ? "bg-[#e68ecf] text-black"
                  : status === "Company Leave"
                    ? "bg-[#FDE3AA] text-black"
                    : status === "Annual Leave"
                      ? "bg-[#AEB6E7] text-black"
                      : status === "Absent"
                        ? "bg-[#e47f7f] text-black"
                        : "bg-[#c5c5cb] text-black"
            } border-r-2`}
          >
            {status === "Present" ? (
              <div className="flex justify-between text-sm font-extrabold items-center p-4 ">
                <span>P</span>
                <img
                  className="ml-2 w-5 object-contain"
                  src="/assets/icons/tort.svg"
                  alt="late"
                />
              </div>
            ) : status === "Absent" ? (
              <span className="font-extrabold text-sm">A</span>
            ) : status === "Annual Leave" ? (
              <span className="font-extrabold ">AL</span>
            ) : status === "Company Leave" ? (
              <span className="font-extrabold ">CL</span>
            ) : status === "Holiday" ? (
              <span className="font-extrabold text-sm">H</span>
            ) : (
              <span className="font-extrabold ">DO</span>
            )}
          </td>
        ))}
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
