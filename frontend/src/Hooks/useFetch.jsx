import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";

export default function useFetch(url) {
    
    const { isAuthenticated } = useAuthContext();
    const [ chatHistory, setChatHistory ] = useState([]);
        const [backValue, setBackValue] = useState('');
            const [frontValue, setFrontValue] = useState('');
                const [loading, setLoading] = useState(false);
            const [view, setView] = useState('idle');
        const [title, setTitle] = useState('');
    const [extended, isEntended] = useState(false);
    const requestor = async (e)=> {

            setLoading(true);

    try {

        const value = e.target.elements.client_input.value;
            setFrontValue(value)
                    const body = { title,value };
        console.log(body)
        const res = await fetch(url,{
            method : 'POST',
                credentials : 'include',
                    headers: {
                        'Content-Type': 'application/json'
        },
                        body : JSON.stringify(body)
        });

        console.log('res in requestor', res)
        const data = await res.json();

        if(res.status === 200 || res.ok) {

        const aiResponse = data.choices;
        console.log(aiResponse, '%%%')
        console.log(data, 'data in res')
            setBackValue(aiResponse);
                setLoading(false);
                    window.scroll({top : '0', behavior : 'smooth'})
                        console.log( aiResponse )

        };

    } 
    catch (error) {

        console.log('inside catch',error)
            setLoading(false);
    }

    };



    useEffect(() => {
    
        const fetcher = async () => {
            const res = await fetch(url,{ credentials : 'include' });

        if(res.status === 200 || res.ok) {
            const data = await res.json();
            console.log(data?.[0]?.messages, '###')
            console.log(data?.title, 'ttttile')
                setChatHistory(data);
        }
        else {
            console.log(
                'Failed to fetch chat history. Check your internet connection and try again',res.error )
        }
        }

        if(isAuthenticated) fetcher();
    
    },[])

    return { 
        //to <ChatHistory/>
        chatHistory,

        //to <ChatBox />
        backValue,
        frontValue,

        //to <Transporter />
        requestor,
        loading ,

        //to <Content />
        view,
        setView,
        title,
        setTitle,

        //to <Layout />
        extended,
        isEntended
    }
};