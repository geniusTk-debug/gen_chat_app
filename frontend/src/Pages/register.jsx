import useAuth from '../Hooks/useAuth';
import './style/register.css';
import { NavLink } from 'react-router';

export default function Register() {
    const auth = useAuth();
  return (
    <div className='register-component'>
        <div className="justify-between">
            <NavLink className='heading' to='/user/login' ></NavLink>
            <NavLink className='heading_' to='/user/register' ></NavLink>
        </div>

        <div className="register-form">
            <form className='form' onSubmit={auth.registerHandler} >
                <label>Username
                    <input autoComplete='no' placeholder='Username' name='username' type="text" />
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
                    {!!auth.error && ( <span>{`Registration Failed - ${auth.error}` }</span> )}
                    {!!auth.loading && (<div className="spinner-border"role="status">
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
