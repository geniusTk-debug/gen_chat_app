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
    <div className='main-container'>
        <form onSubmit={requestHandler} >
          
            <input autoComplete='off' value={value} type='text' name='client_input' onChange={(e)=>setValue(e.target.value)} />
            {!loading
            ?
              (<button className='send-btn' type='submit' >Send</button>)
            :
              (<div className="spinner-border"role="status"></div>)}

        </form>
    </div>
  )
};
