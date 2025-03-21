import { NotFoundError } from '../../errors/not-found';
import type { IUserRepository } from './user.types';
import type { IUser } from './user.model';

export class UserService {
  private readonly userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(userData: IUser): Promise<IUser> {
    return this.userRepository.create(userData);
  }

  async getUserById(id: string): Promise<IUser | null> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  async getAllUsers(): Promise<IUser[]> {
    return this.userRepository.findAll();
  }

  async updateUser(id: string, userData: IUser): Promise<IUser | null> {
    const user = await this.userRepository.update(id, userData);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
