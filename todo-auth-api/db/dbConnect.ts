import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log('MongoDB connected!!!');
    } catch (error) {
        console.error('MongoDB connection failed!!! ', error);
    }
};

export default dbConnect;
