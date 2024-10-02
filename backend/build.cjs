const dotenv = require('dotenv');
const path = require('path');

// 현재 환경에 맞는 .env 파일을 로드
// 기본 설정은 개발환경
const envPath =
  process.env.NODE_ENV === 'production'
    ? path.resolve(__dirname, './.env.production')
    : path.resolve(__dirname, './.env.development');

// dotenv를 사용해 해당 경로의 환경 변수를 로드
dotenv.config({ path: envPath });

const esbuild = require('esbuild');
const dependencies = require('./package.json');

const envKeys = Object.keys(process.env)
  .filter((key) => !key.includes('(')) // 괄호가 포함된 변수를 제외
  .reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(process.env[next]);
    return prev;
  }, {});

esbuild
  .build({
    entryPoints: ['./src/server.ts'], // 진입점 파일 설정
    bundle: true, // 번들링 활성화
    minify: true, // 코드 압축
    sourcemap: true, // 소스맵 생성
    outfile: 'dist/bundle.js', // 번들링된 파일 출력 경로
    platform: 'node', // Node.js 플랫폼 설정
    target: 'es2020', // 트랜스파일 타겟
    external: Object.keys(dependencies), // package.json의 dependencies 자동 포함
    define: envKeys,
  })
  .catch(() => process.exit(1));
