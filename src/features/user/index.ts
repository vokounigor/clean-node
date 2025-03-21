import { createUserRouter } from './user.routes';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

const userService = new UserService(new UserRepository());
const userController = new UserController(userService);
const userRouter = createUserRouter(userController);

export {
  userRouter,
  createUserRouter,
  UserController,
  UserService,
  UserRepository,
};
export { User, IUser } from './user.model';
export { IUserRepository } from './user.types';
