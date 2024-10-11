import { setupItems } from "@/constants/dummyData";
import React from "react";
import { Link } from "react-router-dom";

function Setup({ active}) {
  return (
    <div className="min-h-full min-w-64 rounded-md bg-white px-5 py-6">
    <ul className="flex flex-col justify-center gap-5 text-sm text-[#7F7F7F]">
      {setupItems?.map((item) => (
        <li
          key={item?.id}
          className={`flex items-center gap-x-3 whitespace-nowrap text-sm ${active === item?.name ? "font-bold text-[#E95D39]" : "font-medium text-[#7F7F7F]"}`}
        >
            <Link  className="whitespace-nowrap">
            {item?.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
  )
}

export default Setup
