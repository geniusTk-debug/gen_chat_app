import Chat from '../Model/schema.js';

export default async function StoreKeeper(docs) {

console.log(docs.title, '-----title are here in the storeKeeper ----')
console.log(docs.value, '-----value are here in the storeKeeper ----')  
console.log(docs.userId, '-----userId are here in the storeKeeper ----')
console.log(docs.chatId, '-----chatId are here in the storeKeeper ----')

try {
        let stored;
if(docs.chatId) {
        stored = await Chat.updated(
            {
                chatId : docs.chatId,
                userId : docs.userId,
                client_role : 'user',
                client_content : docs.value,
                roleText : 'assistant',
                contentText : docs.fullResponse
            }
        )
    }   

    if (!stored) {
        stored = await Chat.created(
            {
                userId : docs.userId,
                title : docs.title || docs.value.slice(0, 40),
                client_role : 'user',
                client_content : docs.value,
                roleText : 'assistant',
                contentText : docs.fullResponse
            }
        )
    }
    return stored;
} catch (error) {
    console.log(error?.message, '-----error are here in the storeKeeper ----')
}

}