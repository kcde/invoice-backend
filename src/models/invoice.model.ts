import mongoose, { Schema } from 'mongoose';
import { IInvoice } from '../types';

const invoiceSchema = new mongoose.Schema<IInvoice>({
  id: {
    type: String,
    unique: true,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
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
  issueDate: Date,
  paymentTerm: String,
  status: String,
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
