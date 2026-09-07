import '../component/style/layout.css'
import Userstate from "../component/Userstate";
import Content from "../component/Content";
import EmptyState from "./EmptyState";
import Chatroom from "../component/chatRoom";
import Chathistory from "../component/Chathistory";
import { useAuthContext } from "../Hooks/useAuthContext";
import useFetch from "../Hooks/useFetch";
import Transpoter from "../component/Transporter";

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
          view={genChat.view}
          setView={genChat.setView}
          />
            
        </div> 
        
      <main className="chat-container">
          
          {genChat.view === 'new' && 
          <EmptyState
            isTyping={genChat.isTyping}
            />
          }
          
          {genChat.view === 'now' && 
          <Chatroom
          backValue={genChat.backValue}
          frontValue={genChat.frontValue}
          loading={genChat.loading}
          />
          }
          
          {genChat.view === 'history' && 
          <Chathistory 
          chatHistory={genChat.chatHistory}/>
          }

          <Transpoter
          requestor={genChat.requestor}
          loading={genChat.loading}
          />

      </main>

    </div>
  )
}
