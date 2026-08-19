import { openAI } from "../Service/openAI.js";
import { askAI } from "../Service/service.js";
import Chat from "../Model/schema.js";
import User from "../Model/authSchema.js";
import createToken from "../Helper/jwt.js";
import { timeLimit } from "../Helper/jwt.js";

const controller = {

    chatHistory : async (req,res) => {
                    if (!req.body) {
                const d = await Chat.find().sort({createdAt : -1})
            return res.status(200).json(d);
                    }else {
                        return res.status(500).json({ msg : 'Chat History Unavailiable' })
                    }
                    
    
    },
//working//
    integrate :async (req,res)=>{
                    if(req.body) {
                        const  message  = await req.body?.content;
    
                    const clientReq = {
                        "model" : "openai/gpt-oss-20b",
                        "messages" : [
                            {
                                "role" : "user",
                                "content" : message
                            },
                        ]
                    }
                    console.log(clientReq)
                        const aiReply = await askAI(clientReq);
                    console.log(aiReply)
                return res.status(200).json(aiReply );
                        
                    }
                    else {
                        return res.status(400).json('missing data');
                    }
                    
    },

    
    register : async (req, res) => {
        
        try {
            const { email, username, password } = req.body;
            const user = await User.register(username, email, password );
            const token = await createToken(user._id);
            res.cookie('jwt', token, { httpOnly : true, maxAge : timeLimit * 1000 } )
    return res.status(200).json({ user, token });
} catch (error) {
    return res.status(400).json(error.message)
}
    },



    login : async (req, res) =>{
        try {
            const { email, password } = req.body;
            
            const user = await User.login( email, password );
            const token = await createToken(user._id);
            res.cookie('jwt', token, { httpOnly : true, maxAge : timeLimit * 1000 })
            
            return res.status(200).json(user);
            
        } catch (error) {
            
            console.log(error.message)
            return res.status(400).json(error.message);
        }
    },
    
    me : async (req, res) => {
        const user = req.user;
        if(!user) return res.status(400).json('need authentication') 
        return res.status(200).json(req.user)
    },
}


export default controller;