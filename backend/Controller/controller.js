import { askAI } from "../Service/service.js";
import Chat from "../Model/schema.js";
import User from "../Model/authSchema.js";
import createToken from "../Helper/jwt.js";
import { timeLimit } from "../Helper/jwt.js";
import StoreKeeper from "../Service/storeKeeper.js";
import { uploader } from "../Service/imageUploader.js";
import { model, Types } from "mongoose";
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
        const chById = await Chat.findById(id)
        return res.status(200).json(chById)
        } catch (error) {
            console.log(error)
            res.status(400).json(error?.message)
        }
    },

    updateTitle : async (req, res) => {
        try {

            const updateT = await Chat.findByIdAndUpdate(req.params.id, {
                title : req.body.title,
            }, { returnDocument : 'after' })

            if(updateT) {
                console.log(updateT, "title updated in db")
                return res.status(200).json(updateT)
            }
        } catch (error) {
            return res.status(400).json(error)
            console.log(error)
        }
    },

    remove : async (req, res) => {
        console.log(req.params.id)
        try {
            const del = await Chat.findByIdAndDelete({ _id : req.params.id}, 
                {
                    returnDocument : 'after'
                }
            )
            if(del) {
                return res.status(200).json('Successfully deleted chat docs')
            }
        } catch (error) {
            return res.status(400).json(error)
            console.log(error)
        }
    },


integrate :async (req,res)=> {
        
    if (!req.body) return res.status(400).json('missing data');

    try {

        const incoming = req.body; //see more at frontend/useFetch

        const question = {
            "model" : incoming.model,
            "messages" : [
                {
                    "role" : "user",
                    "content" : incoming.value
                },
            ],
            stream: true
        }

        const userId = req.user?.[0]?._id;
        const testId = !incoming.chatId || incoming.chatId === "null";

        const chatId = testId
                           ? new Types.ObjectId().toString()
                           : incoming.chatId;

        const currentModel = question.model;
        const data = await askAI(
            {
                res, 
                question, 
            }
        );
        res.setHeader('G-Chat-Id', chatId)
        const reader = data.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';
            let fullResponse = '';

        while (true) {
            const stream = await reader.read();
            if (stream.done) break;
            
            buffer += decoder.decode(stream.value, {
              stream: true,
            });

            const events = buffer.split('\n\n');
            buffer = events.pop();

            for (const event of events) {
                const line = event.trim()

                if (!line.startsWith('data:')) {
                    continue;
                }

                const data = line.replace(/^data:\s*/, "");

                if (data === '[DONE]') break;
                
                const json = JSON.parse(data);
                const streamText = json.choices?.[0]?.delta?.content;
                if (streamText) {
                    fullResponse += streamText;
                    res.write(streamText);
                }
    }
} //while loop end here..

//mongo db
const db = await StoreKeeper({
    fullResponse,
    title : incoming.title,
    client_text : incoming.value,
    userId,
    chatId : new Types.ObjectId(chatId),
    model : currentModel
});
if(db) {
    
    console.log(db, 'return data from mongo db')
    res.status(200).end(); //stream end
}

if(!res.headersSent) return res.status(500).json(error?.message || "Something went wrong");

} catch (error) {
        console.log(error, 'inside catch')
        return res.status(400).json(error ?? error.message)
    }
}, //integrate function end here

    
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
            const token = createToken(user._id);
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
