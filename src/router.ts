import { Router } from 'express';
import { userRouter, authRouter } from './features';

const router = Router();

router.get('/api/health-check', (_, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().getTime(),
  });
});

router.use('/api/auth', authRouter);
router.use('/api/users', userRouter);

export { router };
