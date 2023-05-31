import { Request, Router } from 'express';

const users = Router();

users.post('/', (req: Request, res: Response) => {
  console.log('creating users ');
});
users.get('/', (req: Request, res: Response) => {
  console.log('getting users info');
});
