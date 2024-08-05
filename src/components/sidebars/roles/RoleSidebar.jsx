import React from "react";
import { roleSidebarData } from "../../../constants/dummyData";
import { Search, Trash2 } from "lucide-react";
import edit from "/public/assets/icons/admin/marker.svg"

export const RoleSidebar = () => {
    return (
        <div className="flex flex-col w-1/2">
            <h1 className="font-semibold text-lg text-bold text-start mb-2">Role</h1>
            <label className="input outline-none border-none pr-28 flex items-center  h-11 gap-2 mb-3">
                <Search className="text-gray-200 object-contain size-4" />
                <input
                    type="text"
                    className="grow placeholder:text-sm focus:outline-none placeholder:text-gray-200 "
                    placeholder="Search"
                />
            </label>
            <div>
                <h1 className="flex justify-between items-center bg-gray-500 border text-sm text-black font-semibold border-gray-300 px-10 py-4 rounded-t-md">
                    Role Name
                    <span>Action</span>
                </h1>
                <div className="bg-white rounded-b-md ">
                    <h1 className="text-xs font-semibold text-gray-200 py-5  px-10">
                        Super Admin[1]
                    </h1>
                    <ul>
                        {roleSidebarData.map((role, index) => (
                            <li
                                key={index}
                                className="flex justify-between items-center text-sm text-black border-t border-gray-500 px-10 py-3"
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
                                        <Trash2 className="text-red-700" />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
