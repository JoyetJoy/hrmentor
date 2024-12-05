import MenuHeader from "@/components/common/MenuHeader";
import MenuHeaderEmployeeAccess from "@/components/employee_access/MenuHeader";
import PaySlipDispute from "@/components/popups/employee_access/profile_management/PaySlipDispute";
import QueryTable from "@/components/table/QueryTable";
import { customSelectStyles } from "@/utils/customStyles";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ArrowLeft, ChevronRight, Search } from "lucide-react";
import React, { useState } from "react";
import Select from "react-select";

export default function AdminPayOffView() {
  const [popupOpen, setPopupOpen] = useState(false);
  const handleYearChange = (selectedOption) => {
    const updatedDate = dayjs(date).year(selectedOption.value).toDate();
    setDate(updatedDate);
  };

  const years = Array.from({ length: 11 }, (_, i) => ({
    value: 2020 + i,
    label: (2020 + i).toString(),
  }));

  const handleClick = () => {
    setPopupOpen(true);
  };
  const columns = React.useMemo(
    () => [
      {
        header: "Date",
        accessorKey: "date",
      },
      {
        header: "Shift Name",
        accessorKey: "shiftname",
      },
      {
        header: "Clock In",
        accessorKey: "clockin",
      },
      {
        header: "Clock Out",
        accessorKey: "clockout",
      },
      {
        header: "Total Bt",
        accessorKey: "totalbt",
      },
      {
        header: "OT Hours",
        accessorKey: "Othours",
      },
      {
        header: "Total Worked hrs",
        accessorKey: "totalworkedhrs",
      },
      {
        header: "Disputes",
        accessorKey: "disputes",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-xs">
            <div
              onClick={handleClick}
              className="flex size-7 cursor-pointer items-center rounded-full bg-gray-soft p-2"
            >
              <img
                src="/assets/icons/employee_access/header/dashboard/disputes.svg"
                alt="dispute"
              />
            </div>
          </div>
        ),
      },
    ],
    [],
  );
  return (
    <div className="flex flex-col">
      <PaySlipDispute popupOpen={popupOpen} setPopupOpen={setPopupOpen} />
      <MenuHeader
        pathlink=""
        currentpath="Payslip"
        menu="Menu"
        subMenu="Employee"
        icon={<ChevronRight className="size-3" />}
        page={2}
      />

      <div className="mt-2 w-full">
        <>
          <div className="flex items-center justify-between">
            <h5 className="gap-0.1 flex items-center text-sm font-bold">
              <ArrowLeft
                onClick={() => {
                  history.back();
                }}
                className="mr-2 size-4 cursor-pointer"
              />
              01 Jan 2024 to 30 Jan 2024
            </h5>
            <div className="flex items-center gap-3">
              <div className="input flex h-10 min-h-10 w-80 items-center gap-2 border border-gray-platinum text-sm outline-none placeholder:text-black hover:border-gray-platinum">
                <Search className="size-4 text-gray-dark" />
                <input
                  type="text"
                  onChange={(e) => setKeyword(e.target.value)}
                  className="h-full w-full placeholder:text-gray-dark"
                  placeholder="Search"
                />
              </div>
              <Select
                options={years}
                isSearchable={true}
                onChange={handleYearChange}
                styles={customSelectStyles}
                // placeholder={dayjs(date).format("YYYY")}
                className="input-box h-10 w-52 rounded-md border-gray-muted focus:border-gray-muted"
              />
            </div>
          </div>
          <div className="mt-5 flex w-full gap-9 rounded-md bg-white p-7">
            <div className="flex flex-col gap-5">
              <h5 className="gap-0.1 flex items-center text-sm font-medium">
                01 Jan 2024 to 30 Jan 2024
              </h5>
              <div className="rounded-md border border-gray-soft">
                <table className="text-left text-sm text-gray-800">
                  <tbody>
                    <tr className="whitespace-nowrap border-b border-gray-soft">
                      <td className="px-6 py-5 font-medium">
                        Total Working hours
                      </td>
                      <td className="px-6 py-5 text-right">240 hr 00 min</td>
                    </tr>
                    <tr className="whitespace-nowrap border-b border-gray-soft">
                      <td className="px-6 py-5 font-medium">Overtime</td>
                      <td className="px-6 py-5 text-right">02 hr 30 min</td>
                    </tr>
                    <tr className="whitespace-nowrap border-b border-gray-soft">
                      <td className="px-6 font-medium">Overtime per week</td>
                      <td className="px-6 py-5 text-right">£300</td>
                    </tr>
                    <tr className="whitespace-nowrap border-b border-gray-soft">
                      <td className="px-6 py-5 font-medium">Paid Holidays</td>
                      <td className="px-6 py-5 text-right">5</td>
                    </tr>
                    <tr className="whitespace-nowrap border-b border-gray-soft">
                      <td className="px-6 py-5 font-medium">
                        Paid holiday credit
                      </td>
                      <td className="px-6 py-5 text-right">120</td>
                    </tr>
                    <tr className="whitespace-nowrap border-b border-gray-soft">
                      <td className="px-6 py-5 font-medium">Unpaid Holiday</td>
                      <td className="px-6 py-5 text-right">5</td>
                    </tr>
                    <tr className="whitespace-nowrap border-b border-gray-soft">
                      <td className="px-6 py-5 font-medium">
                        Unpaid Leave deduction
                      </td>
                      <td className="px-6 py-5 text-right">5</td>
                    </tr>
                    <tr className="whitespace-nowrap border-b border-gray-soft">
                      <td className="px-6 py-5 font-medium">
                        Salary per Month
                      </td>
                      <td className="px-6 py-5 text-right">£25250</td>
                    </tr>
                    <tr className="whitespace-nowrap">
                      <td className="px-6 py-5 font-medium">Payment status</td>
                      <td className="px-6 py-5 text-right">Not paid</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex w-full flex-col gap-2.5 pb-7">
              <Disclosure as="div" className="py-1" defaultOpen={false}>
                <DisclosureButton className="group flex w-full items-center gap-x-2">
                  <div className="flex size-5 min-w-5 items-center justify-center">
                    <ChevronRight className="size-4 group-data-[open]:rotate-90" />
                  </div>
                  <p className="flex flex-row whitespace-nowrap text-sm font-semibold">
                    Overview
                  </p>
                  <div className="h-px w-full bg-gray-light"></div>
                </DisclosureButton>
                <DisclosurePanel className="my-4 text-sm/5 text-black/50 p-7">
                  <QueryTable columns={columns} list={"NA"} />
                </DisclosurePanel>
              </Disclosure>
            </div>
          </div>
        </>
      </div>
    </div>
  );
}
