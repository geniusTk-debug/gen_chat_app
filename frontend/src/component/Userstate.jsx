// import useAuth from '../Hooks/useAuth'
import { useState } from 'react'
import './style/userState.css'

export default function Userstate({ user }) {
  // const authenticator = useAuth()
  console.log('user in UserState Com', user)
  const items = [
    'Edit profile',
    'Logout',
  ];

  const [selected, setSelected] = useState('name')
  const [ isclicked, setIsClicked] = useState(false)

  const handleClick = (item) => {
    setSelected(item)
    setIsClicked(false)

  }
  return (

    <>
        <div className="user-state">
          
            <span >
              {selected}
            </span>
              <button onClick={()=>setIsClicked(!isclicked)}>
                <svg xmlns="http://w3.org" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M7 10l5 5 5-5H7z"/>
              </svg>
              </button>
              {isclicked && (
                  items.map((item, i) => (
                    <ul key={i}>
                      <li>
                        <button
                        className='clickable-btn'
                        onClick={() => handleClick(item)}> {item} </button>
                      </li>
                    </ul>
                  ))
              )}
            </div>
            
        {/* <button onClick={authenticator.logoutHandler}>Logout</button> */}
    </>
  )
}
