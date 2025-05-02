import { newRequest } from "@/api";
import { GET_USER } from "@/api/auth";
import { READ_NOTIFICATION } from "@/api/hiring";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { LogIn, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "@/lib/slices/auth.slice";
import Pusher from "pusher-js";

export default function Notification({
  notifications,
  notificationPopupOpen,
  setNotificationPopupOpen,
}) {
  function close() {
    setNotificationPopupOpen(false);
  }
  const [notification,setNotification] = useState();
  const {user } = useUserStore((state) => ({
      user: state.user,
    }));

    useEffect(()=>{
      setNotification(notifications)
    },[notifications])

  useEffect(() => {
    if (!user?.user?.id ) return; // Prevent subscription if user ID is missing
  
    const token =
      localStorage.getItem("token");
  
    const pusher = new Pusher("469a7dd00053f2be95f4", {
      cluster: "ap2",
      forceTLS: true,
      encrypted: true,
      enabledTransports: ["ws", "wss"],
      authEndpoint: "https://hr-mentor.techbutomy.com/broadcasting/auth",
      auth: {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      },
    });
  
    console.log("Subscribing to:", `private-notification.${user?.user?.id}`);
  
    // Subscribe to the private channel
    const channel = pusher.subscribe(`private-notification.${user?.user?.id}`);
  
    pusher.connection.bind("state_change", function (states) {
      console.log("Pusher State Changed:", states);
    });
    
    pusher.connection.bind("error", function (err) {
      console.error("Pusher Error:", err);
    });

    
    channel.bind("App\\Events\\NotificationSent", (data) => {
      console.log("Received a new notification:", data);
  
      const message = {
        "id": data?.latest_unread_notification?.id,
        "user_id": data?.latest_unread_notification?.user_id,
        "type": data?.latest_unread_notification?.type,
        "title": "Title Available",
        "data": data?.latest_unread_notification?.data?.message,
        "read_at": true,
        "created_at": data?.latest_unread_notification?.created_at
    }
      setNotification((prevNotifications) => [
        message,
        ...prevNotifications,
      ]);
    });
  
    pusher.connection.bind("error", (err) => {
      console.error("Pusher Error:", err);
    });
  
    // Cleanup
    return () => {
      console.log("Unsubscribing from:", `private-notification.${user?.user?.id}`);
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [user?.user?.id]);
  
const handleClick = async (notificationId) => {
  if (!notificationId) return;
  const data ={
    notification_id:notificationId
  }
  try {
    const response = await newRequest.post(READ_NOTIFICATION,data);
    
    if (response.status === 200) {
      console.log("Notification marked as read", response.data);
      close();
    }
  } catch (error) {
    console.error("Error marking notification as read:", error);
  }
};

console.log(notification);

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
                    <Link
                      to={'/admin/leave/request/awaitingapproval'}
                      onClick={()=>handleClick(notification?.id)}
                      key={notification?.id}
                      className="mb-4 border-b border-gray-200 pb-4"
                    >
                      <div className="flex items-start gap-2">
                        <div className="min-h-10 min-w-10 rounded-full text-center justify-center text-white flex items-center bg-red-500  mt-2">N</div>
                        <div className="flex flex-col border-b border-gray-200 py-2 w-full">
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
                      </div>
                    </Link>
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
