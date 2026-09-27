import Chat from "../Model/schema.js";

export async function askAI (req) {

const GROQ_API_KEY = process.env.GROQ_API_KEY;

try {
    const content = req.question;
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions',{
        method : 'POST',
        headers : {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${GROQ_API_KEY}`
    },
    body : JSON.stringify(content)
    });

    if(!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'AI request failed');
    }

    const reply = await res.json();
    const title = req.title;

    const userId = req.userId;
    const chatId = req.chatId

    const client_role = content.messages[0].role;
    const client_content = content.messages[0].content;
    const roleText = reply.choices[0]?.message?.role || 'assistant';
    const contentText = reply.choices[0]?.message?.content || '';
    const chatTitle = title || client_content.slice(0, 40);
    let stored;
    if(chatId) {
        console.log('in here at updated chat')
        stored = await Chat.updated(
            {
                chatId,
                userId,
                client_role,
                client_content,
                roleText,
                contentText
            }
        )
    }

    if (!stored) {
        console.log('in here at create chat', title)
        stored = await Chat.created(
            {
                userId,
                title : chatTitle || title,
                client_role,
                client_content,
                roleText,
                contentText
            }
        )
    }

    return { reply, stored };
} catch (error) {
        console.log("inside catch",error?.message);
        throw error;
    } 
}                
