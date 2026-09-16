import '../component/style/layout.css'
import Userstate from "../component/Userstate";
import Content from "../component/Content";
import Chatroom from "../component/chatRoom";
import { useAuthContext } from "../Hooks/useAuthContext";
import useFetch from "../Hooks/useFetch";
import Transpoter from "../component/Transporter";

export default function Layout() {
    const url = 'http://localhost:3000/api/chat';
    const { user } = useAuthContext();
    const genChat = useFetch(url);
    console.log(genChat.chatHistory)
    console.log(genChat.title, 'title in Layout')
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
          extended={genChat.extended}
          isExtended={genChat.isExtended}
          chatId={genChat.chatId}
          setChatId={genChat.setChatId}
          chatHistory={genChat.chatHistory }
          fetcherById={genChat.fetcherById}
          setMessages={genChat.setMessages}
          value={ genChat.value }
          />
            
        </div> 
        
      <main className="chat-container">
          
          
          <Chatroom
          messages={genChat.messages}
          loading={genChat.loading}
          chatHistory={genChat.chatHistory}
          singleChat={genChat.singleChat}
          view={genChat.view}
          title={genChat.title}
          chatId={genChat.chatId}
          />

          <Transpoter
          requestor={genChat.requestor}
          loading={genChat.loading} />

      </main>

    </div>
  )
}
