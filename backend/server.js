import express from 'express';
import { configDotenv } from 'dotenv';
import morgan from 'morgan';
import router from './Router/router.js';
import Chat from './Model/schema.js';
import { connectToMongodb, disConnectToMongodb } from './db/mongodb.js';
import cors from 'cors';
import { connect } from 'mongoose';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser())
app.use(cors(
    {
        origin : 'http://localhost:5173',
        credentials : true,
    }
))
app.use(router);
app.use(express.json());
configDotenv();
app.use(morgan('dev'));


const PORT = process.env.PORT;

//testing
app.get('/cookies',(req,res)=>{
    
    res.cookie('name', 'May TTA')
    return res.send('cookie set')
});

const dbStart = async () => {
    const client =  await connectToMongodb();
    
        if(client){
            app.listen(PORT,() => {
            console.log('app is running on localhost : ', PORT)
        })
        };
};

dbStart();
