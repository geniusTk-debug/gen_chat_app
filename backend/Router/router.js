import express from 'express';
import controller from '../Controller/controller.js';

const router = express.Router();


//get all
router.get('/api/chat',controller.sendToClient);
//store on **
router.post('/api/chat',controller.mainChatRoom);

//register
router.post('/api/user/register', controller.register ) 

//login
router.post('/api/user/login', controller.login);
// //get single(id)
// router.get('/api/chat/id',controller.sendToClientSingle);
// //update single(id)
// router.patch('/api/chat/id',controller.update)
// //delete single(id)
// router.delete('/api/chat/id', controller.remove)

export default router;