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
});
