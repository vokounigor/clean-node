import {
  type JwtPayload,
  type SignOptions,
  type VerifyOptions,
  sign,
  verify,
} from 'jsonwebtoken';
import { env } from '../env';

export const generateAccessToken = (
  payload: Record<string, unknown>,
  options?: SignOptions
): string => {
  return sign(payload, env.JWT_ACCESS_SECRET, { expiresIn: '15m', ...options });
};

export const generateRefreshToken = (
  payload: Record<string, unknown>,
  options?: SignOptions
): string => {
  return sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: '7d', ...options });
};

export const verifyAccessToken = (
  token: string,
  options?: VerifyOptions
): string | JwtPayload => {
  try {
    return verify(token, env.JWT_ACCESS_SECRET, { ...options });
  } catch {
    return 'invalid';
  }
};

export const verifyRefreshToken = (
  token: string,
  options?: VerifyOptions
): string | JwtPayload => {
  try {
    return verify(token, env.JWT_REFRESH_SECRET, { ...options });
  } catch {
    return 'invalid';
  }
};
