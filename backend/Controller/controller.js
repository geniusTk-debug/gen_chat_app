import { askAI } from "../Service/service.js";
import Chat from "../Model/schema.js";
import User from "../Model/authSchema.js";
import createToken from "../Helper/jwt.js";
import { timeLimit } from "../Helper/jwt.js";
import StoreKeeper from "../Service/storeKeeper.js";
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


//working//
    integrate :async (req,res)=>{

        try {
            if (!req.body) return res.status(400).json('missing data');
                        
        const { title, value, chatId } = req.body;
        console.log(title, value, chatId, 'req.body in integrate')
        const question = {
            "model" : "openai/gpt-oss-20b",
            "messages" : [
                {
                    "role" : "user",
                    "content" : value
                },
            ],
            stream: true
        }

        const userId = req.user?.[0]?._id;
        console.log(userId, 'userId in integrate')
        // const userId = req.userId;
        const data = await askAI(
            {
                res, 
                question, 
            }
        );
        const reader = data.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';
            let fullResponse = '';
        while (true) {
            const stream = await reader.read();
            if (stream.done) {
                break;
            }
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

                if (data === '[DONE]') {
                    break;
                }

                const json = JSON.parse(data);
                const streamText = json.choices?.[0]?.delta?.content;
                if (streamText) {
                    fullResponse += streamText;
                    res.write(streamText);
                }
            }
        }

        //for mongo db
        await StoreKeeper({
            fullResponse,
            title,
            value,
            userId,
            chatId
        });
            res.end();
            
            // return res.status(200).json(data)
    
    } catch (error) {
        console.log(error?.message);
        
        }
        if(!res.headersSent) return res.status(500).json(error?.message || "Something went wrong");
                    
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
