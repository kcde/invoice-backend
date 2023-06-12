import { NextFunction, Request, Response } from 'express';
import userModel from '../../models/user.model';
import type { IInvoice } from '../../types';

import { ValidationError } from 'yup';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { invoiceSchema } from '../../schemas/invoiceForm.schema';
import { generateID } from '../../utils';
import invoiceModel from '../../models/invoice.model';
import { Schema } from 'mongoose';
dotenv.config();

const { PRIVATE_KEY } = process.env;

export async function createInvoice(req: Request, res: Response) {
  //get user unique email from token
  const userEmail = res.locals.userEmail as string;
  const invoice: IInvoice = req.body;

  console.log(userEmail);

  try {
    invoiceSchema.validateSync(invoice, {
      abortEarly: false,
      stripUnknown: true
    });

    // Get user's object id
    const userObj = await userModel.findOne({ email: userEmail });
    const objectId = userObj?._id as unknown as Schema.Types.ObjectId;

    if (objectId) {
      invoice.id = await generateID();
      invoice.user = objectId;
      const newInvoice = await invoiceModel.create(invoice);
      res.json(newInvoice);
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
