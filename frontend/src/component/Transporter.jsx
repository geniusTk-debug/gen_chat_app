
import { useState } from 'react'
import './style/transporter.css'

export default function Transpoter({ 
  requestor,
    loading,
    uploadImg,
    src
}) {
  
const [ value, setValue ] = useState('');


const requestHandler = (e) => {
  e.preventDefault();
  requestor(e);
  setValue('')
};

  return (
    <>
        <div className="transporter-container">
            
            <form className="form-data">
              <input 
              type="file"
              accept="image/*"
              className={ src ? 'src' : 'file' }
              onChange={uploadImg}
              />
              {src && <div className="img"><img src={src} alt="upload" /></div>}
            </form>

          <form onSubmit={requestHandler} >
          
              <input
                className='main-input'
                autoComplete='off'
                value={value}
                name='client_input'
                onChange={(e)=>setValue(e.target.value)}
              />
              
              {!loading
              ?
                (
                
                <button className='send-btn' type='submit' >Send</button>
            
                )
              :
                (<div className="spinner-border"role="status"></div>)}
          </form>
        </div>
</>
  )
};
