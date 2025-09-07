import React, { useEffect, useState, useRef } from "react";
import add from "./assets/add.png";
import attach from "./assets/attach.png";
import chat from "./assets/chat.png";
import chatties from "./assets/chatties.png";
import ellipse from "./assets/ellipse.png";
import emoji from "./assets/emoji.png";
import img_1 from "./assets/img_1.png";
import img_2 from "./assets/img_2.png";
import img_3 from "./assets/img_3.png";
import img_4 from "./assets/img_4.png";
import img_5 from "./assets/img_5.png";
import img_6 from "./assets/img_6.png";
import message from "./assets/message.png";
import more from "./assets/more.png";
import phone from "./assets/phone.png";
import pin from "./assets/pin.png";
import rectangle from "./assets/rectangle.png";
import solid_voice from "./assets/solid_voice.png";
import telegram from "./assets/telegram.png";
import video from "./assets/video.png";
import grace from "./assets/grace.png";
import you from "./assets/you.png";

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("chat_current_user")) || null;
    } catch (e) {
      return null;
    }
  });

  const [authForm, setAuthForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isRegister, setIsRegister] = useState(false);

  const demoUsers = [
    {
      id: 1,
      name: "Liam Anderson",
      status: "online",
      avatar: img_1,
    },
    {
      id: 2,
      name: "Lucas Williams",
      status: "offline",
      avatar: img_2,
    },
    {
      id: 3,
      name: "Grace Miller",
      status: "online",
      avatar: grace,
    },
    {
      id: 4,
      name: "Sophia Chen",
      status: "offline",
      avatar: img_4,
    },
    {
      id: 5,
      name: "Ethan Johnson",
      status: "online",
      avatar: img_5,
    },
    {
      id: 6,
      name: "Isabella Brown",
      status: "offline",
      avatar: img_6,
    },
    {
      id: 7,
      name: "Mason Davis",
      status: "online",
      avatar: ellipse,
    },
    {
      id: 8,
      name: "Olivia Foster",
      status: "offline",
      avatar: img_3,
    },
  ];

  const defaultMessages = [
    {
      id: 1,
      sender: "Grace Miller",
      content: "Hi Jack! I'm doing well, thanks. Can't wait for the weekend!",
      timestamp: new Date(),
    },
    {
      id: 2,
      sender: "You",
      content:
        " I know, right? Weekend plans are the best. Any exciting plans on your end?",
      timestamp: new Date(new Date().getTime() + 1000),
    },
  ];

  const [contacts] = useState(demoUsers);
  const [activeContact, setActiveContact] = useState(contacts[2]);
  const [messages, setMessages] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("chat_messages")) || defaultMessages
      );
    } catch (e) {
      return defaultMessages;
    }
  });

  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("chat_messages", JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (user) localStorage.setItem("chat_current_user", JSON.stringify(user));
    else localStorage.removeItem("chat_current_user");
  }, [user]);

  function handleSend(e) {
    e?.preventDefault();
    if (!input.trim()) return;
    const newMsg = {
      id: Date.now(),
      sender: user ? user.username : "You",
      content: input.trim(),
      timestamp: new Date(),
      avatar: user ? user.avatar : you,
    };
    setMessages((m) => [...m, newMsg]);
    setInput("");
  }

  function handleRegisterOrLogin(e) {
    e.preventDefault();
    if (isRegister) {
      const newUser = {
        username: authForm.username,
        email: authForm.email,
        avatar: authForm.avatar || you, // default if none uploaded
      };
      setUser(newUser);
    } else {
      const loginUser = {
        username: authForm.username,
        email: authForm.email,
        avatar: authForm.avatar || you,
      };
      setUser(loginUser);
    }
    setAuthForm({ username: "", email: "", password: "", avatar: null });
  }

  function handleLogout() {
    setUser(null);
  }

  const formatTime = (d) => {
    try {
      const dt = new Date(d);
      return dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch (e) {
      return "";
    }
  };

  // --- Authentication Page ---
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
          <form onSubmit={handleRegisterOrLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={authForm.username}
              onChange={(e) =>
                setAuthForm((s) => ({ ...s, username: e.target.value }))
              }
              className="w-full p-3 border rounded"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={authForm.email}
              onChange={(e) =>
                setAuthForm((s) => ({ ...s, email: e.target.value }))
              }
              className="w-full p-3 border rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={authForm.password}
              onChange={(e) =>
                setAuthForm((s) => ({ ...s, password: e.target.value }))
              }
              className="w-full p-3 border rounded"
              required
            />

            {/* 👇 Move file upload to the bottom */}
            <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
              {isRegister && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setAuthForm((s) => ({ ...s, avatar: reader.result }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full p-3 border rounded"
                />
              )}
            </h2>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded"
            >
              {isRegister ? "Register" : "Login"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => setIsRegister((v) => !v)}
              className="text-sm text-gray-500 underline"
            >
              {isRegister
                ? "Already have an account? Login"
                : "Need an account? Register"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Chat Page ---
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r-[0.5px] border-gray-200 hidden md:block">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={chat} />
            <img src={chatties} />
          </div>
          <div>
            <div className="text-sm">
              <div className="font-medium">{user.username}</div>
              <button
                onClick={handleLogout}
                className="mt-1 text-xs text-red-500 hover:underline"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4">
            <input
              placeholder="Search messages, people"
              className="w-full rounded p-2 border text-sm"
            />
          </div>
          <img src={add} height={40} width={40} />
        </div>

        <div className="p-4">
          <div className="text-xs text-gray-400 mb-2 flex items-center gap-3">
            <img src={pin} />
            PINNED CHATS
          </div>
          
          <ul className="space-y-3">
            {contacts.slice(0, 3).map((c) => (
              <li
                key={c.id}
                onClick={() => setActiveContact(c)}
                className={`flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 ${
                  activeContact?.id === c.id ? "bg-blue-50" : ""
                }`}
              >
                <img
                  src={c.avatar}
                  className="w-10 h-10 rounded-full object-cover"
                  alt="avatar"
                />

                <div>
                  <div className="font-medium text-sm">{c.name}</div>
                  <div
                    className={`text-xs  ${
                      activeContact?.id === c.id
                        ? "text-blue-400"
                        : "text-gray-400"
                    }`}
                  >
                    {c.status}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          
        </div>

        <div className="p-4 border-t-[0.5px] border-gray-100">
          <div className="text-xs text-gray-400 mb-2 flex items-center gap-3">
            <img src={message} />
            ALL MESSAGES
          </div>
          <ul className="space-y-3">
            {contacts.map((c) => (
              <li
                key={c.id}
                onClick={() => setActiveContact(c)}
                className="flex items-center gap-3 p-2 rounded hover:bg-gray-50 cursor-pointer"
              >
                <img
                  src={c.avatar}
                  className="w-10 h-10 rounded-full object-cover"
                  alt="avatar"
                />
                <div>
                  <div className="font-medium text-sm">{c.name}</div>
                  <div className="text-xs text-gray-400 truncate w-44">
                    Last message preview...
                  </div>
                </div>
                <div className="ml-auto text-xs text-gray-400">08:45 PM</div>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main chat area */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white border-b-1-opacity-50">
          <div className="flex items-center gap-3">
            <img
              src={activeContact?.avatar}
              className="w-12 h-12 rounded-full object-cover"
              alt="active avatar"
            />
            <div>
              <div className="font-semibold text-gray-500 ">
                {activeContact?.name}
              </div>
              <div className="text-xs text-blue-400">
                {activeContact?.status}
              </div>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-gray-500">
            <button className="p-2 rounded hover:bg-gray-100">
              <img src={phone} height={30} width={30} />
            </button>
            <button className="p-2 rounded hover:bg-gray-100">
              <img src={video} height={30} width={30} />
            </button>
            <button className="p-2 rounded hover:bg-gray-100">
              <img src={more} height={30} width={30} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-auto p-6 bg-gray-100">
          <div className="max-w-3xl mx-auto">
            {messages.map((m) => {
              const mine = (user ? user.username : "You") === m.sender;
              const displayName = mine ? "You" : activeContact?.name;

              return (
                <div
                  key={m.id}
                  className={`mb-4 transition-all duration-300 ease-in-out transform ${
                    mine ? "animate-slideInRight" : "animate-slideInLeft"
                  }`}
                >
                  {/* Name + Avatar + Timestamp Row */}
                  <div
                    className={`flex items-center ${
                      mine ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!mine && (
                      <img
                        src={activeContact?.avatar}
                        alt={displayName}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                    )}
                    <span className="text-sm text-gray-500">{displayName}</span>
                    <span className="text-xs text-gray-400 ml-2">
                      {formatTime(m.timestamp)}
                    </span>
                    {mine && (
                      <img
                        src={m.avatar || you}
                        alt={displayName}
                        className="w-8 h-8 rounded-full ml-2"
                      />
                    )}
                  </div>

                  {/* Message Bubble directly under name with left margin */}
                  <div
                    className={`flex ${mine ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`p-3 rounded-lg shadow-sm mt-1 transition duration-200 ${
                        mine
                          ? "bg-[#00A3FF] text-white shadow-md hover:shadow-lg"
                          : "bg-white border border-gray-200 shadow-sm hover:shadow-md"
                      } max-w-md ${mine ? "mr-10" : "ml-10"}`}
                    >
                      <div className="text-sm">{m.content}</div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t-1-opacity-50">
          <form
            onSubmit={handleSend}
            className="max-w-3xl mx-auto flex gap-3 items-center"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-3 rounded border"
            />
            <img src={emoji} height={30} width={30} />
            <img src={attach} height={30} width={30} />
            <button
              className="px-4 py-2 bg-[#00A3FF] text-white rounded-md flex items-center gap-2"
              type="submit"
            >
              Send
              <img src={telegram} height={20} width={20} />
            </button>
          </form>
        </div>
      </main>

      <div className="md:hidden fixed bottom-4 right-4">
        <button
          onClick={() => alert("Open mobile chat — demo")}
          className="bg-blue-600 p-4 rounded-full text-white shadow-lg"
        >
          💬
        </button>
      </div>
    </div>
  );
}
