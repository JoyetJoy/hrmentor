import { newRequest } from "@/api";
import { GET_USER } from "@/api/auth";
import { READ_NOTIFICATION } from "@/api/hiring";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { LogIn, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import echo from "@/utils/reverb";
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
  const [notification,setNotification] = useState('');
  const {user } = useUserStore((state) => ({
      user: state.user,
    }));

    

  
  // useEffect(() => {
  //   if (window.Echo) {
  //     window.Echo.private(`notification-${user_id}`).notification(
  //       (notification) => {
  //         console.log("New Notification:", notification);
         
  //       },
  //     );
  //   }
  // }, []);

  useEffect(() => {
  
    // Get the token properly before using it
const token =
  localStorage.getItem("super_token") ||
  localStorage.getItem("hr_token") ||
  localStorage.getItem("manager_token") ||
  localStorage.getItem("employee_token");

const pusher = new Pusher("469a7dd00053f2be95f4", {
  cluster: "ap2",
  forceTLS: true,
  encrypted: true,
  
  // Change this to your production URL
  authEndpoint: "https://hr-mentor.techbutomy.com/broadcasting/auth",
  auth: {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  },
});

// Subscribe to the private channel
const channel = pusher.subscribe(`private-notification.${user?.id}`);
  
    // Listen for the NotificationSent event
    channel.bind("NotificationSent", (data) => {
      console.log("Received a new notification:", data);
  
      // Update the notifications state with the new notification
      setNotification((prevNotifications) => [
        data.latest_unread_notification,
        ...prevNotifications,
      ]);
    });
  
    // Cleanup on unmount
    return () => {
      channel.unbind("NotificationSent");
      pusher.unsubscribe(`private-notification.${user?.id}`);
      pusher.disconnect(); // Ensure clean disconnection
    };
  }, [user?.id]); // Consider adding `userId` or `token` as dependencies if they change
  

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
                  {notifications?.data?.map((notification) => (
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
                  {notifications?.data?.length > 0 ? (
                    <div className="mt-4 text-right">
                      <Link
                        to="/admin/notification"
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
