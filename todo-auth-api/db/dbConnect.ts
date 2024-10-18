import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('MongoDB connected!!!');
  } catch (error) {
    console.error('MongoDB connection failed!!! ', error);
    process.exit(1);
  }
};

export default dbConnect;
