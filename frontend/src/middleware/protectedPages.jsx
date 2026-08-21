import { Navigate } from "react-router";
import { useAuthContext } from "../Hooks/useAuthContext";

export default function ProtectedPages ({ children }) {
    const { isAuthenticated, userData } = useAuthContext();
    console.log(isAuthenticated,'-in protectedPages boolean')
    console.log(userData,'- in protected user value')
    if(isAuthenticated) return children;
    
    return <Navigate to='/user/login' replace />
        
}