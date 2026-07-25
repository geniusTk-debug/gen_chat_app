import { askAI } from "../Service/service.js";

const controller = {

    sendToClient : async (req,res) => {

                    return res.status(200).json(askAI)                                  
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
                        
                        const reply = await askAI(reqFromClient);
                        return res.status(200).json(reply)
                        
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