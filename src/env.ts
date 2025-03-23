import dotenv from 'dotenv';

dotenv.config();

type ENV = {
  NODE_ENV: 'development' | 'production';
  PORT: number;
  MONGODB_URI: string;
  AUTH_SALT: string;
  JWT_ACCESS_SECRET: string;
  JWT_REFRESH_SECRET: string;
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
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || '',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || '',
} satisfies ENV;

if (!env.MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined');
}

if (!env.AUTH_SALT) {
  throw new Error('AUTH_SALT is not defined');
}

if (!env.JWT_ACCESS_SECRET) {
  throw new Error('JWT_ACCESS_SECRET is not defined');
}

if (!env.JWT_REFRESH_SECRET) {
  throw new Error('JWT_REFRESH_SECRET is not defined');
}

export { env };
