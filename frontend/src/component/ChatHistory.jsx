
import './style/chatHistory.css';

export default function Chathistory({ chatHistory }) {
    
return (

    <div className='main-container'>

        {chatHistory.length && (chatHistory.map((ch) => (

            <section className="chat-history" key={ch._id} >

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
