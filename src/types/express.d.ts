declare namespace Express {
  import type { IUserEntity } from '../entities';

  interface Request {
    user: IUserEntity;
  }
}
