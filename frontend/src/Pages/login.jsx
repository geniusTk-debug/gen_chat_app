import { NavLink } from "react-router"
import './css/login.css';
import useFetch from "../Hooks/useFetch";

export default function Login() {
    const {loginHandler, loading, error } = useFetch();
  return (
    <div className='login-component'>
        <div className="justify-between">
            <NavLink className='heading' to='/user-acc/login' ></NavLink>
            <NavLink className="heading_" to='/user-acc/register' ></NavLink>
        </div>
 

        <div className="login-form">
            <form className="form" onSubmit={loginHandler} >
                <label>Username
                    <input autoComplete="off" placeholder='email or username' type="text" name="email" />
                </label>
                <label>Password
                    <input placeholder='password' type='password' name="password" />
                </label>

                <div className="flex">
                    {!!error && ( <span>{`Login failed - ${error}` }</span> )}
                    {!!loading && (<div className="spinner-border"role="status">
                    <span className="sr-only">Loading...</span>
                    </div>)}
                    <button className="login-btn" type="submit">
                    Login</button>
                </div>
            </form>
        </div>

    </div>
  )
}
