
import './style/chatRoom.css';
export default function Chat_H({ message }) {
return (
    <div className='chat-room' >
                {message.role === 'assistant'
                ?
                (<div className='assistant' >{message.content} 
                    <span className='assistant-time'>
                        {new Date(message.updatedAt).toLocaleTimeString() } </span>
                </div>)
                :
                (<div className='user' >{message.content} 
                    <span className='user-time'>
                        {new Date(message.updatedAt).toLocaleTimeString() }</span>
                </div>)}

                
            </div>
    
    )
};
