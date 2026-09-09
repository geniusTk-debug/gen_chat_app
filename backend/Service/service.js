import Chat from "../Model/schema.js";

export async function askAI (question, title) {
    console.log(question.title, 'title for ask')
const GROQ_API_KEY = process.env.GROQ_API_KEY;

try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions',{
        method : 'POST',
        headers : {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${GROQ_API_KEY}`
    },
    body : JSON.stringify(question)
    });

        const data = await res.json();
        if(res.status === 200) {

        const ai_role = data?.choices?.[0]?.message?.role;
            const ai_content = data?.choices?.[0]?.message?.content;
                const client_role = question.messages[0].role;
                const client_content = question.messages[0].content;
            console.log(title)

        const createAndUpdate = await Chat.findOneAndUpdate(
            { 
                title
            },
            {
                $push : { messages : {
                    $each : [
                        {
                            role : client_role,
                            content : client_content,
                            createdAt : new Date()
                        },
                        {
                            role : ai_role,
                            content : ai_content,
                            createdAt : new Date()
                        }
                    ]
                }}
            },
            { upsert : true,
                returnDocument : "after"
            }
        )
        
        console.log('Stored success in Mongo DB : ', createAndUpdate);   

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