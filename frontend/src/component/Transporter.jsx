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
        <form className="message-form" onSubmit={requestHandler} >
          
            <textarea
              autoComplete='off'
              value={value}
              name='client_input'
              rows='2'
              onChange={(e)=>setValue(e.target.value)}
            />
            {!loading
            ?
              (<button className='send-btn' type='submit' >Send</button>)
            :
              (<div className="spinner-border"role="status"></div>)}

        </form>
  )
};
