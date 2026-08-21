
import './style/chatHistory.css'
export default function Chatbox({ frontValue, backValue, loading }) {

  const time = new Date();
    const hours = time.getHours() < 10 
                    ? ('0'+time.getHours())
                      : (time.getHours())

      const minutes = time.getMinutes() < 10 
                        ? ('0'+time.getMinutes()) 
                          : (time.getMinutes())

        const seconds = time.getSeconds() < 10 
                          ? ('0'+time.getSeconds()) 
                            : (time.getSeconds())

  console.log(`${hours}:${minutes}:${seconds}`)

    console.log(frontValue, backValue)

return (

    <>
      <section className="chat-box" 
                  key={new Date().getTime()} >

        <ul className='user font-style-user'>
          <li> {frontValue} </li>
          <li className='font-style absolute-time'>
            { (`${hours}:${minutes}:${seconds}`).toLocaleString() }</li>
        </ul>

        <ul className='assistant font-style-assistant'>
          {loading
          ?
          (<li style={{color:'yellowgreen'}}>Thinking.....</li>)
          :
          (<li>{ backValue?.[0]?.message?.content } </li>)}
          <li className='font-style absolute-time'>
            { (`${hours}:${minutes}:${seconds}`).toLocaleString() }</li>
        </ul>

      </section>
        
    </>
  )
};
