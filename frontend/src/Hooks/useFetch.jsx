import { useState } from "react";

export default function useFetch(url) {

    const [message, setMessage] = useState('');
const [userValue, setUserValue] = useState('');
const [loading, setLoading] = useState(false);
const [UIvalue, setUIValue] = useState('');
const [error, setError] = useState(null);

const requestor = async (e)=> {
                e.preventDefault();
            setUIValue(e.target.elements.client_input.value);
        setLoading(true);
    const body = {
        "content" : userValue,
    };
    try {
    if(body.length || body) {
    const res = await fetch(url,{
        method : 'POST',
        headers: {
    'Content-Type': 'application/json'
    },
    body : JSON.stringify(body)
    });

    if(res.status === 200 || res.ok) {
                const data = await res.json();
            const aiResponse = data.choices;
        setMessage(aiResponse);
    setLoading(false);
window.scroll({top : '0', behavior : 'smooth'})
    console.log('Requested to API successfully...: ', aiResponse)
    };
    }
    } catch (error) {
    console.log('inside catch',error)
        }
    setUserValue('');
    };

const registerHandler = async (e) => {
    e.preventDefault();
    setError(null);    
        try {
            setLoading(true)
            const target = e.target.elements;
            if(target.password.value !== target.confirm_password.value) {
                throw new Error('password must be same');
            }
            const password = target.password.value;
            const email = target.email.value;
            const username = target.username.value;
        const body = {
            username,
            email,
            password,
        }
        console.log(body)
        const res = await fetch('http://localhost:3000/api/user-acc/register', {
            method : 'POST',
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




    return { 
        message,
        userValue, setUserValue,
        UIvalue, setUIValue,
        requestor,
        loading ,
        registerHandler,
        error,
    }
};