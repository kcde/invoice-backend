import { Request, Response, Router } from 'express';

const api = Router();

api.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the API Route');
});

export default api;
