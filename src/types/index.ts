import { Request } from 'express';
import { ObjectId, Schema } from 'mongoose';

export interface IUserCreateBody {
  email: string;
  password: string;
}
export interface IUserLoginBody {
  email: string;
  password: string;
}

export interface ICustomResponse extends Request {
  userEmail: string;
}

interface IInvoiceItem {
  id: string;
  name: string;
  quantity: string;
  price: string;
}
export interface IInvoice {
  id?: string;
  user?: Schema.Types.ObjectId;
  sender: {
    streetAddress: string;
    city: string;
    postCode: string;
    country: string;
  };

  client: {
    name: string;
    email: string;
    streetAddress: string;
    city: string;
    postCode: string;
    country: string;
  };

  description: string;
  issueDate: Date;
  paymentTerm: string;
  status: InvoiceStatus;
  items: IInvoiceItem[];
}

export enum InvoiceStatus {
  Pending = 'pending',
  Paid = 'paid',
  Draft = 'draft'
}
