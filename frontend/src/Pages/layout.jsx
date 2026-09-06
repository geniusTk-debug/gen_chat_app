import Chatroom from "../component/chatRoom";
import '../component/style/layout.css'
import Transpoter from "../component/Transporter";
import Userstate from "../component/Userstate";
import Content from "../component/Content";
import { useAuthContext } from "../Hooks/useAuthContext";
import useFetch from "../Hooks/useFetch";
import EmptyState from "./EmptyState";


export default function Layout() {
    const url = 'http://localhost:3000/api/chat';
    const { user } = useAuthContext();
    const genChat = useFetch(url);
    console.log(genChat.chatHistory)
  return (
    <div className='layout-container' >

        <div className="side-bar-container">

          <Userstate
          user={user} />

          
          <Content
          newChat={genChat.newChat}
          setNewChat={genChat.setNewChat}
          isHistory={genChat.isHistory}
          setIsHistory={genChat.setIsHistory}
          />
            
        </div> 
        
      <main className="chat-container">

          {genChat.newChat
          ?
          (<Chatroom
          backValue={genChat.backValue}
          frontValue={genChat.frontValue}
          loading={genChat.loading}
          />)
          :
          ( <EmptyState
            isHistory={genChat.isHistory}
            /> )
          }

          <Transpoter
          requestor={genChat.requestor}
          loading={genChat.loading}
          />

      </main>

    </div>
  )
}
