import { Dialog, DialogPanel, RadioGroup } from '@headlessui/react'
import { Filter, Search, X } from 'lucide-react'
import React, { useState } from 'react'
import ChatView from './ChatView';

export default function ChatBoxList({ popupOpen, setPopupOpen }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [chatPopupOpen,setChatPopupOpen] =useState(false); 

    function close() {
        setPopupOpen(false);
        reset();
      }
      const handleClick = () =>{
        setChatPopupOpen(true)
      }
  return (
    <>
    <ChatView chatPopupOpen={chatPopupOpen} setChatPopupOpen={setChatPopupOpen}/> 
    <Dialog
      open={popupOpen}
      as="div"
      className="relative z-10"
      onClose={close}
    >
      <div className="fixed inset-0 z-10 h-screen w-screen overflow-y-auto bg-black/20">
        <div className="flex min-h-full items-left justify-end">
          <DialogPanel className="w-full max-w-sm rounded bg-white px-10 py-10">
            <div className="mb-5 flex justify-between">
              <h1 className="text-base font-bold">Chat</h1>
              <button onClick={close}>
                <X />
              </button>
            </div>
            <div className=" bg-white shadow-sm flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <div className="input flex h-10 min-h-10 w-80 items-center gap-2 border border-gray-platinum text-sm outline-none placeholder:text-black hover:border-gray-platinum">
              <Search className="text-dark size-4" />
              <input
                type="text"
                onChange={(e) => setKeyword(e.target.value)}
                className="placeholder:text-dark h-full w-full placeholder:text-sm"
                placeholder="Search"
              />
            </div>
            <div className="h-10 min-h-10 rounded-md border border-gray-platinum bg-white p-3">
              <Filter className="size-4" />
            </div>{" "}
          </div>
          <RadioGroup value={selectedUser} onChange={setSelectedUser} className="flex flex-col gap-3">
            {["Robert Fox", "Philip", "Randall", "Cody"].map((user, idx) => (
              <RadioGroup.Option
                key={idx}
                value={user}
                className="group cursor-pointer"
              >
                {({ checked, disabled }) => (
                  <div
                  onClick={handleClick}
                    className={`flex items-center justify-between gap-1 rounded-md border p-3 ${
                      disabled
                        ? "bg-gray-lightcool text-gray-500 cursor-not-allowed"
                        : checked
                        ? "bg-hrmprimaryorange/15 border-hrmprimaryorange"
                        : "bg-gray-lightcool border-gray-lightcool"
                    }`}
                  >
                    <div className="h-9 w-10 rounded-full bg-gray-lightcool">
                      <img
                        src="/assets/images/employee_access/profile.png"
                        alt="profile-image"
                      />
                    </div>
                    <div className="flex w-full items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">{user}</h3>
                        <p className="text-xs text-gray-500">UI/UX Design Intern</p>
                      </div>
                      <span className="text-xs text-gray-400">03:22</span>
                    </div>
                  </div>
                )}
              </RadioGroup.Option>
            ))}
          </RadioGroup>
        </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  </>
  )
}
