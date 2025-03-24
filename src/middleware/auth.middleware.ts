import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../errors/unauthorized-error';
import { verifyAccessToken } from '../shared/web-token';
import { ForbiddenError } from '../errors/forbidden-error';
import { UserService } from '../features';
import { NotFoundError } from '../errors/not-found';

export function authMiddleware(userService: UserService) {
  return async (req: Request, _res: Response, next: NextFunction) => {
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

      req.user = await userService.getUserById(decodedToken.id);
      next();
    } catch (error) {
      if (error instanceof NotFoundError) {
        return next(error);
      }
      return next(new ForbiddenError('Token invalid or expired'));
    }
  };
}
