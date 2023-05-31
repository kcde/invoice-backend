import { Request, Response, Router } from 'express';
import userModel from '../models/user.model';

export async function createUser(req: Request, res: Response) {
  const data = await userModel.create({
    email: 'a@a.com',
    password: 'balllwordford'
  });

  res.json(data);
}
