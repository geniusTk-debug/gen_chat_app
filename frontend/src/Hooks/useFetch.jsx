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
            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';
            let toUI = '';
            const assistantId = crypto.randomUUID();

            setMessages(prev => [...prev, {
                        id : assistantId,
                        role : 'assistant',
                        content : '',
                        time : dateTime
                    }])

            while (true) {
                const data = await reader.read();
                if (data.done) {
                    break;
                }
                buffer += decoder.decode(data.value, {
                    stream: true,
                });
                
                
                if (buffer) {

                    while(buffer.length > 0) {
                        const firstWordIndex = buffer[0];
                        buffer = buffer.slice(1);
                        toUI += firstWordIndex
                        
                        console.log(toUI, 'toUI in while loop')
                        console.log(buffer, 'buffer in while loop')
                        setMessages(prev => 
                        prev.map(msg => 
                            msg.id === assistantId
                            ? { ...msg, content : toUI }
                            : msg
                        )
                    )

                        await new Promise((resolve) => setTimeout(resolve, 10));
                    }
                    
                }
            }
                setLoading(false);
                window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior : 'smooth'
                })
            } 
            else {
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
