import { Dialog, DialogPanel } from "@headlessui/react";
import { Send, X } from "lucide-react";
import React, { useState } from "react";

export default function ChatView({ chatPopupOpen, setChatPopupOpen }) {
  function close() {
    setChatPopupOpen(false);
    reset();
  }

  const [replay, setReplay] = useState(false);

  return (
    <>
      <Dialog
        open={chatPopupOpen}
        as="div"
        className="relative z-10"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 h-screen w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center">
            <DialogPanel className="w-full max-w-xl rounded bg-white px-7 pb-7 pt-10">
              <div className="mb-5 flex justify-between">
                <div className="flex items-center gap-1">
                  <div className="h-9 w-10 rounded-full">
                    <img
                      src="/assets/images/employee_access/profile.png"
                      alt="profile-image"
                    />
                  </div>
                  <h3 className="text-sm font-medium">KP</h3>
                </div>
                <button onClick={close}>
                  <X />
                </button>
              </div>
              <div className="flex flex-1 flex-col gap-3">
                <div className="flex-1 overflow-y-auto rounded-md border p-4">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-start gap-3 w-full">
                      <p className="max-w-sm rounded-lg bg-bluesoft p-3 text-sm shadow-sm">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry’s standard dummy text ever since the 1500s.
                        <span className="mt-1 block text-end text-xs text-gray-500">
                          Today | 03:22
                        </span>
                      </p>
                      {/* Replay button */}
                      <div
                        onClick={() => setReplay(true)}
                        className="cursor-pointer rounded-full bg-bluesoft p-2"
                      >
                        <img
                          src="/assets/icons/employee_access/header/share.svg"
                          className="h-4 w-4"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <p className="max-w-sm rounded-lg bg-gray-200 p-3 text-sm shadow-sm">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry’s standard dummy text ever since the 1500s.
                        <span className="mt-1 block text-end text-xs text-gray-500">
                          Today | 03:22
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                {replay && (
                  <div className="flex flex-col items-start justify-start gap-3 rounded-lg bg-bluesoft p-3">
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center gap-2 rounded-full bg-bluesoft p-2">
                        <img
                          src="/assets/icons/employee_access/header/share.svg"
                          className="h-5 w-5"
                          alt=""
                        />
                        <h3 className="text-sm font-medium">Replay</h3>
                      </div>
                      <X
                        className="size-5 cursor-pointer text-black/50"
                        onClick={() => setReplay(false)} 
                      />
                    </div>
                    <p className="max-w-sm text-sm">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-4 bg-white py-4">
                  <input
                    type="text"
                    placeholder="Type a message"
                    className="outline-noneplaceholder:text-sm flex-1 rounded-lg bg-gray-darklight p-3 shadow-sm placeholder:text-sm"
                  />
                  <button className="bg-orange-400 hover:bg-orange-500 flex items-center gap-2 rounded-lg bg-hrmprimaryorange px-4 py-3 text-white shadow-md">
                    <Send size={16} />
                    Send
                  </button>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
