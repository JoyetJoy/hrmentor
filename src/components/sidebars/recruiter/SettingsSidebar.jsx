import { Icon } from "@/utils/IconRender";
import React from "react";
import { Link } from "react-router-dom";

export const SettingsSidebar = ({ sidebarList, active }) => {
  return (
    <div className="min-h-full min-w-64 rounded-md bg-white px-5 py-6">
      <ul className="flex flex-col justify-center gap-5 text-sm text-[#7F7F7F]">
        {sidebarList?.map((item) => (
          <li
            key={item?.id}
            className={`flex items-center gap-x-3 whitespace-nowrap text-sm ${active === item?.name ? "font-bold text-[#E95D39]" : "font-medium text-[#7F7F7F]"}`}
          >
            <Icon
              svg={item?.icon}
              color={active === item?.name ? "#E95D39" : "#7F7F7F"}
            />
            {/* {item?.icon}     */}
            <Link to={item?.link} className="whitespace-nowrap">
              {item?.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
