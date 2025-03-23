import { BaseHttpError } from './base-error';

export class UnauthorizedError extends BaseHttpError {
  constructor(message: string) {
    super(401, message);
  }
}
