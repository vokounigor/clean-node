import { type IUser, User } from './user.model';
import type { IUserRepository } from './user.types';

export class UserRepository implements IUserRepository {
  async create(userData: Partial<IUser>): Promise<IUser> {
    return await User.insertOne(userData);
  }

  async createMany(userData: Partial<IUser>[]): Promise<IUser[]> {
    const insertedUsers = await User.insertMany(userData);
    return insertedUsers.map((user) => (user as IUser).toObject());
  }

  async findById(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }

  async findAll(): Promise<IUser[]> {
    return await User.find();
  }

  async update(id: string, userData: Partial<IUser>): Promise<IUser | null> {
    return await User.findByIdAndUpdate(id, { $set: userData });
  }

  async delete(id: string): Promise<IUser | null> {
    return await User.findByIdAndDelete(id);
  }
}
