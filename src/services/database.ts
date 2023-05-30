import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const { MONGO_URL } = process.env;
export async function connectDB() {
  try {
    await mongoose.connect(MONGO_URL as unknown as string);
  } catch (err) {
    throw new Error(err as string);
  }
}

export function disconnectDB() {
  mongoose.disconnect;
}
