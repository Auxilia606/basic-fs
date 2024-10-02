import dotenv from 'dotenv';
dotenv.config(); // .env 파일을 가장 먼저 로드

import express from 'express';
import cors from 'cors';
import path from 'path';
import authRoutes from './routes/authRoutes'; // 인증 라우터 추가
import directoryRoutes from './routes/directoryRoutes'; // 인증 라우터 추가
import fileRoutes from './routes/fileRoutes'; // 인증 라우터 추가

const app = express();

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

app.use(cors());
app.use(express.json());

// 인증 라우터 설정
app.use('/api', authRoutes);

// 디렉토리 라우터 설정
app.use('/api', directoryRoutes);

// 파일 라우터 설정
app.use('/api', fileRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(express.static(path.join(__dirname, 'public')));
