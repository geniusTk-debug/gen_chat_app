import { NavLink } from "react-router"
import './style/login.css';
import useAuth from "../Hooks/useAuth";

export default function Login() {
    const auth = useAuth();

  return (
    <div className='login-component'>
        <div className="justify-between">
            <NavLink className='heading' to='/user/login' ></NavLink>
            <NavLink className="heading_" to='/user/register' ></NavLink>
        </div>
 

        <div className="login-form">
            <form className="form" onSubmit={auth.loginHandler} >
                <label>Username
                    <input autoComplete="off" placeholder='email or username' type="text" name="email" />
                </label>
                <label>Password
                    <input placeholder='password' type='password' name="password" />
                </label>

                <div className="flex">
                    {!!auth.error && ( <span>{`Login failed - ${auth.error}` }</span> )}
                    {!!auth.loading && (<div className="spinner-border"role="status">
                    </div>)}
                    <button className="login-btn" type="submit">
                    Login</button>
                </div>
            </form>
        </div>

    </div>
  )
}
