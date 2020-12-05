import app from '../app';
import { PORT } from '../config';

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Here, we are listening on port ${PORT}`);
});
