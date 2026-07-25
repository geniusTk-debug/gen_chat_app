export async function askAI (reqFromClient) {

    const GROQ_API_KEY = process.env.GROQ_API_KEY;

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
        console.log("data from ai : ", data, res)
        return data;
        } else{
            console.log(res.status, res.reply);
        }

}
































// const messageReply = {

//         message_1 : 'Hello, how can I help You?',
//         message_2 : 'Hello, how are you?',
//         message_3 : 'Hey There!'
// };
// const message = [];

// const service = [
// { 
//     messageReply : {
//         message_1 : 'Hello, how can I help You?',
//         message_2 : 'Hello, how are you?',
//         message_3 : 'Hey There!'
//         }
// },
// ]
//    let reply = Array.from({ message : messageReply },(_,i) => {
//         reply.push(i);
//     })

    



// export default service;
