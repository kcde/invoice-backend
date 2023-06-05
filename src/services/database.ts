import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';

dotenv.config();

let testMongo: MongoMemoryServer;
const { MONGO_URI, ENV } = process.env;
export async function connectDB() {
  try {
    testMongo = await MongoMemoryServer.create();
    const testURI = testMongo.getUri();
    if (ENV == 'TEST') {
      console.log('running test');

      await mongoose.connect(testURI as unknown as string);
      return;
    }

    await mongoose.connect(MONGO_URI as unknown as string);
  } catch (err) {
    throw new Error(err as string);
  }
}

mongoose.connection.once('open', () => {
  console.log('mongo connected');
});

export async function disconnectDB() {
  await mongoose.disconnect();

  if (testMongo) {
    //stop mongo memory server
    await testMongo.stop();
  }
}
