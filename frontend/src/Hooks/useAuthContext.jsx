import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useContext } from "react"

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [userData, setUserData] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const persistHandler = async () => {
            try {
                const savedUserData = await fetch('http://localhost:3000/api/user/me', {
            credentials : 'include'
        })
        const user = await savedUserData.json();
        console.log('user in context',user)
            setUserData(user);
        setLoading(false)

            } catch (error) {
                console.log(error?.message)
            }
        }
        persistHandler();
    },[])

    const login = (user) => {
        setUserData(user)
        
    }

    const logout = () => {
        setUserData('');
    }

    const contextValue = {
        userData,
        loading,
        isAuthenticated : !!userData,
        login,
        logout

    }

    return (
        <AuthContext.Provider value={contextValue}>
            {!loading && children }
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if(!context) throw new Error('useAuthcontext must be used within the AuthProvider')
        return context;
};
