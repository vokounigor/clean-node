import type { IUserEntity } from '../../entities/user.entity';

export type UserData = Omit<IUserEntity, 'id'> & { password: string };

export interface IUserRepository {
  create(userData: UserData): Promise<IUserEntity>;
  createMany(userData: UserData[]): Promise<IUserEntity[]>;
  findById(id: string): Promise<IUserEntity | null>;
  findByEmail(email: string): Promise<IUserEntity | null>;
  findAll(): Promise<IUserEntity[]>;
  update(id: string, userData: Partial<UserData>): Promise<IUserEntity | null>;
  delete(id: string): Promise<IUserEntity | null>;
}
