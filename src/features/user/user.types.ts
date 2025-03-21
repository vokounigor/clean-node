import type { IUserEntity } from '../../entities/user.entity';

export interface IUserRepository {
  create(userData: Partial<IUserEntity>): Promise<IUserEntity>;
  createMany(userData: Partial<IUserEntity>[]): Promise<IUserEntity[]>;
  findById(id: string): Promise<IUserEntity | null>;
  findByEmail(email: string): Promise<IUserEntity | null>;
  findAll(): Promise<IUserEntity[]>;
  update(
    id: string,
    userData: Partial<IUserEntity>
  ): Promise<IUserEntity | null>;
  delete(id: string): Promise<IUserEntity | null>;
}
