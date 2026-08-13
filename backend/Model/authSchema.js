import mongoose from "mongoose";
import { model, Schema } from "mongoose";
import bcrypt from 'bcrypt';

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

    const userExisted = await this.findOne({"user_genchat.email": email})

    if(userExisted) {
        console.log(userExisted)
        throw new Error("User already exist with this Email")
    }

        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);

        const stored = await this.create({
            user_genchat : [
                {
                    username,
                    email,
                    password : hash
                }
            ]
        })

        return true;            
                
};

const User = model('user_genchat', user )

export default User;