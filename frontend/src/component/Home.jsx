
import { useEffect, useState } from 'react';
import './style/home.css';
import Transporter from './Transporter';
import ChatHistory from './ChatHistory';


export default function Home() {

  const url = 'http://localhost:3000/api/chat';
  const [ chatHistory, setChatHistory ] = useState([]);

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
console.log(chatHistory)
  return (
    <div>
      <div className="main-container">
        <div className="heading"></div>
          <ChatHistory chatHistory={chatHistory} />
      
      
      
      
      </div>

      <Transporter />
    </div>
  )
}