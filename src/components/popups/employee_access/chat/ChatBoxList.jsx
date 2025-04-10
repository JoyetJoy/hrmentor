import { Dialog, DialogPanel, RadioGroup } from '@headlessui/react'
import { Search, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import ChatView from './ChatView';
import { formatLastMessageTime } from '@/utils/helpers';
import Pusher from 'pusher-js';
import { useUserStore } from '@/lib/slices/auth.slice';

export default function ChatBoxList({ data, popupOpen, setPopupOpen }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [chatPopupOpen,setChatPopupOpen] =useState(false); 
    const [keyword, setKeyword] = useState('');
    const [chats, setChats] = useState([]);

    const {user } = useUserStore((state) => ({
          user: state.user,
        }));
console.log(user?.user?.id);

    useEffect(() => {
        if (!user?.user?.id && popupOpen) return; // Prevent subscription if user ID is missing
      console.log('getin');
      
        const token =
          localStorage.getItem("super_token") ||
          localStorage.getItem("hr_token") ||
          localStorage.getItem("manager_token") ||
          localStorage.getItem("employee_token");
      
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
      
        console.log("Subscribing to:", `private-chat.${user?.id}`);
      
        // Subscribe to the private channel
        const channel = pusher.subscribe(`private-chat.${user?.user?.id}`);
      
        pusher.connection.bind("state_change", function (states) {
          console.log("Pusher State Changed:", states);
        });
        
        pusher.connection.bind("error", function (err) {
          console.error("Pusher Error:", err);
        });
    
        
        // channel.bind("App\\Events\\NewChatMessage", (data) => {
        //   console.log("Received a new notification:", data);
      
        //   const message = {
        //     "id": data?.latest_unread_notification?.id,
        //     "user_id": data?.latest_unread_notification?.user_id,
        //     "type": data?.latest_unread_notification?.type,
        //     "title": "Title Available",
        //     "data": data?.latest_unread_notification?.data?.message,
        //     "read_at": true,
        //     "created_at": data?.latest_unread_notification?.created_at
        // }
        //   setNotification((prevNotifications) => [
        //     message,
        //     ...prevNotifications,
        //   ]);
        // });
      
        // pusher.connection.bind("error", (err) => {
        //   console.error("Pusher Error:", err);
        // });
      
        // Cleanup
        // return () => {
        //   console.log("Unsubscribing from:", `private-chat.${user?.user?.id}`);
        //   channel.unbind_all();
        //   channel.unsubscribe();
        //   pusher.disconnect();
        // };
      }, [user?.user?.id]);
      

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
      console.log(selectedUser);
      
  return (
    <>
    <ChatView chatPopupOpen={chatPopupOpen} setChatPopupOpen={setChatPopupOpen} selectedUser={selectedUser}/> 
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
                        <span className='w-4 h-4 rounded-full bg-green-600 text-white text-xs flex items-center justify-center font-semibold'>{user?.unread_count}</span>
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
