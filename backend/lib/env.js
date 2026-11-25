import dotenv from 'dotenv';
import path from 'node:path';

const ENV_PATH = path.resolve(import.meta.dirname, '../../.env');
dotenv.config({
  path: ENV_PATH,
});
