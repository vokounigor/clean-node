import { BaseHttpError } from './base-error';

export class DuplicateKeyError extends BaseHttpError {
  constructor(message: string) {
    super(409, message);
  }
}
