import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { menuitems, activityItems } from "@/constants/dummyData";
import { LayoutGrid, MessageSquareText, Bell } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";
import { useUserStore } from "@/lib/slices/auth.slice";

export const AdminHeader = () => {
  const { setUser, user } = useUserStore((state) => ({
    setUser: state.setUser,
    user: state.user,
  }));

  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    if (path === "/login") {
      setUser({});
      localStorage.removeItem("super_token");
      navigate("/login");
    }
    navigate(path);
  };
  const isActiveLink = (path) => location.pathname.includes(path);

  return (
    <>
      <div className="relative flex flex-row items-center justify-between rounded-md bg-white pr-5">
        <Link to="/admin/dashboard" className="flex flex-row gap-1 pl-3">
          <div className="mr-2 h-9">
            <img
              src={"/logo.svg"}
              alt="hr mentor"
              className="h-full w-full object-contain"
            />
          </div>
          <span className="font-monorope text-base font-normal">
            Welcome,
            <h1 className="-mt-0.5 text-base font-semibold">{user?.name}</h1>
          </span>
        </Link>
        <div className="items flex gap-x-3">
          {menuitems.map((item) => (
            <NavLink
              to={item.path}
              key={item.id}
              className={`flex flex-col items-center justify-end gap-1 border-hrmprimaryorange px-2 py-1 ${
                isActiveLink(item.active)
                  ? "activeLink font-bold text-hrmprimaryorange"
                  : "font-medium text-hrmdarkblue"
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
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
            <Bell className="size-5 text-hrmblue" />
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
            <MessageSquareText className="size-5 text-hrmblue" />
          </div>
          <Menu as="div" className="relative inline-block text-left">
            <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-100 p-3">
              <Menu.Button>
                <LayoutGrid className="size-5 text-hrmblue" />
              </Menu.Button>
            </div>
            <Menu.Items className="absolute top-12 z-20 w-36 rounded-lg bg-white p-4 shadow-lg">
              <ul className="flex flex-col gap-5">
                {activityItems.map((item, index) => (
                  <Menu.Item key={index}>
                    {({ active }) => (
                      <button
                        onClick={() => handleNavigation(item.path)}
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
                      </button>
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
