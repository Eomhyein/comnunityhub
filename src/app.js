// src/app.js
import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import LogMiddleware from './middlewares/log.middleware.js'; // 로그 미들웨어
import ErrorHandlingMiddleware from './middlewares/error-handling.middleware.js'; // 에러 처리 미들웨어
import UsersRouter from './routers/users.router.js';
import PostsRouter from './routes/posts.router.js'; // 게시글 생성 API 비즈니스


dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(LogMiddleware); // 로그 미들웨어(가장 먼저 실행되면 좋음)
app.use(express.json());
app.use(cookieParser());
app.use('/api', [UsersRouter, PostsRouter]);
app.use(ErrorHandlingMiddleware); // 에러 처리 미들웨어 (app.use를 이용한 미들웨어 둥 가장 최하단에 위치)


app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});