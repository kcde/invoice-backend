import { connectDB } from './services/database';

import app from '.';
const PORT = 1234;

app.listen(PORT, async () => {
  await connectDB();
  // eslint-disable-next-line no-console
  console.log('Server is listening on localhost:' + PORT);
});
