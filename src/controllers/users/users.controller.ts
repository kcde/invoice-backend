import { NextFunction, Request, Response } from 'express';
import userModel from '../../models/user.model';
import type { IUserCreateBody } from '../../types';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { validateEmail } from '../../utils';

dotenv.config();

const { SALT_RONDS, PRIVATE_KEY } = process.env;

export async function createUser(req: Request, res: Response) {
  const newUserDetails: IUserCreateBody = req.body;

  //Email and Password must be provided
  if (!newUserDetails.email || !newUserDetails.password) {
    return res.status(400).json({ error: 'email and password required' });
  }

  //check if email is valid
  if (!validateEmail(newUserDetails.email)) {
    return res.status(400).json({ error: 'invalid email' });
  }

  try {
    //encrypt password
    const hashedPassword = await bcrypt.hash(
      newUserDetails.password,
      Number(SALT_RONDS as unknown as number)
    );

    //Generate JWT
    const jwtToken = jwt.sign(newUserDetails.email, PRIVATE_KEY as string);

    //Create user and add to database
    const user = {
      ...newUserDetails,
      password: hashedPassword
    };

    const data = await userModel.create(user);

    return res.status(201).json({ email: data.email, token: jwtToken });
  } catch (err) {
    const errorCode = (err as { code: number }).code;
    if (errorCode && errorCode == 11000) {
      return res.status(409).json({ error: 'Duplicate email ' });
    }

    res.status(500).json({ error: 'unable to process request' });

    console.error(err as string);
  }
}
