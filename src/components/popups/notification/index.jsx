import { Dialog, DialogPanel } from "@headlessui/react";
import { X } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function Notification({
  notificationPopupOpen,
  setNotificationPopupOpen,
}) {
  function close() {
    setNotificationPopupOpen(false);
    reset();
  }
  const notifications = [
    {
      id: 1,
      title: "Ameya responded to your offer letter",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim",
      time: "8h ago",
    },
    {
      id: 2,
      title: "Ameya responded to your offer letter",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim",
      time: "Today",
    },
    {
      id: 3,
      title: "Ameya responded to your offer letter",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim",
      time: "1 Week ago",
    },
  ];
  return (
    <>
      <Dialog
        open={notificationPopupOpen}
        as="div"
        className="relative z-10"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 h-screen w-screen overflow-y-auto bg-black/10">
          <div className="flex min-h-full items-center justify-center">
            <DialogPanel className="ml-96 w-full max-w-md rounded bg-white px-7 pb-3 pt-6">
              <div className="mb-3 flex justify-between">
                <h1 className="text-base font-bold">Notification</h1>
                <button onClick={close}>
                  <X className="text-black/50" />
                </button>
              </div>
              <div className="flex flex-1 flex-col gap-3">
                <div className="mx-auto max-w-md p-4">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="mb-4 border-b border-gray-200 pb-4"
                    >
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-red-500"></div>
                        <h4 className="text-sm font-semibold text-black">
                          {notification.title}
                        </h4>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">
                        {notification.description}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        {notification.time}
                      </p>
                    </div>
                  ))}
                  <div className="mt-4 text-right">
                    <Link
                      to="/admin/notification"
                      onClick={close}
                      className="text-sm font-semibold text-hrmprimaryorange"
                    >
                      Show all notifications
                    </Link>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
