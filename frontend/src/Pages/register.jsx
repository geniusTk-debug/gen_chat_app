import './css/register.css';
import { NavLink } from 'react-router';
import useFetch from '../Hooks/useFetch'

export default function Register() {
  const {registerHandler, error, loading } =  useFetch()
  return (
    <div className='register-component'>
        <div className="justify-between">
            <NavLink className='heading' to='/acc/login' ></NavLink>
            <NavLink className='heading_' to='/acc/register' ></NavLink>
        </div>
 

        <div className="register-form">
            <form className='form' onSubmit={registerHandler} >
                <label>Username
                    <input autoComplete='off' placeholder='Username' name='username' type="text" />
                </label>
                <label>Email
                    <input autoComplete='no' placeholder='Email address' name='email' type="text" />
                </label>
                <label>Password
                    <input placeholder='Password' name='password' type='password' />
                </label>
                <label>Confirm Password
                    <input placeholder='Confirm your password' name='confirm_password' type='password' />
                </label>

                <div className="flex">
                    {!!error && ( <span>{`Registration Failed - ${error}` }</span> )}
                    {!!loading && (<div className="spinner-border"role="status">
                    <span className="sr-only">Loading...</span>
                    </div>)}
                    <button className="register-btn" type="submit">
                    Register</button>
                </div>
            </form>
        </div>

    </div>
  )
}
