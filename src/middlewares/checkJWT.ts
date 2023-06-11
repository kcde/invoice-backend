import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const { PRIVATE_KEY } = process.env;

export async function checkJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  //check request header for authorization

  const token = req.headers.authorization?.split(' ')[1];

  //if not exist return 400 error
  if (!token) {
    return res.status(400).json({
      error: 'Token  not found'
    });
  }
  //if exists verrify token
  try {
    jwt.verify(token as string, PRIVATE_KEY as string);
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      error: 'Unauthorized Access'
    });
  }
}
