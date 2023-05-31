import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export async function auth(req: Request, res: Response, next: NextFunction) {
  //check request header for authorization
  //if not exist return 400 error
  //if exists verrify token
  // if token valid, next
  //else if token not valid return 401 error
}
