import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useContext } from "react"

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        try {
            const authChecker = async () => {
            setLoading(true)

                const res = await fetch('http://localhost:3000/api/user/me', {
            credentials : 'include'
        })
        if(res.ok) {
            const user = await res.json();
            setUser(user);
            setLoading(false)

        } else {
            setUser(null);
            setLoading(false)
        }

        }
            authChecker();
        } catch (error) {
            console.log(error)
        }
    },[])

    const login = (user) => {
        setUser(user)
        
    }

    const logout = () => {
        setUser(null);
    }

    const contextValue = {
        user,
        loading,
        isAuthenticated : !!user,
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
