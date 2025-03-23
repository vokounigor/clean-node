import { BaseHttpError } from './base-error';

export class ForbiddenError extends BaseHttpError {
  constructor(message: string) {
    super(403, message);
  }
}
