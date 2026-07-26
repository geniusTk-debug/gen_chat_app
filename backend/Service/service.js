import Chat from "../Model/schema.js";

export async function askAI (reqFromClient) {
const GROQ_API_KEY = process.env.GROQ_API_KEY;

try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${GROQ_API_KEY}`
        },
        body : JSON.stringify(reqFromClient)
        });
    
        if(res.status === 200) {
            const data = await res.json();
console.log(reqFromClient,'******')
console.log("console 2 : ",data.choices[0].message);
console.log("console 3 : ",data.choices[0].message.content);;

const ai_role = data.choices[0].message.role;
const ai_content = data.choices[0].message.content;
const client_role = reqFromClient.messages[0].role;
const client_content = reqFromClient.messages[0].content;

        const Chat_History = await Chat.create({
            "message" : [
                {
                    "role" : ai_role,
                    "content" : ai_content
                },
                {
                    "role" : client_role,
                    "content" : client_content
                }
            ]
        });
        console.log('Stored success in Mongo DB : ', Chat_History);   

        return data;
        } else{
            console.log('Failed to requested GROQ_API',res.status, res);
        }
} catch (error) {
    console.log(error);
}

};

