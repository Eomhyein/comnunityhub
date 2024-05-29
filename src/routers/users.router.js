// src/routes/users.router.js
import express from 'express';
import { prisma } from '../utils/prisma/index.js'; // 데이터베이스에 있는 Users조회
import bcrypt from 'bcrypt'; // 1-5. bcrypt 리팩토링
import jwt from 'jsonwebtoken'; // 2. 로그인 인증 미들웨어
import authMiddleware from '../middlewares/auth.middleware.js'; // 4. authMiddleware 임포트

const router = express.Router();

/** 1. 사용자 회원가입 API **/
router.post('/sign-up', async (req, res, next) => {
  try {
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
        password: hashedPassword, // 1-5. 암호화된 비밀번호를 저장합니다.
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
  } catch (err) {
    next(err);
  }
});

/*2. 사용자 로그인 API*/
router.post('/sign-in', async (req, res, next) => {
  // 2-1 "email", "password"를 **body**로 전달받습니다.
  const { email, password } = req.body;
  // 2-2 전달 받은 'email'에 해당하는 사용자가 있는지 확인합니다.
  const user = await prisma.users.findFirst({ where: { email } });
  
  // 2-3 전달 받은 'password'와 데이터베이스의 저장된 'password'를 'bcrypt를 이용해 검증합니다.
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: '이메일 또는 비밀번호가 잘못되었습니다.' });
  }
  // 2-4  로그인에 성공하면, 사용자에게 JWT 토큰을 발급합니다.
  const token = jwt.sign(
    {
      userId: user.userId,
    },
    process.env.SECRET_KEY, //비밀키, dotenv를 이용해서, 외부에서 코드 못보게!
    {expiresIn: '5h'} //토큰 만료 시간 5시간으로 설정
  );

  res.cookie('authorization', `Bearer ${token}`);
  return res.status(200).json({ message: '로그인 성공', token });
});

/**4. 사용자 조회 API **/
router.get('/users', authMiddleware, async (req, res, next) => {
  // 4-1. 클라이언트가 로그인된 사용자인지 검증합니다.
  try {
    const { userId } = req.user;
    // 4-2. 사용자를 조회할 때 1:1 관계를 맺고 있는 Users와 UserInfos 테이블을 조회합니다.
    const user = await prisma.users.findFirst({
      where: { userId: +userId },
      // 특정 칼럼만 조회하는 파라미터
      select: {
        userId: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        userInfos: {
          // 1:1 관계를 맺고있는 UserInfos 테이블을 조회합니다.
          select: {
            name: true,
            age: true,
            gender: true,
            profileImage: true,
          },
        },
      },
    });
    // 4-3. 조회한 사용자의 상세한 정보를 클라이언트에게 반환합니다.
    return res.status(200).json({ data: user });
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({message: '서버 오류 발생'});
  }
});
export default router;