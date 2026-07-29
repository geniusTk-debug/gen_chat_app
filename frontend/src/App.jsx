import useFetch from './Hook/useFetch'
import './App.css';
import { useEffect, useState } from 'react';

export default function App() {
  const url = 'http://localhost:3000/api/chat';
  const [ chatHistory, setChatHistory ] = useState([]);

  const { message,loading,UIvalue,setUserValue,userValue,requestor} = useFetch(url);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(url);
      if(res.status === 200 || res.ok) {
        const j = await res.json();
        setChatHistory(j);
      } else {
        console.log('Failed to fetch chat history. Check your internet connection and try again',res.error )
      }
    }
    fetcher();
  },[url])

console.log("chat History", chatHistory);
  return (
    <div >
      <div className="main-container">
        <div className="heading"></div>
        
        {chatHistory.length && (chatHistory.map((ch) => (
          <section className="chat-history" key={ch._id} >
            <ul className='user font-style-user'>
              <li>{UIvalue.length ? (UIvalue): (ch.message[1].content)} </li>
              <li className='font-style absolute-time'>{ch.createdAt.toLocaleString()}</li>
            </ul>
            <ul className='assistant font-style-assistant'>
              <li>{message.length ? (message[0].message.content) : (ch.message[0].content)} </li>
              <li className='font-style absolute-time'>{ch.createdAt.toLocaleString()} </li>
            </ul>
          </section>

        )))};  
            <form onSubmit={(e)=>requestor(e)} >
            {loading && ( <p className="">loading....</p> )}
                <input autoComplete='off' value={userValue} type='text' name='client_input' onChange={(e)=>setUserValue(e.target.value)} / >
                <button className='send-btn' type='submit' >Send</button>
            </form>
      
        </div>
      
    </div>
  )
}

