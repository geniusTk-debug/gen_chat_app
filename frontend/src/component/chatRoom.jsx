
import './style/chatRoom.css';
export default function Chatroom({ 
  frontValue,
    backValue,
      loading,
        chatHistory
        
      
}) {

  const time = new Date();
  const dateTime = time.toLocaleTimeString([], {
    hour : '2-digit',
    minute : '2-digit',
    
  })
  console.log(frontValue, backValue, 'front, back in chatroom')
  console.log(dateTime)


    return(
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
        
        {!!chatHistory && chatHistory?.[0]?.messages?.map((ch) => (
            <div className='chat-room' key={ch._id}>
                {ch.role === 'user'
                ?
                (<div className='client' key={ch._id} >{ch.content} 
                    <span className='client-time'>
                        {new Date(chatHistory[0].createdAt).toLocaleTimeString() }</span>
                </div>)
                :
                (<div className='server' >{ch.content} 
                    <span className='server-time'>
                        {new Date(chatHistory[0].createdAt).toLocaleTimeString() } </span>
                </div>)}

                
            </div>
        ))}
        
      </div>
    )

};


