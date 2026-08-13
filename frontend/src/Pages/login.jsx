import { NavLink } from "react-router"
import './css/login.css';
import useFetch from "../Hooks/useFetch";

export default function Login() {
    const {loginHandler} = useFetch();
  return (
    <div className='login-component'>
        <div className="justify-between">
            <NavLink className='heading' to='/acc/login' ></NavLink>
            <NavLink className="heading_" to='/acc/register' ></NavLink>
        </div>
 

        <div className="login-form">
            <form className="form" autoComplete="off" onSubmit={loginHandler} >
                <label>Username
                    <input placeholder='email or username' type="text" />
                </label>
                <label>Password
                    <input placeholder='password' type='password' />
                </label>

                <button className="login-btn" type="submit">Login</button>
            </form>
        </div>

    </div>
  )
}
