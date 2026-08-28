import useAuth from '../Hooks/useAuth';
import './style/login.css'
import { NavLink } from 'react-router';
import Spinning from '../spinning';

export default function Register() {
    const authenticator = useAuth();
  return (
    <div className="container">
        <div className="form-container">
            <div className="title-container register-title">
                <span className='title'>
                    Sign Up
                </span>
                {authenticator.loading
                ?
                (<Spinning />)
                :
                (<span>Please enter your details for Crate a account</span>)}
            </div>
            <form autoComplete='off' className='register-form' onSubmit={authenticator.registerHandler} >
                <input type='text' placeholder='Username' name='username'></input>
                <input type="text" placeholder="Email address" name="email" />
                <input type="password" placeholder="Password" name="password" />
                <input type="password" placeholder="Confirm Password" name="confirm_password"  />
                <span>{authenticator.error && `Failed : ${authenticator.error}`}</span>
                <button className="signup-btn" type='submit' >
                    <span className='arrow-svg'>
                        <svg className="svg" xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 22 21"><path fill="#fff" fillRule="evenodd" d="M11.957 3.719 18.5 10.5l-6.543 6.781-.642-.62 5.515-5.715H4.5v-.892h12.33l-5.515-5.715z" clipRule="evenodd"></path></svg>
                    </span>
                    
                    Sign Up</button>
                
            </form>
            <div className="extra register-extra">
                <span className='register-or'></span>
                <button className='extra-btn' >Sign Up using 
                    <img src='/google-wordmark-256px.png' ></img>
                </button>
                <div className='bottom'>
                    <span>Already have an account? </span>
                    <NavLink to='/user/login'>Sign In here</NavLink>
                </div>
            </div>
        </div>
    </div>
)
}
