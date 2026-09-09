import mongoose from "mongoose";
import { Schema, model } from "mongoose";


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
        messages : [
            {
                'role' : {
                    type : String,
                    required : true
                },
                'content' : {
                    type : String,
                    required : true
                },
            }
        ]
            
        
        
    }, {timestamps : true});

const Chat = model('Chat', chat);
export default Chat;

