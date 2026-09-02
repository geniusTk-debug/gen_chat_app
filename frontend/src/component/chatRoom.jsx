
import './style/chatRoom.css';
export default function Chatroom({ frontValue, backValue, loading }) {

  const time = new Date();
    const hours = time.getHours() < 10 
                    ? ('0'+time.getHours())
                      : (time.getHours())

      const minutes = time.getMinutes() < 10 
                        ? ('0'+time.getMinutes()) 
                          : (time.getMinutes())

        const seconds = time.getSeconds() < 10 
                          ? ('0'+time.getSeconds()) 
                            : (time.getSeconds())

  console.log(`${hours}:${minutes}:${seconds}`)

    console.log(frontValue, backValue?.[0]?.message.content)

return (
      <div className='chat-room-container'>
        {frontValue && (
          <>
          <div className="client">
            {frontValue}
          </div>
            <span> time here </span>

        {!loading
        ?
        (
        <>
        <div className="server">
            {backValue && backValue?.[0]?.message.content}
        </div>
          <span> time here </span>
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
