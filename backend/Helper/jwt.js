import jwt from 'jsonwebtoken';

export const timeLimit = 5 * 24 * 60 * 60;
console.log(timeLimit);

export default function createToken(id) {

    return jwt.sign({id}, process.env.SECRET_KEY, { expiresIn : timeLimit } )
    
}