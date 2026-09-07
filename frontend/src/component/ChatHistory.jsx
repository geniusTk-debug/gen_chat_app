
import './style/chatRoom.css';
export default function Chathistory({ 
    chatHistory
}) {
    console.log(chatHistory,'- in chathistory in ch component')
return (
    
    <div className='chat-room-container'>

        {!!chatHistory && chatHistory.map((ch) => (
            <div className='chat-room' key={ch._id}>
                <div className='client' >{ch.message?.[1]?.content} 
                    <span className='client-time'>
                        { new Date(ch.createdAt).toLocaleString() }</span>
                </div>

                <div className='server' >{ch.message?.[0]?.content} 
                    <span className='server-time'>
                        { new Date(ch.createdAt).toLocaleString() } </span>
                </div>
            </div>
        ))}

    </div>
    
    )
};
