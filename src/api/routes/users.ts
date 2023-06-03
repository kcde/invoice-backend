import { Request, Response, Router } from 'express';

import { createUser } from '../../controllers/users/users.controller';

const users = Router();
users.get('/', (req: Request, res: Response) => {
  res.send('resolved');
});

users.post('/', createUser);

export default users;
