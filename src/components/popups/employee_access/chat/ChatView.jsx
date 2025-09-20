import { CHAT, CHAT_WITH_USER, newRequest, READ_CHAT } from "@/api";
import { useRoleStore, useUserStore } from "@/lib/slices/auth.slice";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { Send, X } from "lucide-react";
import Pusher from "pusher-js";
import React, { useEffect, useRef, useState } from "react";
const url = import.meta.env.VITE_CHAT_URL;

export default function ChatView({
  refetch,
  chatPopupOpen,
  setChatPopupOpen,
  selectedUser,
  type
}) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [replay, setReplay] = useState(false);
  const messagesEndRef = useRef(null);
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));

  const { role } = useRoleStore((state) => ({
    role: state.role,
  }));

  const { data: readchat } = useQuery({
    queryKey: ["readchat", selectedUser?.last_message?.id], // helps caching per user
    queryFn: async () => {
      const res = await newRequest.post(READ_CHAT,{chat_id:selectedUser.last_message?.id}
      );
      refetch();
      return res.data;
    },
    enabled: selectedUser?.unread_count !== 0,
  });

const { data: chatlist, refetch:chatrefetch } = useQuery({
  queryKey: ["chatlist", selectedUser?.user_id, chatPopupOpen],
  queryFn: async () => {
    const res = await newRequest.get(`${CHAT_WITH_USER}/${selectedUser.user_id}`);
    return res.data;
  },
  enabled: !!selectedUser?.user_id && chatPopupOpen,
});

