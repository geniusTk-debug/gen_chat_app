import { askAI } from "../Service/service.js";
import Chat from "../Model/schema.js";
import User from "../Model/authSchema.js";
import createToken from "../Helper/jwt.js";
import { timeLimit } from "../Helper/jwt.js";

const controller = {

    chatHistory : async (req,res) => {
        
        try {
            const chat = await Chat.find()
        return res.status(200).json(chat);
        } catch (error) {
            console.log(error)
            return res.status(400).json({ msg : 'Chat History Unavailiable' })
        }

    
    },

    single : async (req, res) => {
        try {
            const id = req.params.id;
        console.log(id, 'id in the single')
        const chById = await Chat.findById(id)
        console.log(chById)
        return res.status(200).json(chById)
        } catch (error) {
            console.log(error)
            res.status(400).json(error?.message)
        }
    },


//working//
    integrate :async (req,res)=>{

    try {
    if(req.body) {
                        
        const { title, value, chatId }  = req.body;
        const question = {
            "model" : "openai/gpt-oss-20b",
            "messages" : [
                {
                    "role" : "user",
                    "content" : value
                },
            ]
        }

        const userId = req.user?.[0]?._id;
        const data = await askAI(
            {
                res, 
                title,
                question, 
                userId, 
                chatId 
            }
        );
            return res.status(200).json(data)
    } else {
            return res.status(400).json('missing data');
    }
    } catch (error) {
        console.log(error?.message);
        return res.status(500).json(error?.message || 'Something went wrong');
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

    logout : async (req, res) => {
        try {
            res.clearCookie('jwt')
        return res.status(200).json('logout successfully')
        } catch (error) {
            console.log(error)
            return res.status(400).json(error.message)
        }
    },
    
    me : async (req, res) => {
        console.log(req.user)
        try {
            const user = {
            user : {
                username : req.user[0].username,
            email : req.user[0].email
            }
        }
        return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json(error)
        }
    },
}


export default controller;
