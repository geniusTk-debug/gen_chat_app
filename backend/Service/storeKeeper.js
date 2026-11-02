import Chat from '../Model/schema.js';


export default async function StoreKeeper(docs) {

    const filter = { _id : docs.chatId, user : docs.userId }

    const otv = { model : docs.model, title : docs.title }

    const messages = [
        { role : 'user', content : docs.client_text, updatedAt : new Date() },
        { role : 'assistant', content : docs.fullResponse, updatedAt : new Date() }
    ]
    
    return await Chat.findByIdAndUpdate(filter,
        { $setOnInsert : otv,
                $push : { messages : { 
                    $each : messages }}
            },

            {
                upsert : true,
                new : true,
                // runValidators : true,
                // setDefaultsOnInsert : true

            }
    )
}