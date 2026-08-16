import useFetch from '../Hooks/useFetch';
import './style/home.css';
// import Register from '../Pages/register';
// import Login from '../Pages/login';
import ChatHistory from './Chathistory';
import ChatBox from './Chatbox';
import Transporter from './Transporter';


export default function Home() {

  const url = 'http://localhost:3000/api/chat';

      const genChat = useFetch(url);
        
      console.log(Date().toLocaleString(genChat.chatHistory?.[0]?.createdAt))
      console.log(genChat.chatHistory)

  return (
      <>
     
    <div>
      <div className="main-container">

        <div className="heading"></div>

          {!genChat.frontValue ?
          (<ChatHistory
          chatHistory={genChat.chatHistory}/>)
          
          :
          (<ChatBox
            frontValue={genChat.frontValue}
              backValue={genChat.backValue} />)}
      
      </div>
  
          <Transporter
          requestor={genChat.requestor}
            loading={genChat.loading}/>

    </div>
      
      
      </>

  )
};