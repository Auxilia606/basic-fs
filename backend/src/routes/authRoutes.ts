import { Router } from 'express';
import {
  registerUser,
  loginUser,
  checkUserIdExists,
} from '../controllers/authController';

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: 회원가입 라우터
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "홍길동"
 *               email:
 *                 type: string
 *                 example: "testuser01@test.com"
 *               password:
 *                 type: string
 *                 example: "dweax123!@#"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists
 */
router.post('/auth/register', registerUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: 로그인 라우터
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "testuser01@test.com"
 *               password:
 *                 type: string
 *                 example: "dweax123!@#"
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid credentials
 */
router.post('/auth/login', loginUser);

/**
 * @swagger
 * /auth/check-id:
 *   post:
 *     summary: 사용자 ID 중복 여부 확인 라우터
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "testuser01"
 *               email:
 *                 type: string
 *                 example: "testuser01@test.com"
 *     responses:
 *       200:
 *         description: User ID exists or not
 */
router.post('/auth/check-id', checkUserIdExists);

export default router;
