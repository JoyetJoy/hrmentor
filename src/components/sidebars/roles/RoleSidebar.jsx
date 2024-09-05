import React, { useState } from "react";
import { roleSidebarData } from "../../../constants/dummyData";
import { Search, Trash2 } from "lucide-react";
import edit from "/public/assets/icons/admin/marker.svg"
import Pagination from "@/components/table/Pagination";

export const RoleSidebar = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);
  
    return (
        <div className="flex flex-col min-w-[415px]">
            <h1 className="font-semibold text-lg text-bold text-start mb-2">Role</h1>
            <label className="input outline-none border border-[#EBEBF0] pr-28 flex items-center rounded-md   min-h-11 gap-2 mb-3">
                <Search className="text-gray-200 object-contain size-4" />
                <input
                    type="text"
                    className="grow placeholder:text-sm focus:outline-none placeholder:text-gray-200 "
                    placeholder="Search"
                />
            </label>
            <div className="border border-[#EBEBF0]  rounded-md">
                <h1 className="flex justify-between items-center bg-gray-500 border text-base text-black font-semibold border-gray-300 px-6 py-4 rounded-t-md">
                    Role Name
                    <span>Action</span>
                </h1>
                <div className="bg-white rounded-b-md ">
                    <h1 className="text-sm font-medium text-gray-200 py-5  px-6">
                        Super Admin[1]
                    </h1>
                    <ul>
                        {roleSidebarData.map((role, index) => (
                            <li
                                key={index}
                                className="flex justify-between items-center text-sm text-black border-t border-gray-500 px-6 py-3"
                            >
                                <span>
                                    {role.name}[{role.no}]
                                </span>
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 p-2 bg-gray-500 rounded-full flex items-center justify-center">
                                        <img
                                            src={edit}
                                            alt="editIcon"
                                            className=" object-contain "
                                        />
                                    </div>
                                    <div className="w-8 h-8 p-2 bg-gray-500 rounded-full flex items-center justify-center">
                                        <Trash2 className="text-[#AB2727]" strokeWidth={1.5} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {totalPages && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      )}
        </div>
    );
};
