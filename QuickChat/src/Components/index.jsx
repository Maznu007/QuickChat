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
    "04AAAAAGlaMX0ADPrwVZZZDSZx+3iPbACwLxTy69IC5pUgs5XEQg4MNLqjn+mLDvXp7U3CATM56A8HeIpR4DCpMNYT0iWT1DjopZb3bn54fkYbMIvl5mpfe0iRoQ7xaMiVItcILbfLGIo2pBE4n+63oF7LpMZ9LmWFbCaevzYwlNSfQdtprHVeWvMVPqnj5hO9pgfKY6qeuCapzkIjLZ7iwt+8kN0UNAzeWOsMuBK1e4MxRyxF5GOjpV2IXIyYNn3PWnxM3RfibwIB";

  const tokenB =
    "04AAAAAGlaMbsADLRTvXjyvWxnqGveMwCxpTF3jT2Ifiaj+mesjAc3qEKTfep2P8iWTjHoKoyVZZdLzIlRPf85ysWJkdYmJc06M9EBEV3u2JIlNmrYTrJWKckQ5HlD6s7Btsw7pI8ooqDSyfNrMZEsJatcdUx1KCYdBC9/wdwDyxsLEiBCfPAZVaNIfbLSPBSYDxKDg2y8Nek8ntDo6lIzJPhASk9GCrzB5HVtuRWyAKdvkdpggNeqbHVeoDt9V/hck5rP59XI2IeAAQ==";

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
    // NOTE: we intentionally do NOT add selectedUser here,
    // because we don't want to recreate instance on every user change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
    useEffect(() => {
      if (messageEndRef.current) {
        messageEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [messages]);
    const handleLogin = () => {
    const info ={
      userID: selectedUser,
      userName: selectedUser === "Bacchu" ? "Bacchu": "Rahul",
    };
    setUserInfo(info);
    if(zimInstance){
      const  loginToken =selectedUser === "Bacchu" ? tokenA : tokenB;
      zimInstance.login(info,loginToken).then(function(){
        setIsLoggedIn(true);
        console.log("Login successful");
      }).catch(function(err){
        console.error("Login failed:", err);
      });
    }
    else{
      console.log("Instance Error");
    }
    }

     

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
        ZegoCloud technology. Connect instantly and chat without limits - smooth,
        encrypted and beautifully designed.
      </p>
    </div>
        <div className="w-full lg:w-1/2">
          {!isLoggedIn && (
            <div className="w-100 p-8 rounded-2xl bg-[#0D091B]
            backdrop-blur-2xl border border-white/20 shadow-xl">
              <h2 className="text-4xl font-semibold mg-6 text-center text-white/90">Login</h2>
              <label className="text-sm font-medium text-white/70">Select User</label>
              <select value={selectedUser} onChange={(e)=>setSelectedUser(e.target.value)} className="w-full text-whiteborder px-4 py-2 rounded-xl mb-5 mt-1 border-gray-400 appearance-none focus:ring-2 focus:ring-purple-500 outline-none focus:border-purple-500 transition"  >
                <option value="Bacchu" className="text-black">Bacchu</option>
                <option value="Rahul" className="text-black">Rahul</option>
              </select>
              <button onClick={handleLogin } className="gradient-btn mt-5">Login as</button>
            </div>
          )}
        </div>
  </div>
);
}
