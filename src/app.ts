import express, { Router } from 'express';
import cors from 'cors';
import { errorHandler } from './errors/error-handler';
import cookieParser from 'cookie-parser';

export function createApp(router: Router) {
  const app = express();

  app.use(cors());
  app.use(cookieParser());
  app.use(express.json());

  app.use(router);
  app.use(errorHandler);

  return app;
}
