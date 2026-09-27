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
    const [extended, isExtended] = useState(null);
        const [editId, setEditId] = useState(null);
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
                setView(data.title)
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
                setTitle('')
                // setChatHistory(prev => {
                //     const filtered = prev.filter(chat => chat._id !== stored._id);
                //     return [stored, ...filtered];
                // })
                localStorage.setItem('currentChatId', stored._id)
            }

            setLoading(false);
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior : 'smooth'
            })

        } else {
            setLoading(false)
            console.log(await res.json(), 'in the requestor status not 200')
        }

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

const editor = async (value) => {
console.log(value,editId,title, '----- value, editId, title in editor')
    try {
        const res = await fetch(`http://localhost:3000/api/user/chat/${editId}`, {
        method : 'PATCH',
        credentials: 'include',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify({ title : value })
    })
        if (res.ok) {
            const data = await res.json();
        isExtended(null)
            setEditId(null)
            setValue('')
            setView(data.title)
            setChatHistory(prev => 
                prev.map(t => 
                    t._id === chatId
                        ? { title : data.title }
                        : t
                )
            )
    }
    } catch (error) {
        console.log(error)
    }
}

const docsDel = async (_id) => {
    try {
        const del = await fetch(`http://localhost:3000/api/user/chat/${_id}`,{
            method : 'DELETE',
            credentials : 'include',
        })
        if (del.ok) {
            if (chatId === _id) {
                setView('')
                setMessages([]);
                setChatId(null);
                localStorage.removeItem("currentChatId");
                setChatHistory((prev) => prev.filter((del) => del._id !== _id));
            }
        }
    } catch (error) {
        console.log(error)
    }
    }
    console.log(chatHistory, 'chat history in Hook')

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
        editor,
        editId,
        setEditId,
        docsDel,
    }
};
