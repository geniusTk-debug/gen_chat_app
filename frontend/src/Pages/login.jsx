import useAuth from '../Hooks/useAuth';
import { NavLink } from 'react-router'
import { Link } from 'react-router'
import './style/login.css'
import Spinning from '../spinning';

export default function Login() {

    const authenticator = useAuth();

  return (
    <div className="container">
        <div className="form-container">
            <div className="title-container">
                <span className='title'>
                    Sign In
                </span>
                {authenticator.loading
                ?
                (<Spinning />)
                :
                (<span>Please enter your details to sign in</span>)}
            </div>
            <form onSubmit={authenticator.loginHandler} >
                
                <input type="text" placeholder="Enter your email address" name="email" />
                <input type="password" placeholder="Password" name="password" />
                <Link className='forget' to={null}></Link>
                <span>{authenticator.error && `Failed : ${authenticator.error}`}</span>

                <button className="signin-btn" type='submit' >
                    <span className='arrow-svg'>
                        <svg className="svg" xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 22 21"><path fill="#fff" fillRule="evenodd" d="M11.957 3.719 18.5 10.5l-6.543 6.781-.642-.62 5.515-5.715H4.5v-.892h12.33l-5.515-5.715z" clipRule="evenodd"></path></svg>
                    </span>
                    
                    Sign in</button>
                
            </form>
            <div className="extra">
                <span className='or'></span>
                <button className='login-btn'>Continue with
                    <img src='/google-wordmark-256px.png' ></img>
                </button>
                <div className='bottom' >
                    <span>No account? </span>
                    <NavLink style={{cursor:'pointer'}} to='/user/register'>Create one</NavLink>
                </div>
            </div>
        </div>
    </div>
  )
}
