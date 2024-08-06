import React from "react";
import {
  ArrowLeft,
  ChevronRight,
  Search,
  Filter,
  ArrowUpFromLine,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";
import QueryTable from "../../../../components/table/QueryTable";

export default function EmployeeLists() {
  return (
    <div className="my-2">
      <div className="bg-white py-2 px-6 flex flex-row items-center justify-between  rounded-md">
        <div className="text-base font-semibold text-black flex items-center justify-between gap-1">
          <ArrowLeft className="size-4" />
          Menu
          <ChevronRight className="size-4" />
          <span className="text-red-600">Employee</span>
        </div>
        <h1 className="text-base font-semibold text-black flex items-center justify-between gap-1">
          {" "}
          Number of licence is limited to 8:{" "}
          <span className="text-red-600 underline">Add More Licence</span>{" "}
        </h1>
        <div className="text-sm flex items-center gap-5 font-semibold ">
          <div className="w-1">
            <img
              src={"/assets/icons/employees/line.svg"}
              alt="line"
              className="object-contain w-full"
            />
          </div>
          <Link className="text-textcolor-blue font-extrabold text-base">
            Employees
          </Link>
          <Link className=" text-base text-[#808080]  ">Settings</Link>
        </div>
      </div>
      <div className="flex justify-between items-center my-2">
        <label className="input outline-none border-none pr-28 flex items-center  h-11 gap-2">
          <Search className="text-gray-200 object-contain size-5" />

          <input
            type="text"
            className="grow placeholder:text-sm focus:outline-none placeholder:text-gray-200 "
            placeholder="Search"
          />
        </label>
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-md p-3 border border-gray-400">
            <img src={"/assets/icons/employees/filter.svg"} alt="filter" />
          </div>
          <div className="bg-white flex flex-row items-center justify-center min-h-11 h-11 rounded-md py-1 px-4 border border-gray-400 gap-1">
            <ArrowUpFromLine className="size-4" />
            <h1 className="text-base font-semibold">Export</h1>
          </div>
          <div className="text-white font-semibold flex  items-center">
            <Link
              to={"/admin/employees/create"}
              className="btn bg-btncolor text-white hover:bg-btncolor"
            >
              <Plus />
              Add Employee{" "}
            </Link>
          </div>
        </div>
      </div>
      <QueryTable />
    </div>
  );
}
