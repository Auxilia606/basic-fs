import { Router } from 'express';
import {
  registerUser,
  loginUser,
  checkUserIdExists,
} from '../controllers/authController';

const router = Router();

router.post('/auth/register', registerUser);

router.post('/auth/login', loginUser);

router.post('/auth/check-id', checkUserIdExists);

export default router;
