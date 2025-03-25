import express, { Router } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createHttpLogger, errorHandler } from './middleware';

export function createApp(router: Router) {
  const app = express();

  app.use(createHttpLogger());
  app.use(cors());
  app.use(cookieParser());
  app.use(express.json());

  app.use(router);
  app.use(errorHandler);

  return app;
}
