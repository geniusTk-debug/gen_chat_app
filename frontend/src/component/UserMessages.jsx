import ReactMarkDown from 'react-markdown';

export default function UserMessages({ message }) {
console.log(message, 'message in the UserMessages')
  return (
        <div className="chat-room">
            <div className='user' >
                    <ReactMarkDown>
                        {message.content}
                    </ReactMarkDown>
                <span className='user-time'>
                    {message.time}
                </span>
            </div>
        </div>
  )
}
