import path from 'node:path';
import { env } from '../../env';
import type { Logger } from './logger.types';
import { PinoLogger } from './pino-logger';

const resolveDestination = () => {
  switch (env.NODE_ENV) {
    case 'test':
      return { target: 'pino/file', options: { destination: '/dev/null' } };
    case 'production':
      return {
        target: 'pino/file',
        options: {
          destination:
            env.LOG_FILE_PATH || path.join(__dirname, 'logs/app.log'),
          mkdir: true,
        },
      };
    default:
      return {
        target: 'pino/file',
        options: { destination: path.join(__dirname, '../../logs/app.log') },
        mkdir: true,
      };
  }
};

export const logger: Logger = new PinoLogger({
  transport: resolveDestination(),
});

export type { PinoLogger };
export type { Logger };
