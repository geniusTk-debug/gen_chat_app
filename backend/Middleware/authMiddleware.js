import jwt, { decode } from 'jsonwebtoken';
import User from '../Model/authSchema.js';

export default function authMiddleware(req, res, next) {

    try {
        const token = req?.cookies?.jwt
        jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if(err) return res.status(401).json('jwt missing or something went wrong')
        const user = await User.findById(decoded.id)
        req.user = user.user_genchat;
        console.log(user.user_genchat)
        // req.user = decoded.id
            // req.userId = decoded.id;
        next()
    })
    } catch (error) {
        console.error(error)
    }

}