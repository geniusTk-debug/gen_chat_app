import mongoose from "mongoose";
import { Schema, model } from "mongoose";


const chat = new Schema({

message : [
    {
        role : {
            type : String,
            required : true
        },
        content : {
            type : String,
            required : true
        }
    }
],

}, {timestamps : true});

const Chat = model('Chat', chat);

export default Chat;