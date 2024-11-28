import MenuHeaderEmployeeAccess from "@/components/employee_access/MenuHeader";
import { ChevronRight, Filter, Search, Send } from "lucide-react";
import React from "react";

export default function ChatBox() {
  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <MenuHeaderEmployeeAccess
        pathlink={""}
        currentpage={"Chat"}
        subMenu={""}
        icon={""}
      />
      <div className="flex w-full items-center justify-between py-2">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-coollightgreen"></div>
          <h5 className="text-sm font-semibold">Niyas</h5>
        </div>
      </div>
      <div className="flex h-screen w-full rounded-md bg-white px-5 py-4">
        <div className="flex flex-1 flex-col">
          <div className="flex-1 overflow-y-auto rounded-md border p-6">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-start gap-3">
                <div className="bg-bluesoft max-w-md rounded-lg p-3 shadow-sm">
                  <p className="text-sm">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry’s
                    standard dummy text ever since the 1500s.
                  </p>
                  <span className="mt-1 block text-end text-xs text-gray-500">
                    Today | 03:22
                  </span>
                </div>
                <div className="bg-bluesoft rounded-full p-2">
                  <img
                    src="/assets/icons/employee_access/header/share.svg"
                    className="h-4 w-4"
                    alt=""
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <div className="max-w-md rounded-lg bg-gray-200 p-3 shadow-sm">
                  <p className="text-sm">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry’s
                    standard dummy text ever since the 1500s.
                  </p>
                  <span className="mt-1 block text-end text-xs text-gray-500">
                    Today | 03:22
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white py-4">
            <input
              type="text"
              placeholder="Type a message"
              className="outline-noneplaceholder:text-sm flex-1 rounded-lg border p-3 shadow-sm placeholder:text-sm"
            />
            <button className="bg-orange-400 hover:bg-orange-500 flex items-center gap-2 rounded-lg bg-hrmprimaryorange px-4 py-3 text-white shadow-md">
              <Send size={16} />
              Send
            </button>
          </div>
        </div>
        <div className="w-1/4 bg-white shadow-sm">
          <div className="flex items-center gap-2 p-4">
            <div className="input flex h-10 min-h-10 w-80 items-center gap-2 border border-gray-platinum text-sm outline-none placeholder:text-black hover:border-gray-platinum">
              <Search className="text-dark size-4" />
              <input
                type="text"
                onChange={(e) => setKeyword(e.target.value)}
                className="placeholder:text-dark h-full w-full placeholder:text-sm"
                placeholder="Search"
              />
            </div>
            <div className="h-10 min-h-10 rounded-md border border-gray-platinum bg-white p-3">
              <Filter className="size-4" />
            </div>{" "}
          </div>

          <ul className="space-y-2 p-4">
            {["Robert Fox", "Philip", "Randall", "Cody"].map((user, idx) => (
              <li
                key={idx}
                className={`flex cursor-pointer items-center justify-between gap-2 rounded-md py-3 ${
                  idx === 0 ? "bg-orange-100" : ""
                } hover:bg-orange-50`}
              >
                <div className="h-8 w-9 rounded-full bg-coollightgreen"></div>
                <div className="flex w-full items-center justify-between">
                  <h3 className="text-sm font-medium">
                    {user}
                    <p className="text-xs text-gray-500">UI/UX Design Intern</p>
                  </h3>
                  <span className="text-xs text-gray-400">03:22</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