useEffect(() => {
  if (chatPopupOpen && selectedUser?.user_id) {
    chatrefetch(); // manually refetch when popup opens
  }
}, [chatPopupOpen, selectedUser?.user_id]);

  useEffect(() => {
    if (chatPopupOpen && (chatlist?.data?.length > 0 ||messages)) {
      const timeout = setTimeout(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // slight delay to ensure DOM render
  
      return () => clearTimeout(timeout);
    }
  }, [chatPopupOpen, chatlist?.data, messages]);
  console.log(type);
  
  useEffect(() => {
    if (!user?.user?.id&&type!=='admin') return; // Prevent subscription if user ID is missing

    const token =
      localStorage.getItem("token");
    const id = user?.user?.id ? user?.user?.id : type==='admin' ? 1 :''

    console.log(id);
    
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
    const channel = pusher.subscribe(`private-chat.${id}`);

    pusher.connection.bind("error", function (err) {
      console.error("Pusher Error:", err);
    });

    channel.bind("App\\Events\\NewChatMessage", (data) => {
      const now = data?.data?.created_at;

      // Convert now (string) into a Date object
      const dateObj = new Date(now);

      // Then you can safely use getHours() and getMinutes()
      const formattedTime = `${String(dateObj.getHours()).padStart(2, "0")}:${String(dateObj.getMinutes()).padStart(2, "0")}`;

      const message = {
        content: data?.data?.message,
        senderId: data?.data?.sender_user_id,
        receiverId: data?.data?.reciever_user_id,
        time: formattedTime, // e.g., "14:30"
      };

      setMessages((prevMessages) => {
        return [...prevMessages, message];
      });
    });

    pusher.connection.bind("error", (err) => {
      console.error("Pusher Error:", err);
    });

    // Cleanup()
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [user?.user?.id||type==='admin']);

  function close() {
    setMessages([]);
    setChatPopupOpen(false);
  }

  const handleSend = async (e) => {
    e.preventDefault();
    const id= role.includes(1)? user?.id : user?.employee_data?.user_id
    const data = {
      sender_user_id: id,
      sender_employee_id: user?.employee_data?.id,
      reciever_user_id: selectedUser?.user_id,
      // reciever_employee_id: selectedUser?.employee_id,
      message: newMessage,
    };
    const now = new Date();
    const formattedTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const message = {
      content: newMessage,
      senderId: user?.employee_data?.user_id,
      receiverId: selectedUser?.user_id,
      time: formattedTime, // e.g., "14:30"
    };

    try {
      const response = await newRequest.post(CHAT, data);
      setNewMessage("");
      // Avoid duplicate messages by checking IDs
      setMessages((prevMessages) => {
        return [...prevMessages, message];
      });

      // Scroll to bottom for new messages
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <>
      <Dialog
        open={chatPopupOpen}
        as="div"
        className="relative z-50"
        onClose={close}
      >
        <div className="fixed inset-0 z-50 h-screen w-screen overflow-y-auto">
          <div className="relative min-h-full">
            <DialogPanel className="absolute max-h-[45rem] bottom-2 right-[24.5rem] w-full max-w-md rounded bg-white px-7 pb-3 pt-6">
              <div className="mb-3 flex justify-between">
                <div className="flex items-center gap-1">
                  <div className="h-10 w-10 overflow-hidden rounded-full">
                    <img
                      src={selectedUser?.profile_image || "/assets/images/profile.jpg"}
                      alt="profile-image"
                    />
                  </div>
                  <h3 className="text-sm font-medium">{selectedUser?.name}</h3>
                </div>
                <button onClick={close}>
                  <X className="text-black/50" />
                </button>
              </div>
              <div className="flex flex-1 flex-col gap-3">
                <div className="max-h-[30rem] flex-1 overflow-y-auto rounded-md border p-4" >
                  {chatlist && (
                    <>
                      {chatlist.data?.map((msg, outerIndex) => (
                        <div
                          className="flex flex-col space-y-4"
                          key={outerIndex}
                        >
                          <p className="flex justify-center py-2 text-[12px] text-slate-400">
                            {msg?.date}
                          </p>

                          {msg?.messages?.map((message, innerIndex) => {
                            const isSentByCurrentUser =
                              message.senderId !== selectedUser?.user_id; // Check if the message was sent by the user

                            return (
                              <div key={innerIndex}>
                                <div
                                  className={`flex ${
                                    isSentByCurrentUser
                                      ? "justify-end"
                                      : "justify-start"
                                  } mb-[0.15rem]`}
                                >
                                  <div className="flex justify-end">
                                    <p
                                      className={`max-w-xs rounded-lg p-3 text-sm text-black shadow-sm ${
                                        isSentByCurrentUser
                                          ? "bg-[#e5e7eb]"
                                          : "bg-[#f0f8ff]"
                                      }`}
                                    >
                                      {message.content}
                                      <span
                                        className={`mt-1 block text-end text-xs text-[#707171]`}
                                      >
                                        {message.time}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                          {messages.length > 0 &&
                            chatlist?.data?.every(
                              (msg) => msg?.date !== "Today",
                            ) && (
                              <p className="flex justify-center py-2 text-[12px] text-slate-400">
                                Today
                              </p>
                            )}
                        </div>
                      ))}
                      {/* Handle messages from current session */}
                      {messages?.map((msg, index) => {
                        const isSentByCurrentUser =
                          msg.senderId !== selectedUser?.user_id;
                        return (
                          <div key={index}>
                            <div
                              className={`flex ${
                                isSentByCurrentUser
                                  ? "justify-end"
                                  : "justify-start"
                              } mb-[0.15rem] mt-3`}
                            >
                              <div className="flex justify-end">
                                <p
                                  className={`max-w-xs rounded-lg p-3 text-sm text-black shadow-sm ${
                                    isSentByCurrentUser
                                      ? "bg-[#e5e7eb]"
                                      : "bg-[#f0f8ff]"
                                  }`}
                                >
                                  {msg.content}
                                  <span
                                    className={`mt-1 block text-end text-xs text-[#707171]`}
                                  >
                                    {msg.time}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      {/* SCROLL TARGET */}
                      <div ref={messagesEndRef} />
                      {chatlist?.data.length == 0 && messages.length == 0 && (
                        <p className="flex items-center justify-center py-2 text-[12px] text-slate-400">
                          No Messages
                        </p>
                      )}
                    </>
                  )}
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
                    <p className="max-w-xs text-sm">
                      Lorem Ipsum is simply dummy text of the printing and
                    </p>
                  </div>
                )}

                <form
                  onSubmit={handleSend}
                  className="flex items-center gap-4 bg-white py-4"
                >
                  <input
                    type="text"
                    placeholder="Type a message"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="outline-noneplaceholder:text-sm flex-1 rounded-lg bg-gray-darklight p-3 shadow-sm placeholder:text-sm"
                  />
                  <button
                    type="submit"
                    className="bg-orange-400 hover:bg-orange-500 flex items-center gap-2 rounded-lg bg-hrmprimaryorange px-4 py-3 text-white shadow-md"
                  >
                    <Send size={16} />
                    Send
                  </button>
                </form>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
