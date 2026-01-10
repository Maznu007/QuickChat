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
    <div className="w-full h-screen bg-[#0D091B] flex items-center justify-center px-6 text-white relative">
      <div className="hero-bg"></div>

      {/* Center container */}
      <div className="z-10 flex flex-col items-center text-center gap-6 max-w-xl">
        {/* Logo row */}
        <div className="flex items-center gap-3">
          <img
            src={ChatImg}
            alt="Chat logo"
            className="invert w-14 h-14 object-contain"
          />
          <h1 className="text-2xl sm:text-5xl font-bold">Chat App</h1>
        </div>

        {/* Text */}
        <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
          A fast, secure and modern messaging experience built with real time
          ZegoCloud technology. Connect instantly and chat without limits -
          smooth, encrypted and beautifully designed.
        </p>
      </div>

      <div className="w-full lg:w-1/2">
        {!isLoggedIn && (
          <div className="w-100 p-8 rounded-2xl bg-[#0D091B] backdrop-blur-2xl border border-white/20 shadow-xl">
            <h2 className="text-4xl font-semibold mb-6 text-center text-white/90">
              Login
            </h2>

            <label className="text-sm font-medium text-white/70">
              Select User
            </label>

            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full text-white border px-4 py-2 rounded-xl mb-5 mt-1 border-gray-400 appearance-none focus:ring-2 focus:ring-purple-500 outline-none focus:border-purple-500 transition"
            >
              <option value="Bacchu" className="text-black">
                Bacchu
              </option>
              <option value="Rahul" className="text-black">
                Rahul
              </option>
            </select>

            <button onClick={handleLogin} className="gradient-btn mt-5">
              Login as
            </button>
          </div>
        )}

        {/* chatui */}
        {isLoggedIn && (
          <div className="w-full max-w-lg h-[500px] lg:h-[650px] rounded-2xl bg-[#0D091B] backdrop-blur-2xl flex flex-col overflow-hidden border border-gray-400/30">
            {/* header */}
            <div className="p-5 text-xl text-white font-semibold border-b border-gray-200/20 shadow shadow-white/10 flex items-center justify-between">
              <span>
                Logged in as <b>{selectedUser}</b>
              </span>

              <button
                onClick={() => {
                  zimInstance?.logout();
                  setIsLoggedIn(false);
                  setMessages([]);
                  setUserInfo(null);
                }}
                className="w-10 h-10 flex items-center justify-center cursor-pointer text-sm rounded-full bg-white/10 hover:bg-white/20 transition border border-white/10"
              >
                <img src={logoutImg} alt="logout" width={20} height={20} />
              </button>
            </div>

            {/* messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 chat-scroll">
              {messages.map((msg, index) => {
                return (
                  <div
                    key={index}
                    className={`flex ${
                      msg.sendUserID === selectedUser
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`px-4 py-2 rounded-2xl max-w-[75%] shadow-lg backdrop-blur-xl border transition-all ${
                        msg.sendUserID === selectedUser
                          ? "bg-gradient-to-br from-purple-600 to-indigo-600 text-white border-purple-400/40"
                          : "bg-white/10 text-white border-white/10"
                      }`}
                    >
                      <p>{msg.message}</p>
                      <span className="text-[10px] block text-right mt-1 opacity-80">
                        {msg.timestamp ? formatTime(msg.timestamp) : ""}
                      </span>
                    </div>
                  </div>
                );
              })}
              <div ref={messageEndRef} />
            </div>

            {/* input area */}
            <div className="p-4 bg-white/5 border-t border-white/10 flex gap-3">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="flex-1 bg-white/10 border border-white/10 text-white px-4 py-2 rounded-xl outline-none focus:ring-1 focus:ring-purple-500 transition"
                placeholder="Type a message...."
              />

              <button
                onClick={handleSendMessage}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all font-semibold shadow-lg shadow-purple-900/20 active:scale-[0.97] cursor-pointer"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
