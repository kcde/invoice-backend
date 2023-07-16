import supertest from 'supertest';
import app from '../../index';
import { disconnectDB, connectDB } from '../../services/database';

const request = supertest(app);

describe('Test /api/invoices', () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  const user = {
    email: 'johndoe@test.com',
    password: 'lang'
  };
  const user2 = {
    email: 'johndoe2@test.com',
    password: 'lang'
  };
  const user3 = {
    email: 'johndoe3@test.com',
    password: 'lang'
  };

  it('Should return create new invoice and return a status 200', async () => {
    const { body } = await request.post('/api/users').send(user);

    const { token } = body;

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
      .set('authorization', 'Bearer ' + token);

    expect(response.status).toBe(201);
  });

  it('Should return all invoice of user and return status of 200', async () => {
    const { body } = await request.post('/api/users').send(user2);

    const { token } = body;

    const { status } = await request
      .get('/api/invoices')
      .set('authorization', 'Bearer ' + token);

    expect(status).toBe(200);
  });
  it('Should return an invoice and return status of 200', async () => {
    //create user
    const createUserResponse = await request.post('/api/users').send(user3);
    //get toke
    const { token } = createUserResponse.body;
    //create an invoice
    const createInvoiceResponse = await request
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
      .set('authorization', 'Bearer ' + token);

    const { status, body } = await request
      .get('/api/invoices/' + createInvoiceResponse.body.id)
      .set('authorization', 'Bearer ' + token);

    const invoiceId = body.id;

    expect(status).toBe(200);
    expect(invoiceId).toEqual(createInvoiceResponse.body.id);
  });
});
