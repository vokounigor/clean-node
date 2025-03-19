import { BaseHttpError } from './base-error';

export class NotFoundError extends BaseHttpError {
  constructor(message: string) {
    super(404, message);
  }
}
