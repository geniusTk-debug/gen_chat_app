
import './style/chatRoom.css';
export default function Chatroom({ frontValue, backValue, loading}) {

  const time = new Date();
  const dateTime = time.toLocaleTimeString([], {
    hour : '2-digit',
    minute : '2-digit',
    
  })
  
  console.log(dateTime)

return (
      <div className='chat-room-container'>
        {frontValue && (
          <>
          <div className="client">
            {frontValue}
            <span className='client-time'> {dateTime} </span>
          </div>

        {!loading
        ?
        (
        <>
        <div className="server">
            {backValue && backValue?.[0]?.message.content}
          <span className='server-time'> {dateTime} </span>
        </div>
        </>
        )
        :
        ( <div className='thinking'> Thinking..... </div> )
        }
        </>
        )}
        
      </div>
  )
};
