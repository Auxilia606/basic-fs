import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import {
  hashPassword,
  comparePassword,
  generateToken,
} from '../utils/authUtils';

// 이메일 형식 검증 함수
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 회원가입
export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // 이메일 형식 확인
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
    // 중복 사용자 확인
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // 비밀번호 해싱
    const hashedPassword = await hashPassword(password);

    // 사용자 생성 및 저장
    const newUser: IUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error fetching response from registerUser:', error);
    res.status(500).json({ error: 'An error occurred during registration' });
  }
};

// 로그인
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // 사용자 확인
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // 비밀번호 검증
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // JWT 토큰 생성
    const token = generateToken(user.id);

    res.json({
      token,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error('Error fetching response from loginUser:', error);
    res.status(500).json({ error: 'An error occurred during login' });
  }
};

// 사용자 ID 중복 여부 확인
export const checkUserIdExists = async (req: Request, res: Response) => {
  const { username, email } = req.body;

  try {
    // 사용자 이름 중복 체크
    if (username) {
      const userByUsername = await User.findOne({ username });
      if (userByUsername) {
        return res.status(200).json({ exists: true, field: 'username' });
      }
    }

    // 이메일 중복 체크
    if (email) {
      const userByEmail = await User.findOne({ email });
      if (userByEmail) {
        return res.status(200).json({ exists: true, field: 'email' });
      }
    }

    // 중복되지 않음
    return res.status(200).json({ exists: false });
  } catch (error) {
    console.error('Error fetching response from checkUserIdExists:', error);
    res.status(500).json({ error: 'An error occurred while checking user ID' });
  }
};
