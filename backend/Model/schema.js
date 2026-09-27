import { Schema, model } from "mongoose";

const ch_Schema = new Schema({
    role : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    }

}, { timestamps : true })

const chat = new Schema({
        
        user : {
            type : Schema.Types.ObjectId,
            ref : 'user_genchat',
            required : true
        },
        title : {
            type : String,
            required : true
        },
        messages : [ ch_Schema ]
            
        
        
    }, {timestamps : true});
// chat.statics.created = async function created(docs) {
    
//     return await this.create(
//         {
//             user : docs.userId,
//             title : docs.title,
//             messages : [
//                 {
//                     role : docs.client_role,
//                     content : docs.client_content,
//                     updatedAt : new Date()
//                 },
//                 {
//                     role : docs.roleText,
//                     content : docs.contentText,
//                     updatedAt : new Date()
//                 }
//             ]
//         },
//         { returnDocument : 'after'}
//     )
// }

chat.statics.created = async function created(docs) {

  const chatData = {
    user: docs.userId,
    title: docs.title,
    messages: [
      {
        role: docs.client_role,
        content: docs.client_content,
      },
      {
        role: docs.roleText,
        content: docs.contentText,
      },
    ],
  };

  return await this.create(chatData);
};

chat.statics.updated = async function updated(docs) {
    return await this.findOneAndUpdate(
        {
            _id : docs.chatId,
            user : docs.userId
        },
        {
            $push : { messages : {
                $each : [
                    {
                        role : docs.client_role,
                        content : docs.client_content,
                        updatedAt : new Date()
                    },
                    {
                        role : docs.roleText,
                        content : docs.contentText,
                        updatedAt : new Date()
                    }
                ]
            }}
        },
        {
            new : true,
        }
    )
}


const Chat = model('Chat', chat);
export default Chat;

