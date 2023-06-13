import { object, string, array, number, date } from 'yup';

export const invoiceSchema = object({
  id: string(),
  user: string(),
  sender: object({
    streetAddress: string().trim().required("Sender's Street Address Required"),
    city: string().trim().required("Sender's City Required"),
    postCode: string().trim().required("Sender's Postcode Required"),
    country: string().trim().required("Sender's Country Required")
  }).required("Sender's Details required"),
  client: object({
    name: string()
      .trim()
      .required("Client's Name Required")
      .matches(
        /[a-zA-Z]+\s+[a-zA-Z]+/g,
        "Client's First name and last name required"
      ),
    email: string()
      .trim()
      .required('Clients Email required')
      .email('Invalid Client Email'),
    streetAddress: string().trim().required('Client Street Address required'),
    city: string().trim().required('Client city required'),
    postCode: string().trim().required('Client Postcode required'),
    country: string().trim().required('Client country required')
  }).required('Client Details Required'),
  description: string().trim().required('Invoice Description required'),
  issueDate: date().required('Issue Date is required'),
  paymentTerm: number().required('Payment term is required'),

  items: array()
    .of(
      object().shape({
        name: string().trim().required('Item name required'),
        quantity: number().required('Item quantity required'),
        price: number().required('Price required')
      })
    )
    .required('An item must be added')
    .min(1, 'An item must be added')
});
