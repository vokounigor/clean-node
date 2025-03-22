import type { Request, Response, NextFunction } from 'express';
import { BaseHttpError } from './base-error';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof BaseHttpError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }
  res.status(500).json({ error: 'Internal Server Error' });
}
