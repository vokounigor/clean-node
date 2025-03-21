import type { Request, Response } from 'express';
import type { UserService } from './user.service';
import { NotFoundError } from '../../errors/not-found';

export class UserController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch {
      res.status(400).json({ error: 'Error creating user' });
    }
  };

  getUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.userService.getUserById(req.params.id);
      res.json(user);
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
      }
      res.status(400).json({ error: 'Error fetching user' });
    }
  };

  getAllUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch {
      res.status(400).json({ error: 'Error fetching users' });
    }
  };

  updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.userService.updateUser(req.params.id, req.body);
      res.json(user);
    } catch {
      res.status(400).json({ error: 'Error updating user' });
    }
  };

  deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.userService.deleteUser(req.params.id);
      res.sendStatus(204);
    } catch {
      res.status(400).json({ error: 'Error deleting user' });
    }
  };
}
