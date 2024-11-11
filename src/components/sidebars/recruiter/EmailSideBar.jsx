import { emailsideBar } from "@/constants/menus/email";
import { Icon } from "@/utils/IconRender";
import React from "react";
import { Link } from "react-router-dom";

function EmailSideBar({  active }) {
  return (
    <div className="bg-white rounded-md px-9 h-screen min-w-64 w-fit py-8">
      <ul className="flex flex-col  gap-5 justify-center">
        {emailsideBar?.map((item) => (
          <li
            key={item?.id}
            className={`font-semibold text-sm whitespace-nowrap flex items-center gap-x-3
             ${active === item?.name ? "text-[#E95D39]" : "text-gray-dark "}`}
          >
            <Link to={item?.link} className="whitespace-nowrap">
              {item?.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default EmailSideBar
