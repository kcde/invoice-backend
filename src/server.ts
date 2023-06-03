import app from '.';
import { connectDB } from './services/database';

const server = app.listen(1234, async () => {
  await connectDB();
  //   console.log('server is listening');
});

export default server;
