import MenuHeaderEmployeeAccess from "@/components/employee_access/MenuHeader";
import ProfileSidebar from "@/components/sidebars/employee_access/profile_management/ProfileSideBar";
import QueryTable from "@/components/table/QueryTable";
import { customSelectStyles } from "@/utils/customStyles";
import dayjs from "dayjs";
import { ArrowDownToLine, ChevronRight, Eye, Search } from "lucide-react";
import React from "react";
import Select from "react-select";

export default function PayOff() {
    const handleYearChange = (selectedOption) => {
        const updatedDate = dayjs(date).year(selectedOption.value).toDate();
        setDate(updatedDate);
      };
    
      const years = Array.from({ length: 11 }, (_, i) => ({
        value: 2020 + i,
        label: (2020 + i).toString(),
      }));
      const columns = React.useMemo(
        () =>
          [
            {
              header: "Sl No",
              accessorKey: "sno",
              cell: ({ row }) => {
                return (
                  <div className="flex px-2">
                    {row.index + 1 + (currentPage - 1) * pageLimit}
                  </div>
                );
              },
            },
            {
              header: "Month",
              accessorKey: "month",
            },
            {
              header: "Total Worked hrs",
              accessorKey: "totalworked hrs",
            },
            {
              header: " Worked hours pay",
              accessorKey: "worked hours pay",
            },
            {
              header: "OT Hours",
              accessorKey: "ot hours",
            },
            {
              header: "OT Pay",
              accessorKey: "pay",
            },
            {
              header: "Net Pay",
              accessorKey: "pay",
            },
            {
              header: "Payment date",
              accessorKey: "pay",
            },
            {
              header: "Status",
              accessorKey: "status",
              cell: ({ row }) => (
                <div
                  // style={{
                  //   backgroundColor:
                  //     row?.original?.employee?.employment_status?.background_color,
                  //   color: row?.original?.employee?.employment_status?.text_color,
                  // }}
                  className="flex h-8 w-fit items-center justify-center whitespace-nowrap rounded-md px-3 font-semibold"
                ></div>
              ),
            },
            {
              header: "Action",
              accessorKey: "action",
              cell: ({ row }) => (
                <div className="flex items-center gap-2 text-xs">
                  <Link to="/employee-access/profile/payslip/payoff-view" className="flex size-7 cursor-pointer items-center rounded-full bg-gray-soft p-2">
                    <Eye className="size-3" /> 
                  </Link>
                </div>
              ),
            },
          ].filter(Boolean),
        [],
      );
      return (
        <div className="flex flex-col">
          <MenuHeaderEmployeeAccess
            pathlink={""}
            currentpage={"Payslip"}
            subMenu={"ProfileManagement"}
            icon={<ChevronRight className="size-3" />}
            page={1}
          />
          <div className="flex gap-x-3">
            <ProfileSidebar />
            <div className="mt-2 w-full">
              <>
                <div className="flex items-center justify-between">
                  <h5 className="text-lg font-bold">PayOff</h5>
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
                <div className="overflow-y-min mt-5 h-screen w-full overflow-y-auto rounded-md bg-white pb-7">
                  <QueryTable columns={columns} list={""} />
                </div>
              </>
            </div>
          </div>
        </div>
      );
}
