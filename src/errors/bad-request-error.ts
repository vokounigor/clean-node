import { BaseHttpError } from './base-error';

export class BadRequestError extends BaseHttpError {
  constructor(message: string) {
    super(400, message);
  }
}
