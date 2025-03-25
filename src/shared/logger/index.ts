import path from 'node:path';
import { env } from '../../env';
import type { Logger } from './logger.types';
import { PinoLogger } from './pino-logger';

export const logger: Logger = new PinoLogger({
  transport:
    env.NODE_ENV === 'test'
      ? { target: 'pino/file', options: { destination: '/dev/null' } }
      : {
          target: 'pino/file',
          options: { destination: path.join(__dirname, '../../logs/app.log') },
        },
});

export type { PinoLogger };
export type { Logger };
