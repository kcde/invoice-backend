import { Request, Response } from 'express';
import userModel from '../models/user.model';
import type { IUserCreateBody } from '../types';

export async function createUser(req: Request, res: Response) {
  const newUserDetails: IUserCreateBody = req.body;

  if (!newUserDetails.email || !newUserDetails.password) {
    return res.status(400).json({ error: 'email and password required' });
  }
  try {
    const data = await userModel.create(newUserDetails);

    return res.json(data);
  } catch (err) {
    const errorCode = (err as { code: number }).code;
    if (errorCode && errorCode == 11000) {
      return res.status(409).json({ error: 'Duplicate email ' });
    }

    return res.status(500).json({ error: 'Unable to create user' });
  }
}
