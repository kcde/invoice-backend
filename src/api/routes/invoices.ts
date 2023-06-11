import { Router } from 'express';
import { createInvoice } from '../../controllers/invoices/invoices.controller';
import { checkJWT } from '../../middlewares/checkJWT';

const invoices = Router();

invoices.post('/', checkJWT, createInvoice);

export default invoices;
