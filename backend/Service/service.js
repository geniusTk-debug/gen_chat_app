
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
    return res;

} catch (error) {
        console.log("inside catch",error?.message);
        throw error;
    } 
}                
