import { NotFoundError } from '../../errors/not-found';
import type { IUserRepository } from './user.types';
import type { IUserEntity } from '../../entities/user.entity';

export class UserService {
  private readonly userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(userData: IUserEntity): Promise<IUserEntity> {
    return this.userRepository.create(userData);
  }

  async getUserById(id: string): Promise<IUserEntity> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  async getAllUsers(): Promise<IUserEntity[]> {
    return this.userRepository.findAll();
  }

  async updateUser(id: string, userData: IUserEntity): Promise<IUserEntity> {
    const user = await this.userRepository.update(id, userData);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  async deleteUser(id: string): Promise<IUserEntity> {
    const user = await this.userRepository.delete(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }
}
