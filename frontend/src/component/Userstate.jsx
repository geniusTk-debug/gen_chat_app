import useAuth from '../Hooks/useAuth'
import { useState } from 'react'
import './style/userState.css'

export default function Userstate({ user }) {
  const authenticator = useAuth()
  console.log('user in UserState Com', user.username, user.user?.username)
  const items = [
    'Edit profile',
    'Logout',
  ];

  const [selected, setSelected] = useState(user.user?.username)
  const [ isclicked, setIsClicked] = useState(false)

  const handleClick = (item,e) => {
    if(item === 'Logout') {
      authenticator.logoutHandler(e);
      setSelected('perform logout')
    } else {
      console.log(item)
    }
    setIsClicked(false)

  }
  return (

    <>
        <div className="user-state-container">
          
            <div className="user-state">
              <span >
                {user.user ? selected : 'waiting for username'}
              </span>
                <button onClick={()=>setIsClicked(!isclicked)}>
                  <svg xmlns="http://w3.org" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M7 10l5 5 5-5H7z"/>
                </svg>
                </button>
            </div>
              {isclicked && (
                <ul>
                  {items.map((item, i) => (
                      <li key={i}>
                        <button
                        className='clickable-btn'
                        onClick={(e) => handleClick(item,e)}> {item} </button>
                      </li>
                  ))}
                    </ul>
              )}
            </div>
            
        {/* <button onClick={authenticator.logoutHandler}>Logout</button> */}
    </>
  )
}
