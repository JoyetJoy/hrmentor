import { Icon } from "@/utils/IconRender";
import React from "react";
import { Link } from "react-router-dom";

export const SettingsSidebar = ({ sidebarList }) => {
  console.log(sidebarList);
  return (
    <div className="bg-white rounded-md px-6 min-h-full w-fit py-4">
      <ul className="flex flex-col  gap-5 justify-center text-sm text-[#7F7F7F] font-medium">
        {sidebarList?.map((item) => (
          <li
            key={item?.id}
            className={
              //   pathname.includes(item?.link) &&
              "text-[#7F7F7F] font-bold text-base whitespace-nowrap flex items-center gap-x-3"
            }
          >
            <Icon svg={item?.icon} color="#7F7F7F" />
            {/* {item?.icon}     */}
            <Link to={item?.name} className="whitespace-nowrap">
              {item?.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
