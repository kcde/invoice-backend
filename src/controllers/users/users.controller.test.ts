import supertest from 'supertest';
import app from '../../index';
import { disconnectDB, connectDB } from '../../services/database';
import server from '../../server';

const request = supertest(app);

describe('Check if backend is active', () => {
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
});
