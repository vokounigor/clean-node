import type { IUserEntity, IUserCredentialsEntity } from '../../entities/user';

export type UserData = Omit<IUserEntity, 'id'> & { password: string };

export interface IUserRepository {
  create(userData: UserData): Promise<IUserEntity>;
  createMany(userData: UserData[]): Promise<IUserEntity[]>;
  findById(id: string): Promise<IUserEntity | null>;
  findByEmail(email: string): Promise<IUserEntity | null>;
  findCredentialsByEmail(email: string): Promise<IUserCredentialsEntity | null>;
  findAll(): Promise<IUserEntity[]>;
  update(id: string, userData: Partial<UserData>): Promise<IUserEntity | null>;
  delete(id: string): Promise<IUserEntity | null>;
}
