import React, { useRef, useEffect, useState } from "react";

export default function ChatWindow({
  selectedUser,
  messageText,
  setMessageText,
  messages,
  handleSendMessage,
  zimInstance,
  setIsLoggedIn,
  setMessages,
  setUserInfo,
}) {
  const messageEndRef = useRef(null);
  const [reactions, setReactions] = useState({});

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const getOtherUser = () => {
    return selectedUser === "Bacchu" ? "Rahul" : "Bacchu";
  };

  const handleReaction = (index, emoji) => {
    setReactions((prev) => ({
      ...prev,
      [index]: emoji,
    }));
  };

  const emojiOptions = ["❤️", "😂", "🔥", "👍", "💀", "💖"];

  return (
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
      <div className="flex-1 overflow-y-auto p-4 space-y-4 chat-scroll">
        {messages.map((msg, index) => {
          const isOwnMessage = msg.sendUserID === selectedUser;

          return (
            <div
              key={index}
              className={`flex ${
                isOwnMessage ? "justify-end" : "justify-start"
              }`}
            >
              <div className="relative group max-w-[70%]">
                <div
                  className={`px-3 py-2 rounded-lg border text-sm break-words ${
                    isOwnMessage
                      ? "bg-blue-100 text-right"
                      : "bg-gray-200 text-left"
                  }`}
                >
                  <p>{msg.message}</p>

                  {/* Reaction display */}
                  {reactions[index] && (
                    <div className="mt-1 text-xs">{reactions[index]}</div>
                  )}

                  <span className="block mt-1 text-[10px] text-gray-500">
                    {msg.timestamp ? formatTime(msg.timestamp) : ""}
                  </span>
                </div>

                {/* Emoji options BELOW the bubble, only on hover */}
                <div className="absolute left-0 mt-1 flex-wrap hidden group-hover:flex gap-1 z-10">
                  {emojiOptions.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => handleReaction(index, emoji)}
                      className="text-sm hover:scale-125 transition"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
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
  );
}
