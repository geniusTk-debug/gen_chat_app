import { useState, useEffect } from 'react';
import './App.css';
import ChatBox from './component/Chatbox'


export default function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const url = 'http://localhost:3000/api/chat';
  useEffect(() => {
    const fetcher = async () => {
            try {
              const res = await fetch(url)
            
                const data = await res.json();
                console.log(data)
                setChatHistory(data);
                }catch (error) {
              console.log(error);
            }
            }
            fetcher(); 
  },[]);

  return (
    
      <>
        <ChatBox chatHistory={chatHistory} />
     </>
  )
}

