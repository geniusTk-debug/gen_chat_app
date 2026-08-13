import express from 'express'
import controller from "../Controller/controller";

const authRoute = express.Router();

//register
authRoute.post('/api/user-acc/register', controller.register ) 

//login
authRoute.post('/api/user-acc/login', controller.login);