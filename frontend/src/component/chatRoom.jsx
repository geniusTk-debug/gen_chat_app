
import './style/chatRoom.css';
import Chat_H from './Chat_H';
import EmptyState from '../Pages/EmptyState';
import AssistantMessages from './AssistantMessages';
import UserMessages from './UserMessages';
import { useEffect, useRef, useState } from 'react';
export default function Chatroom({ 
      messages,
      loading,
          view,
          title,
          
}) {
  console.log(messages, 'messages in Chatromm')
  const [isNearBot, setIsNearBot] = useState(true);
  const chatRoomRef = useRef(null);
  const bottomRef = useRef(null)
  const scrollPx = 200;
  
  const scrollHandler = () => {
      const containerRef = chatRoomRef.current;
    if (!containerRef) return;
      const distanceFromBottom =
        containerRef.scrollHeight -
        containerRef.scrollTop -
        containerRef.clientHeight;
        setIsNearBot(distanceFromBottom < scrollPx)
  }
  
  useEffect(() => {
    if (!isNearBot) return;
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [isNearBot,messages])


    return (
      <div className="chat-room-container"
        ref={chatRoomRef}
        onScroll={scrollHandler}
      >
        {!view && title && <EmptyState />}

        {messages &&
          messages.map((message) =>
            message.role === "assistant" ? (
              <AssistantMessages
                key={message.id || message._id}
                message={message}
              />
            ) : (
              <UserMessages key={message.id || message._id} message={message} />
            ),
          )}

        {loading && <div className="thinking">Thinking....</div>}

        {messages.title === view &&
          messages.map((message) => (
            <Chat_H key={message.id || message._id} message={message} />
          ))}

        <div ref={bottomRef}></div>
      </div>
    );

};


