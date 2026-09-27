import ReactMarkDown from 'react-markdown';

export default function AssistantMessages({ message }) {
    console.log(message)
  return (
    <div className="chat-room">
        <div className='assistant' >
            <ReactMarkDown>
                {message.content}
            </ReactMarkDown>

        <span className='assistant-time'>
                {message.time ? message.time : 
                    new Date(message.updatedAt).toLocaleTimeString()}
        </span>
        </div>
    </div>
  )
}
