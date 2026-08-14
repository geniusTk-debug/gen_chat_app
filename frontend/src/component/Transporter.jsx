import useFetch from '../Hooks/useFetch'
import './style/transporter.css'

export default function Transpoter() {
    const { userValue, setUserValue, requestor, loading } = useFetch();
  return (
    <div className='main-container'>
        <form onSubmit={(e)=>requestor(e)} >
            {loading && ( <p className="">loading....</p> )}
                <input autoComplete='off' value={userValue} type='text' name='client_input' onChange={(e)=>setUserValue(e.target.value)} / >
                <button className='send-btn' type='submit' >Send</button>
            </form>
    </div>
  )
}
