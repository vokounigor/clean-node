import { Router, type Express } from 'express';
import request from 'supertest';
import { createApp } from '../../app';
import {
  createAuthRouter,
  AuthController,
  AuthService,
  UserService,
  UserRepository,
} from '../../features';
import { hashPassword } from '../../shared/hashing';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../../shared/web-token';
import { REFRESH_TOKEN_COOKIE_NAME } from '../../constants/cookies';

const testUser = {
  email: 'test@test.com',
  password: 'password',
  firstName: 'Test',
  lastName: 'User',
};

describe('Auth Endpoints', () => {
  let userService: UserService;
  let app: Express;

  beforeAll(async () => {
    const userRepository = new UserRepository();
    userService = new UserService(userRepository);
    const authService = new AuthService(userService);
    const authController = new AuthController(authService);
    const baseRouter = Router();
    const router = createAuthRouter({ authController, userService });
    baseRouter.use('/api/auth', router);
    app = createApp(baseRouter);
  });

  describe('POST /api/auth/login', () => {
    it('should throw 404 error if user with email does not exist', async () => {
      const response = await request(app).post('/api/auth/login').send({
        email: 'tester@test.com',
        password: 'password',
      });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('User not found');
    });

    it('should throw 401 error if password is incorrect', async () => {
      await userService.createUser(testUser);

      const response = await request(app).post('/api/auth/login').send({
        email: 'test@test.com',
        password: 'wrongpassword',
      });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Invalid password');
    });

    it('should return 200 status with access token and cookie with refresh token if user with email exists and password is correct', async () => {
      const user = await userService.createUser(testUser);
      const passwordHash = hashPassword(testUser.password);
      await userService.updateUser(user.id, { password: passwordHash });

      const response = await request(app).post('/api/auth/login').send({
        email: 'test@test.com',
        password: 'password',
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('accessToken');
      expect(response.headers['set-cookie']).toBeDefined();
      expect(response.headers['set-cookie'][0]).toContain(
        REFRESH_TOKEN_COOKIE_NAME
      );
      expect(response.headers['set-cookie'][0]).toContain('HttpOnly');
      expect(response.headers['set-cookie'][0]).not.toContain(
        response.body.accessToken
      );
    });
  });

  describe('POST /api/auth/register', () => {
    it('should throw 400 error if user with email already exists', async () => {
      await userService.createUser(testUser);

      const response = await request(app)
        .post('/api/auth/register')
        .send(testUser);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('User already exists');
    });

    it('should return 201 status with access token and cookie with refresh token if user with email does not exist', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send(testUser);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('accessToken');
      expect(response.headers['set-cookie']).toBeDefined();
      expect(response.headers['set-cookie'][0]).toContain(
        REFRESH_TOKEN_COOKIE_NAME
      );
      expect(response.headers['set-cookie'][0]).toContain('HttpOnly');
      expect(response.headers['set-cookie'][0]).not.toContain(
        response.body.accessToken
      );
    });
  });

  describe('POST /api/auth/refresh-token', () => {
    it('should throw 401 error if refresh token is not provided', async () => {
      const response = await request(app).post('/api/auth/refresh-token');

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('No refresh token provided');
    });

    it('should throw 400 error if refresh token is invalid', async () => {
      const response = await request(app)
        .post('/api/auth/refresh-token')
        .set('Cookie', `${REFRESH_TOKEN_COOKIE_NAME}=invalid`);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Invalid refresh token');
    });

    it('should throw 404 error if user with id from refresh token does not exist', async () => {
      const refreshToken = generateRefreshToken({ id: '123' });
      const response = await request(app)
        .post('/api/auth/refresh-token')
        .set('Cookie', `${REFRESH_TOKEN_COOKIE_NAME}=${refreshToken}`);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('User not found');
    });

    it('should throw 400 error if refresh token is expired', async () => {
      const user = await userService.createUser(testUser);
      const refreshToken = generateRefreshToken(
        { id: user.id },
        { expiresIn: '0s' }
      );
      const response = await request(app)
        .post('/api/auth/refresh-token')
        .set('Cookie', `${REFRESH_TOKEN_COOKIE_NAME}=${refreshToken}`);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Invalid refresh token');
    });

    it('should return 200 status with access token and cookie with refresh token', async () => {
      const user = await userService.createUser(testUser);
      const refreshToken = generateRefreshToken({ id: user.id });

      const response = await request(app)
        .post('/api/auth/refresh-token')
        .set('Cookie', `${REFRESH_TOKEN_COOKIE_NAME}=${refreshToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('accessToken');
      expect(response.body.accessToken).toBeDefined();
      expect(response.headers['set-cookie']).toBeDefined();
      expect(response.headers['set-cookie'][0]).toContain(
        REFRESH_TOKEN_COOKIE_NAME
      );
    });
  });

  describe('GET /api/auth/logout', () => {
    it('should throw 401 error if user is not authenticated', async () => {
      const response = await request(app).post('/api/auth/logout');

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('No authorization header provided');
    });

    it('should delete refresh token from cookie if user is authenticated', async () => {
      const user = await userService.createUser(testUser);
      const accessToken = generateAccessToken({ id: user.id });
      const refreshToken = generateRefreshToken({ id: user.id });

      const response = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${accessToken}`)
        .set('Cookie', `${REFRESH_TOKEN_COOKIE_NAME}=${refreshToken}`);

      expect(response.status).toBe(200);
      expect(response.headers['set-cookie']).toBeDefined();
      expect(response.headers['set-cookie'][0]).toContain(
        `${REFRESH_TOKEN_COOKIE_NAME}=;`
      );
    });
  });
});
