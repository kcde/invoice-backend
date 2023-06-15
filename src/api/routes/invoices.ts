import { Router } from 'express';
import {
  createInvoice,
  getInvoice
} from '../../controllers/invoices/invoices.controller';
import { checkJWT } from '../../middlewares/checkJWT';

const invoices = Router();
invoices.get('/', checkJWT, getInvoice);

invoices.post('/', checkJWT, createInvoice);

export default invoices;
