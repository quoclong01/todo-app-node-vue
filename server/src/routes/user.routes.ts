import express from 'express';
import controller from '../controllers/user.controller';
import schema from '../schema/user.schema';
import { ValidateJoi } from '../lib/utils';

const router = express.Router();

router.get('/', controller.getAllUser);
router.get('/:id', controller.getUserById);
router.post('/create', ValidateJoi(schema.create), controller.createUser);
router.post('/login', controller.loginUser);

export default router;
