import { Request, Response, NextFunction } from 'express';
import pinoHttp from 'pino-http';
import { env } from '../env';
import { logger, type PinoLogger } from '../shared/logger';

export const createHttpLogger = () => {
  const httpLogger = pinoHttp({
    logger: (logger as PinoLogger)['logger'],
    level: env.LOG_LEVEL,
    customProps: () => {
      return {
        context: 'http',
      };
    },
    customSuccessMessage: function (req, res) {
      return `${req.method} ${req.url} completed with ${res.statusCode}`;
    },
    customErrorMessage: function (req, res) {
      return `${req.method} ${req.url} failed with ${res.statusCode}`;
    },
    redact: {
      paths: [
        'req.headers.authorization',
        'req.headers.cookie',
        'req.headers["set-cookie"]',
        'req.body.password',
        'req.body.passwordConfirmation',
      ],
      remove: true,
    },
  });

  return (req: Request, res: Response, next: NextFunction) => {
    httpLogger(req, res);
    next();
  };
};
