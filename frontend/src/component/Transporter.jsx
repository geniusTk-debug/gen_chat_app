import { useState } from 'react'
import './style/transporter.css'

export default function Transpoter({ requestor, loading }) {
const [ value, setValue ] = useState('');

const requestHandler = (e) => {
  e.preventDefault();
  requestor(e);
  setValue('')
};

  return (
        <div className="transporter-container">
          <form onSubmit={requestHandler} >
          
              <input
                autoComplete='off'
                value={value}
                name='client_input'
                onChange={(e)=>setValue(e.target.value)}
              />
              {!loading
              ?
                (<button className='send-btn' type='submit' >Send</button>)
              :
                (<div className="spinner-border"role="status"></div>)}
          </form>
        </div>
  )
};
