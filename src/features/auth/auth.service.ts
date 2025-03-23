import { UserService } from '../user';
import { hashPassword, verifyPassword } from '../../shared/hashing';
import { NotFoundError } from '../../errors/not-found';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../../shared/web-token';
import { UnauthorizedError } from '../../errors/unauthorized-error';
import { BadRequestError } from '../../errors/bad-request-error';
import { IUserCredentialsEntity } from '../../entities/user';
import type { RegisterUserData, TokenPair } from './auth.types';

export class AuthService {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async login(email: string, password: string): Promise<TokenPair> {
    const user = await this.userService.getUserCredentialsByEmail(email);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const isPasswordValid = verifyPassword(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid password');
    }

    return this.generateTokens(user.id);
  }

  async register(userData: RegisterUserData): Promise<TokenPair> {
    let userExists: IUserCredentialsEntity | null = null;
    try {
      userExists = await this.userService.getUserCredentialsByEmail(
        userData.email
      );
    } catch (err) {
      if (!(err instanceof NotFoundError)) {
        throw err;
      }
    }

    if (userExists) {
      throw new BadRequestError('User already exists');
    }

    const hashedPassword = hashPassword(userData.password);
    const user = await this.userService.createUser({
      ...userData,
      password: hashedPassword,
    });

    return this.generateTokens(user.id);
  }

  async refreshToken(refreshToken: string): Promise<TokenPair> {
    const decodedToken = verifyRefreshToken(refreshToken);

    if (
      typeof decodedToken !== 'object' ||
      !('id' in decodedToken) ||
      typeof decodedToken.id !== 'string'
    ) {
      throw new BadRequestError('Invalid refresh token');
    }

    const user = await this.userService.getUserById(decodedToken.id);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    return this.generateTokens(decodedToken.id);
  }

  private generateTokens(userId: string): TokenPair {
    const accessToken = generateAccessToken({ id: userId });
    const refreshToken = generateRefreshToken({ id: userId });

    return { accessToken, refreshToken };
  }
}
