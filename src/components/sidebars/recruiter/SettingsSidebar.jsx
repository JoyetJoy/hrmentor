import { Icon } from "@/utils/IconRender";
import React from "react";
import { Link } from "react-router-dom";

export const SettingsSidebar = ({ sidebarList, active }) => {
  console.log(active);
  return (
    <div className="bg-white rounded-md px-6 min-h-full w-fit py-4">
      <ul className="flex flex-col  gap-5 justify-center text-sm text-[#7F7F7F] font-medium">
        {sidebarList?.map((item) => (
          <li
            key={item?.id}
            className={`font-bold text-base whitespace-nowrap flex items-center gap-x-3
             ${active === item?.name ? "text-[#E95D39]" : "text-[#7F7F7F] "}`}
          >
            <Icon
              svg={item?.icon}
              color={
                active === item?.name ? "#E95D39" : "#7F7F7F"
              }
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
