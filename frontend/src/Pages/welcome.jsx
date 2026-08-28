import './style/welcome.css'
import { useNavigate } from 'react-router';
export default function Welcome() {
  const Navigate = useNavigate();
  
  const loginNav = () => {
    Navigate('/user/login')
  }

  const registerNav = () => {
    Navigate('/user/register')
  }
  return (
    <div className="welcome-container">
      <div className="navbar-container">
        <nav>
            
              <span className='left-section'></span>
              <span className="right-section"></span>
      
        </nav>
      </div>
      <div className="welcome-section">
        <div className="welcome">
          <span className='w-text'></span>
          <span className="extra">please login to continue</span>
          
            <div className="btn-section">
              <button className="login-btn" onClick={loginNav} >Login</button>
              <button className="register-btn" onClick={registerNav} >Register</button>
            </div>

        </div>

          
      </div>
      
    </div>

  )
}
