import express from 'express';
import controller from '../Controller/controller.js';
import authMiddleware from '../Middleware/authMiddleware.js';
const router = express.Router();


//get all
router.get('/api/chat', authMiddleware,controller.chatHistory);
//store on **
router.post('/api/chat',controller.integrate);









export default router;

//register
// router.post('/api/user/register', controller.register ) 

// //login
// router.post('/api/user/login', controller.login);
// //get single(id)
// router.get('/api/chat/id',controller.sendToClientSingle);
// //update single(id)
// router.patch('/api/chat/id',controller.update)
// //delete single(id)
// router.delete('/api/chat/id', controller.remove)
