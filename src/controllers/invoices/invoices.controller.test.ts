import supertest from 'supertest';
import app from '../../index';
import { disconnectDB, connectDB } from '../../services/database';

const request = supertest(app);

describe('Test /api/invoices', () => {
  let authToken: string;
  const user = {
    email: 'johndoe@test.com',
    password: 'lang'
  };

  const endpoint = '/api/invoices/';

  beforeAll(async () => {
    await connectDB();

    const { body } = await request.post('/api/users').send(user);

    const { token } = body;

    authToken = token;
  });

  afterAll(async () => {
    await disconnectDB();
  });

  it('Should return create new invoice and return a status 200', async () => {
    const response = await request
      .post('/api/invoices')
      .send({
        sender: {
          streetAddress: 'N0 1 west road Lugbe',
          city: 'Lugbe',
          postCode: '900010',
          country: 'Nigeria'
        },
        client: {
          name: 'keside ezeala',
          email: 'sddcdsc@s.com',
          streetAddress: 'N0 1 west road Lugbe',
          city: 'Lugbe',
          postCode: '900010',
          country: 'Nigeria'
        },
        description: 'Describe',
        issueDate: '2012-09-01',
        paymentTerm: '7',
        items: [
          {
            name: 'jdjsjd',
            quantity: '123',
            price: '345'
          }
        ]
      })
      .set('authorization', 'Bearer ' + authToken);

    expect(response.status).toBe(201);
  });

  it('Should return all invoice of user and return status of 200', async () => {
    const { status } = await request
      .get('/api/invoices')
      .set('authorization', 'Bearer ' + authToken);

    expect(status).toBe(200);
  });
  it('Should return an invoice and return status of 200', async () => {
    //create an invoice
    const createInvoiceResponse = await request
      .post(endpoint)
      .send({
        sender: {
          streetAddress: 'N0 1 west road Lugbe',
          city: 'Lugbe',
          postCode: '900010',
          country: 'Nigeria'
        },
        client: {
          name: 'keside ezeala',
          email: 'sddcdsc@s.com',
          streetAddress: 'N0 1 west road Lugbe',
          city: 'Lugbe',
          postCode: '900010',
          country: 'Nigeria'
        },
        description: 'Describe',
        issueDate: '2012-09-01',
        paymentTerm: '7',
        items: [
          {
            name: 'jdjsjd',
            quantity: '123',
            price: '345'
          }
        ]
      })
      .set('authorization', 'Bearer ' + authToken);

    const { status, body } = await request
      .get('/api/invoices/' + createInvoiceResponse.body.id)
      .set('authorization', 'Bearer ' + authToken);

    const invoiceId = body.id;

    expect(status).toBe(200);
    expect(invoiceId).toEqual(createInvoiceResponse.body.id);
  });

  it('should mark an invoice as paid', async () => {
    //create an invoice
    const createInvoiceResponse = await request
      .post(endpoint)
      .send({
        sender: {
          streetAddress: 'N0 1 west road Lugbe',
          city: 'Lugbe',
          postCode: '900010',
          country: 'Nigeria'
        },
        client: {
          name: 'keside ezeala',
          email: 'sddcdsc@s.com',
          streetAddress: 'N0 1 west road Lugbe',
          city: 'Lugbe',
          postCode: '900010',
          country: 'Nigeria'
        },
        description: 'Describe',
        issueDate: '2012-09-01',
        paymentTerm: '7',
        items: [
          {
            name: 'jdjsjd',
            quantity: '123',
            price: '345'
          }
        ]
      })
      .set('authorization', 'Bearer ' + authToken);

    const markInvoiceAsPaid = await request
      .patch(endpoint + createInvoiceResponse.body.id + '/paid')
      .set('authorization', 'Bearer ' + authToken);

    const updatedInvoice = await request
      .get(endpoint + createInvoiceResponse.body.id)
      .set('authorization', 'Bearer ' + authToken);

    expect(markInvoiceAsPaid.status).toBe(200);
    expect(updatedInvoice.body.status).toBe('paid');
  });

  it('should delete an invoice', async () => {
    //create an invoice
    const createInvoiceResponse = await request
      .post(endpoint)
      .send({
        sender: {
          streetAddress: 'N0 1 west road Lugbe',
          city: 'Lugbe',
          postCode: '900010',
          country: 'Nigeria'
        },
        client: {
          name: 'keside ezeala',
          email: 'sddcdsc@s.com',
          streetAddress: 'N0 1 west road Lugbe',
          city: 'Lugbe',
          postCode: '900010',
          country: 'Nigeria'
        },
        description: 'Describe',
        issueDate: '2012-09-01',
        paymentTerm: '7',
        items: [
          {
            name: 'jdjsjd',
            quantity: '123',
            price: '345'
          }
        ]
      })
      .set('authorization', 'Bearer ' + authToken);

    const deleteInvoice = await request.delete(
      endpoint + createInvoiceResponse.body.id
    );

    expect(deleteInvoice.status).toBe(204);
  });
});
