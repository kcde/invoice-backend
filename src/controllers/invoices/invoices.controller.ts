import { NextFunction, Request, Response } from 'express';
import userModel from '../../models/user.model';
import type { IInvoice } from '../../types';

import { ValidationError } from 'yup';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { invoiceSchema } from '../../schemas/invoiceForm.schema';
dotenv.config();

const { PRIVATE_KEY } = process.env;

export async function createInvoice(req: Request, res: Response) {
  //get user unique email from token
  const token = req.headers.authorization?.split(' ')[1] as string;
  const invoice: IInvoice = req.body;

  try {
    invoiceSchema.validateSync(invoice, {
      abortEarly: false,
      stripUnknown: true
    });

    const userEmail = jwt.verify(token, PRIVATE_KEY as string);

    // Get user's object id
    const userObj = await userModel.findOne({ email: userEmail });
    const objectId = userObj?._id;

    if (objectId) {
      res.json(objectId);
    } else {
      return res.json({});
    }
  } catch (err) {
    console.log(err);

    if (err instanceof ValidationError) {
      return res.status(400).json({ error: err.errors });
    }
    return res.status(400).send('gjgj');
  }

  //get object is of user from DB
  // create one to many relationship
  //save new info to invoices database referencing the use with the object id
}
