import { Request, Response } from 'express';
import userModel from '../models/user.model';

export async function createUser(_req: Request, res: Response) {
  try {
    const data = await userModel.create({
      email: 'a@a.com',
      password: 'balllwordford'
    });

    return res.json(data);
  } catch (err) {
    const errorCode = (err as { code: number }).code;
    if (errorCode && errorCode == 11000) {
      return res.status(409).json({ error: 'Duplicate email ' });
    }

    return res.status(500).json({ error: 'Unable to create user' });
  }
}
