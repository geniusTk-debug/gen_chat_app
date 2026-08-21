import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "./useAuthContext";


export default function useAuth () {
    const Navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { login, logout } = useAuthContext();


    const registerHandler = async (e) => {
    e.preventDefault();
    setError(null);    
        try {
            setLoading(true)
            const target = e.target.elements;
            if(target.password.value !== target.confirm_password.value) {
                throw new Error('password must be same');
            }
            // const username = target.username.value
            // const email = target.email.value
            // const password = target.password.value

        const body = {
            username : target.username.value,
            email : target.email.value,
            password : target.confirm_password.value,
        }
        console.log(body)
        const res = await fetch('http://localhost:3000/api/user/register', {
            method : 'POST',
            credentials : 'include',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(body)
        });
        const data = await res.json();
        if(res.ok) {
            console.log(data);
            setLoading(false);
        }else {
            console.log('error to show',data)
            setError(data)
            setLoading(false)
        }
        } catch (error) {
            console.log(error.message);
            setError(error.message)
            setLoading(false);
        }
}

const loginHandler = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

        const target = e.target.elements;
    const body = {
        email : target.email.value,
        password : target.password.value
    };
    console.log(body)
    if(!body.email || !body.password) {
        setLoading(false);
        return;
    }

    const res = await fetch('http://localhost:3000/api/user/login', {
        method : 'POST',
        credentials : 'include',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(body)
    });

    const data = await res.json();
    if(res.ok) {
        setLoading(false);
        login(data)
        await Navigate('/')
    } else {
        setError(data)
        setLoading(false)
    }

};

    const logoutHandler = async (e) => {
        e.preventDefault()
        setError(null)
        setLoading(true)
        try {
            const res = await fetch('http://localhost:3000/api/user/logout', {
                method : 'POST',
                credentials : 'include',
            })
            if(res.ok) {
                const data = await res.json();
                logout();
                setLoading(false);
                console.log(data)
                Navigate('/user/login')
            }

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    };
    

    return (
        {
            logoutHandler,
            loginHandler,
            registerHandler,
            loading,
            error
    }
    )
}