import { useState } from "react";
import { useNavigate } from "react-router";


export default function useAuth () {
    const Navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


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
    try {
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

    if(res.status === 200 || res.ok) {
        const data = await res.json();
        setLoading(false);
        console.log(res, data);
        await Navigate('/')
    } else {
        setLoading(false);
        
        setError(await res.json());
    }

    } catch (error) {
        console.log('inside catch',error);
        setError(error.message)
        setLoading(false)
    }
};

    const logoutHandler = async (e) => {
        e.preventDefault()
        console.log('logout hit')
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