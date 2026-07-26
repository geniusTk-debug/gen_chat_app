
import { useState, useEffect } from 'react';
import './App.css'

function App() {

  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState('');
  const [userValue, setUserValue] = useState('');
  const [loading, setLoading] = useState(null);
  const [UIvalue, setUIValue] = useState('');
  
useEffect(() => {  
  if(loading === null) {
    const fetcher = async () => {
                const res = await fetch('http://localhost:3000/api/chat');
              if(res.status === 200) {
            console.log('fetch successfully',res)
          const d = await res.json();
        console.log('Successfully fetch chat history : ', d)
      setChatHistory(d);
      } 
    }
    fetcher(); 
      
  }
},[]);

console.log("chat History", chatHistory);

const sender = async (e)=> {
        e.preventDefault();
      setLoading(true);
    setUIValue(e.target.elements.client_input.value);
    console.log(e.target.elements.client_input.offSetHeight)
  const body = {
    "content" : userValue,
  };
  try {
    if(body.length || body) {
            const res = await fetch('http://localhost:3000/api/chat',{
          method : 'POST',
        headers: {
      'Content-Type': 'application/json'
    },
      body : JSON.stringify(body)
    });
console.log(res,"****")
    if(res.status === 200 || res.ok){
            const data = await res.json();
            const aiResponse = data.choices;

            console.log(aiResponse, res)
          setMessage(aiResponse);
        setLoading(false);
      window.scroll({top : '0', behavior : 'smooth'})
      console.log('Requested to API successfully...: ', aiResponse)
    };
    }
  } catch (error) {
          console.log('inside catch',error)
        }
        setUserValue('');
      };


console.log("Starting gen_chat_app : ", message);

  return (

    <div >
      <div className="main-container">
        <div className="heading"></div>
        
        {chatHistory && (chatHistory.map((ch) => (
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
              
              {/* {!!UIvalue.length &&  (<div className="chat-head-client"><p>{UIvalue}</p></div>)} */}
            <form onSubmit={(e)=>sender(e)} >
            {loading && ( <p style={{position: 'absolute', bottom: '80px', margin: '0 auto'}} className="">loading....</p> )}
                <input style={{marginRight: '20px'}} autoComplete='off' value={userValue} type='text' name='client_input' onChange={(e)=>setUserValue(e.target.value)} / >
                <button style={{display:'block'}} className='send-btn' type='submit' >Send</button>
            </form>
      
        </div>
      
    </div>
    
  )
}

export default App;
