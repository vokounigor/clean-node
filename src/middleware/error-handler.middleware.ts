import type { NextFunction, Request, Response } from 'express';
import { BaseHttpError } from '../errors/base-error';
import { logger } from '../shared/logger';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof BaseHttpError) {
    logger.warn(`HTTP Error: ${err.message}`, {
      statusCode: err.statusCode,
      path: req.path,
      method: req.method,
    });

    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  logger.error('Internal Server Error', {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });
  res.status(500).json({ error: 'Internal Server Error' });
  next();
}
