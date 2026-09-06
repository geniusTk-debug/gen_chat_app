import './style/content.css'

export default function Content({ newChat, setNewChat, setIsHistory, isHistory }) {
    
  return (
    <div className="content-container">
        <ul>
            <li>
                <button className="plus-btn" onClick={()=>setNewChat(!newChat)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="z-10 fill-orange-700"><path d="M13.3521 22.681C13.3521 23.4276 12.747 24.018 12.0005 23.9996C11.2541 23.9811 10.649 23.3609 10.649 22.6142V13.3513H1.319C0.572327 13.3513 -0.018029 12.7462 0.000404 11.9998C0.018837 11.2533 0.639079 10.6482 1.38575 10.6482H10.649V1.31901C10.649 0.572334 11.2541 -0.0180206 12.0005 0.000411987C12.747 0.0188446 13.3521 0.639088 13.3521 1.38576V10.6482H22.681C23.4276 10.6482 24.018 11.2533 23.9996 11.9998C23.9811 12.7462 23.3609 13.3513 22.6142 13.3513H13.3521V22.681Z"></path></svg>
                </button>
            </li>
            <li>
                <button className="content-btn" onClick={()=>setIsHistory(!isHistory)}>Chat History  </button>
            </li>
        </ul>
    </div>
  )
}
