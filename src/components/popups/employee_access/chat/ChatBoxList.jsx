import { Dialog, DialogPanel, RadioGroup } from '@headlessui/react'
import { Search, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import ChatView from './ChatView';
import { formatLastMessageTime } from '@/utils/helpers';

export default function ChatBoxList({ data, popupOpen, setPopupOpen, refetch }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [chatPopupOpen,setChatPopupOpen] =useState(false); 
    const [keyword, setKeyword] = useState('');
    const [chats, setChats] = useState([]);
    function close() {
        setPopupOpen(false);
      }
      const handleClick = () =>{
        setChatPopupOpen(true)
      }

      useEffect(() => {
        if (keyword) {
          const filteredUsers = data.filter((user) =>
            user.name.toLowerCase().includes(keyword.toLowerCase())
          );
      
          setChats(filteredUsers);
        } else {
          setChats(data); // show all if no keyword
        }
      }, [keyword, data]);
      
  return (
    <>
    <ChatView chatPopupOpen={chatPopupOpen} setChatPopupOpen={setChatPopupOpen} selectedUser={selectedUser} refetch={refetch}/> 
    <Dialog
      open={popupOpen}
      as="div"
      className="relative z-40"
      onClose={close}
    >
      <div className="fixed inset-0 z-40 h-screen w-screen overflow-y-auto bg-black/10">
        <div className="flex min-h-full items-left justify-end">
          <DialogPanel className="w-full max-w-sm rounded bg-white px-10 py-10">
            <div className="mb-5 flex justify-between">
              <h1 className="text-base font-bold">Chat</h1>
              <button onClick={close}>
                <X  className='text-black/50'/>
              </button>
            </div>
            <div className=" bg-white shadow-sm flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <div className="input flex h-10 min-h-10 w-80 items-center gap-2 border border-gray-platinum text-sm outline-none placeholder:text-black hover:border-gray-platinum">
              <Search className="text-dark size-4" />
              <input
                type="text"
                onChange={(e) => setKeyword(e.target.value)}
                value={keyword}
                className="placeholder:text-dark h-full w-full placeholder:text-sm"
                placeholder="Search"
              />
              {keyword?.length>0 &&
              <X  className='text-black/50' onClick={()=> setKeyword('')}/>
              }
              
            </div>
            {/* <div className="h-10 min-h-10 rounded-md border border-gray-platinum bg-white p-3">
              <Filter className="size-4" />
            </div>{" "} */}
          </div>
          <RadioGroup value={selectedUser} onChange={setSelectedUser} className="flex flex-col gap-3">
            {chats?.map((user, idx) => (
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
                    <div className="h-9 w-10 rounded-full bg-gray-lightcool overflow-hidden">
                      <img
                        src={user?.profile_image}
                        alt="profile-image"
                      />
                    </div>
                    <div className="flex w-full items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">{user?.name}</h3>
                        <p className="text-xs text-gray-500">{user?.designation}</p>
                      </div>
                      <div className='flex flex-col items-center'>
                      <span className={`text-xs ${user?.unread_count>0 ? 'text-green-600 font-semibold':'text-gray-500'}`}>{formatLastMessageTime(user?.last_message_time)}</span>
                      {user?.unread_count>0 && (
                        <span className='w-5 h-5 rounded-full bg-green-600 text-white text-xs flex items-center justify-center font-semibold'>{user?.unread_count}</span>
                      )}
                      </div>
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
