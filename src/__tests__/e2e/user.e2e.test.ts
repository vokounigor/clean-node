import request from 'supertest';
import { type Express, Router } from 'express';
import { createApp } from '../../app';
import {
  createUserRouter,
  IUserRepository,
  UserRepository,
  UserController,
  UserService,
} from '../../features/user';

describe('User Endpoints', () => {
  let userRepository: IUserRepository;
  let app: Express;

  beforeAll(async () => {
    userRepository = new UserRepository();
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);
    const baseRouter = Router();
    const router = createUserRouter(userController);
    baseRouter.use('/api/users', router);
    app = createApp(baseRouter);
  });

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
      };

      const response = await request(app).post('/api/users').send(userData);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
      });

      // Verify user was actually saved to database
      const user = await userRepository.findByEmail(userData.email);
      expect(user).toBeTruthy();
      expect(user?.firstName).toBe(userData.firstName);
    });

    it('should not create a user with duplicate email', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
      };

      // Create first user
      await request(app).post('/api/users').send(userData);

      // Try to create second user with same email
      const response = await request(app).post('/api/users').send(userData);

      expect(response.status).toBe(409);
    });
  });

  describe('GET /api/users', () => {
    it('should return all users', async () => {
      // Create test users
      const usersData = [
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          password: 'password123',
        },
        {
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'jane@example.com',
          password: 'password123',
        },
      ];

      await userRepository.createMany(usersData);

      const response = await request(app).get('/api/users');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toMatchObject({
        firstName: usersData[0].firstName,
        lastName: usersData[0].lastName,
        email: usersData[0].email,
      });
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return a user by ID', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
      };

      const user = await userRepository.create(userData);

      const response = await request(app).get(`/api/users/${user.id}`);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
      });
    });

    it('should return 404 for non-existent user', async () => {
      const response = await request(app).get('/api/users/nonexistentid');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'User not found' });
    });
  });
});
