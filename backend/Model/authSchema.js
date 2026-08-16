import mongoose from "mongoose";
import { model, Schema } from "mongoose";
import bcrypt, { hash } from 'bcrypt';

const user = new Schema({
    user_genchat : [
        {
            username : {
                type : String,
                required : true
            },
            email : {
                type : String,
                required : true
            },
            password : {
                type : String,
                required : true
            }
        }
    ]
}, { timestamps : true });

user.statics.register = async function User( username, email, password ) {

    const user = await this.findOne({"user_genchat.email": email})

    if(user) {
        console.log(user)
        throw new Error("User already exist with this Email")
    }

        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);

        const saved = await this.create({
            user_genchat : [
                {
                    username,
                    email,
                    password : hash
                }
            ]
        })

        return saved;            
                
};

user.statics.login = async function User( email, password ) {
    
    const user = await this.findOne({ "user_genchat.email" : email })

    if(!user) throw new Error("User doesn't existed with this Email")

    const userHash = user.user_genchat?.[0]?.password;
        
    const isCorrect = await bcrypt.compare(password, userHash)

    if(!isCorrect) throw new Error('Incorrect password, check your password and try again')

        return user;
}

const User = model('user_genchat', user )

export default User;