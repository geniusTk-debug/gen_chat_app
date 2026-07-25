import express from 'express';
import { configDotenv } from 'dotenv';
import morgan from 'morgan';
import router from './Router/router.js';
import cors from 'cors';


const app = express();
app.use(cors())
app.use(express.json());
app.use(router);
configDotenv();
app.use(morgan('dev'));

const PORT = process.env.PORT;










//testing
app.get('/',(req,res)=>{
    res.json('HEllo World')
});

app.listen(PORT,'localhost',()=>{
    console.log('app is running on localhost PORT : ', PORT)
});
