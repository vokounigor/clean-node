import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../errors/unauthorized-error';
import { verifyAccessToken } from '../shared/web-token';
import { ForbiddenError } from '../errors/forbidden-error';

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return next(new UnauthorizedError('No authorization header provided'));
  }

  const token = authorization.split(' ')[1];
  if (!token) {
    return next(new UnauthorizedError('No token provided'));
  }

  try {
    const decodedToken = verifyAccessToken(token);
    if (
      typeof decodedToken !== 'object' ||
      !('id' in decodedToken) ||
      typeof decodedToken.id !== 'string'
    ) {
      return next(new UnauthorizedError('Invalid token'));
    }

    req.user = { id: decodedToken.id };
    next();
  } catch {
    return next(new ForbiddenError('Token invalid or expired'));
  }
}
