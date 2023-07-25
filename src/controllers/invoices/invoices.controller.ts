import { Request, Response } from 'express';
import userModel from '../../models/user.model';
import { InvoiceStatus, type IInvoice } from '../../types';
import { ValidationError } from 'yup';
import dotenv from 'dotenv';
import {
  invoiceSchema,
  invoiceSchemaRequired
} from '../../schemas/invoiceForm.schema';
import { generateID } from '../../utils';
import invoiceModel from '../../models/invoice.model';
import { Schema } from 'mongoose';
dotenv.config();

export async function createInvoice(req: Request, res: Response) {
  //get user unique email from token
  const userEmail = res.locals.userEmail as string;
  const invoice: IInvoice = req.body;
  try {
    if (invoice.status == InvoiceStatus.Pending) {
      invoiceSchema.validateSync(invoice, {
        abortEarly: false,
        stripUnknown: true
      });
    }
    // Get user's object id
    const userObj = await userModel.findOne({ email: userEmail });
    const objectId = userObj?._id as unknown as Schema.Types.ObjectId;

    if (objectId) {
      invoice.id = await generateID();
      //! VERIFY OBJECT ID TO BE A MONGO ONJECT ID

      invoice.user = objectId;

      //save new info to invoices database referencing the use with the object id
      const newInvoice = await invoiceModel.create(invoice);
      res.status(201).json(newInvoice);
    } else {
      return res.status(404).json({ error: 'user not found' });
    }
  } catch (err) {
    console.log(err);
    const errorCode = (err as { code: number }).code;

    if (err instanceof ValidationError) {
      return res.status(400).json({ error: err.errors });
    }

    if (errorCode && errorCode == 11000) {
      return res.status(409).json({ error: 'Duplicate email ' });
    }

    res.status(500).json({ error: 'unable to process request' });
  }
}

export async function getInvoices(req: Request, res: Response) {
  try {
    const user = await userModel.findOne({ email: res.locals.userEmail });
    const invoices = await invoiceModel.find(
      { user: user?._id },
      { _id: 0, __v: 0 }
    );

    res.status(200).json(invoices);
  } catch (err) {
    console.log(err);

    return res.status(500).json({ error: 'unable to process request' });
  }
}
export async function getInvoice(req: Request, res: Response) {
  try {
    const user = await userModel.findOne({ email: res.locals.userEmail });

    const invoice = await invoiceModel.findOne(
      {
        id: req.params.invoiceId,
        user: user?._id
      },
      { _id: 0, __v: 0 }
    );
    if (invoice == null) {
      return res.status(404).json({ error: 'invoice not found' });
    }

    res.status(200).json(invoice);
  } catch (err) {
    console.log(err);

    return res.status(500).json({ error: 'unable to process request' });
  }
}
export async function payInvoice(req: Request, res: Response) {
  //Check if invoice belong to the currently logged in use

  try {
    const user = await userModel.findOne({ email: res.locals.userEmail });

    const invoice = await invoiceModel.updateOne(
      { id: req.params.invoiceId, user: user?._id },
      { status: InvoiceStatus.Paid }
    );
    if (invoice.matchedCount == 0) {
      return res.status(404).json({ error: 'invoice not found' });
    }

    res.status(200).json({ message: 'Invoice deleted', id: req.params.id });
  } catch (err) {
    console.log(err);

    return res.status(500).json({ error: 'unable to process request' });
  }
}

export async function deleteInvoice(req: Request, res: Response) {
  try {
    const user = await userModel.findOne({ email: res.locals.userEmail });

    const deletedInvoice = await invoiceModel.findOneAndDelete({
      id: req.params.invoiceId,
      user: user?.id
    });

    if (deleteInvoice == null) {
      return res.status(404).json({ error: 'Inovice does not exist' });
    }

    return res.status(204).json({});
  } catch (err) {
    console.log(err);

    return res.status(500).json({ error: 'unable to process request' });
  }
}

export async function updateInvoice(req: Request, res: Response) {
  //get user unique email from token
  const userEmail = res.locals.userEmail as string;
  const invoice: IInvoice = req.body;

  const user = await userModel.findOne(
    { email: res.locals.userEmail },
    { password: 0, __v: 0 }
  );

  try {
    //validate new invoice to make sure it has all the values
    invoiceSchemaRequired.validateSync(invoice, {
      abortEarly: false,
      stripUnknown: true
    });
    //invoice id must match params id
    const updatedInvoice = await invoiceModel
      .findOneAndReplace(
        {
          id: req.params.invoiceId,
          user: user?._id
        },
        invoice
      )
      .lean();

    if (updatedInvoice == null) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    res.status(201).json(updatedInvoice);
  } catch (err) {
    console.log(err);

    if (err instanceof ValidationError) {
      return res.status(400).json({ error: err.errors });
    }
    res.status(500).json({ error: 'unable to update invoice' });
  }
}
