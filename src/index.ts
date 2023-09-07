import dotenv from 'dotenv';

import express, { Response, Request } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';

import api from './api';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.send('API WORKING FINE! CHECK /API ROUTE');
});

app.use('/api', api);

export default app;
