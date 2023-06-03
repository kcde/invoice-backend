import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';

dotenv.config();
const { MONGO_URI, ENV } = process.env;
export async function connectDB() {
  const testMongo = await MongoMemoryServer.create();
  const testURI = testMongo.getUri();
  try {
    if (ENV == 'TEST') {
      await mongoose.connect(testURI as unknown as string);
      return;
    }

    await mongoose.connect(MONGO_URI as unknown as string);
  } catch (err) {
    throw new Error(err as string);
  }
}

export async function disconnectDB() {
  await mongoose.disconnect();
}
