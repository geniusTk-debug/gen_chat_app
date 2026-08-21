
import './style/chatHistory.css';
import ChatBox from './Chatbox';


export default function Chathistory({ 
    chatHistory,
    frontValue,
    backValue }) {
    console.log(frontValue, backValue, '- value front/back in ChatHistory')
    console.log(chatHistory,'- in chathistory in ch component')
return (

    <div className='main-container'>

        {chatHistory.length && (chatHistory.map((ch) => (

            <section className="chat-history" key={ch._id} >
                {frontValue && (<ChatBox 
                frontValue={frontValue}
                backValue={backValue}
                
                />)}
                <ul className='user font-style-user'>
                    <li>{ch.message?.[1]?.content} </li>
                    <li className='font-style absolute-time'>
                        { ch.createdAt.toLocaleString() }</li>
                </ul>
                <ul className='assistant font-style-assistant'>
                    <li>{ch.message?.[0]?.content} </li>
                    <li className='font-style absolute-time'>
                        { ch.createdAt.toLocaleString() } </li>
                </ul>

            </section>

        )))};

    </div>

    )
};
