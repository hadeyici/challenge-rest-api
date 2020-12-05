import dotenv from 'dotenv';

dotenv.config();
// eslint-disable-next-line import/prefer-default-export
export const { MONGODB_STR } = process.env;
export const { PORT } = process.env;
