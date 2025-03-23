import { Router } from 'express';
import type { UserController } from './user.controller';

export function createUserRouter(userController: UserController): Router {
  const router = Router();

  // Create a new user
  router.post('/', userController.createUser.bind(userController));

  // Get all users
  router.get('/', userController.getAllUsers.bind(userController));

  // Get a single user by ID
  router.get('/:id', userController.getUser.bind(userController));

  // Update a user
  router.put('/:id', userController.updateUser.bind(userController));

  // Delete a user
  router.delete('/:id', userController.deleteUser.bind(userController));

  return router;
}
