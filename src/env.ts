import dotenv from 'dotenv';

dotenv.config();

type ENV = {
  NODE_ENV: 'development' | 'production';
  PORT: number;
  MONGODB_URI: string;
  AUTH_SALT: string;
};

const isAllowedEnv = (env?: string): env is ENV['NODE_ENV'] => {
  return env === 'development' || env === 'production';
};

const env = {
  NODE_ENV: isAllowedEnv(process.env.NODE_ENV)
    ? process.env.NODE_ENV
    : 'development',
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
