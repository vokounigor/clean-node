import mongoose from 'mongoose';
import { createApp } from './app';
import { router } from './router';
import { env } from './env';
import { logger } from './shared/logger';

process.on('uncaughtException', (error) => {
  logger.fatal('Uncaught Exception', {
    error: error.message,
    stack: error.stack,
  });
  console.error('Uncaught Exception', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.fatal('Unhandled Rejection', {
    reason: reason instanceof Error ? reason.message : String(reason),
    promise: promise,
  });
  console.error('Unhandled Rejection', reason, promise);
  process.exit(1);
});

(async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log(`Connected to MongoDB: ${env.MONGODB_URI}`);
    logger.info('Connected to MongoDB', { uri: env.MONGODB_URI });

    const app = createApp(router);
    app.listen(env.PORT, () => {
      console.log(
        `Server is running on port ${env.PORT}\nMode: ${env.NODE_ENV}`
      );
      logger.info(`Server is running`, { port: env.PORT, env: env.NODE_ENV });
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.error('Error connecting to MongoDB', {
        error: error.message,
        stack: error.stack,
      });
    }
    process.exit(1);
  }
})();
