import React, { use } from 'react'
import { ZIM } from 'zego-zim-web'
import Chatimg from '../assets/chatimg.png'
import logoutImg from '../assets/logout.png'
export default function index() {


    const [zimInstance, setZimInstance] =useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const[messageText,setMessageText]=useState("");
    const [messages,setMessages]=useState([]);
    const [seletedUser,setSelectedUser]=useState("Bacchu");
    const[isLoggedIn,setIsLoggedIn]=useState(false);
    const appId = 1332209682
    const tokenA = "04AAAAAGlaMX0ADPrwVZZZDSZx+3iPbACwLxTy69IC5pUgs5XEQg4MNLqjn+mLDvXp7U3CATM56A8HeIpR4DCpMNYT0iWT1DjopZb3bn54fkYbMIvl5mpfe0iRoQ7xaMiVItcILbfLGIo2pBE4n+63oF7LpMZ9LmWFbCaevzYwlNSfQdtprHVeWvMVPqnj5hO9pgfKY6qeuCapzkIjLZ7iwt+8kN0UNAzeWOsMuBK1e4MxRyxF5GOjpV2IXIyYNn3PWnxM3RfibwIB";

    const tokenB = "04AAAAAGlaMbsADLRTvXjyvWxnqGveMwCxpTF3jT2Ifiaj+mesjAc3qEKTfep2P8iWTjHoKoyVZZdLzIlRPf85ysWJkdYmJc06M9EBEV3u2JIlNmrYTrJWKckQ5HlD6s7Btsw7pI8ooqDSyfNrMZEsJatcdUx1KCYdBC9/wdwDyxsLEiBCfPAZVaNIfbLSPBSYDxKDg2y8Nek8ntDo6lIzJPhASk9GCrzB5HVtuRWyAKdvkdpggNeqbHVeoDt9V/hck5rP59XI2IeAAQ==";
    
    const messageEndRef = useRef(null);

    const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  return (
    <>
    
    </>
  )
}
