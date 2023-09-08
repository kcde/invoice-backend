import { Request, Response, Router } from 'express';

import {
  createUser,
  loginUser
} from '../../controllers/users/users.controller';

const users = Router();

users.post('/', createUser);
users.post('/login', loginUser);

users.get('/', (req: Request, res: Response) => {
  res.send('resolved');
});

export default users;
