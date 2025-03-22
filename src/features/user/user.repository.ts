import { User, type IUser } from './user.model';
import type { IUserRepository, UserData } from './user.types';
import {
  UserEntity,
  UserCredentialsEntity,
  type IUserEntity,
  type IUserCredentialsEntity,
} from '../../entities';

export class UserRepository implements IUserRepository {
  async create(userData: UserData): Promise<IUserEntity> {
    const insertedUser = await User.insertOne(userData);
    return UserEntity.create(insertedUser);
  }

  async createMany(userData: UserData[]): Promise<IUserEntity[]> {
    const insertedUsers = await User.insertMany(userData);
    return insertedUsers.map((user) => UserEntity.create(user.toObject()));
  }

  async findById(id: string): Promise<IUserEntity | null> {
    const user = await User.findById(id);
    if (!user) {
      return null;
    }
    return UserEntity.create(user);
  }

  async findByEmail(email: string): Promise<IUserEntity | null> {
    const user = await User.findOne({ email });
    if (!user) {
      return null;
    }
    return UserEntity.create(user);
  }

  async findCredentialsByEmail(
    email: string
  ): Promise<IUserCredentialsEntity | null> {
    const user = await User.findOne({ email }).select('+password').exec();
    if (!user) {
      return null;
    }
    return UserCredentialsEntity.create(user as IUser & { password: string });
  }

  async findAll(): Promise<IUserEntity[]> {
    const users = await User.find();
    return users.map((user) => UserEntity.create(user));
  }

  async update(
    id: string,
    userData: Partial<UserData>
  ): Promise<IUserEntity | null> {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: userData },
      { returnDocument: 'after' }
    );
    if (!updatedUser) {
      return null;
    }
    return UserEntity.create(updatedUser);
  }

  async delete(id: string): Promise<IUserEntity | null> {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return null;
    }
    return UserEntity.create(deletedUser);
  }
}
