import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService, UserRepository } from '../user';
import { createAuthRouter } from './auth.routes';

const userService = new UserService(new UserRepository());
const authService = new AuthService(userService);
const authController = new AuthController(authService);
const authRouter = createAuthRouter({ authController, userService });

export {
  authRouter,
  authController,
  AuthService,
  AuthController,
  createAuthRouter,
};
export * from './auth.types';
