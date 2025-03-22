import type { IUserEntity } from '../../entities/user.entity';

export interface IUserRepository {
  create(userData: Omit<Partial<IUserEntity>, 'id'>): Promise<IUserEntity>;
  createMany(
    userData: Omit<Partial<IUserEntity>, 'id'>[]
  ): Promise<IUserEntity[]>;
  findById(id: string): Promise<IUserEntity | null>;
  findByEmail(email: string): Promise<IUserEntity | null>;
  findAll(): Promise<IUserEntity[]>;
  update(
    id: string,
    userData: Omit<Partial<IUserEntity>, 'id'>
  ): Promise<IUserEntity | null>;
  delete(id: string): Promise<IUserEntity | null>;
}
