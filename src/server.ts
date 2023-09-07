import { connectDB } from './services/database';
import https from 'https';
import fs from 'fs';
import app from '.';
const PORT = 1234;

https
  .createServer(
    {
      key: fs.readFileSync('./certs/key.pem'),
      cert: fs.readFileSync('./certs/cert.pem')
    },
    app
  )
  .listen(PORT, async () => {
    await connectDB();
    // eslint-disable-next-line no-console
    console.log('Server is listening on localhost:' + PORT);
  });
