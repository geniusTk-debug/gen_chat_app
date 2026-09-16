import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";

export default function useFetch(url) {
    
    const { isAuthenticated } = useAuthContext();
    const [ chatHistory, setChatHistory ] = useState([]);
        const [messages, setMessages] = useState([]);
        const [ value, setValue ] = useState('');
                const [loading, setLoading] = useState(false);
            const [view, setView] = useState('');
        const [title, setTitle] = useState('');
    const [chatId, setChatId] = useState(
            ()=>localStorage.getItem('currentChatId')
        );
    const [extended, isExtended] = useState(false);
        // const [singleChat, setSingleChat] = useState('');

//time function
const time = new Date();
const dateTime = time.toLocaleTimeString([], {
    hour : '2-digit',
    minute : '2-digit',
    
})

useEffect(() => {
    
    const fetcher = async () => {
        const res = await fetch(`http://localhost:3000/api/chat-history`,
                { credentials : 'include' });

        if(res.status === 200 || res.ok) {
            const data = await res.json();
                setTitle(data.title)
                setChatHistory(data);
        }
        else {
            console.log(
                'Failed to fetch chat history. Check your internet connection and try again',res.error )
        }
        }

        if(isAuthenticated) fetcher();
    
    },[isAuthenticated])

    const requestor = async (e)=> {

            setLoading(true);

    try {

        const value = e.target.elements.client_input.value;
        setValue(value)
            setMessages(prev => [...prev,{
                id : crypto.randomUUID(),
                role : 'user',
                content : value,
                time : dateTime
            }])

            const body = { title, value, chatId }; //chatId : null
        const res = await fetch(url,{
            method : 'POST',
                credentials : 'include',
                    headers: {
                        'Content-Type': 'application/json'
        },
                        body : JSON.stringify(body)
        });


        if(res.status === 200 || res.ok) {
            const data = await res.json();
            const reply = data?.reply?.choices?.[0]?.message;
            const stored = data?.stored;

            if(reply) {
                setMessages(prev=> [...prev, {
                    id : crypto.randomUUID(),
                    role : reply.role,
                    content : reply.content,
                    time : dateTime
                }])
            }

            if(stored) {
                setView(stored.title)
                setChatId(stored._id)
                setChatHistory(prev => {
                    const filtered = prev.filter(chat => chat._id !== stored._id);
                    return [stored, ...filtered];
                })
                localStorage.setItem('currentChatId', stored._id)
            }

            setLoading(false);
            window.scroll({ left : '0', top : document.body.scrollHeight, behavior : "smooth"})

        };

    } 
    catch (error) {

        console.log('inside catch',error)
            setLoading(false);
    }

    };

const fetcherById = async (id) => {
    console.log(id, 'id in fetcher by Id')
    const res = await fetch(`http://localhost:3000/api/chat/${id}`,
        { credentials : 'include'})
        if(res.ok) {
            const data = await res.json();
            console.log(data)
            setMessages(data.messages)
            setView(data?.title)
            setChatId(data?._id)
            localStorage.setItem('currentChatId', data?._id)
        }
}

    return { 
        //to <ChatHistory/>
        chatHistory,

        //to <ChatBox />
        messages,
        setMessages,

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
        isExtended,
        chatId,
        setChatId,
        fetcherById,
        // singleChat,
        value,
    }
};
