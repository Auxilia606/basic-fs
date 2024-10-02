import { Router } from 'express';
import { testCreateChatWithBot } from '@/controllers/testController';

const router = Router();

router.post('/test/chat', testCreateChatWithBot); // authMiddleware 추가하여 인증 적용

export default router;
