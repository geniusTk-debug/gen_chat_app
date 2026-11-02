import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";
import { useCallback } from "react";

export default function useFetch(url) {
    
    const { isAuthenticated, refreshedId } = useAuthContext();
    const [ chatHistory, setChatHistory ] = useState([]);
        const [messages, setMessages] = useState([]);
        const [ value, setValue ] = useState('');
                const [loading, setLoading] = useState(false);
            const [viewState, setViewState] = useState('');
        const [newTitle, setNewTitle] = useState('');
    const [chatId, setChatId] = useState(
            ()=>localStorage.getItem('currentChatId')
        );
    const [isNew, setIsNew] = useState(false);
    const [ moreBtn, setMoreBtn ] = useState(false);
        const [editId, setEditId] = useState(null);
        const [isRename, setIsRename] = useState(false)
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
                console.log(data, 'chat history in useEffect')
                
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
            formData.append("title", newTitle)
            if(chatId) formData.append("chatId", chatId); 
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
        console.log(res.headers.get('G-Chat-Id'), 'header in requestor')
        
        chatIdUpdater(res.headers.get('G-Chat-Id'))

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
                setIsNew(false);
            } else {
                chatIdUpdater(null)
                setLoading(false);
                setIsNew(false)
            }
    } 
    catch (error) {
        console.log('inside catch',error)
            setLoading(false);
        throw new Error('inside catch requestor', error)
    }

    };

const fetcherById = useCallback(async (id) => {
    console.log(id, 'id in fetcher by Id')
    if(!id) return;
    const res = await fetch(`http://localhost:3000/api/chat/${id}`,
        { credentials : 'include'})
        if(res.ok) {
            const data = await res.json();
            console.log(data, 'data in fetcherById')
            setMessages(data.messages)
            chatIdUpdater(data._id);
        }
},[]);

useEffect(() => {
    if(!refreshedId) return;
    fetcherById(refreshedId);
}, [refreshedId, fetcherById])

const editor = async (value) => {
    
console.log(value,editId, '----- value, editId, title in editor')
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
            console.log(data, 'data in editor')
            
            chatIdUpdater(data._id);
            setChatHistory(prev => 
                prev.map(t => 
                    t._id === chatId
                    ? { ...t, title : data.title }
                    : t
                )
            )
            setIsRename(false)
            setEditId(null)
            setMoreBtn(false)
            setValue('')
    }
    } catch (error) {
        console.log(error)
    }
}

const docsDel = async (_id) => {
    console.log(_id, 'in id in docs del')
    console.log(chatId, 'chatId in docsDel')
    if (chatId === _id) {
    try {
        const del = await fetch(`http://localhost:3000/api/user/chat/${_id}`,{
            method : 'DELETE',
            credentials : 'include',
        })
        if (del.ok) {
                setMessages([]);
                setIsRename(false);
                setMoreBtn(false);
                setEditId(null);              
                
                setChatHistory((prev) => {
                    const updatedDocs = prev.filter(delDoc => 
                        delDoc?._id !== _id
                    );

                    if(chatId === _id) {
                        const throwDocs = prev.findIndex(
                            doc => doc._id === _id
                        );
                        const remainingDocs = updatedDocs[Math.min(throwDocs, updatedDocs.length - 1)];
                        chatIdUpdater(remainingDocs?._id ?? null);
                        return updatedDocs;
                    }
                })


                // setChatHistory((prev) => 
                //     prev.filter((del) =>
                //          del._id !== _id));
                // chatIdUpdater(null);
            }
        } catch (error) {
            console.log(error)
    }
    }
    }

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

    function chatIdUpdater(id) {
        setChatId(id ?? null);

        if(id) {
            localStorage.setItem('currentChatId', id)
        } else {
            localStorage.removeItem('currentChatId')
        }
        
    }

    function newChatHandler (e) {
       e.preventDefault();
    
      setNewTitle(e.target.elements.title.value || e.target.value)
      setMessages([])
      setIsNew(false);
      chatIdUpdater(null);
      setValue('')
    }

    function moreBtnHandler (id,e) {
        console.log(moreBtn, 'more btn at click')
        e.preventDefault()
        if(!moreBtn) {
            setMoreBtn(true);
        setEditId(id)    
        } else {
            setMoreBtn(false)
        setEditId(null)
        }
        
    }

    function canBtnHandler (e) {
        e.preventDefault();
        setIsRename(false);
      
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
        newTitle,
        setNewTitle,

        //to <Layout />
        
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
        src,

        chatIdUpdater,
        newChatHandler,

        viewState,
        setViewState,

        isRename,
        setIsRename,
        isNew,
        setIsNew,

        moreBtnHandler,
        moreBtn,
        setMoreBtn,

        canBtnHandler


    }
};
