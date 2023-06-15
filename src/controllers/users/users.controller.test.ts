import supertest from 'supertest';
import app from '../../index';
import { disconnectDB, connectDB } from '../../services/database';
import server from '../../server';

const request = supertest(app);

describe('Check if server is running', () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  it('Should return a 200 response', async () => {
    const response = await request.get('/');

    expect(response.status).toBe(200);
  });

  describe('check /api route', () => {
    it('Should return a 200 response', async () => {
      const response = await request.get('/api');
      expect(response.status).toBe(200);
    });
  });
});

describe('Test /api/users ', () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await disconnectDB();
  });
  const user = {
    invalid: {
      email: 'eeecom',
      password: 'langa'
    },
    valid: {
      email: 'johndoe@test.com',
      password: 'lang'
    }
  };

  //   const invalidResponse = await request.post('/api/users').send(user.invalid);

  it('Should return 400 status if data is invalid', async () => {
    const response = await request.post('/api/users').send(user.invalid);

    expect(response.status).toBe(400);
  });
  it('Should return 201 status if data is valid', async () => {
    const response = await request.post('/api/users').send(user.valid);

    expect(response.status).toBe(201);
  });
  it('Should return 409 status if email is duplicate', async () => {
    const response = await request.post('/api/users').send(user.valid);

    expect(response.status).toBe(409);
  });
  it('Should return 200 status on successful login', async () => {
    const response = await request.post('/api/users/login').send(user.valid);

    expect(response.status).toBe(200);
  });
  it('Should return 404 status on invalid user ', async () => {
    const response = await request.post('/api/users/login').send(user.invalid);

    expect(response.status).toBe(404);
  });
  it('Should return 401 status on invalid password on valid email ', async () => {
    const response = await request
      .post('/api/users/login')
      .send({ email: user.valid.email, password: user.invalid.password });

    expect(response.status).toBe(401);
  });
});

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

  it('Should return status 201 if token and ause is valid', async () => {
    const { body } = await request.post('/api/invoices').send();

    const { token } = body;

    const response = await request.post('/api/invoices').send({
      headers: {
        Authentication: `Bearer ${token}`
      }
    });
  });
});
