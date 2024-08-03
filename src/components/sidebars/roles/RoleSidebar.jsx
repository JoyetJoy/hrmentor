import React from "react";
import { roleSidebarData } from "../../../constants/dummyData";
import { Search, Trash2 } from "lucide-react";

export const RoleSidebar = () => {
  return (
    <div className="flex flex-col w-1/2">
      <h1 className="font-semibold text-xl text-bold text-start mb-2">Role</h1>
      <label className="input outline-none border-none pr-28 flex items-center gap-2 mb-4">
        <Search />
        <input
          type="text"
          className="grow placeholder:text-sm"
          placeholder="Search"
        />
      </label>
      <div>
        <div className="flex justify-between items-center bg-gray-500 border border-gray-300 px-10 py-4 rounded-t-md">
          <h1 className="font-semibold text-snm text-black">Role Name</h1>
          <h1 className="font-semibold text-sm text-black">Action</h1>
        </div>
        <div className="bg-white rounded-b-md ">
          <h1 className="text-sm font-semibold text-gray-200 py-5  px-10">
            Super Admin[1]
          </h1>
          <ul>
            {roleSidebarData.map((role, index) => (
              <li
                key={index}
                className="flex justify-between items-center text-base text-black border-t border-gray-500 px-10 py-4"
              >
                <span>
                  {role.name}[{role.no}]
                </span>
                <div className="flex gap-3">
                  <div className="w-9 h-9 p-2 bg-gray-500 rounded-full flex items-center justify-center">
                    <img
                      src={"/icons/edit.svg"}
                      alt="editIcon"
                      className=" object-contain "
                    />
                  </div>
                  <div className="w-9 h-9 p-2 bg-gray-500 rounded-full flex items-center justify-center">
                    <Trash2 />
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
