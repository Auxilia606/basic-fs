import {
  getFileList,
  deleteFile,
  downloadFile,
  uploadFile,
  uploadFileResponse,
} from '@/controllers/fileController';
import { Router } from 'express';

const router = Router();

router.post('/file/list', getFileList); // authMiddleware 추가하여 인증 적용

router.post('/file/upload', uploadFile, uploadFileResponse); // authMiddleware 추가하여 인증 적용
router.post('/file/download/:filename', downloadFile); // authMiddleware 추가하여 인증 적용

router.post('/file/delete/:filename', deleteFile); // authMiddleware 추가하여 인증 적용

export default router;
