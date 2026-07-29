import { openAI } from "../Service/openAI.js";
import { askAI } from "../Service/service.js";
import Chat from "../Model/schema.js";

const controller = {

    sendToClient : async (req,res) => {
                    if (!req.body) {
                const d = await Chat.find().sort({createdAt : -1})
            return res.status(200).json(d);
                    }else {
                        return res.status(500).json({ msg : 'Chat History Unavailiable' })
                    }
                    
    
    },
//working//
    mainChatRoom :async (req,res)=>{
                    if(req.body) {
                        const  message  = await req.body.content;
    
                    const reqFromClient = {
                        "model" : "llama-3.1-8b-instant",
                        "messages" : [
                            {
                                "role" : "user",
                                "content" : message
                            },
                        ]
                    }
            
                        const aiReply = await askAI(reqFromClient);
                    console.log("In response to client section : ",aiReply)
                return res.status(200).json(aiReply);
                        
                    }
                    else {
                        return res.status(400).json('missing data');
                    }
                    
    },

    sendToClientSingle : (req,res) => {
                    console.log(req.body);
                    res.json('get single(id)')
    },
    update : (req,res) => {
                    console.log(req.body);
                    res.json('update(id)')
    },
    remove : (req,res) => {
                    console.log(req.body)
                    res.json('delete(id)')
    }
               
}


export default controller;