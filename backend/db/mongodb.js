import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();

const MONGODB_URL = process.env.MONGODB_URL;

export async function connectToMongodb() {
    try {
        const client = await mongoose.connect(MONGODB_URL);

        if(client) {
            console.log('connected to Mongo Db successfully....');
            return client;
        }
    // console.log('connected to mongo db');
    // return client;
    } catch (error) {
        console.dir('Failed to connect Mongo db',error)
    }
};

export async function disConnectToMongodb() {
    await client.close();
}