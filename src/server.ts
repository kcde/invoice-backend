import app from '.';
import { connectDB } from './services/database';

const PORT = 1234;

const server = app.listen(PORT, async () => {
  await connectDB();
  // eslint-disable-next-line no-console
  console.log('Server is listening on localhost:' + PORT);
});

export default server;
