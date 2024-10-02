import dotenv from 'dotenv';
import path from 'path';

// 현재 환경에 맞는 .env 파일을 로드
const envPath =
  process.env.NODE_ENV === 'production'
    ? path.resolve(__dirname, '../.env.production')
    : process.env.NODE_ENV === 'development'
      ? path.resolve(__dirname, '../.env.development')
      : undefined;

// dotenv를 사용해 해당 경로의 환경 변수를 로드
if (envPath) dotenv.config({ path: envPath });
