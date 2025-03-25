import pino from 'pino';
import { env } from '../../env';
import type { Logger } from './logger.types';

export class PinoLogger implements Logger {
  private logger: pino.Logger;
  constructor(options?: pino.LoggerOptions) {
    this.logger = pino({
      level: env.LOG_LEVEL,
      ...options,
    });
  }

  fatal(msg: string, obj?: Record<string, unknown>): void {
    this.logger.fatal(obj || {}, msg);
  }

  error(msg: string, obj?: Record<string, unknown>): void {
    this.logger.error(obj || {}, msg);
  }

  warn(msg: string, obj?: Record<string, unknown>): void {
    this.logger.warn(obj || {}, msg);
  }

  info(msg: string, obj?: Record<string, unknown>): void {
    this.logger.info(obj || {}, msg);
  }

  debug(msg: string, obj?: Record<string, unknown>): void {
    this.logger.debug(obj || {}, msg);
  }

  trace(msg: string, obj?: Record<string, unknown>): void {
    this.logger.trace(obj || {}, msg);
  }
}
