
import './style/chatRoom.css';
import Chat_H from './Chat_H';
import EmptyState from '../Pages/EmptyState';
import AssistantMessages from './AssistantMessages';
import UserMessages from './UserMessages';
export default function Chatroom({ 
      messages,
      loading,
        // singleChat,
          view,
          title,
          // value
}) {
  console.log(messages, 'messages in Chatromm')

    return(
      <div className='chat-room-container'>

        { !view && title &&
        (<EmptyState />)}
        

        {messages
        && messages.map((message)=> (
          message.role === 'assistant'
          ?
          ( <AssistantMessages key={message.id || message._id} message={message} /> )
          :
          ( <UserMessages key={message.id || message._id} message={message} /> )
        ))}

        { loading 
          && 
          ( <div className="thinking">Thinking....</div> ) }        

        {messages.title === view &&
        (<Chat_H 
        messages={messages} />)
        }
        
      </div>
    )

};


