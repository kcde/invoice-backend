import dotenv from 'dotenv';

import express, { Response, Request } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { connectDB } from './services/database';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.send('gotten');
});

app.listen(1234, async () => {
  await connectDB();
  console.log('server is listening');
});
