import { Request, Router } from 'express';

import { createUser } from '../../controllers/users.controller';

const users = Router();

users.post('/', createUser);
//users.get('/');

export default users;
