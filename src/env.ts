import dotenv from 'dotenv';

dotenv.config();

type ENV = {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: number;
  MONGODB_URI: string;
  AUTH_SALT: string;
  JWT_ACCESS_SECRET: string;
  JWT_REFRESH_SECRET: string;
  LOG_LEVEL: 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace';
};

const isAllowedEnv = (env?: string): env is ENV['NODE_ENV'] => {
  return env === 'development' || env === 'production' || env === 'test';
};

const isValidLogLevel = (level?: string): level is ENV['LOG_LEVEL'] => {
  return ['fatal', 'error', 'warn', 'info', 'debug', 'trace'].includes(
    level || ''
  );
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
  LOG_LEVEL: isValidLogLevel(process.env.LOG_LEVEL)
    ? process.env.LOG_LEVEL
    : 'info',
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
