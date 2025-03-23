import type { Request, Response, NextFunction, CookieOptions } from 'express';
import { AuthService } from './auth.service';
import {
  REFRESH_TOKEN_MAX_AGE,
  REFRESH_TOKEN_COOKIE_NAME,
} from '../../constants/cookies';
import { env } from '../../env';
import { UnauthorizedError } from '../../errors/unauthorized-error';

const COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: REFRESH_TOKEN_MAX_AGE,
};

export class AuthController {
  private readonly authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken } = await this.authService.login(
        email,
        password
      );

      res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, COOKIE_OPTIONS);

      res.status(200).json({ accessToken });
    } catch (error) {
      next(error);
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, firstName, lastName } = req.body;
      const { accessToken, refreshToken } = await this.authService.register({
        email,
        password,
        firstName,
        lastName,
      });

      res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, COOKIE_OPTIONS);

      res.status(201).json({ accessToken });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies?.refreshToken;
      if (!refreshToken || typeof refreshToken !== 'string') {
        throw new UnauthorizedError('No refresh token provided');
      }

      const { accessToken, refreshToken: newRefreshToken } =
        await this.authService.refreshToken(refreshToken);

      res.cookie(REFRESH_TOKEN_COOKIE_NAME, newRefreshToken, COOKIE_OPTIONS);

      res.status(200).json({ accessToken });
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new UnauthorizedError('No user provided');
      }

      res.clearCookie(REFRESH_TOKEN_COOKIE_NAME);
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }
}
