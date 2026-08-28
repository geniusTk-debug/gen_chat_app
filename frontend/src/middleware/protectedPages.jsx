import { useAuthContext } from "../Hooks/useAuthContext";
import Welcome from "../Pages/welcome";
export default function ProtectedPages ({ children }) {
    const { isAuthenticated } = useAuthContext();
    console.log(isAuthenticated,'-in protectedPages boolean')
    if(isAuthenticated) return children;
    
    return <Welcome />;
}