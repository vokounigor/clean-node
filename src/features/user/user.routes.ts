import { Router } from 'express';
import type { UserController } from './user.controller';

export function createUserRouter(userController: UserController): Router {
  const router = Router();

  // Create a new user
  router.post('/', userController.createUser);

  // Get all users
  router.get('/', userController.getAllUsers);

  // Get a single user by ID
  router.get('/:id', userController.getUser);

  // Update a user
  router.put('/:id', userController.updateUser);

  // Delete a user
  router.delete('/:id', userController.deleteUser);

  return router;
}
