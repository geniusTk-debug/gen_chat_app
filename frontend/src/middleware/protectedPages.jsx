import { Navigate } from "react-router";
import { useAuthContext } from "../Hooks/useAuthContext";

export default function ProtectedPages ({ children }) {
    const { userData } = useAuthContext();

    if(!userData) {
       return <Navigate to='/user/login' replace />
    }
        return children;
}