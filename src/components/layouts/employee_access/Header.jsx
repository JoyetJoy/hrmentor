import {
  employeeAccessActivityList,
  employeemenuitems,
} from "@/constants/dummyData";
import { useUserStore } from "@/lib/slices/auth.slice";
import { Bell, LayoutGrid, MessageSquareText } from "lucide-react";
import React, { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import ProfileDropdown from "../employee_access/ProfileDropdown";
import { Menu } from "@headlessui/react";
import ChatBoxList from "@/components/popups/employee_access/chat/ChatBoxList";
import { NOTIFICATIONS } from "@/api/hiring";
import { useQuery } from "@tanstack/react-query";
import { ALL_CHAT_LIST, newRequest } from "@/api";
import EmployeeNotification from "@/components/popups/notification/Employeenotification";

export default function EmployeeAccessHeader() {
  const { setUser, user } = useUserStore((state) => ({
    setUser: state.setUser,
    user: state.user,
  }));

  const [notificationPopupOpen, setNotificationPopupOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { data: userchatlist, refetch } = useQuery({
    queryKey: ["userchatlist", user?.user?.id],
    queryFn: () =>
      newRequest.get(ALL_CHAT_LIST).then((res) => {
        // setNotifications(res.data)
        return res.data;
      }),
    enabled: !!user?.user?.id,
  });

  const unreadChats = userchatlist?.chats.filter(chat => chat.unread_count > 0).length;


  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notification"],
    queryFn: () =>
      newRequest.get(NOTIFICATIONS,{ params: { section: 'emp' }}).then((res) => {
        return res.data;
      }),
  });

  const handleNotificationClick = () => {
    setNotificationPopupOpen(true);
  };

  const handleNavigation = (path) => {
    if (path === "/logout") {
      setUser({});
      localStorage.removeItem("employee_token");
      navigate("/login");
    }
    navigate(path);
  };
  const isActiveLink = (path) => location.pathname.includes(path);
  const [popupOpen, setPopupOpen] = useState(false);
  const handleClick = () => {
    setPopupOpen(true);
  };

  return (
    <>
      <EmployeeNotification
        notifications={notifications}
        notificationPopupOpen={notificationPopupOpen}
        setNotificationPopupOpen={setNotificationPopupOpen}
        type={'employee'}
      />
      <ChatBoxList
        refetch={refetch}
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
        data={userchatlist?.chats}
      />
      <div className="relative flex flex-row items-center justify-between rounded-md bg-white pr-5">
        <Link
          to="/employee-access/dashboard"
          className="flex flex-row gap-1 pl-3"
        >
          <div className="mr-2 h-9">
            <img
              src={"/logo.svg"}
              alt="hr mentor"
              className="h-full w-full object-contain"
            />
          </div>
          <span className="font-monorope text-base font-normal">
            Welcome to,
            <h1 className="-mt-0.5 text-base font-semibold">Employee Side</h1>
          </span>
        </Link>
        <div className="items flex gap-x-3">
          {employeemenuitems?.map((item) => (
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
          <div
            onClick={handleNotificationClick}
            className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-100"
          >
            <Bell className="size-5 text-hrmblue" />
            {notifications?.unread_count > 0 && (
              <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-hrmblue text-[0.57rem] font-bold text-white">
                {notifications?.unread_count}
              </div>
            )}
          </div>
          <div
            onClick={handleClick}
            className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-100"
          >
            <MessageSquareText className="size-5 text-hrmblue" />
            {unreadChats > 0 && (
              <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-hrmblue text-[0.57rem] font-bold text-white">
                {unreadChats}
              </div>
            )}
          </div>
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-100">
              <LayoutGrid className="size-5 text-hrmblue" />
            </Menu.Button>
            <Menu.Items className="absolute top-12 z-20 w-36 rounded-lg bg-white p-4 shadow-lg">
              <ul className="flex flex-col gap-5">
                {employeeAccessActivityList?.map((item, index) => (
                  <Menu.Item key={index}>
                    {({ active }) => (
                      <Link
                        to={item.path}
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
                      </Link>
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
}
