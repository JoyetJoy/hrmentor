import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { getmenuitems, getactivityItems } from "@/constants/dummyData";
import { LayoutGrid, MessageSquareText, Bell } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";
import { useRoleStore, useUserStore } from "@/lib/slices/auth.slice";
import ChatBoxList from "@/components/popups/employee_access/chat/ChatBoxList";
import Notification from "@/components/popups/notification";
import { NOTIFICATIONS } from "@/api/hiring";
import { useQuery } from "@tanstack/react-query";
import { ALL_CHAT_LIST, newRequest } from "@/api";

export const AdminHeader = ({ permissions }) => {
  const { setUser, user } = useUserStore((state) => ({
    setUser: state.setUser,
    user: state.user,
  }));

  const { role } = useRoleStore((state) => ({
    role: state.role,
  }));

  const menuitems = getmenuitems(permissions);
  const activityItems = getactivityItems(permissions);
  const location = useLocation();
  const navigate = useNavigate();
  const [popupOpen, setPopupOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationPopupOpen, setNotificationPopupOpen] = useState(false);

  const { data: adminchatlist, refetch } = useQuery({
    queryKey: ["adminchatlist", user?.id],
    queryFn: () =>
      newRequest.get(ALL_CHAT_LIST).then((res) => {
        // setNotifications(res.data)
        return res.data;
      }),
    enabled: !!user?.id,
  });

  const { data: notification, isLoading } = useQuery({
    queryKey: ["notification", user?.id],
    queryFn: () =>
      newRequest.get(NOTIFICATIONS).then((res) => {
        setNotifications(res.data);
        return res.data;
      }),
    enabled: !!user?.id,
  });

  const handleClick = () => {
    setPopupOpen(true);
  };
  const handleNotificationClick = () => {
    setNotificationPopupOpen(true);
  };
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
      <ChatBoxList
        refetch={refetch}
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
        data={adminchatlist?.chats}
        type={'admin'}
      />
      <Notification
        userId={user?.id}
        type={'admin'}
        notifications={notifications}
        notificationPopupOpen={notificationPopupOpen}
        setNotificationPopupOpen={setNotificationPopupOpen}
      />
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
            Welcome to,
            <h1 className="-mt-0.5 text-base font-semibold">Admin Side</h1>
          </span>
        </Link>
        <div className="items flex gap-x-3">
          {menuitems?.map((item) => (
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
          {/* {role.includes(1) && ( */}
            <>
              <div
                onClick={handleNotificationClick}
                className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-100"
              >
                <Bell className="size-5 text-hrmblue" />
                {notification?.unread_count > 0 && (
                  <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-hrmblue text-[0.57rem] font-bold text-white">
                    {notification?.unread_count}
                  </div>
                )}
              </div>
              <div
                onClick={handleClick}
                className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-100"
              >
                <MessageSquareText className="size-5 text-hrmblue" />
                {adminchatlist?.employee_unread_count > 0 && (
                  <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-hrmblue text-[0.57rem] font-bold text-white">
                    {adminchatlist.employee_unread_count}
                  </div>
                )}
              </div>
            </>
          {/* )} */}
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-100">
              <LayoutGrid className="size-5 text-hrmblue" />
            </Menu.Button>

            <Menu.Items className="absolute top-12 z-30 w-36 rounded-lg bg-white p-4 shadow-lg">
              <ul className="flex flex-col gap-5">
                {activityItems?.map((item, index) => (
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
                            className="h-full w-full object-contain"
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
          <ProfileDropdown
            handleNavigation={handleNavigation}
            user={user}
            permissions={permissions}
          />
        </div>
      </div>
    </>
  );
};
