import { Request } from 'express';

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
  items: IInvoiceItem[];
}
