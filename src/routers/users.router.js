// src/routes/users.router.js
import express from 'express';
import { prisma } from '../utils/prisma/index.js'; // 데이터베이스에 있는 Users조회
import bcrypt from 'bcrypt'; // 1-5. bcrypt 리팩토링

const router = express.Router();

/** 1. 사용자 회원가입 API **/
router.post('/sign-up', async (req, res, next) => {
  // 1-1. `email`, `password`, `name`, `age`, `gender`, `profileImage`를 **body**로 전달받습니다.
  const { email, password, name, age, gender, profileImage } = req.body;
  
  // 1-2. 동일한 `email`을 가진 사용자가 있는지 확인합니다.
  const isExistUser = await prisma.users.findFirst({
    where: {
      email,
    },
  });
  if (isExistUser) {
    return res.status(409).json({ message: '이미 존재하는 이메일입니다.' });
  }

  // 1-5. 사용자 비밀번호를 암호화합니다.
  const hashedPassword = await bcrypt.hash(password, 10);

  // 1-3. **Users** 테이블에 `email`, `password`를 이용해 사용자를 생성합니다.
  const user = await prisma.users.create({
    data: { 
      email, 
      password: hashedPassword, // 암호화된 비밀번호를 저장합니다.
    },
  });

  // 1-4. **UserInfos** 테이블에 `name`, `age`, `gender`, `profileImage`를 이용해 사용자 정보를 생성합니다.
  const userInfo = await prisma.userInfos.create({
    data: {
      userId: user.userId, // 생성한 유저의 userId를 바탕으로 사용자 정보를 생성합니다.
      name,
      age,
      gender: gender.toUpperCase(), // 성별을 대문자로 변환합니다.
      profileImage,
    },
  });

  return res.status(201).json({ message: '회원가입이 완료되었습니다.' });
});

export default router;