import express, { Router } from 'express';
import cors from 'cors';

export function createApp(router: Router) {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());

  app.use(router);

  return app;
}
