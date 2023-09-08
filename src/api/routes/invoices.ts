import { Router } from 'express';
import {
  createInvoice,
  getInvoice,
  getInvoices,
  payInvoice,
  deleteInvoice,
  updateInvoice
} from '../../controllers/invoices/invoices.controller';
import { checkJWT } from '../../middlewares/checkJWT';

const invoices = Router();
invoices.get('/', checkJWT, getInvoices);
invoices.get('/:invoiceId', checkJWT, getInvoice);
invoices.patch('/:invoiceId/paid', checkJWT, payInvoice);
invoices.delete('/:invoiceId', checkJWT, deleteInvoice);
invoices.put('/:invoiceId', checkJWT, updateInvoice);
invoices.post('/', checkJWT, createInvoice);

export default invoices;
