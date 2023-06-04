import express from 'express';
import userRouters from './user.routes';

const router = express.Router();

router.use('/user', userRouters);

export default router;
