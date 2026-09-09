
import './style/chatRoom.css';
export default function Chathistory({ 
    chatHistory
}) {

return (
    
    <div className='chat-room-container'>

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
