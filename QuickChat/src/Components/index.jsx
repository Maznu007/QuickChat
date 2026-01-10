import React, { useState, useRef, useEffect } from "react";
import { ZIM } from "zego-zim-web";
import ChatImg from "../assets/wechat.png";
import logoutImg from "../assets/logout.png";

export default function Index() {
  const [zimInstance, setZimInstance] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState("Bacchu");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const appId = 1332209682;

  const tokenA =
    "04AAAAAGljZIYADIKWv8rI7GPF9QBHOgCxQJqPqZoxTA3DgjCNfIupNG0Y5JChYj2DFkK2Bpt8UPAbgYffvjhpA4iU4ITWId0EH+VxE9mQ2VRc4t4+JvGaSxxC+/vX0tDyoIUQcb1Gf5FORdUxR9bOfhq+49FDDl9nNJ/zUSZ1YrcqUbwBBv2XYsjkL89yg/PRDs5jTHH2umzOmTacVqousr+q8dxCKx8wLgfMK1c7vU7xEd8nmDdK05mWWmjemYZaCa5AlzqlOxMMAQ==";

  const tokenB =
    "04AAAAAGljZJsADJyN0D5qLPalpfRTVQCvY1AE0GqfcItYSktQZcnU2+r4E91e3hvRV5iXi0Wl6Lbcl2g+wu2D/itBUaOWBsx6jZLV1R/zgRPcXDJ5Nq6iebRWfxE8EhtgerlxBKOzE5FJ7YQzzDcRsV5CApFie/DbV9/YGxH7G7rlBsJuF249b1vrX0HubIb1garRqpStxto2lQg8n1Ud5cWc8UTa95xiwZSPGwkuQYeqQA5E6jfTAmDdSSfHSADpmOW/wHmWEAE=";

  const messageEndRef = useRef(null);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Auto scroll to latest message
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Create ZIM instance only once
  useEffect(() => {
    const instance = ZIM.create(appId);
    setZimInstance(instance);

    instance.on("error", function (zim, errorInfo) {
      console.log("error", errorInfo.code, errorInfo.message);
    });

    instance.on("connectionStateChanged", function (zim, { state, event }) {
      console.log("connectionStateChanged", state, event);
    });

    instance.on("peerMessageReceived", function (zim, { messageList }) {
      setMessages((prev) => [...prev, ...messageList]);
    });

    instance.on("tokenWillExpire", function (zim, { second }) {
      console.log("tokenWillExpire", second);

      const newToken = selectedUser === "Bacchu" ? tokenA : tokenB;

      instance
        .renewToken(newToken)
        .then(function () {
          console.log("Token renewed successfully");
        })
        .catch(function (err) {
          console.error("Token renewal failed:", err);
        });
    });

    return () => {
      instance.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = () => {
    const info = {
      userID: selectedUser,
      userName: selectedUser === "Bacchu" ? "Bacchu" : "Rahul",
    };

    setUserInfo(info);

    if (zimInstance) {
      const loginToken = selectedUser === "Bacchu" ? tokenA : tokenB;

      zimInstance
        .login(info, loginToken)
        .then(function () {
          setIsLoggedIn(true);
          console.log("Login successful");
        })
        .catch(function (err) {
          console.error("Login failed:", err);
        });
    } else {
      console.log("Instance Error");
    }
  };

  const handleSendMessage = () => {
    if (!isLoggedIn) return;
    if (!messageText.trim()) return;

    const toConversationID = selectedUser === "Bacchu" ? "Rahul" : "Bacchu";
    const conversationType = 0;
    const config = {
      priority: 1,
    };

    const messageTextObje = {
      type: 1,
      message: messageText,
      extendedData: "",
    };

    zimInstance
      .sendMessage(messageTextObje, toConversationID, conversationType, config)
      .then(function ({ message }) {
        setMessages((prev) => [...prev, message]);
      })
      .catch(function (err) {
        console.log(err);
      });

    setMessageText("");
  };

return (
  <div className="w-full h-screen flex items-center justify-center px-4">
    {!isLoggedIn ? (
      <div className="w-full max-w-sm bg-white border border-gray-300 rounded-xl shadow-md p-6 space-y-4 text-center">
        <h1 className="text-xl mb-4">🗨️ QuickChat</h1>
        <p className="text-sm text-gray-600">Select a user to log in</p>

        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="Bacchu">Bacchu</option>
          <option value="Rahul">Rahul</option>
        </select>

        <button onClick={handleLogin} className="gradient-btn">
          Login →
        </button>
      </div>
    ) : (
      <div className="w-full max-w-2xl h-[600px] border border-gray-300 bg-white rounded-xl shadow-lg flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 bg-gray-100 text-sm font-bold">
          <span>👤 {selectedUser} (Online)</span>
          <button
            onClick={() => {
              zimInstance?.logout();
              setIsLoggedIn(false);
              setMessages([]);
              setUserInfo(null);
            }}
            className="text-red-500 text-xs hover:underline"
          >
            Logout
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 chat-scroll">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sendUserID === selectedUser
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`px-3 py-2 rounded-lg max-w-[70%] border text-sm ${
                  msg.sendUserID === selectedUser
                    ? "bg-blue-100 text-right"
                    : "bg-gray-200 text-left"
                }`}
              >
                <p>{msg.message}</p>
                <span className="block mt-1 text-[10px] text-gray-500">
                  {msg.timestamp ? formatTime(msg.timestamp) : ""}
                </span>
              </div>
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 flex items-center gap-2 border-t border-gray-200 bg-gray-50">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Type a message..."
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-black text-white text-xs rounded hover:bg-gray-800"
          >
            ➤ Send
          </button>
        </div>
      </div>
    )}
  </div>
);

}
