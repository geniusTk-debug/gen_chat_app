import useFetch from "../Hooks/useFetch";
import './style/chatHistory.css'
export default function ChatBox() {

    const { message, UIvalue } = useFetch();
    const time = new Date();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    console.log((hours, minutes, seconds).toLocaleString());
  return (
    <div className="main-container">
        {UIvalue && (<section className="chat-history" key={new Date().getTime()} >
            <ul className='user font-style-user'>
              <li>{UIvalue} </li>
              <li className='font-style absolute-time'>{(`${hours}:${minutes}:${seconds}`).toLocaleString()}</li>
              <time datetime="11:11"></time>
            </ul>
            <ul className='assistant font-style-assistant'>
              <li>{message[0].message.content} </li>
              <li className='font-style absolute-time'>{(`${hours}:${minutes}:${seconds}`).toLocaleString()} </li>
            </ul>
          </section>)}
    </div>
  )
}
