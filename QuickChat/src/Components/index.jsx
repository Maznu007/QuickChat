import React, { useState, useEffect } from "react";
import { ZIM } from "zego-zim-web";
import LoginBox from "./LoginBox";
import ChatWindow from "./ChatWindow";

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

  useEffect(() => {
    const instance = ZIM.create(appId);
    setZimInstance(instance);

    instance.on("error", (zim, errorInfo) => {
      console.log("error", errorInfo.code, errorInfo.message);
    });

    instance.on("peerMessageReceived", (zim, { messageList }) => {
      setMessages((prev) => [...prev, ...messageList]);
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
