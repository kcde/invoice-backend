import { Router } from 'express';
import {
  createInvoice,
  getInvoice,
  getInvoices
} from '../../controllers/invoices/invoices.controller';
import { checkJWT } from '../../middlewares/checkJWT';

const invoices = Router();
invoices.get('/', checkJWT, getInvoices);
invoices.get('/:invoiceId', checkJWT, getInvoice);

invoices.post('/', checkJWT, createInvoice);

export default invoices;
