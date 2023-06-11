import mongoose from 'mongoose';
import { IInvoice } from '../types';

const invoiceSchema = new mongoose.Schema<IInvoice>({
  id: String,
  sender: {
    streetAddress: String,
    city: String,
    postCode: String,
    country: String
  },

  client: {
    name: String,
    email: String,
    streetAddress: String,
    city: String,
    postCode: String,
    country: String
  },

  description: String,
  items: [
    {
      id: String,
      name: String,
      quantity: String,
      price: String
    }
  ]
});

const invoiceModel = mongoose.model('invoice', invoiceSchema);

export default invoiceModel;
