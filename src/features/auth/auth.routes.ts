import { Router } from 'express';
import type { AuthController } from './auth.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

export function createAuthRouter(authController: AuthController): Router {
  const router = Router();

  router.post('/login', authController.login.bind(authController));

  router.post('/register', authController.register.bind(authController));

  router.post(
    '/refresh-token',
    authMiddleware,
    authController.refreshToken.bind(authController)
  );

  router.post(
    '/logout',
    authMiddleware,
    authController.logout.bind(authController)
  );

  return router;
}
