import { newRequest } from "@/api";
import { GET_USER } from "@/api/auth";
import { READ_NOTIFICATION } from "@/api/hiring";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { LogIn, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "@/lib/slices/auth.slice";
import Pusher from "pusher-js";
const url = import.meta.env.VITE_CHAT_URL;

export default function Notification({
  notifications,
  type,
  notificationPopupOpen,
  setNotificationPopupOpen,
}) {
  function close() {
    setNotificationPopupOpen(false);
  }
  const [notification, setNotification] = useState();
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));
  const navigate = useNavigate();

  useEffect(() => {
    setNotification(notifications);
  }, [notifications]);

  useEffect(() => {
    if (!user?.user?.id && type !== "admin") return; // Prevent subscription if user ID is missing

    const token = localStorage.getItem("token");
    const id = user?.user?.id ? user.user.id : type === "admin" ? 1 : "";

    const pusher = new Pusher("469a7dd00053f2be95f4", {
      cluster: "ap2",
      forceTLS: true,
      encrypted: true,
      enabledTransports: ["ws", "wss"],
      authEndpoint: `${url}/broadcasting/auth`,
      auth: {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      },
    });

    // Subscribe to the private channel
    const channel = pusher.subscribe(`private-notification.${id}`);

    pusher.connection.bind("error", function (err) {
      console.error("Pusher Error:", err);
    });

    channel.bind("App\\Events\\NotificationSent", (data) => {
      const message = {
        id: data?.latest_unread_notification?.id,
        user_id: data?.latest_unread_notification?.user_id,
        type: data?.latest_unread_notification?.type,
        title: "Title Available",
        data: data?.latest_unread_notification?.data?.message,
        read_at: true,
        created_at: data?.latest_unread_notification?.created_at,
      };
      setNotification((prevNotifications) => [message, ...prevNotifications]);
    });

    pusher.connection.bind("error", (err) => {
      console.error("Pusher Error:", err);
    });

    // Cleanup
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [user?.user?.id, type === "admin"]);

  const handleClick = async (notificationId,type) => {
    if (!notificationId) return;
    const data = {
      notification_id: notificationId,
    };
    try {
      const response = await newRequest.post(READ_NOTIFICATION, data);

      if (response.status === 200) {
        close();
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
    if(type === "leave_application"){
      navigate("/admin/leave/request/awaitingapproval")
    }
    
  };

  return (
    <>
      <Dialog
        open={notificationPopupOpen}
        as="div"
        className="relative z-30"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 h-screen w-screen overflow-y-auto bg-black/10">
          <div className="flex min-h-full items-center justify-center">
            <DialogPanel className="ml-96 w-full max-w-md rounded bg-white px-7 pb-3 pt-6">
              <div className="mb-3 flex justify-between">
                <h1 className="text-base font-bold">Notifications</h1>
                <button onClick={close}>
                  <X className="text-black/50" />
                </button>
              </div>
              <div className="flex flex-1 flex-col gap-3">
                <div className="overflow-y-min mx-auto max-h-[35rem] w-full overflow-y-auto">
                  {notification?.data?.map((notification) => (
                    <div
                      onClick={() => handleClick(notification?.id,notification?.type)}
                      key={notification?.id}
                      className="mb-4 border-b border-gray-200 pb-4 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <div className="mt-2 flex min-h-10 min-w-10 items-center justify-center rounded-full bg-red-500 text-center text-white">
                          N
                        </div>
                        <div className="flex w-full flex-col border-b border-gray-200 py-2">
                          <h4 className="text-sm font-semibold text-black">
                            {notification.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {notification.data}
                          </p>
                          <p className="mt-1 text-xs text-gray-400">
                            {dayjs(notification.created_at).format(
                              "DD/MM/YYYY",
                            )}
                          </p>
                        </div>
                        <div className="flex h-full items-center justify-center">
                          {!notification.read_at && (
                            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-hrmblue text-[0.57rem] font-bold text-white"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {notification?.data?.length > 0 ? (
                    <div className="mt-4 text-right">
                      <Link
                        to="/employee-access/notifications"
                        onClick={close}
                        className="text-sm font-semibold text-hrmprimaryorange"
                      >
                        Show all notifications
                      </Link>
                    </div>
                  ) : (
                    <div className="mt-4 text-right">
                      <p className="text-sm font-semibold text-hrmprimaryorange">
                        No notifications
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
