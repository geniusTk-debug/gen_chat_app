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
    console.log(genChat.extended, 'extended...')
  return (
    <div className='layout-container' >

        <div className={` side-bar-container ${ genChat.extended ? "isExtend" : "notExtend" }` }>

          <Userstate
          user={user} />

          
          <Content
          view={genChat.view}
          setView={genChat.setView}
          title={genChat.title}
          setTitle={genChat.setTitle}
          isExtended={genChat.isEntended}
          />
            
        </div> 
        
      <main className="chat-container">
          
          { genChat.view === 'new' && 
          <EmptyState /> }
          
          { genChat.view === genChat.title && 
          <Chatroom
          backValue={genChat.backValue}
          frontValue={genChat.frontValue}
          loading={genChat.loading}
          chatHistory={genChat.chatHistory}
          /> }
          
          { genChat.view === 'idle' && 
          <Chathistory 
          chatHistory={genChat.chatHistory} /> }

          <Transpoter
          requestor={genChat.requestor}
          loading={genChat.loading} />

      </main>

    </div>
  )
}
