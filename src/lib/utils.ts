'use server'
import mongoose from "mongoose";

export const connectToDatabase = async () => {
    try {
        if(mongoose.connections && mongoose?.connections?.[0]?.readyState) return;
        const {connection}=await mongoose.connect(process.env.MONGO_URL,{
            dbName:'todo-next'
        });
        console.log(`Connected to MongoDB: ${connection?.host}:${connection?.port}`);
    } catch (error) {
        console.log(error,'this is the error')
        throw new Error(`Error connecting to Mongo`)
    }
}
