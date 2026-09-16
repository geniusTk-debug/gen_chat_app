
import './style/chatRoom.css';
export default function Chat_H({ 
    messages
}) {
console.log(messages, 'chat single here ****')
return (
    
    <>

        { messages && messages.map((ch) => (
            <div className='chat-room' key={ch._id}>
                {ch.role === 'user'
                ?
                (<div className='user' >{ch.content} 
                    <span className='user-time'>
                        {new Date(ch.updatedAt).toLocaleTimeString() }</span>
                </div>)
                :
                (<div className='assistant' >{ch.content} 
                    <span className='assistant-time'>
                        {new Date(ch.updatedAt).toLocaleTimeString() } </span>
                </div>)}

                
            </div>
        ))}

    </>
    
    )
};
