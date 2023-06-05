import { Request, Response, Router } from 'express';

import { createUser } from '../../controllers/users/users.controller';

const users = Router();

users.post('/', createUser);

users.get('/', (req: Request, res: Response) => {
  res.send('resolved');
});

export default users;
