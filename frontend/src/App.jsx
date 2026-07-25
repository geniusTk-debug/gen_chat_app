
import { useEffect, useState } from 'react';
import './App.css'

function App() {

  const [message, setMessage] = useState('');
  const [userValue, setUserValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [UIvalue, setUIValue] = useState('');
  
useEffect(() => {
  if(!message.length) {
    const fetcher = async () => {
    const res = await fetch('http://localhost:3000/api/chat');
    if(res.status === 200 || res.ok) {
      console.log('fetch successfully',res)
    const d = await res.json();
    console.log('your data is here : ', d)
    setMessage(d.choices);
    }
    }
    fetcher();
  }
  else{
    console.log('reply is waiting your message',!!message.length);
  }
})

const sender = async (e)=> {
        setLoading(true);
        setUIValue(e.target.elements.client_input.value)
        e.preventDefault()
        const body = {
          "content" : userValue,
        };

        try {
          if(body.length || body) {
            console.log('user have length', body.content)
          const res = await fetch('http://localhost:3000/api/chat',{
            method : 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body : JSON.stringify(body)
          })
          if(res.status === 200 || res.ok){
            setLoading(false);
            const d = await res.json();
            setMessage(d.choices);
            console.log('sent to server successfully', typeof(d.choices), d.choices)

          }
        }
        } catch (error) {
          console.log('inside catch',error)
        }
        setUserValue('');
      };


console.log('first fetch time',message,message.id, message.choices);

  return (

    <section style={{maxWidth : '100svw'}}>
      <div className="main-container">
        <div className="heading"></div>
        
        {!!message.length && (message.map(c => (
          <div className="chat-head-server" key={message.id}>
          <img
        src='https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg'
        alt='chat head pic'/>
        <span>{c.message.content}</span>
        </div>
        )))}
  
              
              {!!UIvalue.length &&  (<div className="chat-head-client"><span>{UIvalue}</span><img className='chat-head-pic' src='https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg' alt='chat head pic'/></div>)}
            <form onSubmit={(e)=>sender(e)} >
            {loading && ( <p style={{position: 'absolute', bottom: '80px', margin: '0 auto'}} className="">loading....</p> )}
                <input style={{marginRight: '20px'}} autoComplete='off' value={userValue} type='text' name='client_input' onChange={(e)=>setUserValue(e.target.value)} / >
                <button style={{display:'block'}} className='send-btn' type='submit' >Send</button>
            </form>
      
        </div>
      
    </section>
    
  )
}

export default App;
