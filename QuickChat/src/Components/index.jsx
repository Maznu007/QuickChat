import React, { useState, useEffect } from "react";
import { ZIM } from "zego-zim-web";
import LoginBox from "./LoginBox";
import ChatWindow from "./ChatWindow";
import { playSound } from "../playSound"; // 👈 new import

export default function Index() {
  const [zimInstance, setZimInstance] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState("Bacchu");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const appId = 1332209682;

  const tokenA =
    "04AAAAAGlo01kADHYnOW1SRrY/GfKCVQCwbQ/niKQXUxalAb0TzkWSgRQ65WugmF89k7AOtvf84uAL/aXN+WF/oKkhHC4b/38F6Prs5D320ncfjth7flhzGEndUAJthiIQ4riMcGJhFiQVJNdg+w9gtbbihRXIl/YJiSX8rRD0qydbL/YNi9V9iUMT3IfiUauBkvm4xM364nr9tNjcxgyxHuKu/WMYtLDe9QX3/isRtxxOHTtg2h++Sc3V+TKD6p+C14IajUPAcd4B";

  const tokenB =
    "04AAAAAGlo02gADKCBQypq8dlN73JsTQCw8jMK6/LyC0bvRk2Og/f33Vqy0Vvsx6afuFt1wCEvL8TAoGdi2pf5abS/2YCvmYPpsFYi4401dSJvNDsSSRPNQkd3GHGBUuU9Wurv4qvz+KILxiGYAxkmOgKjZzZKMQaPNZHxzaNad6/Pkv+ZCId8KCl9qkunXTjid0Lzauyl99JmS3PgJrEXKHnkjGxDx7ZeKvMV5n8XJThJcoJ9DqO2KClXRhitUGSEjHzKLiahCzIB";

    useEffect(() => {
    const instance = ZIM.create(appId);
    setZimInstance(instance);

    instance.on("error", (zim, errorInfo) => {
      console.log("error", errorInfo.code, errorInfo.message);
    });

    instance.on("peerMessageReceived", (zim, { messageList }) => {
      setMessages((prev) => [...prev, ...messageList]);

      // 👇 Play receive sound
      playSound("/sounds/receive.mp3");
    });

    instance.on("tokenWillExpire", (zim, { second }) => {
      const newToken = selectedUser === "Bacchu" ? tokenA : tokenB;
      instance.renewToken(newToken).catch(console.error);
    });

    return () => {
      instance.destroy();
    };
  }, []);

  const handleLogin = () => {
    const info = {
      userID: selectedUser,
      userName: selectedUser,
    };
    setUserInfo(info);

    if (zimInstance) {
      const loginToken = selectedUser === "Bacchu" ? tokenA : tokenB;
      zimInstance.login(info, loginToken).then(() => {
        setIsLoggedIn(true);
      });
    }
  };

  const handleSendMessage = () => {
    if (!isLoggedIn || !messageText.trim()) return;

    const toUser = selectedUser === "Bacchu" ? "Rahul" : "Bacchu";
    const msg = {
      type: 1,
      message: messageText,
      extendedData: "",
    };

    zimInstance
      .sendMessage(msg, toUser, 0, { priority: 1 })
      .then(({ message }) => {
        setMessages((prev) => [...prev, message]);
        setMessageText("");

        // 👇 Play send sound
        playSound("/sounds/send.mp3");
      })
      .catch(console.error);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center px-4">
      {!isLoggedIn ? (
        <LoginBox
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          handleLogin={handleLogin}
        />
      ) : (
        <ChatWindow
          selectedUser={selectedUser}
          messageText={messageText}
          setMessageText={setMessageText}
          messages={messages}
          handleSendMessage={handleSendMessage}
          zimInstance={zimInstance}
          setIsLoggedIn={setIsLoggedIn}
          setMessages={setMessages}
          setUserInfo={setUserInfo}
        />
      )}
    </div>
  );
}