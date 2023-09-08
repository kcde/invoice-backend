import { Request, Response, Router } from 'express';
import users from './routes/users';
import invoices from './routes/invoices';

const api = Router();
api.use('/users', users);

api.use('/invoices', invoices);

//verify bearrer token
api.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the API Route');
});

export default api;
