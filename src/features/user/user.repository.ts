import { User, type IUser } from './user.model';
import type { IUserRepository } from './user.types';
import { UserEntity, type IUserEntity } from '../../entities/user.entity';

export class UserRepository implements IUserRepository {
  async create(userData: Partial<IUserEntity>): Promise<IUserEntity> {
    const insertedUser = await User.insertOne(userData);
    return UserEntity.create(insertedUser);
  }

  async createMany(userData: Partial<IUserEntity>[]): Promise<IUserEntity[]> {
    const insertedUsers = await User.insertMany(userData);
    return insertedUsers.map((user) => {
      const userObject = (user as IUser).toObject();
      return UserEntity.create(userObject);
    });
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

  async findAll(): Promise<IUserEntity[]> {
    const users = await User.find();
    return users.map((user) => UserEntity.create(user));
  }

  async update(
    id: string,
    userData: Partial<IUserEntity>
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
