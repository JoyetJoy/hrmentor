import React from "react";

export default function LeaveSideBar() {
  return (
    <div className="h-screen min-w-64 rounded-md bg-white">
      <div className="w-full rounded-md bg-white px-5 py-7">
        <p className="cursor-pointer px-3 py-1 text-sm font-semibold text-hrmprimaryorange">
          Leave Request
        </p>
        <p className="cursor-pointer px-3 py-1 text-sm text-gray-dark">
          Bank Holiday
        </p>
      </div>
    </div>
  );
}
