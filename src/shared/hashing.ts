import { scryptSync, timingSafeEqual } from 'node:crypto';
import { Buffer } from 'node:buffer';
import { env } from '../env';

export const hashPassword = (password: string): string => {
  const salt = env.AUTH_SALT;
  const hash = scryptSync(password, salt, 64);
  return hash.toString('hex');
};

export const verifyPassword = (password: string, hash: string): boolean => {
  try {
    const hashBuffer = Buffer.from(hash, 'hex');
    const keyBuffer = scryptSync(password, env.AUTH_SALT, 64);
    return timingSafeEqual(hashBuffer, keyBuffer);
  } catch {
    return false;
  }
};
