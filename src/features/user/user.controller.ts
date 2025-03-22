import type { Request, Response, NextFunction } from 'express';
import type { UserService } from './user.service';

export class UserController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  };

  getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user = await this.userService.getUserById(req.params.id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  };

  getAllUsers = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (err) {
      next(err);
    }
  };

  updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user = await this.userService.updateUser(req.params.id, req.body);
      res.json(user);
    } catch (err) {
      next(err);
    }
  };

  deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await this.userService.deleteUser(req.params.id);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  };
}
