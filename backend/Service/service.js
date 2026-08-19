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

        const data = await res.json();
        if(res.status === 200) {
        console.log(data, "in service.js")
        const ai_role = data?.choices?.[0]?.message?.role;
        const ai_content = data?.choices?.[0]?.message?.content;
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
            console.log('Failed to requested GROQ_API',data, res);
        }
} catch (error) {
    console.log(error?.message);
}

};



//check open ai models
// const res = await fetch('https://api.groq.com/openai/v1/models', {
    //     headers : {
    //         'Authorization' : `Bearer ${GROQ_API_KEY}`
    //     },
        
    // })
    // const d = await res.json();
    // console.log(d.data?.map(model => model.id))