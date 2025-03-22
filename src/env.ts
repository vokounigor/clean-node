import dotenv from 'dotenv';

dotenv.config();

type ENV = {
  PORT: number;
  MONGODB_URI: string;
  AUTH_SALT: string;
};

const env = {
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  MONGODB_URI: process.env.MONGODB_URI || '',
  AUTH_SALT: process.env.AUTH_SALT || '',
} satisfies ENV;

if (!env.MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined');
}

if (!env.AUTH_SALT) {
  throw new Error('AUTH_SALT is not defined');
}

export { env };
