import jwt, { decode } from 'jsonwebtoken';
import User from '../Model/authSchema.js';

export default function authMiddleware(req, res, next) {

    try {
        const token = req?.cookies?.jwt
        jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if(err) return res.status(401).json('Not authenticated')
            console.log(decoded)
        const user = await User.findById(decoded.id)
        req.user = user.user_genchat;
        next()
    })
    } catch (error) {
        console.error(error)
    }



    
    // const token = req?.cookies?.jwt
    // try {
    //     const decoded = jwt.verify(token, process.env.SECRET_KEY, { algorithms : ['HS256']})
    //     console.log(decoded.id)
    //     // const user = await User.findById(decoded.id)
    //     // console.log(user)

    //     next();
    // } catch (error) {
    //     console.error(error.message);
    // }

    
}