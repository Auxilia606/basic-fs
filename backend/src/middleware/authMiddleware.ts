import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'default_secret',
    ) as { id: string };
    req.body.user = { id: decoded.id }; // 토큰에서 추출한 사용자 ID를 요청 객체에 저장
    next();
  } catch (err) {
    console.error('Error fetching response from authenticateToken:', err);
    res.status(401).json({ error: 'Token is not valid' });
  }
};
