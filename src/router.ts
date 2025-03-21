import { Router } from 'express';
import { userRouter } from './features';

const router = Router();

router.use('/api/users', userRouter);

export { router };
