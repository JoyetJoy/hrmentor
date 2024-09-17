import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { menuitems, activityItems } from "@/constants/dummyData";
import { LayoutGrid, MessageSquareText } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";
import { useUserStore } from "@/lib/slices/auth.slice";

export const AdminHeader = () => {
  const { setUser, user } = useUserStore((state) => ({
    setUser: state.setUser,
    user: state.user,
  }));

  console.log(user);

  const [visibleSection, setVisibleSection] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const handleClick = (section) => {
    setVisibleSection(visibleSection === section ? null : section);
  };
  const handleNavigation = (path) => {
    navigate(path);
  };
  const isActiveLink = (path) => location.pathname.includes(path);
  return (
    <>
      <div className="relative flex flex-row items-center justify-between rounded-md bg-white px-5">
        <div className="flex flex-row gap-3">
          <div className="w-11">
            <img
              src={"/assets/images/logo-header.svg"}
              alt="logo image"
              className="h-full w-full object-contain"
            />
          </div>
          <span className="font-monorope text-base font-normal">
            Welcome,
            <h1 className="mt-0 text-base font-semibold">
              Tech Butomy Pvt Ltd
            </h1>
          </span>
        </div>
        <div className="items flex gap-x-3">
          {menuitems.map((item) => (
            <NavLink
              to={item.path}
              key={item.id}
              className={`flex flex-col items-center justify-end gap-1 border-[#E95D39] px-2 py-1 ${
                isActiveLink(item.active)
                  ? "activeLink font-bold text-[#E95D39]"
                  : "font-medium text-textcolor-darkblue"
              }`}
            >
              <img
                src={
                  isActiveLink(item.active)
                    ? item.iconSrcActive
                    : item.iconSrcBlack
                }
                alt={item.name}
                className="h-4 w-4"
              />
              <p className="text-sm">{item.name}</p>
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3 py-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 p-2">
            <MessageSquareText className="size-5 text-textcolor-blue" />
          </div>
          <Menu as="div" className="relative inline-block text-left">
            <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-100 p-3">
              <Menu.Button>
                <LayoutGrid className="size-5 text-textcolor-blue" />
              </Menu.Button>
            </div>
            <Menu.Items className="absolute top-12 z-20 w-36 rounded-lg bg-white p-4 shadow-lg">
              <ul className="flex flex-col gap-5">
                {activityItems.map((item, index) => (
                  <Menu.Item key={index}>
                    {({ active }) => (
                      <li
                        className={`flex cursor-pointer items-center gap-3 whitespace-nowrap text-xs font-semibold ${
                          active ? "" : ""
                        }`}
                      >
                        <div className="h-4 w-4">
                          <img
                            src={item.icon}
                            alt={`${item.label} icon`}
                            className="w-full object-contain"
                          />
                        </div>
                        {item.label}
                      </li>
                    )}
                  </Menu.Item>
                ))}
              </ul>
            </Menu.Items>
          </Menu>
          <ProfileDropdown handleNavigation={handleNavigation} user={user} />
        </div>
      </div>
    </>
  );
};
