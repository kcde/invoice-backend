import { NextFunction, Request, Response } from 'express';
import userModel from '../../models/user.model';
import type { IUserCreateBody, IUserLoginBody } from '../../types';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { validateEmail } from '../../utils';

dotenv.config();

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

  try {
    //encrypt password
    const hashedPassword = await bcrypt.hash(
      newUserDetails.password,
      Number(SALT_ROUNDS as unknown as number)
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

export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const loginDetails: IUserLoginBody = req.body;

  //Email and Password must be provided
  if (!loginDetails.email || !loginDetails.password) {
    return res.status(400).json({ error: 'email and password required' });
  }

  // find user with email

  try {
    const user = await userModel.findOne(
      { email: loginDetails.email },
      {
        __v: 0,
        _id: 0
      }
    );
    if (user) {
      //check if password matches provided password
      const passwordMatch = await bcrypt.compare(
        loginDetails.password,
        user.password
      );

      if (passwordMatch) {
        // generate JWT
        const jwtToken = jwt.sign(user.email, PRIVATE_KEY as string);
        return res.status(200).send({ token: jwtToken, email: user.email });
      } else {
        //invalid credential
        return res.status(401).json({ error: 'Invalid credentials' });
      }
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    next(err);
  }

  //check if email is valid
  //   if (!validateEmail(loginDetails.email)) {
  //     return res.status(400).json({ error: 'invalid email' });
  //   }
}
