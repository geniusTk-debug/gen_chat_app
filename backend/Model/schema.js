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
        _id : {
            type : Schema.Types.ObjectId,
            ref : 'user_genchat',
            required : true
        },
        model : {
            type : String,
            required : true
        },
        title : {
            type : String,
            required : true
        },

        messages : [ ch_Schema ]
        
        
    }, {timestamps : true});

const Chat = model('Chat', chat);
export default Chat;





