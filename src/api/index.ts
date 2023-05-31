import { Request, Response, Router } from 'express';
import users from './routes/users';

const api = Router();

api.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the API Route');
});

api.use('/users', users);

export default api;
