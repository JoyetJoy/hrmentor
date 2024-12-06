import MenuHeaderEmployeeAccess from "@/components/employee_access/MenuHeader";
import { Eye, PlusIcon } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import Select from "react-select";
import { customSelectStyles } from "@/utils/customStyles";
import AddManually from "@/components/popups/employee_access/timesheet/AddManually";

export default function TimeSheet() {
  const [date, setDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [popupOpen, setPopupOpen] = useState(false);
  const [tableData, setTableData] = useState([
    {
      sno: 1,
      mon: "8 hours",
      tue: "7 hours",
      wed: "9 hours",
      thu: "6 hours",
      fri: "8 hours",
      sat: "NA",
      sun: "NA",
    },
    // Add more sample data here
  ]);

  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i,
    label: dayjs().month(i).format("MMMM"),
  }));

  const years = Array.from({ length: 11 }, (_, i) => ({
    value: 2020 + i,
    label: (2020 + i).toString(),
  }));

  const weeks = Array.from({ length: 5 }, (_, i) => ({
    value: i + 1,
    label: `Week ${i + 1}`,
  }));

  const handleMonthChange = (selectedOption) => {
    const updatedDate = dayjs(date).month(selectedOption.value).toDate();
    setDate(updatedDate);
  };

  const handleYearChange = (selectedOption) => {
    const updatedDate = dayjs(date).year(selectedOption.value).toDate();
    setDate(updatedDate);
  };

  const handleClick = () => {
    setPopupOpen(true);
  };

  return (
    <>
      <AddManually popupOpen={popupOpen} setPopupOpen={setPopupOpen} />
      <div className="flex h-screen flex-col">
        <MenuHeaderEmployeeAccess pathlink={""} currentpage={"Time Sheet"} />
        <div className="flex w-full items-center justify-between px-4 py-2">
          <div className="flex items-center gap-4">
            <h5 className="text-md font-bold">My TimeSheet</h5>
            <Select
              options={years}
              isSearchable={true}
              onChange={handleYearChange}
              styles={customSelectStyles}
              value={years.find(
                (yearOption) => yearOption.value === dayjs(date).year()
              )}
              placeholder={dayjs(date).format("YYYY")}
              className="input-box h-10 w-52 rounded-md border-gray-muted focus:border-gray-muted"
            />
            <Select
              options={months}
              isSearchable={true}
              onChange={handleMonthChange}
              styles={customSelectStyles}
              value={months.find(
                (monthOption) => monthOption.value === dayjs(date).month()
              )}
              placeholder={dayjs(date).format("MMMM")}
              className="input-box h-10 w-52 rounded-md border-gray-muted focus:border-gray-muted"
            />
            <Select
              options={weeks}
              isSearchable={true}
              onChange={handleMonthChange}
              styles={customSelectStyles}
              value={weeks.find(
                (weekOption) => weekOption.value === dayjs(date).month()
              )}
              placeholder={dayjs(date).format("MMMM")}
              className="input-box h-10 w-52 rounded-md border-gray-muted focus:border-gray-muted"
            />
          </div>
          <div className="flex items-center gap-3">
            <Link
              to=""
              onClick={handleClick}
              className="flex w-fit items-center justify-center gap-2 whitespace-nowrap rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white focus:outline-none data-[hover]:bg-hrmdarkblue/70 data-[focus]:outline-1 data-[focus]:outline-white"
            >
              <PlusIcon />
              Add Manually
            </Link>
            <Link
              to="/employee-access/timesheet/team"
              className="flex w-fit items-center justify-center gap-2 whitespace-nowrap rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white focus:outline-none data-[hover]:bg-hrmdarkblue/70 data-[focus]:outline-1 data-[focus]:outline-white"
            >
              Team Time Sheet
            </Link>
          </div>
        </div>

        <div className="rounded-md border border-gray-300 bg-white pb-2 w-full">
          <div className="table table-md mx-auto w-full">
            <table style={{ borderSpacing: "0", width: "100%" }}>
              <thead className="overflow-hidden rounded-md bg-gray-soft">
                <tr>
                  <th className="text-sm font-semibold capitalize text-gray-darkpale">
                    S.No
                  </th>
                  <th className="text-sm font-semibold capitalize text-gray-darkpale">
                    Mon <p>Oct -01</p>
                  </th>
                  <th className="text-sm font-semibold capitalize text-gray-darkpale">
                    Tue <p>Oct -01</p>
                  </th>
                  <th className="text-sm font-semibold capitalize text-gray-darkpale">
                    Wed <p>Oct -01</p>
                  </th>
                  <th className="text-sm font-semibold capitalize text-gray-darkpale">
                    Thu <p>Oct -01</p>
                  </th>
                  <th className="text-sm font-semibold capitalize text-gray-darkpale">
                    Fri <p>Oct -01</p>
                  </th>
                  <th className="text-sm font-semibold capitalize text-gray-darkpale">
                    Sat <p>Oct -01</p>
                  </th>
                  <th className="text-sm font-semibold capitalize text-gray-darkpale">
                    Sun <p>Oct -01</p>
                  </th>
                  <th className="text-sm font-semibold capitalize text-gray-darkpale">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr
                    key={index}
                    className="borde-b-2 borde-[#C0C0C0] text-left last:border-none"
                  >
                    <td className="justify-end text-[0.8rem] font-medium capitalize text-gray-darkpale">
                      {row.sno}
                    </td>
                    <td className="justify-end text-[0.8rem] font-medium capitalize text-gray-darkpale">
                      {row.mon}
                    </td>
                    <td className="justify-end text-[0.8rem] font-medium capitalize text-gray-darkpale">
                      {row.tue}
                    </td>
                    <td className="justify-end text-[0.8rem] font-medium capitalize text-gray-darkpale">
                      {row.wed}
                    </td>
                    <td className="justify-end text-[0.8rem] font-medium capitalize text-gray-darkpale">
                      {row.thu}
                    </td>
                    <td className="justify-end text-[0.8rem] font-medium capitalize text-gray-darkpale">
                      {row.fri}
                    </td>
                    <td className="justify-end text-[0.8rem] font-medium capitalize text-gray-darkpale">
                      {row.sat}
                    </td>
                    <td className="justify-end text-[0.8rem] font-medium capitalize text-gray-darkpale">
                      {row.sun}
                    </td>
                    <td className="justify-end text-[0.8rem] font-medium capitalize text-gray-darkpale">
                      <Link
                        to=""
                        className="flex cursor-pointer items-center rounded-full bg-gray-soft p-2 w-7"
                      >
                        <Eye className="size-3" />
                      </Link>
                    </td>
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
