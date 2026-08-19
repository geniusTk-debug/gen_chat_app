import express from 'express'
import controller from '../Controller/controller.js';
import authMiddleware from '../Middleware/authMiddleware.js';
export const authRoute = express.Router();



//register
authRoute.post('/register', controller.register ) 

//login
authRoute.post('/login', controller.login);

//me
authRoute.get('/me',authMiddleware, controller.me)