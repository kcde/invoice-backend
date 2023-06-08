import { Request, Response, Router } from 'express';
import users from './routes/users';

const api = Router();
api.use('/users', users);

api.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the API Route');
});

export default api;
