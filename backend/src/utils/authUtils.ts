import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// 비밀번호 해싱
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);

  return bcrypt.hash(password, salt);
};

// 비밀번호 검증
export const comparePassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

// JWT 토큰 생성
export const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'default_secret', {
    expiresIn: '1h',
  });
};
