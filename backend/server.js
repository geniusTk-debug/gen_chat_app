import express from 'express';
import { configDotenv } from 'dotenv';
import morgan from 'morgan';
import router from './Router/router.js';
import Chat from './Model/schema.js';
import { connectToMongodb, disConnectToMongodb } from './db/mongodb.js';
import cors from 'cors';
import { connect } from 'mongoose';


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

const dbStart = async () => {
    const client =  await connectToMongodb();
    
        if(client){
            app.listen(PORT,() => {
            console.log('app is running on localhost : ', PORT)
        })
        };
};

dbStart();
