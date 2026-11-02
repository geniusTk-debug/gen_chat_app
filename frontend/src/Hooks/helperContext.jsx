import { useContext } from "react";
import { createContext } from "react";

const AuthContext = createContext();

export default function useAuthContext () {
    const context = useContext(AuthContext)
    if(!context) throw new Error('useAuthcontext must be used within the AuthProvider')
        return context;
};