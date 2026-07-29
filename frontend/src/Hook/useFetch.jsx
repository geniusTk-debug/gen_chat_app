import { useState } from "react";

export default function useFetch(url) {

    const [message, setMessage] = useState('');
const [userValue, setUserValue] = useState('');
const [loading, setLoading] = useState(null);
const [UIvalue, setUIValue] = useState('');

// useEffect(()=>{
//     const fetcher = async () => {
//                 const res = await fetch('http://localhost:3000/api/chat');
//             if(res.status === 200) {
//             console.log('fetch successfully',res)
//         const d = await res.json();
//         console.log('Successfully fetch chat history : ', d)
//     return d;
//     } 
//     }
//     fetcher(); 
    
// },[])

const requestor = async (e)=> {
                e.preventDefault();
            setUIValue(e.target.elements.client_input.value);
        setLoading(true);
    console.log(e.target.elements.client_input.offSetHeight)
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

    return { 
        message,
        userValue, setUserValue,
        UIvalue, setUIValue,
        requestor,
        loading 
    }
};

