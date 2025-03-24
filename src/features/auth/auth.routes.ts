import { Router } from 'express';
import type { AuthController } from './auth.controller';
import { authMiddleware } from '../../middleware/auth.middleware';
import { UserService } from '../user';

type CreateAuthRouterOptions = {
  authController: AuthController;
  userService: UserService;
};

export function createAuthRouter({
  authController,
  userService,
}: CreateAuthRouterOptions): Router {
  const router = Router();

  router.post('/login', authController.login.bind(authController));

  router.post('/register', authController.register.bind(authController));

  router.post(
    '/refresh-token',
    authController.refreshToken.bind(authController)
  );

  router.post(
    '/logout',
    authMiddleware(userService),
    authController.logout.bind(authController)
  );

  return router;
}
