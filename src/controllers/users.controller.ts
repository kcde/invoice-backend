import { Request, Response } from 'express';
import userModel from '../models/user.model';
import type { IUserCreateBody } from '../types';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validateEmail } from '../utils';

const { SALT_ROUNDS, PRIVATE_KEY } = process.env;

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

  //encrypt password
  let hashedPassword: string;
  try {
    hashedPassword = await bcrypt.hash(
      newUserDetails.password,
      Number(SALT_ROUNDS as unknown as number)
    );
  } catch (err) {
    return res.status(500).json({ error: 'unable to process request' });
  }

  //Generate jwt token
  let jwtToken!: string;
  try {
    jwt.sign(
      newUserDetails.email,
      PRIVATE_KEY as unknown as string,
      (err, hash) => {
        if (err) {
          return res.status(500).json({ error: 'unable to process request' });
        }
        jwtToken = hash as string;
      }
    );
  } catch (err) {
    return res.status(500).json({ error: 'unable to process request' });
  }

  //Create user and add to database
  try {
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

    return res.status(500).json({ error: 'Unable to create user' });
  }
}
