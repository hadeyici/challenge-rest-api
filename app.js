import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { MONGODB_STR } from './config';

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));

const mongoSettings = {
  useFindAndModify: false,
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect(MONGODB_STR, mongoSettings);
mongoose.connection.on('open', () => {
  // eslint-disable-next-line no-console
  console.log('OK.');
});
mongoose.connection.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.log(`SORRY. ${err}`);
  process.exit(1);
});

export default app;
