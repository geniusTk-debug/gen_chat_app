import Chatroom from "../component/chatRoom";
import '../component/style/layout.css'
import Transpoter from "../component/Transporter";
import Userstate from "../component/Userstate";
import { useAuthContext } from "../Hooks/useAuthContext";
import useFetch from "../Hooks/useFetch";


export default function Layout() {
    const url = 'http://localhost:3000/api/chat';
    const { user } = useAuthContext();
    const genChat = useFetch(url);

  return (
    <div className='layout-container' >
        <Userstate
        user={user} />
        
      <main className="chat-container">

          <Chatroom
          backValue={genChat.backValue}
          frontValue={genChat.frontValue}
          loading={genChat.loading}
          />
          <Transpoter
          requestor={genChat.requestor}
          loading={genChat.loading}
          />
        </main>
    </div>
  )
}
