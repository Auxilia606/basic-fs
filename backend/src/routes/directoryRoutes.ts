import {
  createDirectory,
  deleteDirectory,
} from '@/controllers/directoryController';
import { Router } from 'express';

const router = Router();

router.post('/directory/create', createDirectory); // authMiddleware 추가하여 인증 적용

router.post('/directory/delete', deleteDirectory); // authMiddleware 추가하여 인증 적용

export default router;
