import { Link } from "react-router"
import useAuth from "../Hooks/useAuth"

export default function Logout() {
    const auth = useAuth();
  return (
    <div>
        <button onClick={auth.logoutHandler}>
            <Link to=''>Logout </Link>
        </button>

    </div>
  )
}
