import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";

export default function useFetch(url) {
    
    const { isAuthenticated } = useAuthContext();
    const [ chatHistory, setChatHistory ] = useState([]);
        const [messages, setMessages] = useState([]);
        const [ value, setValue ] = useState('');
                const [loading, setLoading] = useState(false);
            const [viewId, setViewId] = useState('');
        const [title, setTitle] = useState('');
    const [chatId, setChatId] = useState(
            ()=>localStorage.getItem('currentChatId')
        );
    const [extended, isExtended] = useState('idle');
        const [editId, setEditId] = useState(null);
        // const [singleChat, setSingleChat] = useState('');
        const [ model, setModel ] = useState('openai/gpt-oss-20b')
        const [ src, setSrc ] = useState('')
        const [ imgFile, setImgFile ] = useState('')

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
            console.log('data in useEffect should this when Refresh --', data)
                setChatHistory(data);
                data.map(viewById => 
                    setViewId(viewById._id)
                )
                
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
            const formData = new FormData();

            formData.append("value", value)
            formData.append("title", title)
            formData.append("chatId", chatId)
            formData.append("model", model)
            formData.append("imgFile", imgFile)

        const res = await fetch(url,{
            method : 'POST',
                credentials : 'include',
        //             headers: {
        //                 'Content-Type': 'application/json'
        // },
                        body : formData
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
            console.log(data, 'data in fetcherById')
            setMessages(data.messages)
            // setView(data?.title)
            setViewId(data?._id)
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
        isExtended('idle')
            setEditId(null)
            setValue('')
            isExtended(data.title)
            // setView(data.title)
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
                setViewId('')
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

    const uploadImg = (e) => {
          const file = e.target.files[0];
          
          if(!file) return;

          let previewImg = null;
          if(previewImg) {
            URL.revokeObjectURL(previewImg)
          }
          previewImg = URL.createObjectURL(file)
          setSrc(previewImg); 
          setImgFile(file);
          
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
        viewId,
        setViewId,
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

        //to <ModelSelector />
        model,
        setModel,

        //img
        uploadImg,
        src
    }
};
