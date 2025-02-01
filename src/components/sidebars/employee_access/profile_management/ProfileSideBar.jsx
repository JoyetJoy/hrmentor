import { profileSidebarList } from "@/constants/profileSidebar";
import React from "react";
import { Link, useLocation } from "react-router-dom";

function ProfileSidebar({ sidebarList = profileSidebarList }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const uid = searchParams.get("uid");
  return (
    <div className="min-h-full min-w-52 rounded-md bg-white px-5 py-4">
      <ul className="flex flex-col justify-center gap-5 text-[0.9rem] font-medium text-gray-dark">
        {sidebarList?.map((item) => {
          const linkTo = uid ? `${item?.link}?uid=${uid}` : item?.link;

          return (
            <li
              key={item?.id}
              className={
                location.pathname.includes(item?.link) &&
                "whitespace-nowrap font-bold text-hrmprimaryorange"
              }
            >
              <Link to={linkTo} className="whitespace-nowrap">
                {item?.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ProfileSidebar;
