import './style/emptyState.css'
import Chathistory from '../component/Chathistory'
export default function EmptyState({ chatHistory, isHistory }) {
 if(isHistory) {
  return(
    <Chathistory 
    chatHistory={chatHistory}
    />
  )
 }

  return (
    <div className='empty-state-container'>
        <span className='title' >
            Gen Chat
        </span>

            <span className='content'>
                Ask me anything......
            </span>
    </div>
  )
}
