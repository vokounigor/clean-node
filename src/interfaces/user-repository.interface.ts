import { IUser } from '../models/user-model';

export interface IUserRepository {
  create(userData: Partial<IUser>): Promise<IUser>;
  createMany(userData: Partial<IUser>[]): Promise<IUser[]>;
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  findAll(): Promise<IUser[]>;
  update(id: string, userData: Partial<IUser>): Promise<IUser | null>;
  delete(id: string): Promise<IUser | null>;
}
